import { Dispatch, SetStateAction, useState } from "react";
import {
  Coordinate,
  Weather,
  fetchCoordinatesForCity,
  fetchCurrentWeatherForCoordinates,
} from "../../api";
import { SearchHistoryItem } from "../SearchHistory/useSearchHistory";

// TODO: decouple responsibilities in hook: SearchBar state, query state, data store
function useSearchBar(
  items: SearchHistoryItem[],
  setItems: Dispatch<SetStateAction<SearchHistoryItem[]>>,
  setCoordinate: Dispatch<React.SetStateAction<Coordinate | null>>,
  setWeather: Dispatch<React.SetStateAction<Weather | null>>,
) {
  const [value, setValue] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const resetStates = () => {
    setErrorMessage("");
    setCoordinate(null);
    setWeather(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    resetStates();
    setIsFetching(true);

    try {
      const coordinates = await fetchCoordinatesForCity(value, 1);

      if (coordinates.length === 0) {
        throw new Error(
          `Hmm, we couldn't find anything for '${value}'. Try a different city or country.`,
        );
      }

      setCoordinate(coordinates[0]);
      const { lat, lon } = coordinates[0];

      const weather = await fetchCurrentWeatherForCoordinates(lat, lon);
      setWeather(weather);

      // write to localStorage
      const item: SearchHistoryItem = {
        id: items.length,
        coordinate: coordinates[0],
        weather,
      };
      setItems([item, ...items]); // latest item on top
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
