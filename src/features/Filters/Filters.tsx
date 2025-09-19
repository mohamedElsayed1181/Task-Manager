export default function Filters({ query, setQuery, filter, setFilter }: any) {
  return (
    <div className="flex items-center gap-2 ">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="p-2 border rounded-2xl
                   bg-white text-gray-900 
                   dark:bg-gray-800 dark:text-gray-100
                   focus:ring-2 focus:ring-blue-500 outline-none transition"
      />

      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="p-2 border rounded-2xl 
                   bg-white text-gray-900 
                   dark:bg-gray-800 dark:text-gray-100
                   focus:ring-2 focus:ring-blue-500 outline-none transition"
      >
        <option value="all">All</option>
        <option value="active">Uncompleted</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
}
