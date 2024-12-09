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