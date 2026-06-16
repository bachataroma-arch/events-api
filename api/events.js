export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    let allEvents = [];

    let url =
      "https://www.goandance.com/api/affiliates/6b69b3cc-49a3-445e-b6cb-8121d472c0c7/events";

    while (url) {
      const response = await fetch(url);
      const json = await response.json();

      allEvents.push(...(json.data || []));

      // NEXT PAGE (se esiste)
      url = json.meta?.nextUrl || null;
    }

    return res.status(200).json({
      data: allEvents
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}
