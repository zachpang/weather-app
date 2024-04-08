import { GlobeAsiaAustraliaIcon } from "@heroicons/react/24/outline";
import { Coordinate, Weather } from "../../api";

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
    <div className="text-secondary bg-white-alpha-50 h-full rounded-xl border-0 p-8">
      {hasNoData && (
        <SearchPrompt
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

function SearchPrompt({
  title,
  icon,
}: {
  title: string;
  icon: React.ReactElement;
}) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-y-8">
      <div className="text-3xl">{title}</div>
      <div className="size-1/3">{icon}</div>
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
    weatherMain,
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
        <div className="text-primary flex flex-col font-semibold">
          <span>{header}</span>
          <span className="text-8xl">{temp}</span>
          <span>
            H: {tempMax} L: {tempMin}
          </span>
          <span className="text-secondary md:hidden">
            {city}, {countryCode}
          </span>
        </div>

        <div className="text-secondary flex flex-col items-end justify-end leading-[1.75] md:flex-row-reverse md:justify-between">
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

      <div className="absolute">
        {/* display corresponding weather image asset here. position absolute */}
      </div>
    </div>
  );
}

export default WeatherView;
