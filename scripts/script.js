"use strict";
const dayOfWeek = document.getElementById("dayOfWeek");
const outputPreA = document.createElement("p");
const outputA = document.createElement("p");
const outputB = document.createElement("p");
const outputPostB = document.createElement("p");
dayOfWeek.appendChild(outputPreA);
dayOfWeek.appendChild(outputA);
dayOfWeek.appendChild(outputB);
dayOfWeek.appendChild(outputPostB);
const updateDate = function () {
  const week = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];
  //const dayOfWeek = document.getElementById("dayOfWeek"); // Получаем div куда всё будем вставлять
  let stringMonth = "";
  const todayDay = new Date();
  const newYear = new Date("01 january 2022");
  //console.log("newYear: ", newYear);
  const year = todayDay.getFullYear();
  const month = todayDay.getMonth();
  const day = todayDay.getDate();
  const hour = todayDay.getHours();
  const minute = todayDay.getMinutes();
  const second = todayDay.getSeconds();
  const minuteString = ["минут", "минута", "минуты"],
    hourString = ["часов", "час", "часа"],
    secondString = ["секунд", "секунда", "секунды"];

  const declension = function (digits, arr) {
    let digitsDiv10 = digits % 10;
    let digitsDiv100 = digits % 100;
    if (
      (digitsDiv100 >= 11 && digitsDiv100 <= 19) ||
      digitsDiv10 >= 5 ||
      digitsDiv10 === 0
    ) {
      return arr[0];
    } else if (digitsDiv10 === 1) {
      return arr[1];
    } else return arr[2];
  };
  const withZero = function (digit) {
    return digit < 10 ? "0" + digit : digit;
  };

  switch (month) {
    case 0:
      stringMonth = "января";
      break;
    case 2:
      stringMonth = "марта";
      break;
    case 1:
      stringMonth = "февраля";
      break;
    case 3:
      stringMonth = "апреля";
      break;
    case 4:
      stringMonth = "мае";
      break;
    case 5:
      stringMonth = "июня";
      break;
    case 6:
      stringMonth = "июля";
      break;
    case 7:
      stringMonth = "августа";
      break;
    case 8:
      stringMonth = "сентября";
      break;
    case 9:
      stringMonth = "октября";
      break;
    case 10:
      stringMonth = "ноября";
      break;
    case 11:
      stringMonth = "декабря";
      break;
  }

  let stringPreA = "";
  //console.log("hour > 4 && hour <= 10: ", hour > 4 && hour <= 10);
  //console.log("hour: ", hour);
  if (hour >= 16 && hour < 23) {
    stringPreA = "Добрый вечер!";
  } else if (hour >= 10 && hour < 16) {
    stringPreA = "Добрый день!";
    //console.log("stringPreA: ", stringPreA);
  } else if (hour >= 4 && hour < 10) {
    stringPreA = "Доброе утро!";
  } else {
    stringPreA = "Доброй ночи!";
  }

  let stringA = `Сегодня:  ${week[todayDay.getDay()]}`;
  let postfix = "AM";
  let hourP = hour;
  if (hour > 12) {
    postfix = "PM";
    hourP = hour % 12;
  }
  let stringB =
    "Текущее время: " +
    withZero(hourP) +
    ":" +
    withZero(minute) +
    ":" +
    withZero(second) +
    " " +
    postfix;

  let stringPostB =
    "До Нового года осталось " +
    Math.floor((newYear - todayDay) / 1000 / 60 / 60 / 24) +
    " дней";
  console.log("string: ", stringPreA);
  outputPreA.innerHTML = stringPreA;
  outputA.innerHTML = stringA;
  outputB.innerHTML = stringB;
  outputPostB.innerHTML = stringPostB;
};

setInterval(updateDate, 1000);
// week.forEach((item, i) => {
//   // Для каждого дня недели создаем блок
//   let newDay = document.createElement("p");
//   // если текущий день для привязки стилей
//   if (i == todayDay.getDay()) {
//     newDay.classList.add("today");
//   }
//   // Если выходные то
//   if (item == "Суббота" || item == "Воскресенье") {
//     newDay.classList.add("weekend");
//   }
//   newDay.textContent = week[i];

//   dayOfWeek.appendChild(newDay);
// });
