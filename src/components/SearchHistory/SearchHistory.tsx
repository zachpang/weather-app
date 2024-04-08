import { SearchHistoryItem } from "./useSearchHistory";

interface SearchHistoryProps {
  items: SearchHistoryItem[];
}

function SearchHistory({ items }: SearchHistoryProps) {
  return (
    <div className="bg-white-alpha-50 flex-auto rounded-xl border-0 p-4">
      <h2 className="text-primary font-semibold">Search History</h2>
      {items.map((item) => (
        <Item
          key={item.id}
          city={item.coordinate.city}
          countryCode={item.coordinate.countryCode}
          dateTime={item.weather.dateTime}
        />
      ))}
    </div>
  );
}

interface ItemProps {
  city: SearchHistoryItem["coordinate"]["city"];
  countryCode: SearchHistoryItem["coordinate"]["countryCode"];
  dateTime: SearchHistoryItem["weather"]["dateTime"];
}

function Item({ city, countryCode, dateTime }: ItemProps) {
  return (
    <div className="bg-white-alpha-50 text-primary flex justify-between rounded-xl border-0 p-4">
      <span>
        {city}, {countryCode}
      </span>
      <span>{dateTime}</span>
    </div>
  );
}

export default SearchHistory;
