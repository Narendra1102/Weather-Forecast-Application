const API_KEY = "f66b0b957879533595d2f494f1fc1fc3"
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';


const searchInput = document.getElementById("searchInput");
const suggestionsBox = document.getElementById("suggestions");
let searchbtn = document.querySelector(".search-btn")
let currentlocation = document.querySelector(".currentloc")
let displayWeather = document.getElementById("display-section")
let recentCitiesSelect=document.getElementById("recent-cities")
let recentCitiesContainer=document.getElementById("recent-cities-container")
let unitToggle=document.getElementById("unit-toggle")

let cityName = document.getElementById("city-name")
let temp = document.getElementById("temp")
let wind = document.getElementById("wind")
let humidity = document.getElementById("humidity")
let weatherIcon = document.getElementById("weather-icon")
let weatherCondition = document.getElementById("weather-condition")
const extendedForecast = document.getElementById("extended-forecast");
const forecastContainer=document.getElementById("forecast-container")

let recentCities=JSON.parse(localStorage.getItem("recentCities"))||[]

let isCelsius = true;

searchbtn.addEventListener("click", () => {
    const city = searchInput.value.trim();
    if (city) {
        getWeatherByCity(city);
        saveSearch(city)
    } else {
        // showError('Please enter a city name.');
    }
})

searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        searchbtn.click();
    }
});


unitToggle.addEventListener("click",toggleTemperatureUnit)


async function getWeatherByCity(city) {
    try {
        const geoResponse = await fetch(`${GEO_URL}/direct?q=${city}&limit=1&appid=${API_KEY}`);
        const geoData = await geoResponse.json();
        
        if (geoData.length==0) {
            throw new Error('City not found');
        }
        const { lat, lon, name } = geoData[0];
        
        await getWeatherData(lat,lon,name)

    }

    catch (err) {
        // showError('Failed to fetch weather data. Please check the city name and try again.');
    }
}



async function getWeatherData(lat, lon, city = ''){

    const currentResponse = await fetch(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
    const currentData = await currentResponse.json();
    
    
    const forecastResponse = await fetch(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
    const forecastData = await forecastResponse.json();
    
    displayCurrentWeather(currentData, city);
    displayExtendedForecast(forecastData);
    
    
}


function displayCurrentWeather(data,city) {
    displayWeather.classList.remove("hidden")

    cityName.innerHTML = data.name+` (${formatDateYYYYMMDD(new Date(data.dt*1000))})`

    temp.innerHTML = `${Math.round(data.main.temp)}°`
    unitToggle.textContent = 'C';
    isCelsius = true;
    wind.innerHTML = data.wind.speed
    humidity.innerHTML = data.main.humidity

    const iconCode = data.weather[0].icon;
    const isNight = iconCode.endsWith('n');
    weatherIcon.className = `fas ${getWeatherIcon(data.weather[0].main,isNight)} text-6xl ${isNight}?'text-blue-200':'text-yellow-300'`;
    
    weatherCondition.innerHTML = data.weather[0].description

    
    
}



function displayExtendedForecast(data){
    forecastContainer.innerHTML=''

    const dailyForecasts={}
    data.list.forEach(item=>{
        const date=item.dt_txt.split(" ")[0]
        
        if(!dailyForecasts[date]){
            dailyForecasts[date]=[]
        }
        dailyForecasts[date].push(item)
    })
    
    
 
    Object.keys(dailyForecasts).slice(1,6).forEach(date=>{
        
        const dayData=dailyForecasts[date][0]
        
        const card=createForecastCard(date,dayData)
        forecastContainer.appendChild(card)

    })
    

}



function getWeatherIcon(condition,isNight) {
    const icons = {
        'Clear':  isNight ? 'fa-moon' :'fa-sun',
        'Clouds': isNight ? 'fa-cloud-moon' : 'fa-cloud-sun',
        'Rain': isNight ? 'fa-cloud-moon-rain' : 'fa-cloud-sun-rain',
        'Thunderstorm': 'fa-bolt',
        'Snow': 'fa-snowflake',
        'Mist': 'fa-smog',
        'Fog': 'fa-smog',
        'Haze': 'fa-smog'
    };
    return icons[condition] || 'fa-sun';
}

function formatDateYYYYMMDD(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}


function createForecastCard(date,dayData){
    
    const card=document.createElement("div")
    card.className="flex flex-col gap-2  bg-gray-500 p-4 border rounded-md items-center"
    
    
    
    card.innerHTML=`
        <h3 class="text-xl">${date}</h3>
        <i class="fas ${getWeatherIcon(dayData.weather[0].main)} text-xl mx-auto"></i>
        <p> ${Math.round(dayData.main.temp)}°C</p>
        <p> ${dayData.main.humidity} %</p>
        <p> ${dayData.wind.speed} m/s</p>
    `;

        
        
    return card

}


/* -------- SHOW RECENT SEARCHES ON CLICK -------- */
searchInput.addEventListener("focus", () => {
    showRecentSearches();
});

/* -------- FILTER WHILE TYPING -------- */
searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();
    suggestionsBox.innerHTML = "";

    if (!value) {
        showRecentSearches();
        return;
    }

    const matches = recentCities
        .filter(city => city.toLowerCase().includes(value))
        .slice(0, 5);

    renderSuggestions(matches);
});

/* -------- CLICK OUTSIDE TO CLOSE -------- */
document.addEventListener("mousedown", (e) => {
    if (!e.target.closest(".search-container")) {
        suggestionsBox.style.display = "none";
    }
});

/* -------- FUNCTIONS -------- */

function showRecentSearches() {
    suggestionsBox.innerHTML = "";

    const lastFive = recentCities.slice(0, 5);
    renderSuggestions(lastFive);
}

function renderSuggestions(list) {
    if (list.length === 0) {
        suggestionsBox.style.display = "none";
        return;
    }

    list.forEach(city => {
        const li = document.createElement("li");
        li.className="p-2.5 hover:bg-gray-200"
        li.textContent = city;

        //To interactive with li elements
        li.addEventListener("mousedown", (e) => {
            e.preventDefault()
            searchInput.value = city;
            suggestionsBox.style.display = "none";

            // Call your weather function here
            getWeatherByCity(city);
        });

        suggestionsBox.appendChild(li);
    });

    suggestionsBox.style.display = "block";
}

/* -------- SAVE SEARCH -------- */
function saveSearch(city) {
    if (!recentCities.includes(city)) {
        recentCities.unshift(city);
        if (recentCities.length > 5) recentCities.pop();
        localStorage.setItem("recentCities", JSON.stringify(recentCities));
    }
}


function toggleTemperatureUnit(){
    const currentTemp = parseInt(temp.textContent);
    if(isCelsius){
        const fahrenheit = Math.round((currentTemp*9/5)+32)
        temp.textContent=`${fahrenheit}°`
        unitToggle.textContent = 'F';
    }
    else{
        const celsius = Math.round((currentTemp-32)*5/9)
        temp.textContent=`${celsius}°`
        unitToggle.textContent = 'C';
    }
    isCelsius=!isCelsius
}
