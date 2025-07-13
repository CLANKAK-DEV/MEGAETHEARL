export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const RPC_URL = "https://carrot.megaeth.com/rpc";

  try {
    const upstream = await fetch(RPC_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const text = await upstream.text();

    try {
      const json = JSON.parse(text);
      res.json(json);
    } catch (e) {
      res.status(502).json({ error: "Invalid JSON from RPC", raw: text });
    }
  } catch (err) {
    res.status(500).json({ error: "RPC proxy error", message: err.message });
  }
}
