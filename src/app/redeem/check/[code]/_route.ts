import type { NextApiRequest, NextApiResponse } from "next";

import Airtable from "airtable";

const base = new Airtable({ apiKey: process.env.AIRTABLE_TOKEN }).base(
  process.env.AIRTABLE_BASE_ID
);

export const runtime = "experimental-edge";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  console.log("here");
  const { code } = req.query;

  await base("Redemption Codes")
    .select({
      maxRecords: 1,
      view: "Grid view",
      filterByFormula: `({Code} = ${code})`,
    })

    .firstPage(function (err, records) {
      if (err) {
        res.status(500).json({ message: "An unknown error occurred" });
        return;
      }

      if (records[0]) {
        res.status(200).json(
          JSON.stringify({
            success: true,
            code: records[0].get("Code"),
            prize: records[0].get("Prize Type"),
          })
        );
      } else {
        return res.status(500).json(JSON.stringify({ success: false }));
      }
    });
}
