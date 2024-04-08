const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

/*
  Geocoding API assumes input is a city, unless a country code is also included.

      {
          "name": "Singapore",
          "lat": 1.2899175,
          "lon": 103.8519072,
          "country": "SG"
      }

      {
        "name": "New York County",
        "lat": 40.7127281,
        "lon": -74.0060152,
        "country": "US",
        "state": "New York"
    },
*/

export interface CoordinateData {
  name: string;
  lat: number;
  lon: number;
  country: string;
}

// TODO: handle country code
export async function fetchCoordinatesForCity(city: string, limit: number) {
  return await fetchHandler<CoordinateData[]>(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${String(limit)}&appid=${API_KEY}`,
  );
}

/* 
  Current Weather API

  {
    "name" : "Singapore",
    "coord": {
        "lon": 103.8501,
        "lat": 1.2897
    },
    "weather": [
        {
            "id": 803,
            "main": "Clouds",
            "description": "broken clouds",
            "icon": "04d"
        }
    ],
    "main": {
        "temp": 306.18,
        "feels_like": 311.03,
        "temp_min": 305.88,
        "temp_max": 307.61,
        "pressure": 1010,
        "humidity": 55
    },
    "dt": 1712549436,
  }
*/

export interface WeatherData {
  name: string;
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    },
  ];
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  dt: number;
}

export async function fetchCurrentWeatherForCoordinates(
  lat: number,
  lon: number,
) {
  return await fetchHandler<WeatherData>(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`,
  );
}

async function fetchHandler<TData>(url: string) {
  let response = null;

  try {
    response = await fetch(url);
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

  return (await response.json()) as TData;
}
