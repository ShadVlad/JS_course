"use strict";

let money,
  start = function () {
    do money = prompt("Ваш месячный доход?", 50000);
    while (isNaN(money) || money === "" || money === null);
  };

start();

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 50000,
  period: 3,
  asking: function (params) {
    let addExpenses = prompt(
      "Перечислите возможные расходы за рассчитываемый период через запятую",
      "Интернет, такси, коммуналка"
    );
    appData.addExpenses = addExpenses.toLowerCase().split(",");
    appData.deposit = confirm("Есть ли у вас депозит в банке?");
  },
};
appData.asking();

let showTypeOf = function (data) {
  console.log(data + " : " + typeof data);
};

showTypeOf(money);
showTypeOf(appData.income);
showTypeOf(appData.deposit);

let expenses = [];

let getExpensesMonth = function () {
  let sum = 0,
    question;

  for (let i = 0; i < 2; i++) {
    expenses[i] = prompt("Введите обязательную статью расходов?", "Садик");
    let sumExpense;
    do {
      question = prompt("Во сколько это обойдется?", 2500);
    } while (isNaN(question) || question === "" || question === null);

    sum += +question;
  }
  return sum;
};

let expensesMonth = getExpensesMonth();

function getAccumulatedMonth() {
  return money - expensesMonth;
}

function getTargetMonth() {
  return Math.ceil(appData.mission / getAccumulatedMonth());
}

let budgetDay = Math.floor(getAccumulatedMonth() / 30);

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

let targetMonth = getTargetMonth();

console.log("Расходы за месяц: " + expensesMonth);
console.log(appData.addExpenses);
console.log(
  targetMonth >= 0
    ? "Вы достигните цели через " + targetMonth + " месяца(ев)"
    : "Вы не достигните цели"
);
console.log("Доход за день " + budgetDay + " рублей");
console.log(getStatusIncome());
