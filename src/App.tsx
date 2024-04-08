import SearchBar, { useSearchBar } from "./components/SearchBar";

function App() {
  const { value, handleChange, handleSubmit, error } = useSearchBar();

  return (
    <>
      <div className="h-screen w-screen bg-gradient-to-tr from-[#4CA1AF] to-[#C4E0E5] to-60%">
        <main className="container mx-auto pt-8">
          <SearchBar
            value={value}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </main>
      </div>
    </>
  );
}

export default App;
