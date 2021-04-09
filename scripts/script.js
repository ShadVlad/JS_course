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
  deposit: false,
  mission: 50000,
  period: 3,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  expenses: {},
  getExpensesMonth: function () {
    //console.log("getExpensesMonth");
    let sum = 0;
    for (let key in appData.expenses) {
      sum += appData.expenses[key];
      //console.log(`${key}: ${appData.expenses[key]}`);
    }
    // let expens = Object.entries(appData.expenses);
    // expens.forEach((entry) => {
    //   //console.log(`${entry[0]}: ${entry[1]}`);
    //   sum += entry[1];
    // });
    appData.expensesMonth = sum;
    return sum;
  },
  getBudget: function () {
    appData.budget = money;
    //console.log("appData.budget: ", appData.budget);
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    //console.log("appData.budgetMonth: ", appData.budgetMonth);
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    //console.log("appData.budgetDay: ", appData.budgetDay);
  },
  getStatusIncome: function () {
    if (appData.budgetDay > 1200) {
      return "У Вас высокий уровень дохода";
    } else if (appData.budgetDay > 600) {
      return "У Вас средний уровень дохода";
    } else if (appData.budgetDay >= 0) {
      return "К сожалению, у Вас уровень дохода ниже среднего";
    } else {
      return "Что-то пошло не так";
    }
  },
  asking: function () {
    let expens = "",
      question;
    for (let i = 0; i < 2; i++) {
      expens = prompt("Введите обязательную статью расходов?", "Садик");
      do {
        question = +prompt("Во сколько это обойдется?", 2500);
      } while (isNaN(question) || question === "" || question === null);
      appData.expenses[expens] = question;
    }
    appData.expensesMonth = appData.getExpensesMonth();
    //console.log(appData.expenses);
    appData.deposit = confirm("Есть ли у вас депозит в банке?");
    appData.getBudget();
  },
};
appData.asking();

function getTargetMonth() {
  return Math.ceil(appData.mission / appData.budgetMonth);
}

console.log("Расходы за месяц: " + appData.expensesMonth);
//console.log(appData.expenses);
console.log(
  getTargetMonth() >= 0
    ? "Вы достигните цели через " + getTargetMonth() + " месяца(ев)"
    : "Вы не достигните цели"
);
//console.log("Доход за день " + appData.budgetDay + " рублей");
console.log(appData.getStatusIncome());
console.log("Наша программа включает в себя данные: ");
for (let key in appData) {
  console.log(`${key}: ${appData[key]}`);
}
