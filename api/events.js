export default async function handler(req, res) {

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {

    let url = "https://www.goandance.com/api/affiliates/6b69b3cc-49a3-445e-b6cb-8121d472c0c7/events";

    let allEvents = [];

    while (url) {

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const json = await response.json();

      allEvents.push(...(json.data || []));

      const next = json.meta?.nextUrl;

      url = next
        ? (next.startsWith("http")
            ? next
            : new URL(next, "https://www.goandance.com").href)
        : null;
    }

    return res.status(200).json({
      data: allEvents
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
