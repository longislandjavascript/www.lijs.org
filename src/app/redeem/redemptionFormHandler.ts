import { baseUrl } from "constants/baseUrl";

export function redemptionFormHandler({
  data,
  endpoint,
}: {
  data: unknown;
  endpoint: `/${string}`;
}) {
  const JSONdata = JSON.stringify(data);

  const fullEndPoint = baseUrl + endpoint;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSONdata,
  };

  return fetch(fullEndPoint, options);
}
