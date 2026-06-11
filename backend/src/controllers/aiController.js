import { getSimilarGames } from "../services/aiService.js";
import { getDealAdvice } from "../services/dealAdvisorService.js";
import {
  getCheapSharkDeals,
  getHistoricalLowPrice,
} from "../services/cheapsharkService.js";

/**
 * GET /ai/recommendations?game=Elden Ring
 */
export async function getRecommendations(req, res) {
  try {
    const { game } = req.query;

    if (!game) {
      return res.status(400).json({
        error: "Game name is required",
      });
    }

    const recommendations =
      await getSimilarGames(game);

    res.json(recommendations);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to get recommendations",
    });
  }
}

/**
 * GET /ai/deal-advice?game=Elden Ring
 */
export async function getAdvice(req, res) {
  try {
    const { game } = req.query;

    if (!game) {
      return res.status(400).json({
        error: "Game name is required",
      });
    }

    // TEMPORÁRIO
    // Depois vamos substituir por dados reais da CheapShark

    const historicalLow =
    await getHistoricalLowPrice(game);

    const deals =
    await getCheapSharkDeals(game);

    console.log(
        "DEALS:",
        JSON.stringify(deals, null, 2)
    );

    const exactDeals = deals.filter(
    deal =>
        deal.title.toLowerCase().trim() ===
        game.toLowerCase().trim()
    );

    const currentPrice =
    exactDeals.length > 0
        ? Math.min(
            ...exactDeals.map(
            deal => deal.price
            )
        )
        : null;

    if (!currentPrice || !historicalLow) {
        return res.status(404).json({
        error:
            "Price information not found",
    });
}

        console.log({
        game,
        currentPrice,
        historicalLow,
        });

    const advice =
      await getDealAdvice({
        game,
        currentPrice,
        historicalLow,
      });

    res.json(advice);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to generate advice",
    });
  }
}