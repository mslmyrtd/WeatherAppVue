<script setup>
import SiteNavigation from "@/components/SiteNavigation.vue";
import { RouterView } from "vue-router";
</script>

<template>
 <div class="flex flex-col min-h-screen font-Roboto bg-slate-200">
     <SiteNavigation />
  <RouterView />
 </div>
</template>

<style scoped></style>
