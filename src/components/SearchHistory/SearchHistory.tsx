import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/solid";
import { Coordinate, Weather } from "../../api";

export interface SearchHistoryItem {
  id: number;
  coordinate: Coordinate;
  weather: Weather;
}

interface SearchHistoryProps {
  items: SearchHistoryItem[];
  onViewItem: (itemId: number) => void;
  onDeleteItem: (itemId: number) => void;
}

function SearchHistory({
  items,
  onViewItem,
  onDeleteItem,
}: SearchHistoryProps) {
  return (
    <div className="bg-white-alpha-50 flex-auto rounded-xl border-0 p-4">
      <h2 className="text-primary mb-4 font-semibold">Search History</h2>
      <div className="h-[44vh] overflow-y-auto">
        {items.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            city={item.coordinate.city}
            countryCode={item.coordinate.countryCode}
            dateTime={item.weather.dateTime}
            onViewItem={onViewItem}
            onDeleteItem={onDeleteItem}
          />
        ))}
      </div>
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
    <div className="bg-white-alpha-50 text-primary mb-4 flex justify-between rounded-xl border-0 p-3 leading-loose">
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
