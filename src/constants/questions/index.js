const SGQUESTIONS = require("./sg-question");
const USQUESTIONS = require("./us-question");

const QUESTIONS = [...SGQUESTIONS, ...USQUESTIONS];

module.exports = QUESTIONS;