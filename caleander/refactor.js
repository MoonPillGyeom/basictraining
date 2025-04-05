const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

document.addEventListener("DOMContentLoaded", () => {
  const today = new Date();
  const { updateCalendar, prev, next } = createCalendarManager(
    today.getFullYear(),
    today.getMonth()
  );

  getCurrentWeek();
  updateCalendar();

  document.getElementById("prevBtn").addEventListener("click", prev);
  document.getElementById("nextBtn").addEventListener("click", next);
});

// ----------------------------------------------------
// 내부 변수로 값 저장해서 사용
function createCalendarManager(initialYear, initialMonth) {
  let year = initialYear;
  let month = initialMonth;

  // Btn 클릭시 업데이트, 해당하는 년,월 표시 함수
  function updateCalendar() {
    getCurrentDate(year, month);
    getCurrentMonthInDays(year, month);
  }

  function prev() {
    month--;
    if (month < 0) {
      month = 11;
      year--;
    }
    updateCalendar();
  }

  function next() {
    month++;
    if (month > 11) {
      month = 0;
      year++;
    }
    updateCalendar();
  }

  return { updateCalendar, prev, next };
}

// ----------------------------------------------------
function getCurrentDate(year, month) {
  const currentDate = document.getElementById("currentDate");
  currentDate.innerText = `${year}년 ${month + 1}월`;
}

// ----------------------------------------------------
function getCurrentWeek() {
  const dayOfWeek = document.getElementById("dayOfWeek");
  DAYS.forEach((day) => {
    const p = document.createElement("p");
    p.textContent = day;
    dayOfWeek.appendChild(p);
  });
}

// ----------------------------------------------------
function getCurrentMonthInDays(year, month) {
  const calendarDatas = document.getElementById("calendarDatas");
  calendarDatas.innerHTML = "";
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  getCurrentMonthInEmptyDays(year, month, calendarDatas);

  for (let i = 1; i <= daysInMonth; i++) {
    const daySpan = document.createElement("span");
    daySpan.textContent = i;
    calendarDatas.appendChild(daySpan);
  }
}

// ----------------------------------------------------
function getCurrentMonthInEmptyDays(year, month, container) {
  const firstDay = new Date(year, month, 1).getDay();
  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement("span");
    container.appendChild(empty);
  }
}
