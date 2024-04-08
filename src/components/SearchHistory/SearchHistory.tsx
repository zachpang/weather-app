import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/solid";
import { Coordinate, Weather } from "../../api";
import { Dispatch, SetStateAction, useCallback } from "react";

export interface SearchHistoryItem {
  id: number;
  coordinate: Coordinate;
  weather: Weather;
}

interface SearchHistoryProps {
  items: SearchHistoryItem[];
  setItems: Dispatch<SetStateAction<SearchHistoryItem[]>>;
  setCoordinate: Dispatch<SetStateAction<Coordinate | null>>;
  setWeather: Dispatch<SetStateAction<Weather | null>>;
}

function SearchHistory({
  items,
  setItems,
  setCoordinate,
  setWeather,
}: SearchHistoryProps) {
  const handleViewItem = useCallback(
    (itemId: number) => {
      const itemToView = items.find((item) => item.id === itemId);
      if (!itemToView) {
        return;
      }

      setCoordinate(itemToView?.coordinate);
      setWeather(itemToView?.weather);
    },
    [items, setCoordinate, setWeather],
  );

  const handleDeleteItem = useCallback(
    (itemId: number) => {
      setItems(items.filter((item) => item.id !== itemId));
    },
    [items, setItems],
  );

  return (
    <div className="bg-white-alpha-50 flex-auto rounded-xl border-0 p-4">
      <h2 className="text-primary font-semibold">Search History</h2>
      {items.map((item) => (
        <Item
          key={item.id}
          id={item.id}
          city={item.coordinate.city}
          countryCode={item.coordinate.countryCode}
          dateTime={item.weather.dateTime}
          onViewItem={handleViewItem}
          onDeleteItem={handleDeleteItem}
        />
      ))}
    </div>
  );
}

interface ItemProps {
  id: number;
  city: SearchHistoryItem["coordinate"]["city"];
  countryCode: SearchHistoryItem["coordinate"]["countryCode"];
  dateTime: SearchHistoryItem["weather"]["dateTime"];
  onViewItem: (itemId: number) => void;
  onDeleteItem: (itemId: number) => void;
}

function Item({
  id,
  city,
  countryCode,
  dateTime,
  onViewItem,
  onDeleteItem,
}: ItemProps) {
  return (
    <div className="bg-white-alpha-50 text-primary my-4 flex justify-between rounded-xl border-0 p-3 leading-loose">
      <span className="font-medium ">
        {city}, {countryCode}
      </span>

      <div className="flex gap-x-2.5">
        <div>{dateTime}</div>
        <button
          onClick={() => onViewItem(id)}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md transition-transform hover:scale-110 active:scale-95"
        >
          <MagnifyingGlassIcon className="h-4 w-4" />
        </button>
        <button
          onClick={() => onDeleteItem(id)}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md transition-transform hover:scale-110 active:scale-95"
        >
          <TrashIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default SearchHistory;
