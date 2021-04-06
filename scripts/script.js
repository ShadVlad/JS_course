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

let expenses1 = prompt("Введите обязательную статью расходов?"),
  expensesAmount1 = +prompt("Во сколько это обойдется?"),
  expenses2 = prompt("Введите обязательную статью расходов?"),
  expensesAmount2 = +prompt("Во сколько это обойдется?");

console.log(addExpenses.toLowerCase().split(","));

function getExpensesMonth(amount1, amount2) {
  return amount1 + amount2;
}

function getAccumulatedMonth(moneyMonth, expenses) {
  return moneyMonth - expenses;
}

function getTargetMonth(mission, accumulated) {
  return Math.ceil(mission / accumulated);
}

let expensesAmount = getExpensesMonth(expensesAmount1, expensesAmount2);
//console.log("expensesAmount: ", expensesAmount);

let accumulatedMonth = getAccumulatedMonth(money, expensesAmount);
//console.log("Бюджет на месяц: " + accumulatedMonth + " рублей");

let targetMonth = getTargetMonth(mission, accumulatedMonth);
console.log("Вы достигните цели через " + targetMonth + " месяцев");

let budgetDay = accumulatedMonth / 30;
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
