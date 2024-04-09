import { useState } from "react";

// TODO: decouple responsibilities in hook: SearchBar state, query state
function useSearchBar(performSearch: (city: string) => Promise<void>) {
  const [value, setValue] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await performSearch(value);
  };

  return {
    value,
    handleChange,
    handleSubmit,
  };
}

export default useSearchBar;
