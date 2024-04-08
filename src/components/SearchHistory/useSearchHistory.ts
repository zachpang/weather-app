import { Coordinate, Weather } from "../../api";

export interface SearchHistoryItem {
  id: number;
  coordinate: Coordinate;
  weather: Weather;
}

function useSearchHistory(
  items: SearchHistoryItem[],
  setItems: React.Dispatch<React.SetStateAction<SearchHistoryItem[]>>,
) {
  return { items };
}

export default useSearchHistory;
