import { findQuiz } from "utils/airtable-api";

export default function handler(req, res) {
  const { code } = req.query;
  findQuiz(code)
    .then((quiz) => {
      if (!quiz[0]) {
        return res
          .status(500)
          .json({ success: false, error: "This is not a valid code." });
      }

      const { id, fields } = quiz[0];
      const isAdmin = fields["Admin Code"] == code;
      if (fields["Status"] === "Ended") {
        return res.status(500).json({
          success: false,
          error: "This quiz has ended.",
        });
      } else if (isAdmin) {
        return res.status(200).json({
          success: true,
          record_id: id,
          admin: isAdmin,
        });
      } else if (fields["Status"] !== "In Progress") {
        return res.status(500).json({
          success: false,
          error: "This quiz is not active at this time.",
        });
      } else {
        return res.status(200).json({
          success: true,
          record_id: id,
          room_id: fields["room_id"],
        });
      }
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({
        success: false,
        error: "Something went wrong. Please try again.",
      });
    });
}
