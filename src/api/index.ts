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
  const coordinateDataArr = await fetchHandler<CoordinateData[]>(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${String(limit)}&appid=${API_KEY}`,
  );

  return coordinateDataArr.map(transformToCoordinate);
}

export interface Coordinate {
  city: string;
  lat: number;
  lon: number;
  countryCode: string;
}

function transformToCoordinate(coordinateData: CoordinateData): Coordinate {
  const { name, lat, lon, country } = coordinateData;
  return { city: name, lat, lon, countryCode: country };
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
  const weatherData = await fetchHandler<WeatherData>(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`,
  );

  return transformToWeather(weatherData);
}

export interface Weather {
  city: string;
  lat: number;
  lon: number;
  weatherId: number;
  weatherMain: string;
  weatherDescription: string;
  temp: string;
  tempMax: string;
  tempMin: string;
  pressure: string;
  humidity: string;
  dateTime: string;
}

function transformToWeather(weatherData: WeatherData): Weather {
  const {
    name,
    coord: { lat, lon },
    weather,
    main: { temp, temp_min, temp_max, humidity, pressure },
  } = weatherData;

  // Assume the first object is the most relevant, even though there can be multiple possible weather states at the current moment
  const { id, main, description } = weather[0];

  const date = new Date();
  const dateFormatter = new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return {
    city: name,
    lat,
    lon,
    weatherId: id,
    weatherMain: main,
    weatherDescription:
      description.slice(0, 1).toUpperCase() + description.slice(1),
    temp: String(Math.round(temp)) + "°",
    tempMax: String(Math.round(temp_max)) + "°",
    tempMin: String(Math.round(temp_min)) + "°",
    pressure: String(Math.round(pressure)),
    humidity: String(Math.round(humidity)) + "%",
    dateTime: dateFormatter.format(date),
  };
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
