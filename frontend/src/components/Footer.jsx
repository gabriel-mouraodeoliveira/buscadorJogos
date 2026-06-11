export default function Footer() {
  return (
    <footer className="
      mt-20
      border-t
      border-white/10
      py-8
      text-center
      text-sm
      text-gray-400
    ">
      <div className="flex flex-col gap-3">

        <h3 className="
          text-lg
          font-bold
          text-white
        ">
          Sales Deal
        </h3>

        <p>
          Search the best price for your game
        </p>

        <p className="text-gray-500">
          © {new Date().getFullYear()} Sales Deal.
          All rights reserved.
        </p>

      </div>
    </footer>
  );
}