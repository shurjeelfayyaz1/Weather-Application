let weather = {
    apiKey: "1c8b7ccf7e35bbd60882a2e6639cb645",
    async fetchWeatherByCity(city) {
        try {
            const cachedData = localStorage.getItem(city);
            if (cachedData) {
                this.displayWeather(JSON.parse(cachedData));
                return;
            }

            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`);
            if (!response.ok) {
                throw new Error('Could not fetch weather data');
            }
            
            const data = await response.json();
            localStorage.setItem(city, JSON.stringify(data));
            this.displayWeather(data);
        } catch (error) {
            console.error(error);
            alert(`Could not fetch weather data for ${city}`);
        }
    },
    async fetchWeatherByZip(zipcode) {
        try {
            const cachedData = localStorage.getItem(zipcode);
            if (cachedData) {
                this.displayWeather(JSON.parse(cachedData));
                return;
            }

            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},pk&appid=${this.apiKey}&units=metric`);
            if (!response.ok) {
                throw new Error('Could not fetch weather data');
            }

            const data = await response.json();
            localStorage.setItem(zipcode, JSON.stringify(data));
            this.displayWeather(data);
        } catch (error) {
            console.error(error);
            alert(`Could not fetch weather data for ${zipcode}`);
        }
    },
    displayWeather(data) {
        const {name} = data;
        const{icon, description} = data.weather[0];
        const{temp,humidity} = data.main;
        const{speed} = data.wind;

        console.log(name,icon,description,temp,humidity,speed);
        document.querySelector(".city").innerHTML= "Weather in " + name;
        document.querySelector(".icon").src="http://openweathermap.org/img/w/" + icon + ".png";
        document.querySelector(".description").innerHTML = description;
        document.querySelector(".temp").innerHTML = temp + "°C";
        document.querySelector(".humidity").innerHTML = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerHTML = "Wind speed: " + speed + "km/h";
    },
    search() {
        const searchQuery = document.querySelector(".search-bar").value.trim();
        if (!searchQuery) {
            return;
        }
        if (isNaN(searchQuery)) {
            this.fetchWeatherByCity(searchQuery);
        } else {
            this.fetchWeatherByZip(searchQuery);
        }
    }
};

document.querySelector(".search button").addEventListener("click", function() {
    weather.search();
});

window.addEventListener('load', () => {
    const defaultCity = 'Lahore';
    const cachedWeather = JSON.parse(localStorage.getItem(defaultCity));
    if (cachedWeather) {
      weather.displayWeather(cachedWeather);
    } else {
      weather.fetchWeatherByCity(defaultCity);
    }
});
