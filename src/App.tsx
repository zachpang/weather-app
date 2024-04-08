import SearchBar, { useSearchBar } from "./components/SearchBar";
import SearchHistory, { useSearchHistory } from "./components/SearchHistory";
import WeatherView from "./components/WeatherView";

function App() {
  const {
    value,
    handleChange,
    handleSubmit,
    error,
    isFetching,
    coordinate,
    weather,
  } = useSearchBar();

  const { items } = useSearchHistory();

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
