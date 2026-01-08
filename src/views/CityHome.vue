<script setup>
import { useAqiStore } from '@/stores/useAqiStore';
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia'; 
import { useRouter } from 'vue-router'

const store = useAqiStore()
const { city, loading, error } = storeToRefs(store)
const router = useRouter()

function goCity (city){
  router.push(`/city/${city}`)
}
</script>
<template>
  <div class="aqi-wrap">
    <h1>台灣空氣品質 AQI</h1>
    <p v-if="loading">資料載入中...</p>
    <p v-if="error">{{ error }}</p>
    <ul class="aqi-list">
      <li
        v-for="item in city"
        :key="item"
        style="cursor:pointer"
      >
        <RouterLink :to="`/city/${item}`">{{ item }}</RouterLink>
      </li>
    </ul>
  </div>
</template>
<style scoped>
.aqi-wrap {
  display: flex;
  flex-direction: column;
}
.aqi-list {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
}
</style>