
const apiKey = "4b614ae38185e2a7a1a7a7afd105ddf7";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=";

const searchbox = document.querySelector(".search input");
const searchbutton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");


async function checkWeather (city) {
    const response = await fetch(apiUrl + city+ `&appid=${apiKey}`);

    var data = await response.json();


document.querySelector(".city").innerHTML = data.name;
document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°F";
document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + " mph";
document.querySelector(".visibility").innerHTML = (data.visibility / 1000).toFixed(1) + " mi";
document.querySelector(".feels-like").innerHTML = Math.round(data.main.feels_like) + "°F";

async function fetchUVIndex(lat, lon) {
const oneCallApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&appid=${apiKey}&units=imperial`;

const response = await fetch(oneCallApiUrl);
const data = await response.json();

document.querySelector(".uv-index").innerHTML = data.current.uvi;
}

if (data.weather[0].main == "Clouds"){
    weatherIcon.src = "cloudy-day.png";
}
else if(data.weather[0].main == "Clear"){
    weatherIcon.src = "sun.png";
}
else if(data.weather[0].main == "Rain"){
    weatherIcon.src = "rain.png";
}
else if(data.weather[0].main == "Drizzle"){
    weatherIcon.src = "cloudy.png";
}
else if(data.weather[0].main == "Mist"){
    weatherIcon.src = "mist.png";
}

fetchUVIndex(data.coord.lat, data.coord.lon);

document.querySelector(".weather").style.display = "block";

}

document.getElementById('search-form').addEventListener('submit', function(event) {
event.preventDefault();
checkWeather(searchbox.value);
});
