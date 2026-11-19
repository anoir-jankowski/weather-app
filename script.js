
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const statusText = document.getElementById("status");
const cityName = document.getElementById("cityName");
const temperatureEl = document.getElementById("temperature");
const conditionEl = document.getElementById("condition");
const weatherIcon = document.getElementById("weatherIcon");

searchBtn.addEventListener("click", function () {
    const city = cityInput.value.trim();

    if (city === "") {
        statusText.textContent = "Please enter a city";
        return;
    }

    statusText.textContent = "Loading...";

    const url =
        "https://geocoding-api.open-meteo.com/v1/search?name=" +
        encodeURIComponent(city) + "&count=1";

    fetch(url)
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Location request failed");
            }
            return response.json();
        })
        .then(function (data) {
            if (!data.results || data.results.length === 0) {
                throw new Error("City not found");
            }

            const location = data.results[0];

            const weatherUrl =
                "https://api.open-meteo.com/v1/forecast?latitude=" +
                location.latitude +
                "&longitude=" + location.longitude +
                "&current=temperature_2m,weather_code";

            return fetch(weatherUrl);
        })
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Weather request failed");
            }
            return response.json();
        })
        .then(function (data) {
            const temperature = data.current.temperature_2m;
            const weatherCode = data.current.weather_code;

            cityName.textContent = "City: " + city;
            temperatureEl.textContent =
                "Temperature: " + temperature + "°C";
            conditionEl.textContent =
                "Weather code: " + weatherCode;

            weatherIcon.removeAttribute("src");
            statusText.textContent = "";

            cityInput.value = "";
            cityInput.focus();
        })
        .catch(function (error) {
            console.log(error);
            statusText.textContent = "Could not find weather data";

            cityName.textContent = "";
            temperatureEl.textContent = "";
            conditionEl.textContent = "";
            weatherIcon.removeAttribute("src");
        });
});

cityInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});

});
