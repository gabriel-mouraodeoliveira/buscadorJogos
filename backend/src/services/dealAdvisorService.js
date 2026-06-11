import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-3.1-flash-lite",
});

export async function getDealAdvice({
  game,
  currentPrice,
  historicalLow,
}) {
  try {
    const prompt = `
You are a video game price advisor.

Game: ${game}

Current Price: ${currentPrice}
Historical Lowest Price: ${historicalLow}

Analyze whether the user should buy now or wait.

Return ONLY a valid JSON object.

Do not use markdown.
Do not use code blocks.
Do not use triple backticks.

Example:

{
  "status": "WAIT_FOR_SALE",
  "message": "Current price is significantly above the historical low."
}

Possible status values:
BUY_NOW
FAIR_PRICE
WAIT_FOR_SALE
`;

    const result =
      await model.generateContent(prompt);

    const text = result.response.text();

    return JSON.parse(text);

  } catch (err) {
    console.error(err);

    return {
      status: "UNKNOWN",
      message:
        "Unable to generate recommendation."
    };
  }
}