export default function Filters({ query, setQuery, filter, setFilter }: any) {
  return (
    <div className="flex items-center gap-2 ">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="input rounded-xl"
      />

      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="p-2 border rounded-2xl 
                  
                   focus:ring-2 focus:ring-blue-500 outline-none transition"
      >
        <option value="all">All</option>
        <option value="active">Uncompleted</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
}
