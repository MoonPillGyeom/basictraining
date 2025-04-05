const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

document.addEventListener("DOMContentLoaded", () => {
  const today = new Date();
  let currentYear = today.getFullYear();
  let currentMonth = today.getMonth();
  const currentDay = today.getDate();

  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  prevBtn.addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    updateCaleander(currentYear, currentMonth);
  });

  nextBtn.addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentMonth++;
    }
    updateCaleander(currentYear, currentMonth);
  });

  function updateCaleander(year, month) {
    const day = new Date().getDate();
    console.log(day);
    getCurrentDate(year, month, day);
    getCurrentMonthInDays(year, month);
  }

  getCurrentDate(currentYear, currentMonth, currentDay);
  getCurrentWeek();
  getCurrentMonthInDays(currentYear, currentMonth);
});

function getCurrentDate(currentYear, currentMonth, currentDay) {
  const currentDate = document.getElementById("currentDate");
  currentDate.innerText = `${currentYear}년 ${
    currentMonth + 1
  }월 ${currentDay}일`;
}

function getCurrentWeek() {
  DAYS.forEach((data) => {
    const p = document.createElement("p");
    p.textContent = data;
    dayOfWeek.appendChild(p);
  });
}

function getCurrentMonthInDays(currentYear, currentMonth) {
  const calendarDatas = document.getElementById("calendarDatas");
  calendarDatas.innerHTML = "";
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  getCurrentMonthInEmptyDays(currentYear, currentMonth, calendarDatas);
  for (let i = 1; i <= daysInMonth; i++) {
    const daySpan = document.createElement("span");
    daySpan.textContent = i;
    calendarDatas.appendChild(daySpan);
  }
}

function getCurrentMonthInEmptyDays(currentYear, currentMonth) {
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const startDayOfWeek = firstDayOfMonth.getDay();

  for (let i = 1; i <= startDayOfWeek; i++) {
    const emptyDate = document.createElement("div");
    calendarDatas.appendChild(emptyDate);
  }
}
