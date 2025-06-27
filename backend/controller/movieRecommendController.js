require("dotenv").config();
const { OpenAI } = require("openai");

const getOptions = async () => ({
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.TMBD_API_KEY}`,
  },
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const getRecommend = async (req, res) => {
  const { singleMovie, previous } = req.body;
  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: [
        {
          role: "user",
          content: `First understand what kind of movie ${singleMovie} is. Then, recommend a movie similar to "${singleMovie}". Only provide the movie title. Do not recommend any of the following movies that have already been suggested: ${previous}. Choose a movie that is also in the same genre as "${singleMovie}". For example if the movie is about a superhero, recommend another superhero movie. or if the movie is about a romantic relationship, recommend another romantic movie. Also please only include the name of the movie do not include anything else and only recommend movies do not recommend tv shows.`,
        },
      ],
      temperature: 0.7,
    });
    res.json({
      Movie: chatCompletion.choices[0].message.content,
      sucess: true,
    });
  } catch (err) {
    console.error("Error:", err);
    res.json({
      error: "An error occurred while processing your request.",
      sucess: false,
    });
  }
};

module.exports = {
  getRecommend,
};
