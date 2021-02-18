"use strict";
const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const start = document.getElementById('start');
const buttonPlusIncome = document.querySelector('.income_add');
const buttonPlusExpenses = document.querySelector('.expenses_add');
const depositCheck = document.querySelector('#deposit-check');
const inputAdditionalIncomeItem = document.querySelectorAll('.additional_income-item');
const valueBudgetMonth = document.querySelector('.budget_month-value');
const valueBudgetDay = document.querySelector('.budget_day-value');
const valueExpensesMonth = document.querySelector('.expenses_month-value');
const valueAdditionalIncome = document.querySelector('.additional_income-value');
const valueAdditionalExpenses = document.querySelector('.additional_expenses-value');
const valueIncomePeriod = document.querySelector('.income_period-value');
const valueTargetMonth = document.querySelector('.target_month-value');
const inputSalaryAmount = document.querySelector('.salary-amount');
let expensesItems = document.querySelectorAll('.expenses-items');
const inputAdditionalExpensesItem = document.querySelector('.additional_expenses-item');
const inputTargetAmount = document.querySelector('.target-amount');
const inputPeriodSelect = document.querySelector('.period-select');
let incomeItems = document.querySelectorAll('.income-items');
const periodAmount = document.querySelector('.period-amount');
const btnReset = document.querySelector('#cancel');


class AppData {
  constructor() {
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
  }
  startOff() {
    if (inputSalaryAmount.value === '') {
      start.disabled = true;
    } else {
      start.disabled = false;
    }
  }
  start() {
    this.budget = +inputSalaryAmount.value;
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddIncome();
    this.getAddExpenses();
    this.getBudget();
    this.showResult();
    this.blockked();
  }
  reset() {
    const allInputLeft = document.querySelectorAll('.data input[type=text]');
    allInputLeft.forEach(i => i.removeAttribute('disabled', 'disabled'));
    const allInput = document.querySelectorAll('input');
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
  }
  blockked() {
    const allInputLeft = document.querySelectorAll('.data input[type=text]');
    allInputLeft.forEach(i => i.setAttribute('disabled', 'disabled'));
    start.style.display = 'none';
    btnReset.style.display = 'block';
  }

  changePeriod() {
    periodAmount.textContent = inputPeriodSelect.value;
  }

  showResult() {

    valueBudgetMonth.value = this.budgetMonth;
    valueBudgetDay.value = this.budgetDay;
    valueExpensesMonth.value = this.expensesMonth;
    valueAdditionalExpenses.value = this.addExpenses.join(', ');
    valueAdditionalIncome.value = this.addIncome.join(', ');
    valueTargetMonth.value = Math.ceil(this.getTargetMonth());
    valueIncomePeriod.value = this.calcPeriod();
    inputPeriodSelect.addEventListener('mousemove', () => {
      valueIncomePeriod.value = this.calcPeriod();
    });
  }

  addExpensesBlock() {
    const cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, buttonPlusExpenses);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      buttonPlusExpenses.style.display = 'none';
    }
  }

  getExpenses() {

    expensesItems.forEach((item) => {
      const itemExpenses = item.querySelector('.expenses-title').value;
      const cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        this.expenses[itemExpenses] = cashExpenses;
      }
    });

  }

  addIncomeBlock() {
    const cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, buttonPlusIncome);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
      buttonPlusIncome.style.display = 'none';
    }
  }

  getIncome() {

    incomeItems.forEach((item) => {
      const itemIncome = item.querySelector('.income-title').value;
      const cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        this.income[itemIncome] = cashIncome;
      }
    });
    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  }

  getAddExpenses() {
    const addExpenses = inputAdditionalExpensesItem.value.split(',');
    addExpenses.forEach((item) => {
      item = item.trim();
      if (item !== '') {
        this.addExpenses.push(item);
      }
    });
  }

  getAddIncome() {

    inputAdditionalIncomeItem.forEach((item) => {
      const itemValue = item.value.trim();
      if (itemValue !== '') {
        this.addIncome.push(itemValue);
      }
    });
  }
  getExpensesMonth() {
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
    return this.expensesMonth;
  }

  getBudget() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  }

  getTargetMonth() {
    return inputTargetAmount.value / (this.budgetMonth + 0.1);
  }

  getStatusIncome() {
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
  }

  calcPeriod() {
    return this.budgetMonth * inputPeriodSelect.value;
  }

  eventListeners() {

    document.addEventListener('mouseover', this.startOff);
    start.addEventListener('click', this.start.bind(appData));
    buttonPlusExpenses.addEventListener('click', this.addExpensesBlock);
    buttonPlusIncome.addEventListener('click', this.addIncomeBlock);
    inputPeriodSelect.addEventListener('mousemove', this.changePeriod);
    btnReset.addEventListener('click', this.reset.bind(appData));

  }

}

const appData = new AppData();


appData.eventListeners();