export interface Recommendation {
    title: string;
    image: string;
    freeze: string;
    store: string;
    ingredients: string;
  }

  export interface SensorDataPoint {
    time: string            // waktu dalam string format (misalnya HH:MM)
    temperature: number     // suhu dari DHT22
    humidity: number        // kelembapan dari DHT22
    mq4: number             // nilai gas MQ-4
    mq135: number           // nilai gas MQ-135
  }
  