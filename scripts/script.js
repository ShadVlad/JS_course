"use strict";

let money,
  start = function () {
    do money = prompt("Ваш месячный доход?", 50000);
    while (isNaN(money) || money === "" || money === null);
  };
let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

start();

let appData = {
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  expensesMonth: 0,
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 50000,
  period: 3,
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
    if (confirm("Есть ли у Вас дополнительный источник дохода?")) {
      let itemIncome, cashIncome;
      do {
        itemIncome = prompt("Какой у Вас дополнительный заработок?", "Таксую");
      } while (isNumber(itemIncome));
      do {
        cashIncome = prompt("Сколько Вы на этом зарабатываете?", 10000);
      } while (!isNumber(cashIncome));
      appData.income[itemIncome] = cashIncome;
    }

    let addExpenses = prompt(
      "Перечислите возможные расходы за рассчитываемый период через запятую",
      "Интернет, такси, коммуналка"
    );
    appData.addExpenses = addExpenses.toLowerCase().split(", ");
    console.log("appData.addExpenses: ", appData.addExpenses);
    appData.deposit = confirm("Есть ли у вас депозит в банке?");

    for (let i = 0; i < 2; i++) {
      let expens, question;
      do {
        expens = prompt("Введите обязательную статью расходов?", "Садик");
      } while (isNumber(expens));
      do {
        question = +prompt("Во сколько это обойдется?", 2500);
      } while (isNaN(question) || question === "" || question === null);
      appData.expenses[expens] = question;
    }
    appData.expensesMonth = appData.getExpensesMonth();
    //console.log(appData.expenses);

    appData.getBudget();
  },
  getInfoDeposit: function () {
    if (appData.deposit) {
      let percentDeposit, moneyDeposit;
      do {
        percentDeposit = prompt("Какой годовой процент?", "10");
      } while (!isNumber(percentDeposit));

      do {
        moneyDeposit = prompt("Какая сумма заложена?", 10000);
      } while (!isNumber(moneyDeposit));
      appData.percentDeposit = percentDeposit;
      appData.moneyDeposit = moneyDeposit;
    }
  },
  calcSavedMoney: function () {
    return appData.budgetMonth * appData.period;
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
console.log("\nНаша программа включает в себя данные: ");
for (let key in appData) {
  console.log(`   ${key}: ${appData[key]}`);
}

console.log(
  appData.addExpenses
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(", ")
);

appData.getInfoDeposit();
console.log(
  appData.percentDeposit,
  appData.moneyDeposit,
  appData.calcSavedMoney()
);

// function logPerson(s, name, age) {
//   //console.log(s, name, age);
//   if (age < 0) {
//     age = "так не бывает";
//   }
//   return `${s[0]}${name}${s[1]}${age}${s[2]}`;
// }

// const personName = "Maksim";
// const personName2 = "Tanya";
// const personAge = 35;
// const personAge2 = -36;

// const output = logPerson`Имя: ${personName}, Возраст: ${personAge}!`;
// console.log("output:  ", output);
// const output2 = logPerson`Имя: ${personName2}, Возраст: ${personAge2}!
// `;
// console.log("output2: ", output2);
