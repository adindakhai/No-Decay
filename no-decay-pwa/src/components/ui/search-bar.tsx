export default function SearchBar() {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search food"
        className="w-full pl-4 pr-10 py-2.5 rounded-md border border-[#115437] bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#115437] shadow-xl"
      />
      <button className="absolute right-3 top-1/2 -translate-y-1/2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 text-gray-500"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </button>
    </div>
  )
}
