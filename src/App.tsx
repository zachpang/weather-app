import { useState } from "react";
import SearchBar, { useSearchBar } from "./components/SearchBar";
import SearchHistory, { useSearchHistory } from "./components/SearchHistory";
import { SearchHistoryItem } from "./components/SearchHistory/useSearchHistory";
import WeatherView from "./components/WeatherView";
import useLocalStorage from "./hooks/useLocalStorage";
import { Coordinate, Weather } from "./api";

function App() {
  const [items, setItems] = useLocalStorage<SearchHistoryItem[]>(
    "searchHistoryItems",
    [],
  );

  // Data objects used in WeatherView
  const [coordinate, setCoordinate] = useState<Coordinate | null>(() => {
    return items.length ? items[0].coordinate : null;
  });
  const [weather, setWeather] = useState<Weather | null>(() => {
    return items.length ? items[0].weather : null;
  });

  const { value, handleChange, handleSubmit, error, isFetching } = useSearchBar(
    items,
    setItems,
    setCoordinate,
    setWeather,
  );

  // const { items } = useSearchHistory(items, setItems);

  return (
    <>
      <div className="h-screen w-screen bg-gradient-to-tr from-[#4CA1AF] to-[#C4E0E5] to-60%">
        <div className="container mx-auto flex h-full flex-col gap-y-32 py-8 lg:max-w-screen-lg">
          <header className="flex-none">
            <SearchBar
              value={value}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
          </header>
          <main className="bg-white-alpha-50 flex-1 rounded-xl border-0 p-8">
            <div className="flex h-full flex-col gap-y-4">
              <WeatherView
                weather={weather}
                coordinate={coordinate}
                error={error}
                isFetching={isFetching}
              />
              <SearchHistory items={items} />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
