'use client';

import { useState, useEffect } from 'react';
import WeatherSide from './comp/WeatherSide/WeatherSide';
import TodayInfo from './comp/TodayInfo/TodayInfo';
import WeekForecast from './comp/WeekForecast/WeekForecast';
import LocationButton from './comp/LocationButton/LocationButton';

const WeatherApp = () => {
  const [city, setCity] = useState("Aksaray");
  interface WeatherData {
    weather: any[];
    main: {
      temp: number;
      // Diğer gerekli özellikleri ekleyin
    };
    // Diğer gerekli özellikleri ekleyin.
  }

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = "b17e3f5bb7c8d706172f32db24ac44a2"; // Geçerli API anahtarınızı buraya yazın

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log("Using API Key:", API_KEY); // API anahtarını logla

        // Şehir ismini enlem ve boylama çevirme
        const geoResponse = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
        );
        const geoData = await geoResponse.json();
        
        console.log("Geolocation API response:", geoData); // Yanıtı logla

        if (!geoData.length) throw new Error("Şehir bulunamadı.");

        const { lat, lon } = geoData[0];

        // 5 günlük / 3 saatlik hava tahmini al
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=tr&appid=${API_KEY}`
        );
        const data = await response.json();

        console.log("Weather API response:", data); // Weather API yanıtını logla

        if (data.cod !== "200") throw new Error(data.message || "Hava durumu alınamadı.");
        
        setWeatherData(data);
      } catch (err) {
        console.error("Weather data fetch error:", err);
        setError(err instanceof Error ? err.message : "Bilinmeyen hata oluştu");
        setWeatherData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  return (
    <div className="container flex flex-col md:flex-row bg-gray-900 text-white p-6 rounded-lg shadow-lg w-4/5 mx-auto min-h-[80vh] items-center justify-center">
      {loading ? (
        <p className="text-white">Veri yükleniyor...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          {weatherData && weatherData.weather && <WeatherSide weatherData={weatherData} />}
          <div className="info-side flex-1 p-6 bg-gray-800 rounded-lg mt-4 md:mt-0 md:ml-4">
            {weatherData && weatherData.main && <TodayInfo weatherData={weatherData} />}
            {weatherData && weatherData.main && <WeekForecast weatherData={weatherData} />}
            <LocationButton setCity={setCity} />
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherApp;
