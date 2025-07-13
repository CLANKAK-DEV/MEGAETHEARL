import express from "express";

const app = express();
const PORT = 3000;
const RPC_URL = "https://carrot.megaeth.com/rpc";

app.use(express.static(".")); // serve index.html and assets
app.use(express.json());

app.post("/rpc", async (req, res) => {
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
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});