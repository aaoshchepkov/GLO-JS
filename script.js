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


const AppData = function () {
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.income = {};
  this.incomeMonth = 0;
  this.addIncome = [];
  this.expenses = {};
  this.expensesMonth = 0;
  this.addExpenses = [];
  this.deposit = false;
  this.precentDeposit = 0;
  this.moneyDeposit = 0;
};

AppData.prototype.startOff = function () {
  if (inputSalaryAmount.value === '') {
    start.disabled = true;
  } else {
    start.disabled = false;
  }
};

AppData.prototype.start = function () {
  this.budget = +inputSalaryAmount.value;
  this.getExpenses();
  this.getIncome();
  this.getExpensesMonth();
  this.getAddIncome();
  this.getAddExpenses();
  this.getBudget();
  this.showResult();
  this.blockked();
};

AppData.prototype.reset = function () {
  let allInputLeft = document.querySelectorAll('.data input[type=text]');
  allInputLeft.forEach(i => i.removeAttribute('disabled', 'disabled'));
  let allInput = document.querySelectorAll('input');
  allInput.forEach(i => i.value = '');
  depositCheck.checked = false;
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.income = {};
  this.incomeMonth = 0;
  this.addIncome = [];
  this.expenses = {};
  this.expensesMonth = 0;
  this.addExpenses = [];
  this.deposit = false;
  this.precentDeposit = 0;
  this.moneyDeposit = 0;
  inputPeriodSelect.value = 1;
  this.changePeriod();
  for (let i = 1; expensesItems.length > i; i++) {
    expensesItems[i].remove();
  }
  for (let i = 1; incomeItems.length > i; i++) {
    incomeItems[i].remove();
  }
  buttonPlusIncome.style.display = 'block';
  buttonPlusExpenses.style.display = 'block';
  start.style.display = 'block';
  btnReset.style.display = 'none';
};

AppData.prototype.blockked = function () {
  let allInputLeft = document.querySelectorAll('.data input[type=text]');
  allInputLeft.forEach(i => i.setAttribute('disabled', 'disabled'));
  start.style.display = 'none';
  btnReset.style.display = 'block';
};

AppData.prototype.changePeriod = function () {
  periodAmount.textContent = inputPeriodSelect.value;
};

AppData.prototype.showResult = function () {
  const _this = this;
  valueBudgetMonth.value = this.budgetMonth;
  valueBudgetDay.value = this.budgetDay;
  valueExpensesMonth.value = this.expensesMonth;
  valueAdditionalExpenses.value = this.addExpenses.join(', ');
  valueAdditionalIncome.value = this.addIncome.join(', ');
  valueTargetMonth.value = Math.ceil(this.getTargetMonth());
  valueIncomePeriod.value = this.calcPeriod();
  inputPeriodSelect.addEventListener('mousemove', function () {
    valueIncomePeriod.value = _this.calcPeriod();
  });
};

AppData.prototype.addExpensesBlock = function () {
  let cloneExpensesItem = expensesItems[0].cloneNode(true);
  expensesItems[0].parentNode.insertBefore(cloneExpensesItem, buttonPlusExpenses);
  expensesItems = document.querySelectorAll('.expenses-items');
  if (expensesItems.length === 3) {
    buttonPlusExpenses.style.display = 'none';
  }
};

AppData.prototype.getExpenses = function () {
  const _this = this;
  expensesItems.forEach(function (item) {
    let itemExpenses = item.querySelector('.expenses-title').value;
    let cashExpenses = item.querySelector('.expenses-amount').value;
    if (itemExpenses !== '' && cashExpenses !== '') {
      _this.expenses[itemExpenses] = cashExpenses;
    }
  });

};

AppData.prototype.addIncomeBlock = function () {
  let cloneIncomeItem = incomeItems[0].cloneNode(true);
  incomeItems[0].parentNode.insertBefore(cloneIncomeItem, buttonPlusIncome);
  incomeItems = document.querySelectorAll('.income-items');
  if (incomeItems.length === 3) {
    buttonPlusIncome.style.display = 'none';
  }
};

AppData.prototype.getIncome = function () {
  const _this = this;
  incomeItems.forEach(function (item) {
    let itemIncome = item.querySelector('.income-title').value;
    let cashIncome = item.querySelector('.income-amount').value;
    if (itemIncome !== '' && cashIncome !== '') {
      _this.income[itemIncome] = cashIncome;
    }
  });
  for (let key in this.income) {
    this.incomeMonth += +this.income[key];
  }
};

AppData.prototype.getAddExpenses = function () {
  let addExpenses = inputAdditionalExpensesItem.value.split(',');
  const _this = this;
  addExpenses.forEach(function (item) {
    item = item.trim();
    if (item !== '') {
      _this.addExpenses.push(item);
    }
  });
};

AppData.prototype.getAddIncome = function () {
  const _this = this;
  inputAdditionalIncomeItem.forEach(function (item) {
    let itemValue = item.value.trim();
    if (itemValue !== '') {
      _this.addIncome.push(itemValue);
    }
  });
};

AppData.prototype.getExpensesMonth = function () {
  for (let key in this.expenses) {
    this.expensesMonth += +this.expenses[key];
  }
  return this.expensesMonth;
};

AppData.prototype.getBudget = function () {
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
  this.budgetDay = Math.floor(this.budgetMonth / 30);
};

AppData.prototype.getTargetMonth = function () {
  return inputTargetAmount.value / (this.budgetMonth + 0.1);
};

AppData.prototype.getStatusIncome = function () {
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
};

AppData.prototype.calcPeriod = function () {
  return this.budgetMonth * inputPeriodSelect.value;
};

AppData.prototype.eventListeners = function () {
 
  document.addEventListener('mouseover', this.startOff);
  start.addEventListener('click', this.start.bind(appData));
  buttonPlusExpenses.addEventListener('click', this.addExpensesBlock);
  buttonPlusIncome.addEventListener('click', this.addIncomeBlock);
  inputPeriodSelect.addEventListener('mousemove', this.changePeriod);
  btnReset.addEventListener('click', this.reset.bind(appData));
  
};

const appData = new AppData();
console.log(appData);

AppData.prototype.eventListeners();
