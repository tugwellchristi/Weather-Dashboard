const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("searchedCity");
const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=";
let city;
const apiKey = "&appid=(API KEY GOES HERE)&units=imperial";

function getCurrentWeather(city) {
    console.log(city);
    var newURL = apiURL + city + apiKey;
    console.log(newURL);
    fetch(newURL)
    .then(function(res) {
        console.log(res);
        return res.json();
    })
        .then(function (data) {
            console.log(data);
        })
}

function searchCity() {
    city = searchInput.ariaValueMax.trim();
    console.log(city);
    getCurrentWeather(city);
}