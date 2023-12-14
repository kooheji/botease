const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

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
  const paddedPrice = formattedNumber.padStart(6, " ");
  const formattedPrice = `${paddedPrice}`;
  res.json({
    Symbol: formattedWord,
    Currency: paddedCurrency,
    Price: formattedPrice,
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
