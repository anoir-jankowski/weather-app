const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const statusText = document.getElementById("status");
const cityName = document.getElementById("cityName");
const temperatureEl = document.getElementById("temperature");
const conditionEl = document.getElementById("condition");
const weatherIcon = documt.getElementById("weatherIcon");

const apiKey = "c422c5dbd472f674d49215745cf062be";

searchBtn.addEventListener("click", function() {
    const city = cityInput.value.trim();

    //check if input is empty
    if(city===""){
        statusText.textContent = "Please enter a city";
        weatherIcon.src = ""; // clear icon 
        return;
    }
    statusText.textContent = "Loading...";
    weatherIcon.src = ""; // reset icon while loading 

    // API URL
    const url = "https://api.openweathermap.org/data/2.5/weather?q="
                + city + "&units=metric&appid=" + apiKey;

    // fetch = gets data from web
    fetch(url)
        .then(function(response) {
            return response.json();  // converts into JS object
        })
        .then(function(data) {

            // check if city exists
            if(data.code !== 200) {
                statusText.textContent = "City not found";
                weatherIcon.src = "";
                return;
            }

            // get data from API
            const temperatur = data.main.temp;
            const condition = data.weather[0].main;
            const iconCode = data.weather[0].icon;

            // icon URL
            const iconUrl = "https://openweathermap.org/img/wn/"
                + iconcode + "@2x.png";

            //update UI
            cityName.textConten = "City: " + city;
            temperatureEl.textContent = "Temperature: " + temperature + "°C";
            conditionEl.textContent = "Condition: " + condition;
            weatherIcon.src = iconUrl;

            // improve UX
            statusText.textConten = "";
            cityInput.value = "";
            cityInput.focus();
        })
        .catch(function () {
            statusText.textContent = "Error fetching data";
            weatherIcon.src = "";
        });

  // allow Enter key to trigger search
  cityInput.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
          searchBtn.click();
      }
});
