import {
  ArrowPathIcon,
  GlobeAsiaAustraliaIcon,
  HandRaisedIcon,
} from "@heroicons/react/24/outline";
import { Coordinate, Weather } from "../../api";
import WeatherIndicator from "./WeatherIndicator";

interface WeatherViewProps {
  coordinate: Coordinate | null;
  weather: Weather | null;
  error: string;
  isFetching: boolean;
}

function WeatherView({
  coordinate,
  weather,
  error,
  isFetching,
}: WeatherViewProps) {
  const hasNoData = coordinate === null || weather === null;

  return (
    <div className="text-secondary">
      {hasNoData && isFetching && (
        <Prompt
          title="Satellites are working... please wait."
          icon={<ArrowPathIcon className="stroke-[0.5px]" />}
        />
      )}
      {error && (
        <Prompt
          title={error}
          icon={<HandRaisedIcon className="stroke-[0.5px]" />}
        />
      )}
      {hasNoData && !isFetching && !error && (
        <Prompt
          title="To begin, search a city or country for the current weather."
          icon={<GlobeAsiaAustraliaIcon className="stroke-[0.5px]" />}
        />
      )}
      {!hasNoData && (
        <WeatherDetails coordinate={coordinate} weather={weather} />
      )}
    </div>
  );
}

function Prompt({ title, icon }: { title: string; icon: React.ReactElement }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-y-4">
      <div className="text-center text-2xl">{title}</div>
      <div className="size-40">{icon}</div>
    </div>
  );
}

interface WeatherDetailsProps {
  coordinate: Coordinate;
  weather: Weather;
}

function WeatherDetails({ coordinate, weather }: WeatherDetailsProps) {
  const { city, countryCode } = coordinate;
  const {
    weatherId,
    weatherDescription,
    temp,
    tempMax,
    tempMin,
    humidity,
    dateTime,
  } = weather;
  const header = "Today's Weather";

  return (
    <div className="relative">
      <div className="flex flex-row justify-between md:flex-col">
        <div className="flex flex-col font-semibold text-primary">
          <span>{header}</span>
          <span className="text-7xl sm:text-8xl">{temp}</span>
          <span>
            H: {tempMax} L: {tempMin}
          </span>
          <span className="text-secondary md:hidden">
            {city}, {countryCode}
          </span>
        </div>

        <div className="flex flex-col items-end justify-end leading-[1.75] text-secondary md:flex-row-reverse md:justify-between">
          <div className="w-32 sm:hidden">
            <WeatherIndicator weatherId={weatherId} />
          </div>
          <span>{weatherDescription}</span>
          <span>Humidity: {humidity}</span>
          <span>
            {/* todo: format */}
            {dateTime}
          </span>
          <span className="hidden font-semibold md:inline">
            {city}, {countryCode}
          </span>
        </div>
      </div>

      <div className="absolute hidden sm:-right-5 sm:-top-2/3 sm:block sm:w-[42%] md:w-[44%] lg:w-[310px]">
        <WeatherIndicator weatherId={weatherId} />
      </div>
    </div>
  );
}

export default WeatherView;
