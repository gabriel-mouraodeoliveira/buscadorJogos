import axios from "axios";

let cachedRate = null;
let lastFetch = null;

const ONE_HOUR = 1000 * 60 * 60;

export async function usdToBrl(value) {
  try {
    const now = Date.now();

    // ⚡ cache da cotação
    if (
      cachedRate &&
      lastFetch &&
      now - lastFetch < ONE_HOUR
    ) {
      return value * cachedRate;
    }

    // 💱 buscar cotação USD → BRL
    const res = await axios.get(
      "https://api.exchangerate-api.com/v4/latest/USD"
    );

    cachedRate = res.data.rates.BRL;
    lastFetch = now;

    return value * cachedRate;
  } catch (err) {
    console.error("Erro conversão:", err.message);

    // fallback
    return value * 5;
  }
}