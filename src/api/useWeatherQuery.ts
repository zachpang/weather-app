import { Dispatch, SetStateAction, useState } from "react";
import {
  Coordinate,
  Weather,
  fetchCoordinatesForCity,
  fetchCurrentWeatherForCoordinates,
} from "../api";
import { SearchHistoryItem } from "../components/SearchHistory/SearchHistory";

// TODO: decouple responsibilities in hook: SearchBar state, query state
function useWeatherQuery(
  items: SearchHistoryItem[],
  setItems: Dispatch<SetStateAction<SearchHistoryItem[]>>,
  setCoordinate: Dispatch<SetStateAction<Coordinate | null>>,
  setWeather: Dispatch<SetStateAction<Weather | null>>,
) {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const resetStates = () => {
    setErrorMessage("");
    setCoordinate(null);
    setWeather(null);
  };

  const performSearch = async (city: string) => {
    resetStates();
    setIsFetching(true);

    try {
      const coordinates = await fetchCoordinatesForCity(city, 1);

      if (coordinates.length === 0) {
        throw new Error(
          `Hmm, we couldn't find anything for '${city}'. Try a different city or country.`,
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
    performSearch,
    error: errorMessage,
    isFetching,
  };
}

export default useWeatherQuery;
