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
  .filter(r => {
    const game =
      gameTitle.toLowerCase().trim();

    const title =
      r.item.title.toLowerCase().trim();

    return (
      r.score <= 0.3 &&
      title === game
    );
  })
  .map(r => r.item);
}