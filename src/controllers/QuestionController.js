const QuestionService = require("../services/QuestionService");

exports.listQuestions = async (req, res) => {
  const region = req.params.region;
  // find the cached cycle question
  const question = await QuestionService.getRegionQuestion(region);
  if (question) {
    return res.send({
      success: true,
      data: question,
    });
  }

  const currentDay = new Date();

  // get the current cycle question
  let currentCycleQuestion = await QuestionService.findCurrenCycleQuestion(region,currentDay);

  if (currentCycleQuestion) {
    // cache the question
    await this.cacheRegionQuestion(region, currentCycleQuestion);
  }else{
    // Assign cycle question
    currentCycleQuestion = await QuestionService.setRegionCycleQuestion(region);
  }

  return res.send({
    success: true,
    data: currentCycleQuestion,
  });
};
