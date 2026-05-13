export default function SkeletonCard() {
  return (
    <div className="animate-pulse bg-gray-800 rounded-2xl p-5 border border-gray-700">
      <div className="h-40 bg-gray-700 rounded mb-4"></div>
      <div className="h-4 bg-gray-700 rounded w-2/3 mb-3"></div>
      <div className="h-4 bg-gray-700 rounded w-1/2"></div>
    </div>
  );
}