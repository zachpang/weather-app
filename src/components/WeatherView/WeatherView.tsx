import { GlobeAltIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { CoordinateData, WeatherData } from "../../api";

interface WeatherViewProps {
  coordinateData: CoordinateData | null;
  weatherData: WeatherData | null;
  error: string;
  isFetching: boolean;
}

function WeatherView({
  coordinateData,
  weatherData,
  error,
  isFetching,
}: WeatherViewProps) {
  const hasNoData = coordinateData === null || weatherData === null;

  return (
    <div className="h-full rounded-xl border-0 bg-white p-8 text-gray-900 opacity-50">
      {hasNoData && (
        <SearchPrompt
          title="To begin, search a city or country for the current weather."
          icon={<MapPinIcon />}
        />
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

export default WeatherView;
