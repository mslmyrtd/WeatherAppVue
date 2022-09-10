<script setup>
import { ref } from 'vue';
import WeatherView from '@/views/WeatherView.vue';

const cityName=ref('')
const weather=ref({})
const apiKey='f2fe6b79af3ac3ebc408889313114753'
const urlBase='https://api.openweathermap.org/data/2.5'
const getWeather=async(e)=>{
  if(e.key=='Enter'){
    await fetch(`${urlBase}/weather?q=${cityName.value}&units=metric&appid=${apiKey}`).then(res=>{
      return res.json();
    }).then(setResults);
  }
}
const setResults=(results)=>{
  weather.value=results;
console.log( weather.value)
}
</script>
<template>
  <header
    class="
      bg-sky-600 shadow-sm lg:static lg:overflow-y-visible
    "
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-1">
      <div
        class="relative flex justify-between lg:gap-20 xl:grid xl:grid-cols-12"
      >
        <div
          class="flex md:absolute md:inset-y-0 md:left-0 lg:static xl:col-span-2"
        >
          <div class="flex flex-shrink-0 items-center text-white font-extrabold lg:text-5xl">
            <p>WEATHER</p>
          </div>
        </div>
        <div class="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-10">
          <div
            class="flex items-center px-6 py-4 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0"
          >
            <div class="w-full">
              <label for="search" class="sr-only">Search</label>
              <div class="relative">
                <div
                  class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
                >
                  <!-- <BeakerIcon
                    class="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  /> -->
                </div>
                <input
                v-model="cityName"
                  id="search"
                  name="search"
                  class="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-indigo-500 focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Search"
                  type="search"
                  @keypress="getWeather"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex items-center md:absolute md:inset-y-0 md:right-0 lg:hidden"
        >
          <!-- Mobile menu button -->
        </div>
      </div>
    </div>
  </header>
 <WeatherView :weatherInfo='weather'/>
</template>
