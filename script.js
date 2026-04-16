const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherResult = document.getElementById("weatherResult");

searchBtn.addEventListener("click", function() {
    const city = cityInput.value;

    //check if its empty
    if(city===""){
        weatherResult.textContent = "Please enter a city";
        return;
    }
    
    // fake data for now 
    const temperatur = 25;
    const condition = "Sunny";

    weatherResulte.textContent = 
        "Weather in " + city + ": " + temperatur + "°C, " + condition;
});
