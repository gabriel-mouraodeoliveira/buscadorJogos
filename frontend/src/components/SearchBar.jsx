import { useState, useEffect } from "react";

export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("history")) || [];

    setHistory(saved);
  }, []);

  const handleSearch = () => {
    if (!value.trim()) return;

    const newHistory = [
      value,
      ...history.filter(h => h !== value),
    ].slice(0, 5);

    setHistory(newHistory);

    localStorage.setItem(
      "history",
      JSON.stringify(newHistory)
    );

    onSearch(value);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-3 bg-gray-800 p-2 rounded-xl border border-gray-700">
        <input
          className="flex-1 bg-transparent p-3 text-white placeholder-gray-400 focus:outline-none"
          placeholder="Buscar jogo..."
          value={value}
          onChange={(e) => setValue(e.target.value)}

          // ⌨️ ENTER PARA BUSCAR
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />

        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-500 transition px-6 rounded-lg text-white font-medium"
        >
          Buscar
        </button>
      </div>

      {/* 🕘 Histórico */}
      <div className="flex gap-2 flex-wrap">
        {history.map((item, i) => (
          <button
            key={i}
            onClick={() => onSearch(item)}
            className="text-sm bg-gray-700 px-3 py-1 rounded hover:bg-gray-600 transition"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}