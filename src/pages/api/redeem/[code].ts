import Airtable from "airtable";
import isBefore from "date-fns/isBefore";

const base = new Airtable({ apiKey: process.env.AIRTABLE_TOKEN }).base(
  process.env.AIRTABLE_BASE_ID!
);

// type CodeRecord = {
//   Code: string;
//   "Prize Type": "Book" | "Pass";
//   Redeemed: boolean;
//   Link?: string;
//   "Link Expiration Date": Date;
// };

function isLinkExpired(exp_date: string) {
  return isBefore(new Date(exp_date), new Date());
}

export default function handler(req, res) {
  const { code } = req.query;

  base("Redemption Codes")
    .select({
      maxRecords: 1,
      view: "Grid view",
      filterByFormula: `({Code} = ${code})`,
    })

    .firstPage(function (err, records) {
      if (err) {
        return res.status(404).json({ success: "false", reason: "failure" });
      } else if (records && records[0] && records[0].get("Redeemed")) {
        return res.status(500).json(
          JSON.stringify({
            success: false,
            error: "redeemed",
          })
        );
      } else if (
        records &&
        records[0] &&
        records[0].get("Link") &&
        isLinkExpired(records[0].get("Link Expiration Date") as string)
      ) {
        return res.status(500).json(
          JSON.stringify({
            success: false,
            error: "expired",
          })
        );
      } else if (records && records[0]) {
        return res.status(200).json(
          JSON.stringify({
            success: true,
            code: records[0].get("Code"),
            prize: records[0].get("Prize Type"),
            code_record_id: records[0].getId(),
            link: records[0].get("Link"),
            link_expiration_date: records[0].get("Link Expiration Date"),
          })
        );
      } else {
        return res
          .status(404)
          .json(JSON.stringify({ success: false, error: "invalid" }));
      }
    });
}
