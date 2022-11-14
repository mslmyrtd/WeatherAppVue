<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import CityList from "@/components/CityList.vue";
import CityCardSkeleton from "@/components/CityCardSkeleton.vue";
import { XIcon } from "@heroicons/vue/outline";

const router = useRouter();
const mapboxAPIKey =
  "pk.eyJ1IjoibXVzbHVtMTIzIiwiYSI6ImNsODNjbHhuNDA0a3ozdW56dHRjNnM1b3cifQ.c4qkTXeGlDAvwqvuaszDHw";

const mapboxSearchResults = ref(null);
const searchQuery = ref("");
const searchError = ref(null);
const queryTimeout = ref(null);

const previewCity = (searchResult) => {
  const [city, state] = searchResult.place_name.split(",");
  router.push({
    name: "cityView",
    params: { state: state.replaceAll(" ", ""), city: city },
    query: {
      lat: searchResult.geometry.coordinates[1],
      lng: searchResult.geometry.coordinates[0],
      preview: true,
    },
  });
};

const getSearchResults = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      try {
        const result = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxAPIKey}&types=place`
        );
        mapboxSearchResults.value = result.data.features;
      } catch {
        searchError.value = true;
      }
      return;
    }
    mapboxSearchResults.value = null;
  }, 500);
};

const handleClear = () => {
  setTimeout(() => {
    searchQuery.value = "";
    mapboxSearchResults.value = null;
  }, 300);
};
</script>

<template>
  <main class="container dark:text-slate-100">
    <div class="pt-4 mb-8 relative flex justify-end items-center lg:w-2/4 sm:w-full">
      <input
        type="text"
        placeholder="Search for a city or state"
        v-model="searchQuery"
        @input="getSearchResults"
        class="py-2 px-1 w-full bg-transparent border-b-2 dark:border-b focus:border-white focus:outline-none focus:shadow-sm dark:placeholder-slate-100"
      />
      <XIcon
        class="w-6 h-6 cursor-pointer absolute mr-2"
        v-if="searchQuery.length > 0"
        @click="handleClear"
      />
      <ul
        class="absolute bg-slate-100 rounded-md w-full shadow-md py-2 px-1 top-[66px] z-10 dark:text-black"
        v-if="mapboxSearchResults"
      >
        <p v-if="searchError">Sorry, something went wrong, please try again.</p>
        <p v-if="mapboxSearchResults.length === 0">
          No results match your query, try a different term.
        </p>
        <template v-else>
          <li
            v-for="searchResult in mapboxSearchResults"
            :key="searchResult.id"
            class="py-2 cursor-pointer pl-1 hover:bg-blue-200 rounded-md"
            @click="previewCity(searchResult)"
          >
            {{ searchResult.place_name }}
          </li>
        </template>
      </ul>
    </div>
    <div class="flex flex-col gap-4">
      <Suspense>
        <CityList />
        <template #fallback>
          <CityCardSkeleton />
        </template>
      </Suspense>
    </div>
  </main>
</template>
