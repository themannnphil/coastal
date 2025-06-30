
  #include <SPI.h>
  #include <LoRa.h>
  #include <Wire.h>
  #include <Adafruit_BMP280.h>
  #include <DHT.h>
  #include <ArduinoJson.h>


  #define DHTPIN    4
  #define DHTTYPE   DHT22
  #define SS_PIN    5
  #define RST_PIN   14
  #define DIO0_PIN  2
  #define LORA_BAND 433E6

  DHT dht(DHTPIN, DHTTYPE);

  Adafruit_BMP280 bmp;

  void setup() {
    delay(1000);
    Serial.begin(115200);
    pinMode(SS_PIN, OUTPUT);

    while (!Serial);

    Wire.begin(21,22);
    dht.begin();
    if (!bmp.begin(0x76)) {
      Serial.println("BMP280 init failed!");
      while (1) delay(1000);
    }

    SPI.begin(23, 19, 18, SS_PIN);

    LoRa.setPins(SS_PIN, RST_PIN, DIO0_PIN);
    LoRa.setSyncWord(0x12);  // Add this line in setup()
    LoRa.setSpreadingFactor(7);
    LoRa.setSignalBandwidth(125E3);
    LoRa.setCodingRate4(5);

    if (!LoRa.begin(LORA_BAND)) {
      Serial.println("LoRa init failed!");
      while (1) delay(1000);
    }
    Serial.println("LoRa init OK");
  }

  void loop() {
    float t_bmp = bmp.readTemperature();
    float p = bmp.readPressure();
    float t_dht = dht.readTemperature();
    float hum = dht.readHumidity();

    if (isnan(t_dht) || isnan(hum)) {
      Serial.println("DHT reading failed");
      delay(5000);
      return;
    }

    StaticJsonDocument<256> doc;
    doc["wave_height"]   = 0;
    doc["water_height"]  = 0;
    doc["temperature"]   = round(t_bmp * 10) / 10.0;
    doc["humidity"]      = round(hum * 10) / 10.0;
    doc["air_pressure"]  = round(p / 100.0 * 10) / 10.0;
    doc["wind_speed"]    = 0;
    char buf[30];
    time_t now = time(nullptr);
    struct tm *utc = gmtime(&now);
    sprintf(buf, "%04d-%02d-%02dT%02d:%02d:%02dZ",
      utc->tm_year + 1900, utc->tm_mon+1, utc->tm_mday,
      utc->tm_hour, utc->tm_min, utc->tm_sec);
    doc["timestamp"] = buf;

    String json;
    serializeJson(doc, json);

    Serial.println("TX: " + json);
    LoRa.beginPacket();
    LoRa.print(json);
    LoRa.endPacket(true);
    Serial.println("Packet sent!");


    delay(10000);
  }
