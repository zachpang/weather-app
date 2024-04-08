import SearchBar, { useSearchBar } from "./components/SearchBar";
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
          <main className="flex-1">
            <WeatherView
              weather={weather}
              coordinate={coordinate}
              error={error}
              isFetching={isFetching}
            />
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
