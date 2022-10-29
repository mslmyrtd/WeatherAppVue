<script setup>
import axios from "axios";
import { useRoute, useRouter } from "vue-router";


const router=useRouter()
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
    console.log(localOffset);
    const utc = weatherData.data.current.dt * 1000 + localOffset;
    console.log(utc);
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

const removeCity=()=>{
  const cities=JSON.parse(localStorage.getItem("savedCities"));
  const updatedCities=cities.filter((city)=>city.id !==route.query.id);
  localStorage.setItem('savedCities',JSON.stringify(updatedCities));
  router.push({
    name:"home"
  })
}

</script>

<template>
  <div class="flex flex-col flex-1 items-center">
    <!-- Banner -->
    <div class="p-4 bg-slate-300 w-full text-center" v-if="route.query.preview">
      <p>
        You are currently previewing this city, click the "+" icon to start
        tracking this city.
      </p>
    </div>
    <!-- Weather Overview -->
    <div class="flex flex-col items-center py-12">
      <h1 class="text-4xl mb-2">{{ route.params.city }}</h1>
      <p class="text-sm mb-12">
        {{
          new Date(weatherData.currentTime).toLocaleDateString("en-us", {
            weekday: "short",
            day: "2-digit",
            month: "long",
          })
        }}
        {{
          new Date(weatherData.currentTime).toLocaleTimeString("en-us", {
            timeStyle: "short",
          })
        }}
      </p>
      <p class="text-8xl mb-8">
        {{ Math.round(weatherData.current.temp) }}&deg;
      </p>

      <p>Feels like {{ Math.round(weatherData.current.feels_like) }}&deg;</p>
      <p class="capitalize">
        {{ weatherData.current.weather[0].description }}&deg;
      </p>
      <img
        class="w-[150px] h-auto"
        :src="`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`"
        alt=""
      />
    </div>
    <hr class="border-black border-opacity-10 border w-full" />
    <!-- Hourly Weather -->
    <div class="max-w-screen-md w-full py-12">
      <h2 class="mb-4">Hourly Weather</h2>
      <div class="flex gap-10 overflow-x-scroll">
        <div
          v-for="hourData in weatherData.hourly"
          :key="hourData.dt"
          class="flex flex-col gap-4 items-center"
        >
          <p class="whitespace-nowrap text-md">
            {{
              new Date(hourData.currentTime).toLocaleTimeString("en-us", {
                hour: "numeric",
              })
            }}
          </p>
          <img
            :src="`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`"
            alt=""
            class="w-auto h-[50px] object-cover"
          />
          <p class="text-xl">{{ Math.round(hourData.temp) }}&deg;</p>
        </div>
      </div>
    </div>
    <hr class="border-black border-opacity-10 border w-full" />
    <!--Weekly Weather -->
    <div class="max-w-screen-md w-full py-12">
      <div>
        <h2 class="mb-4">7 Day Forecast</h2>
        <div
          v-for="day in weatherData.daily"
          :key="day.dt"
          class="flex items-center"
        >
          <p class="flex-1">
            {{
              new Date(day.dt * 1000).toLocaleDateString("en-us", {
                weekday: "long",
              })
            }}
          </p>
          <img
            :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`"
            alt=""
            class="w-[50px] h-[50px] object-cover"
          />
          <div class="flex gap-2 flex-1 justify-end">
            <p>H: {{ Math.round(day.temp.max) }}</p>
            <p>L: {{ Math.round(day.temp.min) }}</p>
          </div>
        </div>
      </div>
    </div>
    <div
      class="flex items-center gap-2 py-12 text-slate-600 cursor-pointer duration-150 hover:text-red-500"
      @click="removeCity"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
        />
      </svg>
      <p>Remove City</p>
    </div>
  </div>
</template>
