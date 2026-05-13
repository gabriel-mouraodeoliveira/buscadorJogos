import { useState } from "react";

import SearchBar from "../components/SearchBar";
import GameCard from "../components/GameCard";
import SkeletonCard from "../components/SkeletonCard";

import { searchGame } from "../services/api";

export default function Home() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (name) => {
    try {
      setLoading(true);

      const data = await searchGame(name);

      // 🔒 garantir array
      setGames(Array.isArray(data) ? data : []);

    } catch (err) {
      console.error(err);

      // 🔒 fallback seguro
      setGames([]);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-3xl mx-auto px-4 py-10 flex flex-col gap-8">

        {/* 🎮 Título */}
        <h1 className="text-4xl font-bold text-center">
          Cheap Games Search
        </h1>

        {/* 🔍 Busca */}
        <SearchBar onSearch={handleSearch} />

        {/* ⏳ Loading */}
        {loading ? (
          <div className="flex flex-col gap-4">
            {[...Array(3)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>

        ) : (
          <div className="flex flex-col gap-5">

            {/* 🔒 proteção contra erro */}
            {Array.isArray(games) &&
              games.map((game, i) => (
                <GameCard
                  key={i}
                  game={game}
                />
              ))}

          </div>
        )}

      </div>
    </div>
  );
}