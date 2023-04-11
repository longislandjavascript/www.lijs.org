import { updateQuizStatusDetails } from "utils/airtable-api";

export default function handler(req, res) {
  const { id, room_id, admin_client_id } = req.query;
  return updateQuizStatusDetails({ id, room_id, admin_client_id })
    .then(() => {
      return res.status(200).json({
        success: true,
      });
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({
        success: false,
      });
    });
}
