const express = require("express");
const axios = require("axios");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 3000;

//Bot Uptime Calculate
app.get("/calctime/:restarttime", (req, res) => {
  const day = 86400;
  const hour = 3600;
  const minute = 60;
  const currentTime = Date.now() / 1000;
  const OldTime = parseInt(req.params.restarttime);
  const seconddifference = currentTime - OldTime;
  const UptimeDays = Math.floor(seconddifference / 86400);
  const UptimeHours = Math.floor((seconddifference - UptimeDays * day) / hour);
  const UptimeMinutes = Math.floor(
    (seconddifference - UptimeDays * day - UptimeHours * hour) / minute
  );
  const Value = `**${UptimeDays}** Days, **${UptimeHours}** Hours, **${UptimeMinutes}** Minutes`;

  res.json({
    Value,
  });
});

//Seconds Calculate
app.get("/secstime/:restarttime", (req, res) => {
  const day = 86400;
  const hour = 3600;
  const minute = 60;
  const OldTime = parseInt(req.params.restarttime);
  const UptimeDays = Math.floor(OldTime / 86400);
  const UptimeHours = Math.floor((OldTime - UptimeDays * day) / hour);
  const UptimeMinutes = Math.floor(
    (OldTime - UptimeDays * day - UptimeHours * hour) / minute
  );
  const Value = `**${UptimeDays}** Days, **${UptimeHours}** Hours, **${UptimeMinutes}** Minutes`;

  res.json({
    Value,
  });
});

//Trending NFTs Listing Formatting
app.get("/listnft", (req, res) => {
  const { symbol, currency, price } = req.query;
  if (symbol.length < 10) {
    paddedWord = symbol.padEnd(10, " ");
    formattedWord = `${paddedWord}`;
  } else {
    paddedWord = symbol.slice(0, 10);
    formattedWord = `${paddedWord}`;
  }
  const capitalizedWord = currency.toUpperCase();
  const paddedCurrency = capitalizedWord.padEnd(6, " ");
  const formattedNumber = parseFloat(price).toFixed(2);
  const paddedPrice = formattedNumber.padStart(7, " ");
  const formattedPrice = `${paddedPrice}`;
  res.json({
    Symbol: formattedWord,
    Currency: paddedCurrency,
    Price: formattedPrice,
  });
});

//Trending Coins Listing Formatting
app.get("/listcoin", (req, res) => {
  const { symbol, price } = req.query;
  if (symbol.length < 10) {
    paddedWord = symbol.padEnd(10, " ");
    formattedWord = `${paddedWord}`;
  } else {
    paddedWord = symbol.slice(0, 10);
    formattedWord = `${paddedWord}`;
  }
  const formattedNumber = parseFloat(price).toFixed(2);
  const paddedPrice = formattedNumber.padStart(8, " ");
  const formattedPrice = `$${paddedPrice}`;
  res.json({
    Symbol: formattedWord,
    Price: formattedPrice,
  });
});

//Shorten Numbers with 2 Decimals
app.get("/short/:number", (req, res) => {
  const number = parseFloat(req.params.number);
  let shortenedNumber = number.toFixed(2);

  if (number >= 1000 && number < 1000000) {
    shortenedNumber = (number / 1000).toFixed(2) + "k";
  } else if (number >= 1000000 && number < 1000000000) {
    shortenedNumber = (number / 1000000).toFixed(2) + "m";
  } else if (number >= 1000000000 && number < 1000000000000) {
    shortenedNumber = (number / 1000000000).toFixed(2) + "b";
  } else if (number >= 1000000000000) {
    shortenedNumber = (number / 1000000000000).toFixed(2) + "t";
  }
  const paddedPrice = shortenedNumber.padStart(7, " ");
  const formattedPrice = `${paddedPrice}`;
  res.json({ formattedPrice });
});

//Top 10 CryptoCurrencies Formatting
app.get("/topcoin", (req, res) => {
  const { symbol, price, change, cap } = req.query;
  const capitalizedsymbol = symbol.toUpperCase();
  if (capitalizedsymbol.length < 5) {
    paddedWord = capitalizedsymbol.padEnd(5, " ");
    formattedWord = `${paddedWord}`;
  } else {
    paddedWord = capitalizedsymbol.slice(0, 5);
    formattedWord = `${paddedWord}`;
  }
  let pricecut = parseFloat(price).toFixed(2);
  if (price >= 1000 && price < 1000000) {
    pricecut = (price / 1000).toFixed(2) + "k";
  } else if (price >= 1000000 && price < 1000000000) {
    pricecut = (price / 1000000).toFixed(2) + "m";
  } else if (price >= 1000000000 && price < 1000000000000) {
    pricecut = (price / 1000000000).toFixed(2) + "b";
  } else if (price >= 1000000000000) {
    pricecut = (price / 1000000000000).toFixed(2) + "t";
  }
  const paddedPrice = pricecut.padStart(7, " ");
  const formattedPrice = `${paddedPrice}`;
  const formattedchange = parseFloat(change).toFixed(2);
  let capcut = parseFloat(cap).toFixed(2);
  if (price >= 1000 && cap < 1000000) {
    capcut = (cap / 1000).toFixed(2) + "k";
  } else if (cap >= 1000000 && cap < 1000000000) {
    capcut = (cap / 1000000).toFixed(2) + "m";
  } else if (cap >= 1000000000 && cap < 1000000000000) {
    capcut = (cap / 1000000000).toFixed(2) + "b";
  } else if (cap >= 1000000000000) {
    capcut = (cap / 1000000000000).toFixed(2) + "t";
  }
  const paddedCap = capcut.padStart(7, " ");
  const formattedCap = `${paddedCap}`;
  res.json({
    Symbol: formattedWord,
    Price: formattedPrice,
    Change: formattedchange,
    Cap: formattedCap,
  });
});

//PNG to Base64
app.get("/base64", async (req, res) => {
  const { url } = req.query;

  const response = await axios.get(url, { responseType: "arraybuffer" });
  const base64Data = Buffer.from(response.data, "binary").toString("base64");

  const fileName = url.substring(url.lastIndexOf("/") + 1);

  res.json({ base64Data, fileName });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
