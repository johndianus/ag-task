import { WeatherDetailsProps } from "./types";

const WeatherDetails: React.FC<WeatherDetailsProps> = ({location}) => {
  return(<>{location?.name}</>);
}
export default WeatherDetails;
