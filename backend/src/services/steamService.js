import axios from "axios";

export async function getSteamGame(name) {
  try {
    // 🔍 buscar jogos na Steam
    const search = await axios.get(
      `https://store.steampowered.com/api/storesearch/?term=${name}&cc=br&l=pt`
    );

    const games = search.data.items.slice(0, 5);

    if (!games.length) return [];

    const results = [];

    // 🔄 buscar detalhes de cada jogo
    for (const game of games) {
      try {
        const details = await axios.get(
          `https://store.steampowered.com/api/appdetails?appids=${game.id}&cc=br&l=pt`
        );

        const data = details.data[game.id];

        if (!data.success) continue;

        const priceData = data.data.price_overview;

        const price =
          priceData && priceData.final > 0
            ? priceData.final / 100
            : 0;

        const originalPrice =
          priceData && priceData.initial > 0
            ? priceData.initial / 100
            : null;

        results.push({
          title: data.data.name,
          image: data.data.header_image,

          prices: [
            {
              store: "Steam",

              // 💰 preços BR
              price,
              originalPrice,

              // 🇧🇷 moeda
              currency: "BRL",

              // 🔗 link da loja
              url: `https://store.steampowered.com/app/${game.id}`,
            },
          ],
        });

      } catch (err) {
        console.log(
          "Erro em um jogo Steam:",
          err.message
        );

        continue;
      }
    }

    return results;

  } catch (err) {
    console.error(
      "Erro Steam:",
      err.message
    );

    return [];
  }
}