const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const statusText = document.getElementById("status");
const cityName = document.getElementById("cityName");
const temperatureEl = document.getElementById("temperature");
const conditionEl = document.getElementById("condition");

const apiKey = "c422c5dbd472f674d49215745cf062be";

searchBtn.addEventListener("click", function() {
    const city = cityInput.value.trim();

    //check if input is empty
    if(city===""){
        statusText.textContent = "Please enter a city";
        return;
    }
    statusText.textContent = "Loading...";

    // API URL
    const url = "https://api.openweathermap.org/data/2.5/weather?q="
                + city + "&units=metric&appid=" + apiKey;

    // fetch = gets data from web
    fetch(url)
        .then(function(response) {
            return response.json();  // converts into JS object
        })
        .then(function(data) {

            //error handling
            if(data.code !== 200) {
                statusText.textContent = "City not found";
                result;
            }
            
            const temperatur = data.main.temp;
            const condition = data.weather[0].main;

            //update UI
            cityName.textConten = "City: " + city;
            temperatureEl.textContent = "Temperature: " + temperature + "°C";
            conditionEl.textContent = "Condition: " + condition;

            // improve UX
            statusText.textConten = "";
            cityInput.value = "";
            cityInput.focus();
        })
        .catch(function () {
            statusText.textContent = "Error fetching data";
        });

  // allow Enter key to trigger search
  cityInput.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
          searchBtn.click();
      }
});
