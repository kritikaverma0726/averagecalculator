const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 9876;

const apiMap = require('./apiMap');
const { updateWindow, getAverage } = require('./windowManager');

app.get('/numbers/:numberid', async (req, res) => {
  const { numberid } = req.params;
  const apiUrl = apiMap[numberid];

  if (!apiUrl) {
    return res.status(400).json({ error: "Invalid numberid" });
  }

  let numbers = [];

  try {
    const response = await axios.get(apiUrl, { timeout: 500 });
    numbers = response.data.numbers;
  } catch (error) {
    console.error("Error or timeout from API");
  }

  const { windowPrevState, windowCurrState } = updateWindow(numbers);
  const avg = getAverage();

  res.json({
    windowPrevState,
    windowCurrState,
    numbers,
    avg
  });
});

app.listen(PORT, () => {
  console.log("Server is running");
});