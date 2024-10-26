const express = require("express");
require("dotenv").config();
require("./config/database/connection");
require("./config/cache/redis-config");
const http = require("http");
const Routes = require("./routes");
const cron = require("node-cron");
const QuestionService = require("./services/QuestionService");
const { SINGAPORE_SHORT_CODE, USA_SHORT_CODE } = require("./constants/code");

const app = express();
const server = http.createServer(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", Routes);

app.get("/", (req, res) => res.json({ message: "SUCCESS" }));

// Runs on Monday 7PM SGT
cron.schedule("0 19 * * 1", async() => {
  await QuestionService.setRegionCycleQuestion(SINGAPORE_SHORT_CODE)
}, {

  timezone: "Asia/Singapore",
});

// Runs on Monday 7PM Eastern Time Zone
cron.schedule("0 19 * * 1", async() => {
  await QuestionService.setRegionCycleQuestion(USA_SHORT_CODE)
}, {

  timezone: "America/New_York",
});

const PORT = process.env.PORT || 6000;
// const bindAddress = process.env.BIND_ADDRESS || "0.0.0.0";
server.listen(PORT, () =>
  console.log(`Server Started on http://localhost:${PORT}`)
);
