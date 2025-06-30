#include <SPI.h>
#include <LoRa.h>
#include <ArduinoJson.h>

#define SS_PIN    5
#define RST_PIN   14
#define DIO0_PIN  2
#define LORA_BAND 433E6

void setup() {
  Serial.begin(115200);
  while (!Serial);

  SPI.begin(23, 19, 18, SS_PIN);  // SCK, MISO, MOSI, SS
  LoRa.setPins(SS_PIN, RST_PIN, DIO0_PIN);
  LoRa.setSyncWord(0x12);  // Same as sender

  if (!LoRa.begin(LORA_BAND)) {
    Serial.println("LoRa init failed. Check connections.");
    while (true);
  }

  Serial.println("LoRa Receiver Ready");
}

void loop() {
  int packetSize = LoRa.parsePacket();
  if (packetSize) {
    String received = "";
    while (LoRa.available()) {
      received += (char)LoRa.read();
    }

    Serial.println("RX Raw: " + received);

    StaticJsonDocument<256> doc;
    DeserializationError error = deserializeJson(doc, received);

    if (error) {
      Serial.print("JSON parse failed: ");
      Serial.println(error.c_str());
      return;
    }

    // Extract and print values
    float wave_height  = doc["wave_height"];
    float water_height = doc["water_height"];
    float temp         = doc["temperature"];
    float humidity     = doc["humidity"];
    float air_pressure = doc["air_pressure"];
    float wind_speed   = doc["wind_speed"];
    const char* ts     = doc["timestamp"];

    Serial.println("--- Parsed Data ---");
    Serial.printf("Timestamp     : %s\n", ts);
    Serial.printf("Temperature   : %.1f °C\n", temp);
    Serial.printf("Humidity      : %.1f %%\n", humidity);
    Serial.printf("Air Pressure  : %.1f hPa\n", air_pressure);
    Serial.printf("Wave Height   : %.1f m\n", wave_height);
    Serial.printf("Water Height  : %.1f m\n", water_height);
    Serial.printf("Wind Speed    : %.1f m/s\n", wind_speed);
    Serial.println("--------------------\n");
  }
}
