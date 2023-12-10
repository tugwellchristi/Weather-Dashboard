const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("searchCity");
const APIkey = "f4412f0abd4f656793c98f9a58d8c240";
const searchedCitiesContainer = document.getElementById("searchedCities");

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
            const weatherInfo = `<p><strong>City: ${data.name}  (${formattedDate})<strong></p><p>Temperature: ${data.main.temp}&deg;F</p><p>Humidity: ${data.main.humidity}%</p><p>Wind: ${data.wind.speed} MPH</p>`;
            document.getElementById("weatherDashboard").innerHTML = weatherInfo;
        })
        .catch(function (error) {
            console.error("Error fetching weather data", error);
        });
}
function getForecast(city) {
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIkey}&units=imperial`;

    fetch(forecastURL)
        .then(function (res) {
            console.log(res);
            return res.json();
        })
        .then(function (data) {
            console.log(data);

            const forecastContainer = document.getElementById("weatherDashboard");
            forecastContainer.innerHTML = "";

            for (let i = 0; i < 5; i++) {
                const date = new Date(data.list[i].dt * 1000);
                const formattedDate = `${date.getMonth()}/${date.getDate() +1}/${date.getFullYear()}`;

                const forecastBox = document.createElement("div");
                forecastBox.classList.add("forecast-box");
                forecastBox.innerHTML = `
                <p>Date: ${formattedDate}</p>
                <p>Temperature: ${data.list[i].main.temp}&deg;F</p>
                <p>Humidity: ${data.list[i].main.humidity}%</p>
                <p>Wind: ${data.list[i].wind.speed} MPH</p>`;

                forecastContainer.appendChild(forecastBox);
            }
        })
        .catch(function (error) {
            console.error("Error fetching weather data", error);
        });
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