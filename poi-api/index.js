const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const AICall = require('./AICall');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
dotenv.config()

const database = {};

// Call AI
app.get('/api/poi', async (req, res) => {
  const { input, context } = req.query;
  if (!input || !context) {
    return res.status(400).json({ error: "Item is required" });
  }
  const result = await AICall(input, context);
  res.json({ data: result });
});

// Receive POIs from KRPano
app.post('/api/poi/database', async (req, res) => {
  try {
    const { data } = req.body; // Extract from request body

    if (!data) {
      return res.status(400).json({ error: "No data attribute in request body." });
    }

    res.status(200).json({ status: 200, data: { data }, message: "POI data received successfully." });

  } catch (error) {
    console.error("Error in /api/poi/database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(app.listen(process.env.API_PORT, () => {
  console.log(`Server is Running on http://localhost:${process.env.API_PORT}.`)
}))
