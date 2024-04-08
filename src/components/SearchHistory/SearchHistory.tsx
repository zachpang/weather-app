import { SearchHistoryItem } from "./useSearchHistory";

interface SearchHistoryProps {
  items: SearchHistoryItem[];
}

function SearchHistory({ items }: SearchHistoryProps) {
  return (
    <div className="bg-white-alpha-50 flex-auto rounded-xl border-0 p-4">
      <h2 className="text-primary font-semibold">Search History</h2>
      {items}
    </div>
  );
}

export default SearchHistory;
