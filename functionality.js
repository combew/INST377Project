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

async function callWeatherstack() {
    var response = await fetch("http://api.weatherstack.com/current?access_key=8fa5c88adc7894a2acf42a75b7cb9028&query=College%2BPark")
    var resJson = await response.json();

    return resJson
}


async function loadLocationName() {
    const resJson = await callWeatherstack() 

    const locationName = resJson.location.name

    const locationNameElement = document.getElementById("locationName")
    locationNameElement.innerHTML = locationName
}


async function loadSection2LeftInfo() {
    const resJson = await callWeatherstack()

    const currentTempC = resJson.current.temperature
    const currentTempF = Math.round(currentTempC * (9/5) + 32)
    const currentTempElement = document.getElementById("current-temp")
    currentTempElement.innerHTML = `Current Temperature: ${currentTempF}&deg;F`

    const tempTakenTime = resJson.current.observation_time
    const tempTakenTimeElement = document.getElementById("temp-taken-time")
    tempTakenTimeElement.innerHTML = `Info taken at ${tempTakenTime}`

    const weatherIcon = resJson.current.weather_icons[0]
    const weatherIconImage = document.createElement('img')
    weatherIconImage.src = weatherIcon

    console.log("weatherIconImage: ", weatherIconImage)

    const weatherIconElement = document.getElementById("weather-icon")
    weatherIconElement.appendChild(weatherIconImage)
}


async function windowOnload() {
    loadLocationName()
    loadSection2LeftInfo()
}

window.onload = windowOnload;