/*******QUIZ**********/

import { IconBaseProps } from "react-icons";

import { useSharedQuiz } from "hooks/useSharedQuiz";

export type PageProps = {
  params: Record<string, string>;
  searchParams: Record<string, string>;
};

export type ReactIcon = React.FC<IconBaseProps>;

// https://api.meetup.com/long-island-javascript-group
export interface MeetupGroup {
  id: number;
  name: string;
  status: string;
  link: string;
  urlname: string;
  description: string;
  created: number;
  city: string;
  untranslated_city: string;
  country: string;
  localized_country_name: string;
  localized_location: string;
  region2: string;
  state: string;
  join_mode: string;
  visibility: string;
  lat: number;
  lon: number;
  members: number;
  member_pay_fee: string;
  organizer: MeetupGroupOrganizer;
  who: string;
  group_photo: MeetupPhoto;
  key_photo: MeetupPhoto;
  timezone: string;
  next_event: Pick<
    MeetupEvent,
    "id" | "name" | "yes_rsvp_count" | "time" | "utc_offset"
  >;
  category: MeetupGroupCategory;
  meta_category: MeetupGroupMetaCategory;
}

// https://api.meetup.com/long-island-javascript-group/events?status=upcoming
export interface MeetupEvent {
  created: number;
  duration: number;
  id: string;
  name: string;
  date_in_series_pattern: boolean;
  status: string;
  time: number;
  local_date: string;
  local_time: string;
  updated: number;
  utc_offset: number;
  waitlist_count: number;
  yes_rsvp_count: number;
  link: string;
  description: string;
  visibility: string;
  member_pay_fee: boolean;
  is_online_event: string;
  github_url?: string;
  graphic_url?: string;
  group: Pick<
    MeetupGroup,
    | "created"
    | "name"
    | "id"
    | "join_mode"
    | "lat"
    | "lon"
    | "urlname"
    | "who"
    | "localized_location"
    | "state"
    | "country"
    | "timezone"
  > & { region: string };
}

export interface MeetupEventVenue {
  id: number;
  name: string;
  lat: number;
  lon: number;
  repinned: boolean;
  address_1: string;
  city: string;
  country: string;
  localized_country_name: string;
  phone: string;
  zip: string;
  state: string;
}

export interface MeetupPhoto {
  id: number;
  highres_link: string;
  photo_link: string;
  thumb_link: string;
  type: string;
  base_url: string;
}

export interface MeetupGroupOrganizer {
  id: number;
  name: string;
  bio: string;
  photo: MeetupPhoto;
}

export interface MeetupGroupCategory {
  id: number;
  name: string;
  shortname: string;
  sort_name: string;
}

export interface MeetupGroupMetaCategory extends MeetupGroupCategory {
  photo: MeetupPhoto;
  category_ids: number[];
}

export type BaseComponent = {
  /**
   * The contents of the component
   */
  children?: React.ReactNode;
  /**
   * Optionally apply a className
   */
  className?: string;
  /**
   * Optionally provide an id
   */
  id?: string;
  /**
   * Optionally apply a style object
   */
  style?: React.CSSProperties;
};

export type RecordID = string;

export type AirtableRecord<Fields> = {
  id: RecordID;
  fields: Fields;
};

export type AirtableQuizEventRecord = AirtableRecord<{
  "Auto ID": number;
  Name: string;
  "Default Timer Duration": number;
  Questions: string[];
  "Participant Code"?: number;
  "Admin Code": number;
  "Admin Client ID"?: string;
  Status: "New" | "In Progress" | "Ended";
  Date: Date;
}>;

export type AirtableQuizQuestionRecord = AirtableRecord<{
  "Auto ID": number;
  Question: string;
  Type: "Multiple Choice";
  Language: "JavaScript" | "TypeScript" | "JSX" | "TSX" | "CSS" | "HTML";
  Answer: "A" | "B" | "C" | "D";
  Explanation: string;
  "Timer Duration": number;
}>;

type QuizQuestionOption = {
  key: QuizQuestion["answer"];
  value: string;
};

export type QuizQuestion = {
  id: AirtableQuizQuestionRecord["id"];
  type: AirtableQuizQuestionRecord["fields"]["Type"];
  question: AirtableQuizQuestionRecord["fields"]["Question"];
  answer: AirtableQuizQuestionRecord["fields"]["Answer"];
  language: AirtableQuizQuestionRecord["fields"]["Language"];
  explanation: AirtableQuizQuestionRecord["fields"]["Explanation"];
  timer_duration: AirtableQuizQuestionRecord["fields"]["Timer Duration"];
  options: QuizQuestionOption[];
  index?: number;
};

export type QuizEventRecord = {
  id: string;
  name: string;
  default_timer_duration: number;
  admin_client_id?: string;
  participant_code: number;
  questions: QuizQuestion[];
};

export type Timer = {
  status: "idle" | "running" | "paused" | "stopped" | "finished";
  secondsRemaining: number;
  duration: number;
  setDuration: (arg: number) => void;
  start: () => void;
  pause: () => void;
  stop: () => void;
  reset: () => void;
};

type Scores = Record<
  string,
  Record<string, { key: QuizQuestion["answer"]; isCorrect: boolean }> & {
    count: number;
  }
>;

type LeaderBoardItem = {
  name: string;
  clientID: string;
  correctAnswers: number;
  totalTime: number;
  totalAnswers: number;
  score: number;
};

export type SharedState = {
  status: "loading" | "ready" | "in-progress" | "ended";
  answered_count: number;
  quiz: QuizEventRecord;
  question: QuizQuestion;
  showAnswerKey: boolean;
  answerKey?: QuizQuestion["answer"] | null;
  ready?: boolean;
  started?: boolean;
  participants: User[];
  removedParticipants: User[];
  showLeaderBoard: boolean;
  leaderboard: LeaderBoardItem[];
  scores: Scores;
};

export type Action = {
  type: string;
  payload?: any;
};

export type User = {
  name: string;
  clientID: string;
  isAdmin: boolean;
};

export type SharedQuiz = ReturnType<typeof useSharedQuiz>;

/*******END QUIZ******/
