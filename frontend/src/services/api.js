export async function searchGame(name) {
  const res = await fetch(`http://localhost:3000/games?name=${name}`);
  return res.json();
}