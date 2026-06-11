import { useState } from "react";

import SearchBar from "../components/SearchBar";
import GameCard from "../components/GameCard";
import SkeletonCard from "../components/SkeletonCard";
import Footer from "../components/Footer";

import { searchGame, getRecommendations, getDealAdvice, } from "../services/api";

export default function Home() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [dealAdvice, setDealAdvice] = useState(null);

  const handleSearch = async (name) => {
    try {
      setLoading(true);

        const [
          gamesData,
          aiData,
          adviceData,
        ] = await Promise.all([
          searchGame(name),
          getRecommendations(name),
          getDealAdvice(name),
        ]);

      // 🎮 jogos encontrados
      setGames(
        Array.isArray(gamesData)
          ? gamesData
          : []
      );

      // 🤖 recomendações IA
      setRecommendations(
        Array.isArray(aiData)
          ? aiData
          : []
      );

      setDealAdvice(adviceData);

    } catch (err) {
      console.error(err);

      // 🔒 fallback seguro
      setGames([]);
      setRecommendations([]);

    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen salesdeal-bg text-white">
    <div className="max-w-3xl mx-auto px-4 py-6 flex flex-col gap-6">

        {/* 🎮 Título */}
        <div className="flex justify-center">
          <img
            src="/logo2.png"
            alt="Sales Deal"
            className="
              w-[550px]
              md:w-[650px]
              max-w-full
              object-contain
            "
          />
        </div>

        {/* 🔍 Busca */}
        <SearchBar onSearch={handleSearch} />
                {recommendations.length > 0 && (
          <div className="
            bg-gray-800
            border
            border-gray-700
            rounded-xl
            p-5
            mt-4
          ">
            <h2 className="text-xl font-bold mb-3">
              Similar Games
            </h2>

            <div className="flex flex-wrap gap-2">
              {recommendations.map((game, i) => (
                <button
                    key={i}
                    onClick={() => handleSearch(game)}
                    className="
                      bg-purple-600
                      hover:bg-purple-500
                      transition
                      px-3
                      py-1
                      rounded-full
                      text-sm
                      cursor-pointer
                    "
                  >
                    {game}
                  </button>
              ))}
            </div>
            {dealAdvice && (
            <div
              className="
                bg-gray-800
                border
                border-gray-700
                rounded-xl
                p-5
                mt-4
              "
            >
              <h2 className="text-xl font-bold mb-3">
                🤖 Deal Advisor
              </h2>

              <div className="flex flex-col gap-2">

                <span
                  className={`
                    font-bold
                    ${
                      dealAdvice.status ===
                      "BUY_NOW"
                        ? "text-green-400"
                        : dealAdvice.status ===
                          "FAIR_PRICE"
                        ? "text-yellow-400"
                        : "text-red-400"
                    }
                  `}
                >
                  {dealAdvice.status.replaceAll("_", " ")}
                </span>

                <p className="text-gray-300">
                  {dealAdvice.message}
                </p>

              </div>
            </div>
          )}
          </div>
        )}

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
        <Footer />   
    </div>
  );
}