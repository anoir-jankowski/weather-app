console.log("JS loaded");

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const statusText = document.getElementById("status");
const cityName = document.getElementById("cityName");
const temperatureEl = document.getElementById("temperature");
const conditionEl = document.getElementById("condition");
const weatherIcon = document.getElementById("weatherIcon");

const apiKey = "c422c5dbd472f674d49215745cf062be";

searchBtn.addEventListener("click", function () {
    console.log("Button clicked");

    const city = cityInput.value.trim();

    // check if input is empty
    if (city === "") {
        statusText.textContent = "Please enter a city";
        weatherIcon.src = "";
        return;
    }

    statusText.textContent = "Loading...";
    weatherIcon.src = "";

    // API URL
    const url =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        apiKey;

    // fetch gets data from web
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            // check if city exists
            if (Number(data.cod) !== 200) {
                statusText.textContent = "City not found";
                return;
            }

            // get data from API
            const temperature = data.main.temp;
            const condition = data.weather[0].main;
            const iconCode = data.weather[0].icon;
            const iconUrl =
                "https://openweathermap.org/img/wn/" + iconCode + ".png";

            // update UI
            cityName.textContent = "City: " + data.name;
            temperatureEl.textContent = "Temperature: " + temperature + "°C";
            conditionEl.textContent = "Condition: " + condition;
            weatherIcon.src = iconUrl;

            // improve UX
            statusText.textContent = "";
            cityInput.value = "";
            cityInput.focus();
        })
        .catch(function (error) {
            console.log(error);
            statusText.textContent = "Error fetching data";
            weatherIcon.src = "";
        });
});

// allow Enter key to trigger search
cityInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});
