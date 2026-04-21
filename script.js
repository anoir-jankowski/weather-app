const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherResult = document.getElementById("weatherResult");

const apiKey = "c422c5dbd472f674d49215745cf062be";

searchBtn.addEventListener("click", function() {
    const city = cityInput.value.trim();

    //check if input is empty
    if(city===""){
        weatherResult.textContent = "Please enter a city";
        return;
    }
    weatherResult.textContent = "Loading...";

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
                weatherResult.textContent = "City not found";
                result;
            }

            // improve UX
            const temperatur = data.main.temp;
            const condition = data.weather[0].main;

            weatherResult.textContent = 
                "Weather in " + city + ": " + temperature + "°C, " + condition;

            cityInput.value = "";
            cityInput.focus();
        })
        .catch(function () {
            weatherResult.textContent = "Error fetching data";
        });

  // allow Enter key to trigger search
  cityInput.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
          searchBtn.click();
      }
});
