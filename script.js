const apiKey = "361747a9f25f945a4d6cfc63c1ce9f21";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric";
const cityName = document.querySelector(".search input");
const cityBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + `&q=${city}` + `&appid=${apiKey}`);
        if (response.status===404){
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
            throw new Error("City not found");
        }
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C"; 
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        weatherIcon.src=`./images/${data.weather[0].main}.png`;

        document.querySelector(".error").style.display = "none";
        document.querySelector(".weather").style.display="block";
        
    } catch (e) {
        console.error("Error:", e.message);
    }
}

cityBtn.addEventListener("click", () => {
    const city = cityName.value;
    if (city) {
        checkWeather(city);
    } else {
        alert("Please enter a city name");
    }
});
