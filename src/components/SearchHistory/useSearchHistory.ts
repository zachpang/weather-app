import { Dispatch, SetStateAction, useCallback } from "react";
import { SearchHistoryItem } from "./SearchHistory";

function useSearchHistory(
  items: SearchHistoryItem[],
  setItems: Dispatch<SetStateAction<SearchHistoryItem[]>>,
  performSearch: (city: string) => Promise<void>,
) {
  const handleViewItem = useCallback(
    async (itemId: number) => {
      const item = items.find((item) => item.id === itemId);

      if (!item) {
        return;
      }

      // TODO: performSearch needs to be able to handle city, countryCode
      await performSearch(item.coordinate.city);
    },
    [items, performSearch],
  );

  const handleDeleteItem = useCallback(
    (itemId: number) => {
      setItems(items.filter((item) => item.id !== itemId));
    },
    [items, setItems],
  );

  return { handleViewItem, handleDeleteItem };
}

export default useSearchHistory;
