"use strict";

let money = +prompt("Ваш месячный доход?", 50000),
  incom = "Freelance",
  addExpenses = prompt("Интернет, такси, коммуналка"),
  deposit = confirm("Есть ли у вас депозит в банке?"),
  mission = 1000000,
  period = 6;

let showTypeOf = function (data) {
  console.log(data + " : " + typeof data);
};

showTypeOf(money);
showTypeOf(incom);
showTypeOf(deposit);

console.log("Длина строки '" + incom + "' = " + incom.length);

money = prompt("Ваш месячный доход?");
//console.log("~ money", money);

let expenses1 = prompt("Введите обязательную статью расходов?"),
  amount1 = +prompt("Во сколько это обойдется?"),
  expenses2 = prompt("Введите обязательную статью расходов?"),
  amount2 = +prompt("Во сколько это обойдется?");

console.log("Период равен " + period + " месяцев ");
console.log("Цель заработать " + mission + " рублей");

console.log(addExpenses.toLowerCase().split(","));

let expensesAmount = amount1 + amount2;
console.log("expensesAmount: ", expensesAmount);

let budgetMonth = money - expensesAmount;
console.log("Бюджет на месяц: " + budgetMonth + " рублей");

let missionPeriod = Math.ceil(mission / budgetMonth);
console.log("Вы достигните цели через " + missionPeriod + " месяцев");

let budgetDay = budgetMonth / 30;
//console.log("Доход за день " + budgetDay.toFixed(2) + " рублей");
console.log("Доход за день " + Math.floor(budgetDay) + " рублей");

let getStatusIncome = function () {
  if (budgetDay > 1200) {
    return "У Вас высокий уровень дохода";
  } else if (budgetDay > 600) {
    return "У Вас средний уровень дохода";
  } else if (budgetDay >= 0) {
    return "К сожалению, у Вас уровень дохода ниже среднего";
  } else {
    return "Что-то пошло не так";
  }
};

console.log(getStatusIncome());
