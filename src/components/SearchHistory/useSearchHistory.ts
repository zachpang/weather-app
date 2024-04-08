import { Coordinate, Weather } from "../../api";
import useLocalStorage from "../../hooks/useLocalStorage";

export interface SearchHistoryItem {
  id: number;
  coordinate: Coordinate;
  weather: Weather;
}

export const SEARCH_HISTORY_ITEMS_KEY = "searchHistoryItems";

function useSearchHistory() {
  const [items, setItems] = useLocalStorage<SearchHistoryItem[]>(
    SEARCH_HISTORY_ITEMS_KEY,
    [],
  );

  return { items };
}

export default useSearchHistory;
