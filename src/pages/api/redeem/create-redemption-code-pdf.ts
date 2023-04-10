import { retrieveRedemptionCodes } from "utils/airtable-api";

export default async function handler(req, res) {
  const { code } = req.query;
  const isValidCode = code === process.env.ADMIN_CODE;

  if (isValidCode) {
    const items = await retrieveRedemptionCodes();
    return res.status(200).json({ success: true, items });
  } else {
    return res.status(500).json({ success: false, message: "Invalid code" });
  }
}
