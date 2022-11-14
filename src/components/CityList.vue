<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import CityCard from "./CityCard.vue";

const router=useRouter()

const savedCities = ref([]);

const getCities = async () => {
  if (localStorage.getItem("savedCities")) {
    savedCities.value = JSON.parse(localStorage.getItem("savedCities"));
  }
  const requests = [];
  savedCities.value.forEach((city) => {
    requests.push(
      axios(
        `https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lng}&appid=f2fe6b79af3ac3ebc408889313114753&units=metric`
      )
    );
  });
  const weatherData = await Promise.all(requests);
  await new Promise((res)=>setTimeout(res,500))
  weatherData.forEach((value, index) => {
    savedCities.value[index].weather = value.data;
  });
};
await getCities();
const goToCityView=(city)=>{
  router.push({
    name:'cityView',
    params:{
      state:city.state,
      city:city.city},
      query:{id:city.id, lat:city.coords.lat,
      lng:city.coords.lng},
    })
  }
</script>

<template>
  <div v-for="city in savedCities" :key="city.id">
    <CityCard :city="city" @click="goToCityView(city)"/>
    <p v-if="savedCities.length===0">No location added. To start tracking a location, search in the field above.</p>
  </div>
</template>
