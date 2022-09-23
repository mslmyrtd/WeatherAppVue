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
    return weatherData.data;
  } catch (error) {
    console.log(error);
  }
};
const weatherData = await getWeatherData();
console.log(weatherData);
</script>

<template>
  <div class="flex flex-col flex-1 items-center" >
    <!-- Banner -->
    <div class=" p-4 bg-slate-300 w-full text-center" v-if="route.query.preview" >
    <p>You are currently previewing this city, click the "+" icon to start tracking this city.</p>
    </div>
    <!-- Weather Overview -->
<div class="flex flex-col items-center py-12" >
  <h1 class="text-4xl mb-2">{{route.params.city}}</h1>
  <p class="text-sm mb-12">
    {{
      new Date(weatherData.currentTime).toLocaleDateString(
        "en-us",
        {
          weekday:"short",
          day:"2-digit",
          month:"long",
        }
      )
    }}
    {{
      new Date(weatherData.currentTime).toLocaleTimeString(
        "en-us",
        {
          timeStyle:"short",
        }
      )
    }}
  </p>
  <p class="text-8xl mb-8">{{Math.round(weatherData.current.temp)}}&deg;</p>
  
    <p>Feels like {{Math.round(weatherData.current.feels_like)}}&deg;</p>
    <p class="capitalize">{{weatherData.current.weather[0].description}}&deg;</p>
    <img class="w-[150px] h-auto" :src="`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`" alt="">

</div>
<hr class="border-black border-opacity-10 border w-full" />
<!-- Hourly Weather -->
<div class="max-w-screen-md w-full py-12 ">
  <h2 class="mb-4">Hourly Weather</h2>
  <div class="flex gap-10 overflow-x-scroll" >
    <div v-for="hourData in weatherData.hourly" :key="hourData.dt" class="flex flex-col gap-4 items-center">
    <p class="whitespace-nowrap text-md" >
{{
  new Date(
    hourData.currentTime
  ).toLocaleTimeString("en-us",{
    hour:"numeric",
  })
}} </p>
<img :src="`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`" alt="" class="w-auto h-[50px] object-cover">
<p class="text-xl" >{{Math.round(hourData.temp)}}&deg;</p>
    </div>
  </div>
</div>
<hr class="border-black border-opacity-10 border w-full">
<!--Weekly Weather -->
<div class="max-w-screen-md w-full py-12">
  <div>
    <h2 class="mb-4">7 Day Forecast</h2>
    <div v-for="day in weatherData.daily" :key="day.dt" class="flex items-center">
    <p class="flex-1">
      {{
        new Date(day.dt*1000).toLocaleDateString(
          "en-us",
          {
            weekday:"long"
          }
        )
      }}
    </p>
    <img :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`" alt="" class="w-[50px] h-[50px] object-cover">
<div class="flex gap-2 flex-1 justify-end">
<p>H: {{Math.round(day.temp.max)}}</p>
<p>L: {{Math.round(day.temp.min)}}</p>
</div>
    </div>
  </div>
</div>
  </div>
</template>
