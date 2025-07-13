export default async function handler(req, res) {
  const rpcUrl = "https://carrot.megaeth.com/rpc";

  try {
    const upstream = await fetch(rpcUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const text = await upstream.text(); // always read as text first

    try {
      const json = JSON.parse(text); // parse safely
      res.status(200).json(json);
    } catch (parseError) {
      console.error("❌ Invalid JSON returned from RPC:", text);
      res.status(502).json({ error: "Invalid JSON from MegaETH", raw: text });
    }

  } catch (err) {
    console.error("❌ RPC Proxy Error:", err);
    res.status(500).json({ error: "Proxy failed", message: err.message });
  }
}
