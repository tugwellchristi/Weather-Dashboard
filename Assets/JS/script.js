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
            const weatherInfo = `<p><strong>City: ${data.name}<strong></p><p>Temperature: ${data.main.temp}&deg;F</p>`;
            document.getElementById("weatherDashboard").innerHTML = weatherInfo;
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
    displaySavedCities();
}

displaySavedCities();