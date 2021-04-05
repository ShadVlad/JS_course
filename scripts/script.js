"use strict";

let money = 50000;
let incom = "Freelance";
let addExpenses = "Интернет, такси, коммуналка";
let deposit = true;
let mission = 1000000;
let period = 6;

console.log("Переменная 'money' имеет тип '", typeof money, "'");
console.log("Переменная 'incom' имеет тип '", typeof incom, "'");
console.log("Переменная 'deposit' имеет тип '", typeof deposit, "'");

console.log("Длина строки '" + addExpenses + "' = " + addExpenses.length);

console.log("Период равен " + period + " месяцев ");
console.log("Цель заработать " + mission + " рублей");

console.log(addExpenses.toLowerCase().split(","));

money = prompt("Ваш месячный доход?");
//console.log("~ money", money);

addExpenses = prompt(
  "Перечислите возможные расходы за рассчитываемый период через запятую"
);
//console.log("~ addExpenses", addExpenses);

deposit = confirm("Есть ли у вас депозит в банке?");
//console.log("~ deposit", deposit);

let expenses1 = prompt("Введите обязательную статью расходов?");
let amount1 = prompt("Во сколько это обойдется?");
let expenses2 = prompt("Введите обязательную статью расходов?");
let amount2 = prompt("Во сколько это обойдется?");

let budgetMonth = money - amount1 - amount2;
console.log("~ Бюджет на месяц =", budgetMonth);

let missionLong = mission / budgetMonth;
console.log(
  "~ Вы достигните цели через " + Math.ceil(missionLong) + " месяцев"
);

let budgetDay = budgetMonth / 30;
//console.log("Доход за день " + budgetDay.toFixed(2) + " рублей");
console.log("Доход за день " + Math.floor(budgetDay) + " рублей");

if (budgetDay > 1200) {
  alert("У вас высокий уровень дохода");
} else if (budgetDay > 600) {
  alert("У вас средний уровень дохода");
} else if (budgetDay >= 0) {
  alert("К сожалению у вас уровень дохода ниже среднего");
} else {
  alert("Что то пошло не так");
}
