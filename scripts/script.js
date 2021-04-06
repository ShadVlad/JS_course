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

function getExpensesMonth(amount1, amount2) {
  return amount1 + amount2;
}

function getAccumulatedMonth(moneyMonth, getExpensesMonth) {
  return moneyMonth - getExpensesMonth;
}

function getTargetMonth(mission, accumulated) {
  return Math.ceil(mission / accumulated);
}

let accumulatedMonth = getAccumulatedMonth(
  money,
  getExpensesMonth(expensesAmount1, expensesAmount2)
);

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

console.log(
  "Расходы за месяц: " + getExpensesMonth(expensesAmount1, expensesAmount2)
);
console.log(addExpenses.toLowerCase().split(","));
console.log(
  "Вы достигните цели через " +
    getTargetMonth(mission, accumulatedMonth) +
    " месяцев"
);
console.log("Доход за день " + budgetDay + " рублей");
console.log(getStatusIncome());
