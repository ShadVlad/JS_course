"use strict";
document.addEventListener("DOMContentLoaded", () => {
  const buttonStart = document.getElementById("start"),
    buttonCancel = document.getElementById("cancel"),
    btnPlus = document.getElementsByTagName("button"),
    buttonIncomeAdd = btnPlus[0],
    buttonExpensesAdd = btnPlus[1],
    depositCheck = document.getElementById("deposit-check"),
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
    incomePeriodValue = document.getElementsByClassName(
      "income_period-value"
    )[0],
    targetMonthValue = document.getElementsByClassName("target_month-value")[0],
    salaryAmount = document.querySelector(".salary-amount"),
    // incomeTitle = document.querySelector(".income-title"),
    // incomeAmount = document.querySelector(".income-amount"),
    // expensesTitle = document.querySelector("input.expenses-title"),
    // expensesAmount = document.querySelector(".expenses-amount"),
    additionalExpensesItem = document.querySelector(
      ".additional_expenses-item"
    ),
    targetAmount = document.querySelector(".target-amount"),
    periodSelect = document.querySelector(".period-select"),
    periodAmount = document.querySelector(".period-amount"),
    depositBank = document.querySelector(".deposit-bank"),
    depositAmount = document.querySelector(".deposit-amount"),
    depositPercent = document.querySelector(".deposit-percent");

  let expensesItems = document.querySelectorAll(".expenses-items"),
    incomeItems = document.querySelectorAll(".income-items"),
    nameInput = document.querySelectorAll("input[placeholder='Наименование']"),
    summInput = document.querySelectorAll("input[placeholder='Сумма']");
  let expIncItems = [expensesItems, incomeItems];

  class AppData {
    constructor() {
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
    }
    check() {
      if (salaryAmount.value !== "") {
        buttonStart.removeAttribute("disabled");
      }
    }
    start() {
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
      buttonStart.style.display = "none";
      buttonCancel.style.display = "block";
      this.budget = +salaryAmount.value;
      //this.getExpenses();
      //this.getAddExpenses();
      //this.getAddIncome();
      this.getAddExpInc();
      this.getExpInc();
      this.getExpensesMonth();
      this.getInfoDeposit();
      this.getBudget();
      this.getStatusIncome();
      this.showResult();
    }
    showResult() {
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
    }
    addExpensesBlock() {
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
      nameInput = document.querySelectorAll(
        "input[placeholder='Наименование']"
      );
      summInput = document.querySelectorAll("input[placeholder='Сумма']");
      if (expensesItems.length === 3) {
        buttonExpensesAdd.style.display = "none";
      }
    }
    addIncomeBlock() {
      let cloneIncomeItem = incomeItems[0].cloneNode(true);
      incomeItems[0].parentNode.insertBefore(cloneIncomeItem, buttonIncomeAdd);
      //console.log("cloneIncomeItem: ", cloneIncomeItem);
      let title = cloneIncomeItem.querySelector(".income-title");
      title.value = "";
      let amount = cloneIncomeItem.querySelector(".income-amount");
      amount.value = "";
      incomeItems = document.querySelectorAll(".income-items");
      nameInput = document.querySelectorAll(
        "input[placeholder='Наименование']"
      );
      //console.log("nameInput: ", nameInput);
      summInput = document.querySelectorAll("input[placeholder='Сумма']");

      if (incomeItems.length === 3) {
        buttonIncomeAdd.style.display = "none";
      }
    }

    // addExpIncBlock(str) {
    //   console.log("startStr: ", event);
    //   let cloneItem;
    //   //   str === "income"
    //   //     ? incomeItems[0].cloneNode(true)
    //   //     : expensesItems[0].cloneNode(true);
    //   if (str === "income") {
    //     cloneItem = incomeItems[0].cloneNode(true);
    //     incomeItems[0].parentNode.insertBefore(cloneItem, buttonIncomeAdd);
    //   } else {
    //     cloneItem = expensesItems[0].cloneNode(true);
    //     expensesItems[0].parentNode.insertBefore(cloneItem, buttonExpensesAdd);
    //   }

    //   const itemTitle = item.querySelector(`.${startStr}-title`).value;
    //   const itemAmount = item.querySelector(`.${startStr}-amount`).value;
    // }
    // getExpenses() {
    //   const _this = this;
    //   expensesItems.forEach(function (item) {
    //     let itemExpenses = item.querySelector(".expenses-title").value;
    //     let cashExpenses = item.querySelector(".expenses-amount").value;
    //     if (itemExpenses !== "" && cashExpenses !== "") {
    //       _this.expenses[itemExpenses] = cashExpenses;
    //     }
    //   });
    // }
    // getIncome() {
    //   //const _this = this;
    //   incomeItems.forEach((item) => {
    //     let itemIncome = item.querySelector(".income-title").value;
    //     let cashIncome = item.querySelector(".income-amount").value;
    //     if (itemIncome !== "" && cashIncome !== "") {
    //       this.income[itemIncome] = cashIncome;
    //     }
    //   });

    //   this.incomeMonth = 0;
    //   for (let key in this.income) {
    //     this.incomeMonth += +this.income[key];
    //   }
    // }
    getExpInc() {
      //console.log("_this: ", this);
      const count = (item) => {
        //console.log("item: ", item);
        const startStr = item.className.split("-")[0];
        const itemTitle = item.querySelector(`.${startStr}-title`).value;
        const itemAmount = item.querySelector(`.${startStr}-amount`).value;
        if (itemTitle !== "" && itemAmount !== "") {
          this[startStr][itemTitle] = itemAmount;
          //console.log("this[startStr]: ", this[startStr]);
          //console.log("startStr: ", startStr);
        }
      };
      incomeItems.forEach(count);
      expensesItems.forEach(count);

      this.incomeMonth = 0;
      for (let key in this.income) {
        this.incomeMonth += +this.income[key];
      }
    }

    getAddExpInc() {
      const _this = this;
      _this.addExpenses = [];
      _this.addIncome = [];
      const count = (item) => {
        const startStr = typeof item === "string" ? "addExpenses" : "addIncome";
        //console.log("startStr: ", startStr);
        //console.log("item: " + item + ":  " + item.value);

        let itemValue =
          typeof item === "string" ? item.trim() : item.value.trim();
        if (itemValue !== "") {
          itemValue =
            itemValue.charAt(0).toUpperCase() +
            itemValue.substring(1).toLowerCase();
          _this[startStr].push(itemValue);
        }
      };
      let addExpenses = additionalExpensesItem.value.split(",");
      let addIncome = additionalIncomeItem;
      addExpenses.forEach(count);
      addIncome.forEach(count);
    }

    getExpensesMonth() {
      for (let key in this.expenses) {
        this.expensesMonth += +this.expenses[key];
      }
    }
    getBudget() {
      const monthDeposit = (this.moneyDeposit * this.percentDeposit) / 100;
      this.budgetMonth =
        this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
      this.budgetDay = this.budgetMonth / 30;
    }
    getTargetMonth() {
      return targetAmount.value / this.budgetMonth;
    }
    getStatusIncome() {
      if (this.budgetDay > 1200) {
        return "У Вас высокий уровень дохода";
      } else if (this.budgetDay > 600) {
        return "У Вас средний уровень дохода";
      } else if (this.budgetDay >= 0) {
        return "К сожалению, у Вас уровень дохода ниже среднего";
      } else {
        return "Что-то пошло не так";
      }
    }
    calcPeriod() {
      return this.budgetMonth * periodSelect.value;
    }
    reset() {
      let inputTextData = document.querySelectorAll(".data input[type = text]");
      let resultInputAll = document.querySelectorAll(
        ".result input[type = text]"
      );

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
      depositBank.style.display = "none";
      depositAmount.style.display = "none";
      depositPercent.style.display = "none";
      depositBank.value = "";
    }

    changePeriodValue() {
      periodAmount.innerHTML = periodSelect.value;
      incomePeriodValue.value = appData.calcPeriod();
    }
    getInputSalary() {
      if (
        (salaryAmount && salaryAmount.value === "") ||
        isNaN(salaryAmount.value)
      ) {
        buttonStart.disabled = true;
        //console.log("buttonStart.disabled: ", buttonStart.disabled);
      } else buttonStart.disabled = false;
    }
    readInputName(event) {
      event.target.value = event.target.value.replace(/[^А-Яа-яЁё\s\W]+$/, "");
      //console.log("nameInput: ", event.target.value);
    }
    readInputSumm = function (event) {
      event.target.value = event.target.value.replace(/[^0-9]/, "");
      //console.log("summInput: ", event.target.value);
    };
    getInfoDeposit() {
      if (this.deposit) {
        //let percentDeposit, moneyDeposit;
        this.percentDeposit = depositPercent.value;
        this.moneyDeposit = depositAmount.value;
      }
    }

    getInputPercent() {
      console.log("depositPercent.value: ", depositPercent.value);
      if (
        (depositPercent &&
          (depositPercent.value < 0 || depositPercent.value > 100)) ||
        isNaN(salaryAmount.value)
      ) {
        buttonStart.disabled = true;
        alert("Введите корректное значение в поле проценты");
        //console.log("buttonStart.disabled: ", buttonStart.disabled);
      } else buttonStart.disabled = false;
    }

    changePercent() {
      const valueSelect = this.value;
      console.log("valueSelect: ", valueSelect.value);
      if (valueSelect == "other") {
        depositPercent.style.display = "inline-block";
      } else {
        depositPercent.value = valueSelect;
      }
    }
    depositHandler() {
      if (depositCheck.checked) {
        depositBank.style.display = "inline-block";
        depositAmount.style.display = "inline-block";
        //depositPercent.style.display = "inline-block";
        this.deposit = true;
        depositBank.addEventListener("change", this.changePercent);
      } else {
        depositBank.style.display = "none";
        depositAmount.style.display = "none";
        depositPercent.style.display = "none";
        depositBank.value = "";
        depositAmount.value = "";
        depositPercent.value = "";
        this.deposit = false;
        depositBank.removeEventListener("change", this.changePercent);
      }
    }
    eventListeners() {
      buttonStart.disabled = true;
      nameInput.forEach((item) => {
        //console.log("item: ", item);

        item.addEventListener("keyup", this.readInputName);
      });
      summInput.forEach((item) => {
        //console.log("item: ", item);
        item.addEventListener("keyup", this.readInputSumm);
      });
      salaryAmount.addEventListener("input", this.check);
      depositPercent.addEventListener("input", this.getInputPercent);

      buttonStart.addEventListener("click", this.start.bind(this));
      // buttonExpensesAdd.addEventListener(
      //   "click",
      //   appData.addExpIncBlock("expenses")
      // );
      buttonExpensesAdd.addEventListener("click", this.addExpensesBlock);
      // buttonIncomeAdd.addEventListener(
      //   "click",
      //   appData.addExpIncBlock("income")
      // );
      buttonIncomeAdd.addEventListener("click", this.addIncomeBlock);
      periodSelect.addEventListener("input", this.changePeriodValue);
      buttonCancel.addEventListener("click", this.reset.bind(this));
      depositCheck.addEventListener("change", this.depositHandler.bind(this));
    }
  }

  const appData = new AppData();
  appData.eventListeners();
  //console.log("appData: ", appData);
});
