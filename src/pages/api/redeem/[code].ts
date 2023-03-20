import Airtable from "airtable";

const base = new Airtable({ apiKey: process.env.AIRTABLE_TOKEN }).base(
  process.env.AIRTABLE_BASE_ID as string
);

export default function handler(req, res) {
  const { code } = req.query;

  base("Redemption Codes")
    .select({
      maxRecords: 1,
      view: "Grid view",
      filterByFormula: `({Code} = ${code})`,
    })

    .firstPage(function (err, records) {
      if (err || !records) {
        return res.status(404).json({ success: "false", reason: "invalid" });
      } else if (records[0] && records[0].get("Redeemed")) {
        return res.status(500).json(
          JSON.stringify({
            success: false,
            error: "redeemed",
          })
        );
      } else if (records[0]) {
        return res.status(200).json(
          JSON.stringify({
            success: true,
            code: records[0].get("Code"),
            prize: records[0].get("Prize Type"),
            code_record_id: records[0].getId(),
          })
        );
      } else {
        return res
          .status(404)
          .json(JSON.stringify({ success: false, error: "invalid" }));
      }
    });
}
