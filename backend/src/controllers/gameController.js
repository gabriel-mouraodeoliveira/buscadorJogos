import { getSteamGame } from "../services/steamService.js";
import { getCheapSharkDeals } from "../services/cheapsharkService.js";
import { findBestDeals } from "../utils/matchGames.js";
import cache from "../utils/cache.js";

export async function getGames(req, res) {
  const { name } = req.query;

  // ⚡ chave do cache
  const cacheKey = name.toLowerCase();

  // 🔍 verificar cache
  const cached = cache.get(cacheKey);

  if (cached) {
    console.log("⚡ CACHE HIT");

    return res.json(cached);
  }

  try {
    // 🔄 buscar APIs em paralelo
    const [steamGames, deals] = await Promise.all([
      getSteamGame(name),
      getCheapSharkDeals(name),
    ]);

    const results = [];

    for (const game of steamGames) {
      // 🧠 fuzzy matching inteligente
      const relatedDeals = findBestDeals(
        game.title,
        deals
      );

      // 🏪 mapa por loja
      const priceMap = {};

      // 🟢 adicionar Steam oficial primeiro
      for (const p of game.prices) {
        priceMap[p.store] = p;
      }

      // 🔵 adicionar deals externos
      for (const d of relatedDeals) {
        const existing = priceMap[d.store];

        // ⚠️ nunca sobrescrever Steam oficial
        if (
          !existing ||
          (
            existing.store !== "Steam" &&
            d.price < existing.price
          )
        ) {
          priceMap[d.store] = {
            store: d.store,

            // 💰 preços
            price: d.price,
            originalPrice: d.originalPrice,

            // 💱 moeda
            currency: d.currency,

            // 🔗 link compra
            url: d.url,
          };
        }
      }

      // 🔄 transformar em array
      let prices = Object.values(priceMap);

      // 🔍 encontrar menor preço
      const validPrices = prices.filter(
        p => typeof p.price === "number"
      );

      const minPrice =
        validPrices.length > 0
          ? Math.min(
              ...validPrices.map(p => p.price)
            )
          : null;

      // ⭐ marcar melhor preço
      prices = prices.map(p => ({
        ...p,
        isBest: p.price === minPrice,
      }));

      // 📊 ordenar do menor → maior
      prices.sort((a, b) => a.price - b.price);

      results.push({
        title: game.title,
        image: game.image,
        prices,
      });
    }

    // ⚡ salvar cache
    cache.set(cacheKey, results);

    res.json(results);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Erro ao buscar jogos",
    });
  }
}