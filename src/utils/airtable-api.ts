import Airtable from "airtable";
import { NextApiRequest, NextApiResponse } from "next";

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
  id: string;
  github_url?: string;
};

export async function retrieveEvents(): Promise<EventRecord[]> {
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
          id: record.get("id") as EventRecord["id"],
          github_url: record.get("github_url") as EventRecord["github_url"],
        });
      });
      fetchNextPage();
    });
  return Promise.resolve(results);
}
