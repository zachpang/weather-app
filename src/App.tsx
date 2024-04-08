import SearchBar, { useSearchBar } from "./components/SearchBar";
import WeatherView from "./components/WeatherView";

function App() {
  const {
    value,
    handleChange,
    handleSubmit,
    error,
    isFetching,
    coordinateData,
    weatherData,
  } = useSearchBar();

  return (
    <>
      <div className="h-screen w-screen bg-gradient-to-tr from-[#4CA1AF] to-[#C4E0E5] to-60%">
        <div className="container mx-auto flex h-full flex-col gap-y-16 py-8">
          <header className="flex-none">
            <SearchBar
              value={value}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
          </header>
          <main className="flex-1">
            <WeatherView
              weatherData={weatherData}
              coordinateData={coordinateData}
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
