const Question = require("../models/Question");
const client = require("../config/cache/redis-config");
const Cycle = require("../models/Cycle");
const { Op } = require("sequelize");

exports.findCurrenCycleQuestion = async (region, date) => {
  const currentCycle = await Cycle.findOne({
    where: {
      region,
      startDate: {
        [Op.lte]: date,
      },
      endDate: {
        [Op.gte]: date,
      },
    },
    includes: [
      {
        model: "Question",
        as: "question",
      },
    ],
  });
  if (currentCycle) {
    return currentCycle.question;
  }
  return null;
};

exports.cacheRegionQuestion = async (region, question) => {
  await client.del(region);
  await client.set(region, JSON.stringify(question));
};

exports.getRegionQuestion = async (region) => {
  const response = await client.get(region);
  if (response) {
    return JSON.parse(response);
  }
  return null;
};

exports.setRegionCycleQuestion = async (region) => {
  const previousCycleQuestions = await Cycle.findAll({
    where: {
      region,
    },
    includes: [
      {
        model: Question,
        as: "question",
        attributes: ["id"],
      },
    ],
  });
  const previouseQuestionIds = previousCycleQuestions.map(
    (item) => item.question.id
  );
  const questionSets = await Question.findAll({
    where: {
      region,
      id: {
        [Op.notIn]: previouseQuestionIds,
      },
    },
    order: [["id", "ASC"]],
  });
  const question = questionSets[0]; // select the first question
  // Get the current date
  const startDate = new Date();

  // Add 7 days to the current date
  const endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000);

  // Create the cycle for the region
  await Cycle.create({
    region,
    questionId: question.id,
    startDate,
    endDate,
  });

  await this.cacheRegionQuestion(region, question);
  return question;
};
