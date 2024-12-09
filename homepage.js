const API_KEY = 'lVcIYuGj1ijG2C6AcwqIbXorLu3RfVtl';
const BASE_URL = 'https://dataservice.accuweather.com';

async function searchWeather() {
  const location = document.getElementById('search').value;
  if (!location) return alert('Please enter a city or zip code');

  try {
    const locationKey = await fetchLocationKey(location);
    const weatherData = await fetchWeather(locationKey);
    displayWeather(weatherData);
  } catch (error) {
    console.error('Error fetching weather:', error);
  }
}

async function fetchLocationKey(location) {
  const response = await fetch(
    `${BASE_URL}/locations/v1/cities/search?apikey=${API_KEY}&q=${location}`
  );
  const data = await response.json();
  return data[0]?.Key; 
}

async function fetchWeather(locationKey) {
  const response = await fetch(
    `${BASE_URL}/currentconditions/v1/${locationKey}?apikey=${API_KEY}`
  );
  const data = await response.json();
  return data[0];
}

function displayWeather(weather) {
  document.getElementById('temperature').textContent = weather.Temperature.Metric.Value;
  document.getElementById('hi').textContent = '--';
  document.getElementById('low').textContent = '--'; 
  document.getElementById('feels_like').textContent = weather.RealFeelTemperature.Metric.Value;
}