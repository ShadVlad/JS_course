"use strict";

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
  incom = "Freelance",
  addExpenses = prompt(
    "Перечислите возможные расходы за рассчитываемый период через запятую",
    "Интернет, такси, коммуналка"
  ),
  deposit = confirm("Есть ли у вас депозит в банке?"),
  mission = 1000000,
  period = 6;

let start = function () {
  do money = prompt("Ваш месячный доход?", 50000);
  while (!isNumber(money));
};

start();

let showTypeOf = function (data) {
  console.log(data + " : " + typeof data);
};

showTypeOf(money);
showTypeOf(incom);
showTypeOf(deposit);

// let expenses1 = prompt("Введите обязательную статью расходов?"),
//   expensesAmount1 = +prompt("Во сколько это обойдется?"),
//   expenses2 = prompt("Введите обязательную статью расходов?"),
//   expensesAmount2 = +prompt("Во сколько это обойдется?");

let expenses = [];

let getExpensesMonth = function () {
  let sum = 0;

  for (let i = 0; i < 2; i++) {
    expenses[i] = prompt("Введите обязательную статью расходов?", "Садик");

    sum += +prompt("Во сколько это обойдется?");
  }

  return sum;
};

let expensesAmount = getExpensesMonth();

function getAccumulatedMonth(moneyMonth, expensesAmount) {
  return moneyMonth - expensesAmount;
}

function getTargetMonth(mission, accumulated) {
  return Math.ceil(mission / accumulated);
}

let accumulatedMonth = getAccumulatedMonth(money, expensesAmount);

let budgetDay = Math.floor(accumulatedMonth / 30);

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

let targetMonth = getTargetMonth(mission, accumulatedMonth);

console.log("Расходы за месяц: " + expensesAmount);
console.log(addExpenses.toLowerCase().split(","));
console.log(
  targetMonth >= 0
    ? "Вы достигните цели через " + targetMonth + " месяцев"
    : "Вы не достигните цели"
);
console.log("Доход за день " + budgetDay + " рублей");
console.log(getStatusIncome());
