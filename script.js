const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherResult = document.getElementById("weatherResult");

const apiKey = "c422c5dbd472f674d49215745cf062be";

searchBtn.addEventListener("click", function() {
    const city = cityInput.value.trim();

    //check if its empty
    if(city===""){
        weatherResult.textContent = "Please enter a city";
        return;
    }

    // API URL
    const url = "https://api.openweathermap.org/data/2.5/weather?q="
                + city + "&units=metric&appid=" + apikey;

    // fetch = gets data from web
    fetch(url)
        .then(function(response) {
            return response.json();  // converts into JS object
        })
        .then(function(data) {

            const temperatur = data.main.temp;
            const condition = data.weather[0].main;

            weatherResult.textContent = 
                "Weather in " + city + ": " + temperature + "°C " + "condition: " + condition;
        })
        .catch(function(error) {
            weatherResult.textContent = "Error fetching data";
        });
});
