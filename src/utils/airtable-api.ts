import Airtable from "airtable";
import { format } from "date-fns";
import shuffle from "lodash/shuffle";
import { NextApiRequest, NextApiResponse } from "next";

import {
  AirtableQuizQuestionRecord,
  AirtableQuizRecord,
  RecordID,
} from "./types";

const base = new Airtable({ apiKey: process.env.AIRTABLE_TOKEN }).base(
  process.env.AIRTABLE_BASE_ID!
);

export function formSubmission(tableName: string) {
  return (req: NextApiRequest, res: NextApiResponse) => {
    const body = req.body;

    base(tableName).create(
      [
        {
          fields: body,
        },
      ],
      function (err) {
        if (err) {
          console.error(err);
          res.status(500).json({ status: "error" });
          return;
        }
        res.status(200).json({ status: "success" });
        return;
      }
    );
  };
}

type EventRecord = {
  event_id: string;
  github_url?: string;
  graphic_url?: string;
};

export async function retrieveMatchingAirtableEvent(
  id: string
): Promise<EventRecord> {
  const match = await base("Events")
    .select({
      view: "Grid view",
      filterByFormula: `{event_id} = "${id}"`,
    })
    .firstPage();
  const matchedRecord = match[0];
  return Promise.resolve({
    event_id: matchedRecord.fields.event_id,
    github_url: matchedRecord?.fields?.github_url,
    graphic_url: matchedRecord?.fields.graphic?.[0].thumbnails?.large?.url,
  } as EventRecord);
}

export async function retrieveAirtableEvents(): Promise<EventRecord[]> {
  const results: EventRecord[] = [];
  await base("Events")
    .select({
      maxRecords: 200,
      view: "Grid view",
    })
    .eachPage((records, fetchNextPage) => {
      records.forEach((record) => {
        // eslint-disable-next-line functional/immutable-data
        results.push({
          event_id: record.get("event_id") as EventRecord["event_id"],
          github_url: record.get("github_url") as EventRecord["github_url"],
          graphic_url: record.get("graphic")?.[0]?.thumbnails?.large?.url,
        });
      });
      fetchNextPage();
    });
  return Promise.resolve(results);
}

// QUIZ

type QuizQuestionOption = {
  key: QuizQuestion["answer"];
  value: string;
};

export async function fetchQuiz(recordId: string): Promise<QuizRecord> {
  const values = (await base("Quizzes").find(
    recordId
  )) as unknown as AirtableQuizRecord;
  const { fields } = values;

  const formattedQuiz = {
    id: values.id,
    name: fields.Name,
    timer: fields["Timer Duration"],
    room_id: fields["Room ID"],
    admin_client_id: fields["Admin Client ID"],
    participant_code: fields["Participant Code"],
  };

  const questionsQuery = fields.Questions.reduce((acc, q) => {
    return [...acc, `{Record_ID} = "${q}"`];
  }, []);

  const query = questionsQuery.join(", ");

  const questionsResult = (await base("Quiz Questions")
    .select({
      view: "Grid view",
      maxRecords: 200,
      filterByFormula: `OR(${query})`,
    })
    .firstPage()) as unknown as AirtableQuizQuestionRecord[];

  const questions = questionsResult.map((value, i) => {
    const { id, fields } = value;

    const questionOptions = ["A", "B", "C", "D"].reduce((acc, answerKey) => {
      const maybeOption = fields[`Option ${answerKey}`];

      if (maybeOption.length > 2) {
        return [...acc, { key: answerKey, value: maybeOption }];
      }
      return acc;
    }, []);

    const formattedQuestion = {
      id,
      type: fields.Type,
      question: fields.Question,
      answer: fields.Answer,
      language: fields.Language,
      explanation: fields.Explanation,
      options: questionOptions,
    };

    return formattedQuestion as unknown as QuizQuestion;
  });

  return {
    ...formattedQuiz,
    questions: fields["Random Order"] ? shuffle(questions) : questions,
  };
}

export type QuizQuestion = {
  id: AirtableQuizQuestionRecord["id"];
  type: AirtableQuizQuestionRecord["fields"]["Type"];
  question: AirtableQuizQuestionRecord["fields"]["Question"];
  answer: AirtableQuizQuestionRecord["fields"]["Answer"];
  language: AirtableQuizQuestionRecord["fields"]["Language"];
  explanation: AirtableQuizQuestionRecord["fields"]["Explanation"];
  options: QuizQuestionOption[];
  index?: number;
};

export type QuizRecord = {
  id: string;
  name: string;
  timer: number;
  room_id: string;
  admin_client_id?: string;
  participant_code: number;
  questions: QuizQuestion[];
};

export async function findQuizByCode(code: string) {
  return base("Quizzes")
    .select({
      view: "Grid view",
      filterByFormula: `OR({Participant Code} = "${code}", {Admin Code} = "${code}")`,
    })
    .firstPage() as unknown as AirtableQuizRecord[];
}

type Args = {
  id: RecordID;
  admin_client_id: string;
};

export async function updateQuizStatusDetails(args: Args) {
  const { id, admin_client_id } = args;
  const today = format(new Date(), "MM/dd/yyyy");

  return base("Quizzes").update([
    {
      id: id,
      fields: {
        "Admin Client ID": admin_client_id,
        Status: "In Progress",
        Date: today,
      },
    },
  ]);
}

// type AirtableRedemptionCode = {
//   id: string;
//   code: number;
//   Printed: boolean;
//   "Prize Type": "Book" | "Pass";
// };

export type RedemptionCode = null | {
  id: string;
  code: number;
  prize_type: "Book" | "Pass";
};

export async function retrieveRedemptionCodes(): Promise<RedemptionCode[]> {
  const results: RedemptionCode[] = [];
  await base("Redemption Codes")
    .select({
      maxRecords: 200,
      view: "Grid view",
    })
    .eachPage((records, fetchNextPage) => {
      records.forEach((record) => {
        if (!record.get("Printed")) {
          // eslint-disable-next-line functional/immutable-data
          results.push({
            id: record.get("id") as string,
            code: record.get("Code") as number,
            prize_type: record.get("Prize Type") as "Book" | "Pass",
          });
        }
      });
      fetchNextPage();
    });
  return Promise.resolve(results);
}
