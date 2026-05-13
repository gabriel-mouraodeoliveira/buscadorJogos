import Fuse from "fuse.js";

export function findBestDeals(gameTitle, deals) {
  const fuse = new Fuse(deals, {
    keys: ["title"],
    threshold: 0.3, // menor = mais preciso
    includeScore: true,
  });

  const results = fuse.search(gameTitle);

  // pegar apenas matches relevantes
  return results
    .filter(r => r.score <= 0.3)
    .map(r => r.item);
}