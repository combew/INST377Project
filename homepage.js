const API_KEY = 'lVcIYuGj1ijG2C6AcwqIbXorLu3RfVtl'; 
const BASE_URL = 'https://dataservice.accuweather.com';

document.getElementById('searchButton').addEventListener('click', async () => {
    const location = document.getElementById('search').value;
    if (!location) {
        alert('Please enter a city or zip code.');
        return;
    }

    try {
        const locationKey = await fetchLocationKey(location);
        if (!locationKey) {
            alert('Location not found.');
            return;
        }

        const weatherData = await fetchWeather(locationKey);
        if (!weatherData) {
            alert('Weather data could not be fetched.');
            return;
        }
        
        const hourlyForecast = await fetchHourlyForecast(locationKey);
        const dailyForecast = await fetchDailyForecast(locationKey);
        
        displayWeather(weatherData);
        displayHourlyForecast(hourlyForecast);
        displayDailyForecast(dailyForecast);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Error fetching data. Please try again later.');
    }
});

async function fetchLocationKey(location) {
    const response = await fetch(`${BASE_URL}/locations/v1/cities/search?apikey=${API_KEY}&q=${location}`);
    const data = await response.json();
    return data[0]?.Key || null;
}

async function fetchWeather(locationKey) {
    const response = await fetch(`${BASE_URL}/currentconditions/v1/${locationKey}?apikey=${API_KEY}`);
    const data = await response.json();
    return data[0] || null;
}

async function fetchHourlyForecast(locationKey) {
    const response = await fetch(`${BASE_URL}/forecasts/v1/hourly/12hour/${locationKey}?apikey=${API_KEY}&metric=false`);
    const data = await response.json();
    return data || []; 
}


async function fetchDailyForecast(locationKey) {
    const response = await fetch(`${BASE_URL}/forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}&metric=false`);
    const data = await response.json();
    return data.DailyForecasts || [];
}

function displayWeather(weather) {
    if (!weather) {
        alert('Error: Weather data is unavailable.');
        return;
    }
    document.getElementById('locationName').textContent = weather.LocalizedName;
    document.getElementById('temperature').textContent = weather.Temperature?.Imperial?.Value || '--';
    document.getElementById('feelsLike').textContent = weather.RealFeelTemperature?.Imperial?.Value || '--';
    document.getElementById('conditions').textContent = weather.WeatherText || 'No conditions available';
}

function displayHourlyForecast(forecastData) {
    const container = document.getElementById('hourly-container');
    container.innerHTML = ''; 

    forecastData.forEach(hour => {
        const time = new Date(hour.DateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const forecastItem = document.createElement('div');
        forecastItem.classList.add('forecast-item');
        forecastItem.innerHTML = `
            <h4>${time}</h4>
            <img src="https://developer.accuweather.com/sites/default/files/${hour.WeatherIcon.toString().padStart(2, '0')}-s.png" alt="${hour.IconPhrase}">
            <p>${hour.Temperature.Value}°F</p>
        `;
        container.appendChild(forecastItem);
    });
}

function displayDailyForecast(forecastData) {
    const container = document.getElementById('daily-container');
    container.innerHTML = ''; 
    forecastData.forEach(day => {
        const forecastItem = document.createElement('div');
        forecastItem.classList.add('forecast-item');
        forecastItem.innerHTML = `
            <h4>${new Date(day.Date).toLocaleDateString()}</h4>
            <img src="https://developer.accuweather.com/sites/default/files/${day.Day.Icon.toString().padStart(2, '0')}-s.png" alt="${day.Day.IconPhrase}">
            <p>High: ${day.Temperature.Maximum.Value}°F</p>
            <p>Low: ${day.Temperature.Minimum.Value}°F</p>
        `;
        container.appendChild(forecastItem);
    });
}
