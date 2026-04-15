const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherResult = document.getElementById("weatherResult");

searchBtn.addEventListener("click", function() {
    const city = cityInput.value;
    
    // for now just show city name (test)
    weatherResult.textContent = "Searching for: " + city;
});
