"use strict";
let buttonStart = document.getElementById("start"),
  buttonCancel = document.getElementById("cancel"),
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
  nameInput = document.querySelectorAll("input[placeholder='Наименование']"),
  summInput = document.querySelectorAll("input[placeholder='Сумма']");

const AppData = function () {
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.income = {};
  this.incomeMonth = 0;
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses = [];
  this.expensesMonth = 0;
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
};

AppData.prototype.check = function () {
  if (salaryAmount.value !== "") {
    buttonStart.removeAttribute("disabled");
  }
};

AppData.prototype.start = function () {
  if (salaryAmount.value === "") {
    buttonStart.setAttribute("disabled", true);
    return;
  }
  let allInput = document.querySelectorAll(".data input[type = text]");
  allInput.forEach((item) => {
    item.setAttribute("disabled", "true");
  });
  buttonExpensesAdd.setAttribute("disabled", "true");
  buttonIncomeAdd.setAttribute("disabled", "true");
  //depositCheck.setAttribute("disabled", "true");
  periodSelect.setAttribute("disabled", "true");

  buttonStart.style.display = "none";
  buttonCancel.style.display = "block";

  this.budget = +salaryAmount.value;
  this.getExpenses();
  this.getExpensesMonth();
  this.getAddExpenses();
  this.getAddIncome();
  this.getIncome();
  this.getBudget();
  this.getInfoDeposit();
  this.getStatusIncome();
  this.showResult();
};

AppData.prototype.showResult = function () {
  const _this = this;
  budgetMonthValue.value = this.budgetMonth;
  budgetDayValue.value = Math.floor(this.budgetDay);
  expensesMonthValue.value = this.expensesMonth;
  additionalExpensesValue.value = this.addExpenses.join(", ");
  additionalIncomValue.value = this.addIncome.join(", ");
  targetMonthValue.value = Math.ceil(this.getTargetMonth());
  incomePeriodValue.value = this.calcPeriod();
  periodSelect.addEventListener("change", function () {
    incomePeriodValue.value = _this.calcPeriod();
  });
};

AppData.prototype.addExpensesBlock = function () {
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
  nameInput = document.querySelectorAll("input[placeholder='Наименование']");
  summInput = document.querySelectorAll("input[placeholder='Сумма']");
  if (expensesItems.length === 3) {
    buttonExpensesAdd.style.display = "none";
  }
};

AppData.prototype.getExpenses = function () {
  expensesItems.forEach(function (item) {
    const _this = this;
    let itemExpenses = item.querySelector(".expenses-title").value;
    let cashExpenses = item.querySelector(".expenses-amount").value;
    if (itemExpenses !== "" && cashExpenses !== "") {
      _this.expenses[itemExpenses] = cashExpenses;
    }
  });
};

AppData.prototype.addIncomeBlock = function () {
  let cloneIncomeItem = incomeItems[0].cloneNode(true);
  incomeItems[0].parentNode.insertBefore(cloneIncomeItem, buttonIncomeAdd);
  //console.log("cloneIncomeItem: ", cloneIncomeItem);
  let title = cloneIncomeItem.querySelector(".income-title");
  title.value = "";
  let amount = cloneIncomeItem.querySelector(".income-amount");
  amount.value = "";
  incomeItems = document.querySelectorAll(".income-items");
  nameInput = document.querySelectorAll("input[placeholder='Наименование']");
  console.log("nameInput: ", nameInput);
  summInput = document.querySelectorAll("input[placeholder='Сумма']");

  if (incomeItems.length === 3) {
    buttonIncomeAdd.style.display = "none";
  }
};

AppData.prototype.getIncome = function () {
  const _this = this;
  incomeItems.forEach((item) => {
    let itemIncome = item.querySelector(".income-title").value;
    let cashIncome = item.querySelector(".income-amount").value;
    if (itemIncome !== "" && cashIncome !== "") {
      _this.income[itemIncome] = cashIncome;
    }
  });

  this.incomeMonth = 0;
  for (let key in this.income) {
    this.incomeMonth += +this.income[key];
  }
};

AppData.prototype.getAddExpenses = function () {
  const _this = this;
  _this.addExpenses = [];
  let addExpenses = additionalExpensesItem.value.split(",");
  addExpenses.forEach((item) => {
    item = item.trim();
    if (item !== "") {
      item = item.charAt(0).toUpperCase() + item.substring(1).toLowerCase();
      _this.addExpenses.push(item);
    }
  });
};

AppData.prototype.getAddIncome = function () {
  const _this = this;
  appData.addIncome = [];
  additionalIncomeItem.forEach((item) => {
    let itemValue = item.value.trim();
    if (itemValue !== "") {
      _this.addIncome.push(itemValue);
    }
  });
};
AppData.prototype.getExpensesMonth = function () {
  //console.log("getExpensesMonth");
  //let sum = 0;
  for (let key in this.expenses) {
    this.expensesMonth += +this.expenses[key];
  }
  // = sum;
  // return sum;
};
AppData.prototype.getBudget = function () {
  //appData.budget = money;
  //console.log("appData.budget: ", appData.budget);
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
  //console.log("appData.budgetMonth: ", appData.budgetMonth);
  this.budgetDay = this.budgetMonth / 30;
  //console.log("appData.budgetDay: ", appData.budgetDay);
};

AppData.prototype.getTargetMonth = function () {
  return targetAmount.value / this.budgetMonth;
};
AppData.prototype.getStatusIncome = function () {
  if (this.budgetDay > 1200) {
    return "У Вас высокий уровень дохода";
  } else if (this.budgetDay > 600) {
    return "У Вас средний уровень дохода";
  } else if (this.budgetDay >= 0) {
    return "К сожалению, у Вас уровень дохода ниже среднего";
  } else {
    return "Что-то пошло не так";
  }
};

AppData.prototype.calcPeriod = function () {
  return this.budgetMonth * periodSelect.value;
};

AppData.prototype.reset = function () {
  let inputTextData = document.querySelectorAll(".data input[type = text]");
  let resultInputAll = document.querySelectorAll(".result input[type = text]");

  inputTextData.forEach((item) => {
    item.value = "";
    item.removeAttribute("disabled");
    periodSelect.value = "0";
    periodAmount.innerHTML = periodSelect.value;
  });
  resultInputAll.forEach((item) => {
    item.value = "";
  });

  for (let i = 1; i < incomeItems.length; i++) {
    incomeItems[i].parentNode.removeChild(incomeItems[i]);
    buttonIncomeAdd.style.display = "block";
  }
  for (let i = 1; i < expensesItems.length; i++) {
    expensesItems[i].parentNode.removeChild(expensesItems[i]);
    buttonExpensesAdd.style.display = "block";
  }

  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.income = {};
  this.incomeMonth = 0;
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses = [];
  this.expensesMonth = 0;
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;

  buttonCancel.style.display = "none";
  buttonStart.style.display = "block";
  buttonExpensesAdd.removeAttribute("disabled");
  buttonIncomeAdd.removeAttribute("disabled");
  periodSelect.removeAttribute("disabled");
  depositCheck.checked = false;
};

AppData.prototype.asking = function () {
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
};
AppData.prototype.getInfoDeposit = function () {
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
};

AppData.prototype.changePeriodValue = function () {
  periodAmount.innerHTML = periodSelect.value;
  incomePeriodValue.value = appData.calcPeriod();
};
AppData.prototype.getInputSalary = function () {
  if (
    (salaryAmount && salaryAmount.value === "") ||
    isNaN(salaryAmount.value)
  ) {
    buttonStart.disabled = true;
    console.log("buttonStart.disabled: ", buttonStart.disabled);
  } else buttonStart.disabled = false;
};
AppData.prototype.readInputName = function (event) {
  event.target.value = event.target.value.replace(/[^А-Яа-яЁё\s\W]+$/, "");
  console.log("nameInput: ", event.target.value);
};
AppData.prototype.readInputSumm = function (event) {
  event.target.value = event.target.value.replace(/[^0-9]/, "");
  console.log("summInput: ", event.target.value);
};

AppData.prototype.eventListeners = function () {
  buttonStart.disabled = true;
  nameInput.forEach((item) => {
    item.addEventListener("keyup", appData.readInputName);
  });
  summInput.forEach((item) => {
    //console.log("item: ", item);
    item.addEventListener("keyup", appData.readInputSumm);
  });
  salaryAmount.addEventListener("input", this.check);
  buttonStart.addEventListener("click", appData.start.bind(appData));
  buttonExpensesAdd.addEventListener("click", appData.addExpensesBlock);
  buttonIncomeAdd.addEventListener("click", appData.addIncomeBlock);
  periodSelect.addEventListener("input", appData.changePeriodValue);
  buttonCancel.addEventListener("click", appData.reset.bind(appData));
};

const appData = new AppData();
appData.eventListeners();

console.log("appData: ", appData);
