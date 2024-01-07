// Import required modules
const express = require("express");
const axios = require("axios");
const cors = require("cors");
// Create an Express app
const app = express();
// Set the port for the server
const PORT = process.env.PORT || 5000;
// Add this line to enable CORS for all routes
app.use(
  cors({
    origin: "https://currency-convertor-backend.onrender.com",
  })
);
// Start the server and log a message when it's running
const server = app.listen(PORT, () => {
  console.log(`App Running on Port ${PORT}`);
});

// Check Server Running Status running
app.get("/", (req, res) => {
  res.send(`App Running Successfully......`);
});

// API endpoint to fetch the top 100 cryptocurrencies and supported currencies
app.get("/crypto", async (req, res) => {
  try {
    // Fetch the top 100 cryptocurrencies
    const cryptoResponse = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: "usd", // You can change the currency here (e.g., "eur")
          order: "market_cap_desc",
          per_page: 100,
          page: 1,
          sparkline: false,
        },
      }
    );

    // Fetch supported currencies
    const currenciesResponse = await axios.get(
      "https://api.coingecko.com/api/v3/simple/supported_vs_currencies"
    );

    // Extract data from responses
    const topCryptos = cryptoResponse.data;
    const supportedCurrencies = currenciesResponse.data;

    // Respond with the fetched data
    res.json({ topCryptos, supportedCurrencies });
  } catch (error) {
    // Handle errors and respond with an error message
    console.error("Error fetching data:", error.message);
    console.error("Error stack trace:", error.stack);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API endpoint to convert cryptocurrency to another currency
app.get("/convert", async (req, res) => {
  const { sourceCrypto, amount, targetCurrency } = req.query;

  try {
    // Fetch the conversion rate
    const conversionResponse = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price",
      {
        params: {
          ids: sourceCrypto,
          vs_currencies: targetCurrency,
        },
      }
    );

    // Extract conversion rate and calculate converted amount
    const conversionRate =
      conversionResponse.data[sourceCrypto.toLowerCase()][
        targetCurrency.toLowerCase()
      ];
    const convertedAmount = amount * conversionRate;

    // Respond with the conversion details
    res.json({ sourceCrypto, amount, targetCurrency, convertedAmount });
  } catch (error) {
    // Handle errors and respond with an error message
    console.error("Error converting currency:", error.message);
    console.error("Error stack trace:", error.stack);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Export the app and server for testing purposes
module.exports = { app, server };
