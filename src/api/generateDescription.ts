import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_SK,
});
const openai = new OpenAIApi(configuration);

/**
 * Generate a planet description with Open AI
 * @params {string} - planet name
 * @returns {string} - AI generated short planet description
 */
export const generateDescription = async (planet: string): Promise<string | undefined> => {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Give me a short description of planet ${planet} in less than 10 characters.`,
  });

  return completion.data.choices[0].text;
};