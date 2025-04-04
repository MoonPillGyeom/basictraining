document.addEventListener("DOMContentLoaded", () => {
  getCurrentWeek();
  getCurrentMonthInDays();
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const calendarDatas = document.getElementById("calendarDatas");

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const currentDay = today.getDay();

  const dayOfWeek = document.getElementById("dayOfWeek");

  const currentDate = document.getElementById("currentDate");
  currentDate.innerText = getCurrentDate();
});

function getCurrentDate() {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const currentDay = today.getDate();
  return `${currentYear}년 ${currentMonth + 1}월 ${currentDay}일`;
}

function getCurrentWeek() {
  const DAYS = ["일", "월", "화", "수", "목", "금", "토"];
  return DAYS.forEach((data) => {
    const p = document.createElement("p");
    p.textContent = data;
    dayOfWeek.appendChild(p);
  });
}

function getCurrentMonthInDays() {
  const calendarDatas = document.getElementById("calendarDatas");
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  for (let i = 1; i <= daysInMonth; i++) {
    const daySpan = document.createElement("span");
    daySpan.textContent = i;
    calendarDatas.appendChild(daySpan);
  }
}
