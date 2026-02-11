export default async function handler(req, res) {
  const GAS_URL = "https://script.google.com/macros/s/AKfycbxbqvf7nr9tCC8Nb3F3p3CydYqBTTNXLZuEH418-YNdM3EZCsJ13QviKJ2Txj2L2SOfTw/exec";

  try {
    let response;

    if (req.method === "GET") {
      const qs = req.url.split("?")[1] || "";
      response = await fetch(`${GAS_URL}?${qs}`);
    }

    if (req.method === "POST") {
      response = await fetch(GAS_URL, {
        method: "POST",
        body: JSON.stringify(req.body)
      });
    }

    const data = await response.text();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).send(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
