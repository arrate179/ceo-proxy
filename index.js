const express = require("express");
const fetch = require("node-fetch");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/token/:token", async (req, res) => {
  const tokenRaw = req.params.token;
  const token = tokenRaw.replace("pump", "");

  try {
    const r = await fetch(`https://pump.fun/api/token/${token}`, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json",
        "Referer": "https://pump.fun/"
      }
    });

    const data = await r.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: "Fetch failed" });
  }
});

app.listen(PORT, () => {
  console.log("Proxy running on port " + PORT);
});