#include <WiFi.h>
#include <HTTPClient.h>
#include <DHT.h>

#define DHTPIN 14
#define DHTTYPE DHT22
#define MQ4_PIN 34
#define MQ135_PIN 35

const char* ssid = "x";         // Ganti dengan WiFi kamu
const char* password = "x"; // Ganti dengan password WiFi
const char* serverUrl = "http://x:3000/api/sensor";

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(115200);
  dht.begin();

  WiFi.begin(ssid, password);
  Serial.println("📡 Menghubungkan ke WiFi...");

  int retry = 0;
  while (WiFi.status() != WL_CONNECTED && retry < 20) {
    delay(500);
    Serial.print(".");
    retry++;
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\n✅ WiFi Tersambung!");
    Serial.print("IP ESP32: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("\n❌ Gagal konek ke WiFi.");
  }
}

void loop() {
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();
  int mq4Value = analogRead(MQ4_PIN);
  int mq135Value = analogRead(MQ135_PIN);

  if (WiFi.status() == WL_CONNECTED && !isnan(temperature) && !isnan(humidity)) {
    HTTPClient http;
    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");

    String jsonData = "{\"temperature\":" + String(temperature, 2) + 
                      ",\"humidity\":" + String(humidity, 2) +
                      ",\"mq4\":" + String(mq4Value) +
                      ",\"mq135\":" + String(mq135Value) +
                      ",\"containerId\":\"1\"}";

    Serial.println("📤 Mengirim data ke server:");
    Serial.println(jsonData);

    int response = http.POST(jsonData);
    Serial.print("📥 Status HTTP: ");
    Serial.println(response);

    http.end();
  }
 else {
    Serial.println("⚠️ WiFi belum tersambung atau data sensor invalid.");
  }

  delay(30000); // kirim setiap 5 detik
}