var Airtable = require("airtable");
var base = new Airtable({ apiKey: process.env.AIRTABLE_TOKEN }).base(
  process.env.AIRTABLE_BASE_ID
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
      if (err) {
        res.status(500).json({ message: "An unknown error occurred" });
        return;
      }

      if (records[0]) {
        console.log(records[0]);
        res.status(200).json(
          JSON.stringify({
            success: true,
            code: records[0].get("Code"),
            prize: records[0].get("Prize Type"),
          })
        );
      } else {
        console.log("no records");
        return res.status(500).json(JSON.stringify({ success: false }));
      }
    });
}
