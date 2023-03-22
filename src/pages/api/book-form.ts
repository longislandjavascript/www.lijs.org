import Airtable from "airtable";
const base = new Airtable({ apiKey: process.env.AIRTABLE_TOKEN }).base(
  process.env.AIRTABLE_CONTACT_FORM_BASE!
);

export default function handler(req, res) {
  const body = req.body;

  console.log(body);

  // base("Contact Us Form").create(
  //   [
  //     {
  //       fields: body,
  //     },
  //   ],
  //   function (err) {
  //     if (err) {
  //       console.error(err);
  //       res.status(500).json({ status: "error" });
  //       return;
  //     }
  //     res.status(200).json({ status: "success" });
  //     return;
  //   }
  // );
}
