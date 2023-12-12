const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("searchCity");
const APIkey = "f4412f0abd4f656793c98f9a58d8c240";
const searchedCitiesContainer = document.getElementById("searchedCities");
const currentWeatherContainer = document.getElementById("currentWeather");
const forecastContainer = document.getElementById("forecast");

// Get current weather in a city
function getCurrentWeather(city) {
    console.log(city);
    var newURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=imperial`;
    console.log(newURL);

    fetch(newURL)
        .then(function (res) {
            console.log(res);
            return res.json();
        })
        .then(function (data) {
            console.log(data);

            const currentDate = new Date();
            const formattedDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;
            const weatherInfo = `<p><strong>City: ${data.name}  (${formattedDate})<strong></p>
                                 <p>Current Conditions: ${data.weather[0].description} ${getWeatherEmoji(data.weather[0].icon)}</p>
                                 <p>Temperature: ${data.main.temp}&deg;F</p>
                                 <p>Humidity: ${data.main.humidity}%</p>
                                 <p>Wind: ${data.wind.speed} MPH</p>`;
            currentWeatherContainer.innerHTML = weatherInfo;

            getForecast(city);
        })
        .catch(function (error) {
            console.error("Error fetching weather data", error);
        });
}

// Get 5 day forecast for the searched city
function getForecast(city) {
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIkey}&units=imperial`;

    fetch(forecastURL)
        .then(function (res) {
            console.log(res);
            return res.json();
        })
        .then(function (data) {
            console.log(data);

            forecastContainer.innerHTML = `<div class="forecast-container">`;

            for (let i = 0; i < 5; i++) {
                const date = new Date(data.list[i * 8].dt * 1000);
                const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

                const forecastBox = `
                <div class="column forecast-box">
                <p>Date: ${formattedDate}</p>
                <p>Conditions: ${data.list[i *8].weather[0].description} ${getWeatherEmoji(data.list[i *8].weather[0].icon)}</p>
                <p>Temperature: ${data.list[i *8].main.temp}&deg;F</p>
                <p>Humidity: ${data.list[i *8].main.humidity}%</p>
                <p>Wind: ${data.list[i *8].wind.speed} MPH</p>
                </div>`;

                forecastContainer.innerHTML += forecastBox;
            }
            forecastContainer.innerHTML += `</div>`;
        })
        .catch(function (error) {
            console.error("Error fetching weather data", error);
        });
}

function getWeatherEmoji(iconCode) {
    const emojiMap = {
        "01d": "☀️", // clear sky day 
        "01n": "🌙", // clear sky night
        "02d": "⛅", // few clouds day
        "02n": "🌥️", // few clouds night
        "03d": "☁️", // scattered clouds day
        "03n": "☁️", // scattered clouds night
        "04d": "☁️", // broken clouds day
        "04n": "☁️", // broken clouds night
        "09d": "🌧️", // shower rainy day
        "09n": "🌧️", // shower rainy night
        "10d": "🌦️", // rain day
        "10n": "🌦️", // rain night
        "11d": "⛈️", // thunderstorm day
        "11n": "⛈️", // thunderstorm night
        "13d": "❄️", //snow day
        "13n": "❄️", // snow night
        "50d": "🌫️", // mist day
        "50n": "🌫️", // mist night
    };
    return emojiMap[iconCode] || '?';
}

function addCity() {
    city = searchInput.value.trim();
    console.log(city);

    if (city !== "") {
        saveCity(city);
        displaySavedCities();
        getCurrentWeather(city);

        searchInput.value = "";
    }
}

function saveCity(city) {
    const savedCities = JSON.parse(localStorage.getItem("savedCities")) || [];

    savedCities.push(city);
    localStorage.setItem("savedCities", JSON.stringify(savedCities));
}

function displaySavedCities() {
    const savedCities = JSON.parse(localStorage.getItem("savedCities")) || [];

    searchedCitiesContainer.innerHTML = "";
    savedCities.forEach(city => {
        const cityButton = document.createElement("button");
        cityButton.textContent = city;
        cityButton.classList.add("button", "is-primary", "mt-1", "ml-5");
        cityButton.addEventListener("click", function () {
            getCurrentWeather(city);
            getForecast(city);
        });
        searchedCitiesContainer.appendChild(cityButton);
    })
}


searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addCity();
});

function clearCitiesBtn() {
    localStorage.removeItem("savedCities");
    localStorage.removeItem("")
    displaySavedCities();
}

displaySavedCities();