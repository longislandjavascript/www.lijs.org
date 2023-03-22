
import { NextApiRequest, NextApiResponse } from "next";
import Airtable from "airtable";

const base = new Airtable({ apiKey: process.env.AIRTABLE_TOKEN }).base(
  process.env.AIRTABLE_BASE_ID!
);

export function formSubmission(tableName: string) {
  return (req: NextApiRequest, res: NextApiResponse ) => {
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
}
