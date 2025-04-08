import { WEATHER_KEY, WEATHER_META } from "./config.js";

document.addEventListener("DOMContentLoaded", async () => {
  const today = getTodayYYYYMMDD();
  const weatherInfo = await getWeather(today);
  const parseWeatherDatas = parseWeatherData(weatherInfo);
  displayWeatherInfo(parseWeatherDatas);
});

function getTodayYYYYMMDD() {
  let today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const date = String(today.getDate()).padStart(2, "0");
  return `${year}${month}${date}`;
}

const getWeather = async (date) => {
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
