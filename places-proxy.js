// places-proxy.js
// Run: node places-proxy.js
// Then open: http://localhost:3000

import express from "express";

const app = express();
const API_KEY = "AIzaSyBWDgEb271lv5WnDB4c2PKbST6Clqv71rE"; // ← paste your key here

// Serve the UI
app.get("/", (req, res) => {
  res.sendFile("/Users/vintrinh/vincent_personal_projects/domain-implement-test/project-testing-domain/places-ui.html");
});

// Places API proxy
app.get("/places", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const query = req.query.query;
  if (!query) return res.status(400).json({ error: "Missing query param" });

  try {
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    const places = data.results.map((p) => ({
      name: p.name,
      address: p.formatted_address,
      rating: p.rating,
      open_now: p.opening_hours?.open_now,
      lat: p.geometry.location.lat,
      lng: p.geometry.location.lng,
    }));

    res.json({ places });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Open http://localhost:3000 in your browser"));