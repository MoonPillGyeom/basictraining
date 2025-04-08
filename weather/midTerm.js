/**
 * 초단기예보가 아니라
 * 단기,중단기 일 경우 버튼으로 다음날,전날 데이터 받기 가능
 * 데이터 요청 허가 받는데 3시간 정도 걸린다해서 우선 코드만 작성
 */

import { WEATHER_KEY, WEATHER_META } from "./config.js";
let baseDate = new Date();
document.addEventListener("DOMContentLoaded", async () => {
  renderWeather();

  document.getElementById("prevBtn").addEventListener("click", () => {
    baseDate.setDate(baseDate.getDate() - 1);
    renderWeather();
  });

  document.getElementById("nextBtn").addEventListener("click", () => {
    baseDate.setDate(baseDate.getDate() + 1);
    renderWeather();
  });
  renderWeather();
});

function getTodayYYYYMMDD(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
}

const getWeather = async (date) => {
  console.log(date);
  const serviceKey = WEATHER_KEY;
  const data = await fetch(
    `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=${serviceKey}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${date}&base_time=0600&nx=89&ny=76`
  ).then((res) => res.json());
  return data.response;
};

function parseWeatherData(weatherInfo) {
  console.log(weatherInfo);
  const items = weatherInfo.body.items.item;

  return items.reduce((acc, curr) => {
    acc[curr.category] = curr.obsrValue;
    return acc;
  }, {});
}

function displayWeatherInfo(data) {
  const container = document.getElementById("todayWeather");
  container.innerHTML = "";
  Object.entries(data).forEach(([key, value]) => {
    const meta = WEATHER_META[key];
    if (meta) {
      const p = document.createElement("p");
      p.textContent = `${meta.label}는 ${value}${meta.unit}입니다`;
      container.appendChild(p);
    }
  });
}
async function renderWeather() {
  const dateStr = getTodayYYYYMMDD(baseDate);
  const weatherInfo = await getWeather(dateStr);
  const parsed = parseWeatherData(weatherInfo);
  displayWeatherInfo(parsed);
}
