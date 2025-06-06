export type SearchResult = {
  title: string;
  image: string;
  freeze: string;
  store: string;
  ingredients: string;
};

export type SensorData = {
  time: string;
  temperature: number;
  humidity: number;
  mq4: number;
  mq135: number;
};