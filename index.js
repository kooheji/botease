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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
