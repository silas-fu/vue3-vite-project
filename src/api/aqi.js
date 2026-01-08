const BASE_URL = 'https://data.moenv.gov.tw/api/v2/aqx_p_432'
const API_KEY = '286801bc-6df1-43b6-830a-17c2a2ca2392'

export async function fetchAQIData(){
    const url = `${BASE_URL}?offset=0&limit=1000&api_key=${API_KEY}`
    const res = await fetch(url)

    if(!res.ok){
      throw new Error('API request failed!')
    }

    const data = await res.json()
    return data.records
}