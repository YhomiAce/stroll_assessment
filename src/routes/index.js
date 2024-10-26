const express = require("express")
const QuestionController = require("../controllers/QuestionController")

const router = express.Router();

router.get("/question/:region", QuestionController.listQuestions)

module.exports = router;