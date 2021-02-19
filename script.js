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
const inputAdditionalExpensesItem = document.querySelector('.additional_expenses-item');
const inputTargetAmount = document.querySelector('.target-amount');
const inputPeriodSelect = document.querySelector('.period-select');
const periodAmount = document.querySelector('.period-amount');
const btnReset = document.querySelector('#cancel');
const depositBank = document.querySelector('.deposit-bank');
const depositAmount = document.querySelector('.deposit-amount');
let depositPercent = document.querySelector('.deposit-percent');

let incomeItems = document.querySelectorAll('.income-items');
let expensesItems = document.querySelectorAll('.expenses-items');
start.setAttribute('disabled', true);
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
    if (!isNumber(inputSalaryAmount.value)) {
      start.setAttribute('disabled', true);
    } else {
      start.removeAttribute('disabled', true);
    }
  }
 
  startOff2() {
     if (isNumber(depositPercent.value) &&  depositPercent.value >= 0 && depositPercent.value <= 100  ) {
      start.removeAttribute('disabled', true);
      
    } else {
      start.setAttribute('disabled', true);
      depositPercent.value = '';
      alert (' Введите число от 0 до 100');
    }
  }



  start() {
    this.budget = +inputSalaryAmount.value;
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddIncome();
    this.getAddExpenses();
    this.getInfoDeposit();
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
    start.setAttribute('disabled', true);
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
    depositBank.style.display = 'none';
    depositAmount.style.display = 'none';
    depositAmount.value = '';
    depositBank.value = '';
    depositPercent.style.display = 'none';

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
    const monthDeposit = this.moneyDeposit * (this.precentDeposit / 100);
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
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

  getInfoDeposit() {
    if (this.deposit) {
      this.precentDeposit = depositPercent.value;
      this.moneyDeposit = depositAmount.value;
    }
  }
  changePercent() {
    let valueSelect = this.value;
    if (valueSelect === 'other') {
      depositPercent.value = '';
      depositPercent.style.display = 'inline-block';
      start.setAttribute('disabled', true);
    } else if (valueSelect !== 'other') {
      depositPercent.value = valueSelect;
      depositPercent.style.display = 'none';
      start.removeAttribute('disabled', true);
    }
  }


  depositHandler() {
    if (depositCheck.checked) {
      depositBank.style.display = 'inline-block';
      depositAmount.style.display = 'inline-block';
      this.deposit = true;
      depositBank.addEventListener('change', this.changePercent);
       start.setAttribute('disabled', true);
    } else {
      start.removeAttribute('disabled', true);
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      depositAmount.value = '';
      depositBank.value = '';
      this.deposit = false;
      depositBank.removeEventListener('change', this.changePercent);
    }
  }
  eventListeners() {
    inputSalaryAmount.addEventListener('input', this.startOff);
    depositPercent.addEventListener('input', this.startOff2);
    depositCheck.addEventListener('change', this.startoff1);
    start.addEventListener('click', this.start.bind(this));
    buttonPlusExpenses.addEventListener('click', this.addExpensesBlock);
    buttonPlusIncome.addEventListener('click', this.addIncomeBlock);
    inputPeriodSelect.addEventListener('mousemove', this.changePeriod);
    btnReset.addEventListener('click', this.reset.bind(this));
    depositCheck.addEventListener('change', this.depositHandler.bind(this));
  }

}

const appData = new AppData();


appData.eventListeners();