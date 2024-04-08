import { useState } from "react";
import { CoordinateData, fetchCoordinates } from "../../api";

function useSearchBar() {
  const [value, setValue] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsFetching(true);

    let coordinateData: CoordinateData[] | null = null;
    try {
      coordinateData = await fetchCoordinates(value, 1);
      console.log(coordinateData);
    } catch (error) {
      setErrorMessage((error as Error).message);
    }

    setIsFetching(false);
  };

  return {
    value,
    handleChange,
    handleSubmit,
    error: errorMessage,
    isFetching,
  };
}

export default useSearchBar;
