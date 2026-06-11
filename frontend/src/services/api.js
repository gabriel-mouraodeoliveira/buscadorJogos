export async function searchGame(name) {
  const res = await fetch(
    `http://localhost:3000/games?name=${name}`
  );

  return res.json();
}

export async function getRecommendations(game) {
  const res = await fetch(
    `http://localhost:3000/ai/recommendations?game=${encodeURIComponent(game)}`
  );

  return res.json();
}

export async function getDealAdvice(game) {
  const res = await fetch(
    `http://localhost:3000/ai/deal-advice?game=${encodeURIComponent(game)}`
  );

  return res.json();
}