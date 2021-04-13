"use strict";

const advElem = document.querySelector(".adv");
console.log("advElem: ", advElem);
advElem.remove();

const bodyElem = document.querySelector("body");
console.log("bodyElem: ", bodyElem);
bodyElem.style.backgroundImage = "url('/image/adv.jpg')";

const books = document.querySelectorAll(".book");
console.log("books: ", books);

books[0].before(books[1]);
books[3].before(books[4]);
books[5].after(books[2]);
books[4].childNodes[1].childNodes[1].innerText =
  "Книга 3. this и Прототипы Объектов";

books[0].childNodes[3].childNodes[21].before(
  books[0].childNodes[3].childNodes[5]
);
books[0].childNodes[3].childNodes[6].after(
  books[0].childNodes[3].childNodes[12]
);
books[0].childNodes[3].childNodes[9].before(
  books[0].childNodes[3].childNodes[16]
);
books[5].childNodes[3].childNodes[5].before(
  books[5].childNodes[3].childNodes[19]
);
books[5].childNodes[3].childNodes[14].before(
  books[5].childNodes[3].childNodes[6]
);
books[5].childNodes[3].childNodes[16].after(
  books[5].childNodes[3].childNodes[11]
);
console.log(books[2].childNodes[3].childNodes[15]);

const newElem = document.createElement("li");
newElem.textContent = "Глава 8: За пределами ES6";
books[2].childNodes[3].childNodes[19].before(
  books[2].childNodes[3].appendChild(newElem)
);
console.log("newElem: ", newElem);
/* let money,
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
 */
// console.log(
//   appData.addExpenses
//     .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
//     .join(", ")
// );
/* */
// appData.getInfoDeposit();
// console.log(
//   appData.percentDeposit,
//   appData.moneyDeposit,
//   appData.calcSavedMoney()
// );
