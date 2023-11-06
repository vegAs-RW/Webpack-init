import "./style.css";
import clearImg from "./assets/clear.png"
import rainImg from "./assets/rain.png"
import cloudImg from "./assets/clouds.png"
import drizzleImg from "./assets/drizzle.png"
import mistImg from './assets/mist.png'


const API_KEY = process.env.API_KEY
const API_URL =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=fr";

const searchInput = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherImg = document.querySelector('.weather-img')

const fetchApi = async (city) => {
  try {
    const response = await fetch(API_URL + `&q=${city}` + `&appid=${API_KEY}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

const displayData = async () => {
  try {
    const data = await fetchApi(searchInput.value);
    console.log(data);
    document.querySelector(".city").innerHTML = data.name;
    const temperature = data.main.temp.toFixed(0);
    document.querySelector(".temp").innerHTML = `${temperature} °C`;
    const humidity = data.main.humidity.toFixed(0);
    document.querySelector(".humidity").innerHTML = `${humidity} %`;
    const windSpeed = (data.wind.speed * 3.6).toFixed(0);
    document.querySelector(".wind").innerHTML = `${windSpeed} km/h`;
    document.querySelector('.error').style.visibility = 'hidden'

    if(data.weather[0].main =='Clear') {
        weatherImg.src = clearImg
    } else if (data.weather[0].main =='Rain') {
        weatherImg.src = rainImg
    } else if (data.weather[0].main =='Drizzle') {
        weatherImg.src = drizzleImg
    } else if (data.weather[0].main =='Clouds') {
        weatherImg.src = cloudImg
    } else if (data.weather[0].main =='Mist') {
        weatherImg.src = mistImg
    }

  } catch (err) {
    document.querySelector(".city").innerHTML = "Ville introuvable";
    document.querySelector('.error').style.visibility = 'visible'
    document.querySelector(
      ".error"
    ).innerHTML = `Assurez vous d'entrer un nom de ville valide !`;
  }
};

searchBtn.addEventListener("click", () => {
  displayData();
});
