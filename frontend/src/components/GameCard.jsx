import { motion } from "framer-motion";
import PriceItem from "./PriceItem";

export default function GameCard({ game }) {
  const bestPrice = Math.min(...game.prices.map(p => p.price));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/80 rounded-2xl overflow-hidden border border-gray-700 shadow-lg"
    >
      <img
        src={game.image}
        alt={game.title}
        className="w-full h-40 object-cover"
      />

      <div className="p-5">
        <h2 className="text-xl font-semibold mb-4">{game.title}</h2>

        <div className="flex flex-col gap-3">
          {game.prices.map((p, i) => (
            <PriceItem
            key={i}
            store={p.store}
            price={p.price}
            originalPrice={p.originalPrice}
            currency={p.currency}
            isBest={p.isBest}
            url={p.url}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}