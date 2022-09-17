<script setup>
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute();
const apiKey = "f2fe6b79af3ac3ebc408889313114753";
const urlBase = "https://api.openweathermap.org/data/2.5";

const getWeatherData = async () => {
  try {
    const weatherData = await axios(
      `${urlBase}/onecall?lat=${route.query.lat}&lon=${route.query.lng}&exclude={part}&appid=${apiKey}&units=metric`
    );
    //cal current date & time
    const localOffset = new Date().getTimezoneOffset() * 60000;
    console.log(localOffset)
    const utc = weatherData.data.current.dt * 1000 + localOffset;
     console.log(utc)
    weatherData.data.currentTime =
      utc + 1000 * weatherData.data.timezone_offset;
    // cal hourly weather offset
    weatherData.data.hourly.forEach((hour) => {
      const utc = hour.dt * 1000 + localOffset;
      hour.currentTime = utc + 1000 * weatherData.data.timezone_offset;
    });
    return weatherData;
  } catch (error) {
    console.log(error);
  }
};
const weatherData = await getWeatherData();
console.log(weatherData);
</script>

<template>
  <div></div>
</template>
