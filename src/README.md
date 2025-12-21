# Weather Forecast Application

A responsive weather forecast application built with JavaScript, HTML, and Tailwind CSS. This app allows users to search for weather forecasts by city name or use their current location, view current weather conditions, and see a 5-day extended forecast.

## Features

- **City Search**: Search for weather forecasts by entering a city name
- **Current Location**: Get weather data for your current location using geolocation
- **Recent Cities**: Dropdown menu with recently searched cities (stored in localStorage)
- **Current Weather**: Display temperature, humidity, wind speed, and weather description
- **Temperature Toggle**: Switch between Celsius and Fahrenheit for today's temperature
- **Extreme Weather Alerts**: Custom alerts for temperatures above 40°C
- **Dynamic Background**: Background changes based on weather conditions (e.g., rainy background for rain)
- **Extended Forecast**: 5-day forecast with daily temperature, humidity, and wind information
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Error Handling**: Graceful error messages for invalid inputs or API failures

## Technologies Used

- **HTML5**: Structure and layout
- **Tailwind CSS**: Styling and responsive design
- **JavaScript (ES6+)**: Functionality and API integration
- **OpenWeatherMap API**: Weather data source
- **Font Awesome**: Icons for weather conditions

## Setup Instructions

1. **Get an API Key**:
   - Sign up for a free account at [OpenWeatherMap](https://openweathermap.org/api)
   - Generate an API key from your account dashboard

2. **Configure the API Key**:
   - Open `script.js`
   - Replace `'YOUR_OPENWEATHERMAP_API_KEY'` with your actual API key:
     ```javascript
     const API_KEY = 'your_actual_api_key_here';
     ```

3. **Open the Application**:
   - Open `index.html` in your web browser
   - Alternatively, serve the files using a local server (recommended for better functionality):
     ```bash
     # Using Python (if installed)
     python -m http.server 8000
     
     # Using Node.js (if installed)
     npx serve .
     ```
   - Navigate to `http://localhost:8000` (or appropriate port)

## Usage

1. **Search by City**:
   - Enter a city name in the search input
   - Click the search button or press Enter
   - The app will display current weather and 5-day forecast

2. **Use Current Location**:
   - Click the "Use Current Location" button
   - Allow location access when prompted
   - Weather data for your location will be displayed

3. **Recent Cities**:
   - After searching cities, they appear in the dropdown
   - Select a city from the dropdown to quickly view its weather

4. **Temperature Unit**:
   - Click the °C/°F button next to the temperature to toggle units

## API Reference

This application uses the OpenWeatherMap API:
- **Current Weather**: `https://api.openweathermap.org/data/2.5/weather`
- **5-Day Forecast**: `https://api.openweathermap.org/data/2.5/forecast`
- **Geocoding**: `https://api.openweathermap.org/geo/1.0/direct`

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge



## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons from [Font Awesome](https://fontawesome.com/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)



## GitHub Repository Link
https://github.com/Narendra1102/Weather-Forecast-Application