export type WeatherType = "clear" | "cloudy";

export interface WeatherData {
  type: WeatherType;
  temperature: number;
  humidity: number;
  wind: string;
}
