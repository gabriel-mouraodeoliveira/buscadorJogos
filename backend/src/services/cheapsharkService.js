import axios from "axios";
import { usdToBrl } from "../utils/currency.js";

let storeMap = {};

// 🇧🇷 lojas relevantes
const allowedStores = [
  "Steam",
  "Epic Games Store",
  "GOG",
  "Humble Store",
];

// 🔄 carregar lojas uma única vez
async function loadStores() {
  const res = await axios.get(
    "https://www.cheapshark.com/api/1.0/stores"
  );

  storeMap = {};

  res.data.forEach(store => {
    storeMap[store.storeID] = store.storeName;
  });
}

export async function getCheapSharkDeals(name) {
  try {
    // 🔄 carregar lojas apenas uma vez
    if (Object.keys(storeMap).length === 0) {
      await loadStores();
    }

    // 🔍 buscar deals
    const res = await axios.get(
      "https://www.cheapshark.com/api/1.0/deals",
      {
        params: {
          title: name,
          limit: 10,
        },
      }
    );

    // 💱 converter USD → BRL
    const convertedGames = await Promise.all(
      res.data.map(async game => {
        const salePriceUsd = parseFloat(
          game.salePrice
        );

        const normalPriceUsd = parseFloat(
          game.normalPrice
        );

        // 💸 converter moeda
        const price = await usdToBrl(
          salePriceUsd
        );

        const originalPrice = await usdToBrl(
          normalPriceUsd
        );

        return {
          title: game.title,
          image: game.thumb,

          // 🏪 nome da loja
          store: storeMap[game.storeID],

          // 💰 preços em BRL
          price,
          originalPrice,

          // 🇧🇷 moeda
          currency: "BRL",

          // 🔗 link de compra
          url: `https://www.cheapshark.com/redirect?dealID=${game.dealID}`,
        };
      })
    );

    // 🇧🇷 filtrar lojas relevantes
    return convertedGames.filter(game =>
      allowedStores.includes(game.store)
    );

  } catch (err) {
    console.error(
      "Erro CheapShark:",
      err.message
    );

    return [];
  }
}