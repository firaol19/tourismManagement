"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

// Define the Destination type
interface Destination {
  id: number;
  name: string;
  region: string;
  city: string;
  farFromAdiss: string;
  image: string;
  category: string;
  interance: number;
  description: string;
}

interface WeatherMain {
  temp: number;
  humidity: number;
}

interface WeatherWind {
  speed: number;
}

interface Weather {
  main: WeatherMain;
  weather: { description: string }[];
  wind: WeatherWind;
}

interface Forecast {
  dt_txt: string;
  main: WeatherMain;
  weather: { description: string }[];
}

const DestinationDetail = () => {
  const { id } = useParams();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [currentWeather, setCurrentWeather] = useState<Weather | null>(null);
  const [forecast, setForecast] = useState<Forecast[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("Harar");
  const [error, setError] = useState<string | null>(null);

 
  const WEATHER_API_KEY = 'b45c1701fb4152f6490c204ca87d36de'; 

  useEffect(() => {
    if (!id) return;
  
    const fetchDestination = async () => {
      try {
        const res = await fetch(`/api/destinationDetail?id=${id}`);
        const data = await res.json();
  
        if (res.ok) {
          setDestination(data);
          setCity(data.city);
        } else{
          setError(data.error || "An error occurred while fetching destination");
        }
      } catch (error) {
        setError("Failed to fetch destination data: " + error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchDestination();
  }, [id]);
  

  useEffect(() => {
    if (!destination || !destination.city) return;

    const fetchWeatherData = async () => {
      try {
        const weatherRes = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
        );
        const weatherData = await weatherRes.json();

        if (weatherRes.ok) {
          setCurrentWeather(weatherData);
        } else {
          setError(weatherData.message || "Failed to fetch weather data");
        }

        // Fetch 5-day forecast
        const forecastRes = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
        );
        const forecastData = await forecastRes.json();

        if (forecastRes.ok) {
          // Filter the forecast: get one entry per day
          const dailyForecast: Forecast[] = [];
          const addedDates = new Set();

          forecastData.list.forEach((item: Forecast) => {
            const date = item.dt_txt.split(" ")[0]; // Extract date part (YYYY-MM-DD)

            if (!addedDates.has(date)) {
              dailyForecast.push(item);
              addedDates.add(date);
            }
          });

          setForecast(dailyForecast);
        } else {
          setError(forecastData.message || "Failed to fetch forecast data");
        }
      } catch (error) {
        setError("Failed to fetch weather data" + error);
      }
    };

    fetchWeatherData();
  }, [city, destination]);

  if (loading) {
    return <div>Loading...</div>;
  }

  

  if (!destination) {
    return <div>Destination not found</div>;
  }

  return (
    <div className="container mx-auto p-4 font-serif w-full md:w-[80%] lg:w-[60%] bg-white dark:bg-background2 mt-5 rounded-3xl shadow-lg shadow-main flex flex-col gap-3 justify-center items-center ">
      <h1 className="text-2xl font-semibold text-main dark:text-primary2 mb-5">{destination.name}</h1>
      <Image
          src={destination.image}
          alt={destination.name}
          width={600}
          height={200}
          className="object-cover rounded-lg max-h-[250px]"
        />
      <p className="text-xl font-medium text-primary dark:text-primary2">Category: <span className="text-xl text-main font-normal dark:text-text2 font-sans">{destination.category}</span></p>
      <p className="text-xl font-medium text-primary dark:text-primary2">Found in Region: <span className="text-xl text-main font-normal dark:text-text2 font-sans">{destination.region}</span></p>
      <p className="text-xl font-medium text-primary dark:text-primary2">Found in City: <span className="text-xl text-main font-normal dark:text-text2 font-sans">{destination.city}</span></p>
      <p className="text-xl font-medium text-primary dark:text-primary2">It far from Adiss: <span className="text-xl text-main font-normal dark:text-text2 font-sans">{destination.farFromAdiss}</span></p>
      <p className="text-xl font-medium text-primary dark:text-primary2">Enterance Fee: <span className="text-xl text-main font-normal dark:text-text2 font-sans">{destination.interance}</span></p>
      <div className="flex flex-col justify-center items-center">
      <p className="text-xl font-medium text-primary dark:text-primary2 ">Description: </p>
      <p className="text-xl text-main font-normal dark:text-text2 font-sans">{destination.description}</p>
      </div>
      <div className="my-4">
        {error && (
          <div>{error} for weather data</div>
        )}
      </div>

      {/* Weather Information */}                                         
      {currentWeather && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-main dark:text-primary2 mb-5">Current Weather</h2>
          <p className="text-xl font-medium text-primary dark:text-primary2">Temperature: <span className="text-xl text-main font-normal dark:text-text2 font-sans">{currentWeather.main.temp}°C</span></p>
          <p className="text-xl font-medium text-primary dark:text-primary2">Weather: <span className="text-xl text-main font-normal dark:text-text2 font-sans">{currentWeather.weather[0].description}</span></p>
          <p className="text-xl font-medium text-primary dark:text-primary2">Humidity: <span className="text-xl text-main font-normal dark:text-text2 font-sans">{currentWeather.main.humidity}%</span></p>
          <p className="text-xl font-medium text-primary dark:text-primary2">Wind Speed: <span className="text-xl text-main font-normal dark:text-text2 font-sans">{currentWeather.wind.speed} m/s</span></p>
        </div>
      )}

      {/* 5-Day Forecast */}
      {forecast && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-main dark:text-primary2 mb-5">5-Day Forecast</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {forecast.map((forecastItem, index) => {
              // Convert date format to DD/MM/YYYY
              const formattedDate = new Date(forecastItem.dt_txt)
                .toLocaleDateString("en-GB")
                .replace(/\//g, "/");

              return (
                <div key={index} className="bg-white p-4 rounded-lg shadow-lg shadow-main dark:shadow-text2 dark:bg-background2">
                  <h3 className="font-semibold text-main dark:text-primary ">{formattedDate}</h3>
                  <p className="text-xl font-medium text-primary dark:text-primary2">Temperature: <span className="text-xl text-main font-normal dark:text-text2 font-sans">{forecastItem.main.temp}°C</span></p>
                  <p className="text-xl font-medium text-primary dark:text-primary2">Weather: <span className="text-xl text-main font-normal dark:text-text2 font-sans">{forecastItem.weather[0].description}</span></p>
                </div>
              );
            })}                                                          
          </div>
        </div>
      )}
      <Link href={`/book/${id}`} className="bg-main dark:bg-primary rounded-lg text-text px-4 py-2 font-sans mt-4 cursor-pointer">
                    Book Now
                  </Link>
    </div>
  );
};

export default DestinationDetail