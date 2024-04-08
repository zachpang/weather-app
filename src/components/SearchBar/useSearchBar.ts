import { useState } from "react";
import {
  CoordinateData,
  WeatherData,
  fetchCoordinatesForCity,
  fetchCurrentWeatherForCoordinates,
} from "../../api";

// TODO: decouple responsibilities in hook: SearchBar state, query state, data store
function useSearchBar() {
  const [value, setValue] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [coordinateData, setCoordinateData] = useState<CoordinateData | null>(
    null,
  );
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsFetching(true);

    try {
      const coordinates = await fetchCoordinatesForCity(value, 1);

      if (coordinates.length === 0) {
        throw new Error(
          `Hmm, we couldn't find anything for '${value}'. Try a different city or country.`,
        );
      }

      setCoordinateData(coordinates[0]);
      const { lat, lon } = coordinates[0];

      const weatherData = await fetchCurrentWeatherForCoordinates(lat, lon);
      setWeatherData(weatherData);
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
    coordinateData,
    weatherData,
  };
}

export default useSearchBar;
