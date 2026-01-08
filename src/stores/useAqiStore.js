import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { fetchAQIData } from '@/api/aqi';

export const useAqiStore = defineStore('aqi',() => {
    //state
    const list = ref([]);
    const loading = ref(false);
    const error = ref(null);

    //getter
    const city = computed(()=>{
      //用 Set 產生不重複的城市清單，如果後續要做城市分組或統計 AQI 次數，改用 Map 來處理。
      return[...new Set(list.value.map(item => item.county))]
    })

    const getByCity = (city) => {
      return list.value.filter(item => item.county === city)
    }

    // action
    async function fetchAQI (){
      loading.value = true
      error.value = null
      
      try {
        list.value = await fetchAQIData();    
      } catch(err) {
        error.value = err.message
      } finally {
        loading.value = false
      }
    }

    return {
        list,
        loading,
        error,
        city,
        getByCity,
        fetchAQI,
    }
})