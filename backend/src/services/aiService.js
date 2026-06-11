import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

console.log("KEY:", process.env.GEMINI_API_KEY);

console.log(
  "GEMINI KEY:",
  process.env.GEMINI_API_KEY?.slice(0, 10)
);

console.log("GEMINI KEY =", process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-3.1-flash-lite",
});

export async function getSimilarGames(gameName) {
  try {
    const prompt = `
    List 5 games similar to "${gameName}".

    Return only the game names separated by commas.
    `;

    const result =
      await model.generateContent(prompt);

    const text = result.response.text();

    return text
      .split(",")
      .map(game => game.trim());

  } catch (err) {
    console.error("Gemini Error:", err);

    return [];
  }
}