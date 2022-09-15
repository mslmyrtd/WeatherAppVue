<script setup>
import { ref } from "vue";
import axios from "axios";
const mapboxAPIKey =
  "pk.eyJ1IjoibXVzbHVtMTIzIiwiYSI6ImNsODNjbHhuNDA0a3ozdW56dHRjNnM1b3cifQ.c4qkTXeGlDAvwqvuaszDHw";

const mapboxSearchResults = ref(null);
const searchQuery = ref("");

const queryTimeout = ref(null);

const getSearchResults = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
        const result = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxAPIKey}&types=place`
        );
        mapboxSearchResults.value = result.data.features;
      mapboxSearchResults.value=result.data.features;
      console.log(result.data.features);
      return;
    }
    mapboxSearchResults.value = null;
  }, 500);
};
</script>

<template>
  <main class="container">
    <div class="pt-4 mb-8 relative">
      <input
        type="text"
        placeholder="Search for a city or state"
        v-model="searchQuery"
        @input="getSearchResults"
        class="py-2 px-1 w-full bg-transparent border-b focus:border-slate-300 focus:outline-none focus:shadow-sm"
      />
      <ul class="absolute bg-slate-300 w-full shadow-md py-2 px-1 top-[66px]" v-if="mapboxSearchResults">
        <li v-for="searchResult in mapboxSearchResults" :key="searchResult.id" class="py-2 cursor-pointer hover:bg-slate-400">{{searchResult.place_name}}</li>
      </ul>
    </div>
  </main>
</template>
