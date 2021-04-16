"use strict";
let buttonStart = document.getElementById("start"),
  btnPlus = document.getElementsByTagName("button"),
  buttonIncomeAdd = btnPlus[0],
  buttonExpensesAdd = btnPlus[1],
  depositCheck = document.querySelector("#deposit-check"),
  additionalIncomeItem = document.querySelectorAll(".additional_income-item"),
  budgetDayValue = document.getElementsByClassName("budget_day-value")[0],
  budgetMonthValue = document.getElementsByClassName("budget_month-value")[0],
  expensesMonthValue = document.getElementsByClassName(
    "expenses_month-value"
  )[0],
  accumulatedMonthValue = document.getElementsByClassName(
    "accumulated_month-value"
  )[0],
  additionalIncomValue = document.getElementsByClassName(
    "additional_income-value"
  )[0],
  additionalExpensesValue = document.getElementsByClassName(
    "additional_expenses-value"
  )[0],
  incomePeriodValue = document.getElementsByClassName("income_period-value")[0],
  targetMonthValue = document.getElementsByClassName("target_month-value")[0],
  salaryAmount = document.querySelector(".salary-amount"),
  incomeTitle = document.querySelector(".income-title"),
  incomeAmount = document.querySelector(".income-amount"),
  expensesTitle = document.querySelector("input.expenses-title"),
  expensesAmount = document.querySelector(".expenses-amount"),
  expensesItems = document.querySelectorAll(".expenses-items"),
  additionalExpensesItem = document.querySelector(".additional_expenses-item"),
  targetAmount = document.querySelector(".target-amount"),
  periodSelect = document.querySelector(".period-select"),
  periodAmount = document.querySelector(".period-amount"),
  incomeItems = document.querySelectorAll(".income-items"),
  nameInput = document.querySelectorAll("input[placeholder='Наименование']");
console.log("name: ", nameInput[2].value);
//console.log("name: ", nameInput[6].attributes[2].nodeValue);

// let money;

// let isNumber = function (n) {
//   return !isNaN(parseFloat(n)) && isFinite(n);
// };

let appData = {
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  expensesMonth: 0,
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,

  start: function () {
    //appData.getInputSalary();
    // if (salaryAmount.value === "") {
    //   alert("Поле 'Месячный доход' должно быть заполнено!");
    //   return;
    // }
    appData.budget = +salaryAmount.value;
    appData.getExpenses();
    appData.getExpensesMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getIncome();
    appData.getBudget();
    appData.showResult();
  },
  getExpensesMonth: function () {
    //console.log("getExpensesMonth");
    let sum = 0;
    for (let key in appData.expenses) {
      sum += +appData.expenses[key];
      //console.log(`${key}: ${appData.expenses[key]}`);
    }

    appData.expensesMonth = sum;
    return sum;
  },
  getBudget: function () {
    //appData.budget = money;
    console.log("appData.budget: ", appData.budget);
    appData.budgetMonth =
      appData.budget + appData.incomeMonth - appData.expensesMonth;
    //console.log("appData.budgetMonth: ", appData.budgetMonth);
    appData.budgetDay = appData.budgetMonth / 30;
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

  showResult: function () {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = Math.floor(appData.budgetDay);
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(", ");
    additionalIncomValue.value = appData.addIncome.join(", ");
    targetMonthValue.value = Math.ceil(appData.getTargetMonth());
    incomePeriodValue.value = appData.calcPeriod();
  },
  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(
      cloneExpensesItem,
      buttonExpensesAdd
    );
    let title = cloneExpensesItem.querySelector(".expenses-title");
    title.value = "";
    let amount = cloneExpensesItem.querySelector(".expenses-amount");
    amount.value = "";
    expensesItems = document.querySelectorAll(".expenses-items");
    if (expensesItems.length === 3) {
      buttonExpensesAdd.style.display = "none";
    }
  },

  getExpenses: function () {
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector(".expenses-title").value;
      let cashExpenses = item.querySelector(".expenses-amount").value;
      if (itemExpenses !== "" && cashExpenses !== "") {
        appData.expenses[itemExpenses] = cashExpenses;
      }
    });
  },
  addIncomeBlock: function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, buttonIncomeAdd);
    console.log("cloneIncomeItem: ", cloneIncomeItem);
    let title = cloneIncomeItem.querySelector(".income-title");
    title.value = "";
    let amount = cloneIncomeItem.querySelector(".income-amount");
    amount.value = "";
    incomeItems = document.querySelectorAll(".income-items");
    if (incomeItems.length === 3) {
      buttonIncomeAdd.style.display = "none";
    }
  },

  getIncome: function () {
    incomeItems.forEach((item) => {
      let itemIncome = item.querySelector(".income-title").value;
      let cashIncome = item.querySelector(".income-amount").value;
      if (itemIncome !== "" && cashIncome !== "") {
        appData.income[itemIncome] = cashIncome;
      }
    });

    appData.incomeMonth = 0;
    for (let key in appData.income) {
      appData.incomeMonth += +appData.income[key];
    }
  },
  getAddExpenses: function () {
    appData.addExpenses = [];
    let addExpenses = additionalExpensesItem.value.split(",");
    addExpenses.forEach((item) => {
      item = item.trim();
      if (item !== "") {
        appData.addExpenses.push(item);
      }
    });
  },

  getAddIncome: function () {
    appData.addIncome = [];
    additionalIncomeItem.forEach((item) => {
      let itemValue = item.value.trim();
      if (itemValue !== "") {
        appData.addIncome.push(itemValue);
      }
    });
  },
  asking: function () {
    let addExpenses = prompt(
      "Перечислите возможные расходы за рассчитываемый период через запятую",
      "Интернет, такси, коммуналка"
    );
    appData.addExpenses = addExpenses.toLowerCase().split(", ");
    //console.log("appData.addExpenses: ", appData.addExpenses);
    appData.deposit = confirm("Есть ли у вас депозит в банке?");

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
  getTargetMonth: function () {
    return targetAmount.value / appData.budgetMonth;
  },
  calcPeriod: function () {
    return appData.budgetMonth * periodSelect.value;
  },
  changePeriodValue: function () {
    periodAmount.innerHTML = periodSelect.value;
    incomePeriodValue.value = appData.calcPeriod();
  },
  getInputSalary: function () {
    if (
      (salaryAmount && salaryAmount.value === "") ||
      isNaN(salaryAmount.value)
    ) {
      buttonStart.disabled = true;
      console.log("buttonStart.disabled: ", buttonStart.disabled);
    } else buttonStart.disabled = false;
  },
  readInput: function (i) {
    //console.log("i: ", i);
    i.value = i.value.replace(/^[А-Яа-яЁё\s]+$/, "");
  },
};

buttonStart.disabled = true;

nameInput.forEach((item) => {
  //console.log("item: ", item);
  item.addEventListener("input", appData.readInput(item));
});

salaryAmount.addEventListener("input", appData.getInputSalary);
buttonStart.addEventListener("click", appData.start);
buttonExpensesAdd.addEventListener("click", appData.addExpensesBlock);
buttonIncomeAdd.addEventListener("click", appData.addIncomeBlock);
periodSelect.addEventListener("input", appData.changePeriodValue);
