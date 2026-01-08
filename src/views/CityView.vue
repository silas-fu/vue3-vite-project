<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAqiStore } from '@/stores/useAqiStore'
import { useRouter } from 'vue-router'

const route = useRoute()
const store = useAqiStore()
const cityName = route.params.cityName
const router = useRouter()

const goBack = () => {
  router.back()
}

onMounted(async () => {
  if (store.list.length === 0) {
    await store.fetchAQI()
  }
})

const cityData = computed(() => {
  return store.getByCity(cityName)
})

</script>
<template>
<div class="">
  <h2>{{ cityName }} 空氣品質</h2>
  <!-- 加入 loading 狀態 -->
    <p v-if="store.loading">載入中...</p>
    <p v-else-if="store.error">錯誤：{{ store.error }}</p>
    <p v-else-if="cityData.length === 0">此城市目前無監測資料</p>
  <ul>
    <li v-for="item in cityData" :key="item.siteid">
      測站：{{ item.sitename }}｜
      AQI：{{ item.aqi }}｜
      PM2.5：{{ item['pm2.5'] }}
    </li>
  </ul>
  <button class="back-btn" @click="goBack">← 返回上一頁</button>
  </div>
</template>
<style scoped>
.back-btn {
  padding: 8px 16px;
  margin-bottom: 16px;
  background: #f0f0f0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.back-btn:hover {
  background: #e0e0e0;
}
</style>