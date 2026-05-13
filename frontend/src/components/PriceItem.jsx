export default function PriceItem({
  store,
  price,
  originalPrice,
  currency,
  isBest,
  url,
}) {
  // 🔒 valores seguros
  const safePrice =
    typeof price === "number"
      ? price
      : null;

  const safeOriginal =
    typeof originalPrice === "number"
      ? originalPrice
      : null;

  // 💸 desconto
  const discount =
    safeOriginal &&
    safePrice &&
    safeOriginal > safePrice
      ? Math.round(
          ((safeOriginal - safePrice) /
            safeOriginal) *
            100
        )
      : 0;

  // 💰 formatador BRL
  const formatPrice = value => {
    return `R$ ${value.toFixed(2)}`;
  };

  return (
    <div
      className={`flex justify-between items-center gap-4 p-4 rounded-xl border transition-all duration-300
      ${
        isBest
          ? "bg-green-500/20 border-green-400 text-green-300 scale-[1.02] shadow-lg shadow-green-500/10"
          : "bg-gray-900 border-gray-700 text-gray-300 hover:border-gray-500"
      }`}
    >
      {/* 🏪 Loja */}
      <div className="flex flex-col gap-1 min-w-[140px]">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold">
            {store}
          </span>

          {/* ⭐ Melhor preço */}
          {isBest && (
            <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full font-bold">
              Melhor preço
            </span>
          )}
        </div>

        {/* 💸 desconto */}
        {discount > 0 && (
          <span className="text-xs text-red-400 font-medium">
            {discount}% OFF
          </span>
        )}
      </div>

      {/* 💰 preços */}
      <div className="flex flex-col items-end">
        {/* preço original */}
        {safeOriginal &&
          safeOriginal > safePrice && (
            <span className="line-through text-sm text-gray-400">
              {formatPrice(safeOriginal)}
            </span>
          )}

        {/* preço final */}
        <span className="font-bold text-xl">
          {safePrice === 0
            ? "Grátis"
            : safePrice
            ? formatPrice(safePrice)
            : "Indisponível"}
        </span>
      </div>

      {/* 🔗 botão comprar */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-600 hover:bg-blue-500 transition-all duration-300 px-4 py-2 rounded-lg text-sm font-semibold text-white whitespace-nowrap"
      >
        Comprar
      </a>
    </div>
  );
}