interface SearchProps {
  value: string;
  onChange: (value: string) => void;
}

const Search = ({ value, onChange }: SearchProps) => {
  return (
    <div className="bg-white p-3 mb-4 border border-gray-300 rounded-lg">
      <label className="block text-sm text-gray-700 mb-1">Search by Name</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search characters..."
        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
      />
    </div>
  );
};
export default Search;
