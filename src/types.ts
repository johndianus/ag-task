
export interface Location {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}
  
export interface OptionType {
  label: string;
  value: {
    latitude: number | null;
    longitude: number | null;
    name: string | null;
  };
}