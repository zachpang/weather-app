import thunderstorm from "../../assets/thunderstorm.png";
import thunderstormRain from "../../assets/thunderstorm-rain.png";
import thunderstormRainHeavy from "../../assets/thunderstorm-rain-heavy.png";
import rain from "../../assets/rain.png";
import rainModerate from "../../assets/rain-moderate.png";
import rainHeavy from "../../assets/rain-heavy.png";
import rainIntense from "../../assets/rain-intense.png";
import snow from "../../assets/snow.png";
import snowHeavy from "../../assets/snow-heavy.png";
import snowShower from "../../assets/snow-shower.png";
import snowShowerHeavy from "../../assets/snow-shower-heavy.png";
import squall from "../../assets/squall.png";
import tornado from "../../assets/tornado.png";
import clear from "../../assets/clear.png";
import cloudyPartly from "../../assets/cloudy-partly.png";
import cloudyHeavy from "../../assets/cloudy-heavy.png";
import { Weather } from "../../api";

const ID_TO_IMAGE: Record<string, string> = {
  200: thunderstormRain, // Thunderstorm	thunderstorm with light rain
  201: thunderstormRain, // Thunderstorm	thunderstorm with rain
  202: thunderstormRainHeavy, // Thunderstorm	thunderstorm with heavy rain
  210: thunderstorm, // Thunderstorm	light thunderstorm
  211: thunderstorm, // Thunderstorm	thunderstorm
  212: thunderstorm, // Thunderstorm	heavy thunderstorm
  221: thunderstorm, // Thunderstorm	ragged thunderstorm
  230: thunderstormRain, // Thunderstorm	thunderstorm with light drizzle
  231: thunderstormRain, // Thunderstorm	thunderstorm with drizzle
  232: thunderstormRain, // Thunderstorm	thunderstorm with heavy drizzle
  300: rain, // Drizzle	light intensity drizzle
  301: rain, // Drizzle	drizzle
  302: rain, // Drizzle	heavy intensity drizzle
  310: rain, // Drizzle	light intensity drizzle rain
  311: rain, // Drizzle	drizzle rain
  312: rain, // Drizzle	heavy intensity drizzle rain
  313: rain, // Drizzle	shower rain and drizzle
  314: rain, // Drizzle	heavy shower rain and drizzle
  321: rain, // Drizzle	shower drizzle
  500: rain, //	Rain	light rain
  501: rainModerate, //	Rain	moderate rain
  502: rainHeavy, //	Rain	heavy intensity rain
  503: rainIntense, //	Rain	very heavy rain
  504: rainIntense, //	Rain	extreme rain
  511: rain, //	Rain	freezing rain
  520: rain, //	Rain	light intensity shower rain
  521: rainModerate, //	Rain	shower rain
  522: rainHeavy, //	Rain	heavy intensity shower rain
  531: rain, //	Rain	ragged shower rain
  600: snow, //	Snow	light snow
  601: snow, //	Snow	snow
  602: snowHeavy, //	Snow	heavy snow
  611: snow, //	Snow	sleet
  612: snowShower, //	Snow	light shower sleet
  613: snowShower, //	Snow	shower sleet
  615: snowShower, //	Snow	light rain and snow
  616: snowShower, //	Snow	rain and snow
  620: snowShower, //	Snow	light shower snow
  621: snowShower, //	Snow	shower snow
  622: snowShowerHeavy, //	Snow	heavy shower snow
  701: squall, //	Mist	mist
  711: squall, //	Smoke	smoke
  721: squall, //	Haze	haze
  731: squall, //	Dust	sand/dust whirls
  741: squall, //	Fog	fog
  751: squall, //	Sand	sand
  761: squall, //	Dust	dust
  762: squall, //	Ash	volcanic ash
  771: squall, //	Squall	squalls
  781: tornado, //	Tornado	tornado
  800: clear, //	Clear	clear sky
  801: cloudyPartly, //	Clouds	few clouds: 11-25%
  802: cloudyPartly, //	Clouds	scattered clouds: 25-50%
  803: cloudyPartly, //	Clouds	broken clouds: 51-84%
  804: cloudyHeavy, //	Clouds	overcast clouds: 85-100%
};

interface WeatherIndicatorProps {
  weatherId: Weather["weatherId"];
}

export default function WeatherIndicator({ weatherId }: WeatherIndicatorProps) {
  const url = ID_TO_IMAGE[String(weatherId)];

  return <img src={url} />;
}
