"use strict";
let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let start = document.getElementById('start');
let buttonPlusIncome = document.querySelector('.income_add');
let buttonPlusExpenses = document.querySelector('.expenses_add');
let depositCheck = document.querySelector('#deposit-check');
let inputAdditionalIncomeItem = document.querySelectorAll('.additional_income-item');
let valueBudgetMonth = document.querySelector('.budget_month-value');
let valueBudgetDay = document.querySelector('.budget_day-value');
let valueExpensesMonth = document.querySelector('.expenses_month-value');
let valueAdditionalIncome = document.querySelector('.additional_income-value');
let valueAdditionalExpenses = document.querySelector('.additional_expenses-value');
let valueIncomePeriod = document.querySelector('.income_period-value');
let valueTargetMonth = document.querySelector('.target_month-value');
let inputSalaryAmount = document.querySelector('.salary-amount');
let expensesItems = document.querySelectorAll('.expenses-items');
let inputAdditionalExpensesItem = document.querySelector('.additional_expenses-item');
let inputTargetAmount = document.querySelector('.target-amount');
let inputPeriodSelect = document.querySelector('.period-select');
let incomeItems = document.querySelectorAll('.income-items');
let periodAmount = document.querySelector('.period-amount');
let btnReset = document.querySelector('#cancel');





let appData = {
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  expensesMonth: 0,
  addExpenses: [],
  deposit: false,
  precentDeposit: 0,
  moneyDeposit: 0,

  startOff: function () {
    if (inputSalaryAmount.value === '') {
      start.disabled = true;
    } else {
      start.disabled = false;
    }

  },

  start: function () {

    appData.budget = +inputSalaryAmount.value;
    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getAddIncome();
    appData.getAddExpenses();

    appData.getBudget();

    appData.showResult();
    appData.blockked();


  },

  reset() {
    let allInputLeft = document.querySelectorAll('.data input[type=text]');
    allInputLeft.forEach(i => i.removeAttribute('disabled', 'disabled'));
    let allInput = document.querySelectorAll('input');
    allInput.forEach(i => i.value = '');
    appData.budget = 0;
    appData.budgetDay = 0;
    appData.budgetMonth = 0;
    appData.income = {};
    appData.incomeMonth = 0;
    appData.addIncome = [];
    appData.expenses = {};
    appData.expensesMonth = 0;
    appData.addExpenses = [];
    appData.deposit = false;
    appData.precentDeposit = 0;
    appData.moneyDeposit = 0;
    inputPeriodSelect.value = 1;
    appData.changePeriod();
     if (expensesItems.length === 1) {
      expensesItems[1].remove();
    } else if (expensesItems.length > 2) {
      expensesItems[1].remove();
      expensesItems[2].remove();
    }
    if (incomeItems.length === 1) {
      incomeItems[1].remove();
    } else if (incomeItems.length > 2) {
      incomeItems[1].remove();
      incomeItems[2].remove();
    } 
    buttonPlusIncome.style.display = 'block';
    buttonPlusExpenses.style.display = 'block';
    start.style.display = 'block';
    btnReset.style.display = 'none';

  },

  blockked() {
    let allInputLeft = document.querySelectorAll('.data input[type=text]');
    allInputLeft.forEach(i => i.setAttribute('disabled', 'disabled'));
    start.style.display = 'none';
    btnReset.style.display = 'block';
  },

  changePeriod() {
    periodAmount.textContent = inputPeriodSelect.value;
  },

  showResult: function () {
    valueBudgetMonth.value = this.budgetMonth;
    valueBudgetDay.value = this.budgetDay;
    valueExpensesMonth.value = this.expensesMonth;
    valueAdditionalExpenses.value = this.addExpenses.join(', ');
    valueAdditionalIncome.value = this.addIncome.join(', ');
    valueTargetMonth.value = Math.ceil(this.getTargetMonth());
    valueIncomePeriod.value = this.calcPeriod();
    inputPeriodSelect.addEventListener('mousemove', function () {
      valueIncomePeriod.value = appData.calcPeriod();
    });
  },

  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, buttonPlusExpenses);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      buttonPlusExpenses.style.display = 'none';
    }

  },
  getExpenses: function () {
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        appData.expenses[itemExpenses] = cashExpenses;
      }

    });

  },
  addIncomeBlock: function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, buttonPlusIncome);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
      buttonPlusIncome.style.display = 'none';
    }

  },
  getIncome: function () {
    incomeItems.forEach(function (item) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        appData.income[itemIncome] = cashIncome;
      }

    });
    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }

  },

  getAddExpenses: function () {
    let addExpenses = inputAdditionalExpensesItem.value.split(',');
    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }

    });
  },
  getAddIncome: function () {
    inputAdditionalIncomeItem.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        appData.addIncome.push(itemValue);
      }

    });
  },
  getExpensesMonth: function () {
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
    return this.expensesMonth;
  },
  getBudget: function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  },
  getTargetMonth: function () {
    return inputTargetAmount.value / (this.budgetMonth + 0.1);
  },
  getStatusIncome: function () {
    if (this.budgetDay < 0) {
      return "Что то пошло не так";
    } else if (this.budgetDay === 0) {
      return "У вас низкий доход";
    } else if (this.budgetDay <= 600) {
      return "К сожалению у вас уровень дохода ниже среднего";
    } else if (this.budgetDay <= 1200) {
      return "У вас средний уровень дохода";
    } else if (this.budgetDay >= 1200) {
      return "У вас высокий уровень дохода";
    }
  },
  calcPeriod: function () {
    return appData.budgetMonth * inputPeriodSelect.value;
  },

};

document.addEventListener('mouseover', appData.startOff);
start.addEventListener('click', appData.start);
buttonPlusExpenses.addEventListener('click', appData.addExpensesBlock);
buttonPlusIncome.addEventListener('click', appData.addIncomeBlock);
inputPeriodSelect.addEventListener('mousemove', appData.changePeriod);
btnReset.addEventListener('click', appData.reset);