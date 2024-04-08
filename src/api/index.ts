/*
  Geocoding API assumes input is a city, unless a country code is also included.

      {
          "name": "Singapore",
          "local_names": {
              "sk": "Singapur",
              "ro": "Singapore",
              "yo": "Singapore",
              ...
          },
          "lat": 1.2899175,
          "lon": 103.8519072,
          "country": "SG"
      }

      {
        "name": "New York County",
        "local_names": {
            "ja": "ニューヨーク",
            "ca": "Nova York",
            "fa": "نیویورک",
            ...
        },
        "lat": 40.7127281,
        "lon": -74.0060152,
        "country": "US",
        "state": "New York"
    },
*/

export interface CoordinateData {
  name: string;
  local_names: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

// TODO: handle country code
export async function fetchCoordinatesForCity(city: string, limit: number) {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

  let response = null;
  try {
    response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${String(limit)}&appid=${apiKey}`,
    );
  } catch (error) {
    // bad request headers or network error.
    throw new Error(
      "Looks like you've lost your internet connection. Try again when you're back online.",
    );
  }

  if (!response?.ok) {
    // Not 2xx. server error
    throw new Error(
      "We're experiencing some technical difficulties. Please try again in a few moments.",
    );
  }

  return (await response.json()) as CoordinateData[];
}
