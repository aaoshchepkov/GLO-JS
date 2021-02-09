'use strict';
let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
let money;
let start = function () {
  do {
  money = prompt('Ваш месячный доход?', 50000);
 }
  while (!isNumber(money)); 
};

start();

const buttonStart = document.getElementById('start');
const buttonPlusIncome = document.getElementsByTagName('button')[0];
const buttonPlusExpenses = document.getElementsByTagName('button')[1];
const checkbox = document.querySelector('#deposit-check');
const inputAdditionalIncomeItem1 = document.querySelectorAll('.additional_income-item')[0];
const inputAdditionalIncomeItem2 = document.querySelectorAll('.additional_income-item')[1];
const valueBudgetMonth = document.getElementsByClassName('budget_month-value');
const valueBudgetDay = document.getElementsByClassName('budget_day-value');
const valueExpensesMonth = document.getElementsByClassName('expenses_month-value');
const valueAdditionalIncome = document.getElementsByClassName('additional_income-value');
const valueAdditionalExpenses = document.getElementsByClassName('additional_expenses-value');
const valueIncomePeriod = document.getElementsByClassName('income_period-value');
const valueTargetMonth = document.getElementsByClassName('target_month-value');
const inputSalaryAmount = document.querySelector('.salary-amount');
const inputIncomeTitle = document.querySelector('.income-items .income-title');
const inputIncomeAmount = document.querySelector('.income-amount');
const inputExpensesTitle = document.querySelector('.expenses-items .expenses-title');
const inputExpensesAmount = document.querySelector('.expenses-amount');
const inputAdditionalExpensesItem = document.querySelector('.additional_expenses-item');
const inputTargetAmount = document.querySelector('.target-amount');
const inputPeriodSelect = document.querySelector('.period-select');





let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  precentDeposit: 0,
  moneyDeposit: 0,
  mission: 100000,
  period: 6,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function () {

     if (confirm('У вас есть дополнительный заработок?')) {
      let itemIncome = prompt('Какой у вас дополнительный заработок', 'Таксую');
      if ( itemIncome === null) {
      appData.asking();
      }
      while (isFinite(itemIncome)){
      itemIncome = prompt('Какой у вас дополнительный заработок', 'Таксую');}

      let cashIncome = prompt('Сколько в месяц приносит дополнительный доход?', 10000);
      if (cashIncome === null) {
      appData.asking();
      }
      while (!isNumber(cashIncome)) {
      cashIncome = prompt('Сколько в месяц приносит дополнительный доход?', 10000);}
      
      appData.income[itemIncome] = cashIncome;
      }

    let addExpenses = prompt('Возможные расходы за рассчитываемый период через запятую', 'еда, вОда, похОд в кино');
    while (isFinite(addExpenses)){
    addExpenses = prompt('Возможные расходы за рассчитываемый период через запятую', 'еда, вОда, похОд в кино');}
    appData.addExpenses = addExpenses.toLowerCase().split(',');
    appData.addExpenses = appData.addExpenses.map(function(item) {
      return item.trim();
    });
    appData.addExpenses = appData.addExpenses.map(function(item) {
      return item.slice(0, 1).toUpperCase() + item.slice(1);
    });
    console.log(appData.addExpenses.join(', '));
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
    if(appData.deposit) {
      do {
      appData.precentDeposit = prompt('Какой процент по депозиту?', '10');
      }
      while (!isNumber(appData.precentDeposit)); 
      do {
      appData.moneyDeposit = prompt('Какая сумма депозита?', 10000);
      }
      while (!isNumber(appData.moneyDeposit)); 
    }
    for (let i = 0; i < 2; i++) {
      let expenses;
      let sum = 0;
      expenses = prompt('Введите обязательную статью расходов?', 'еда,вОда');
      while (isFinite(expenses)){
      expenses = prompt('Введите обязательную статью расходов?', 'Еда,вОда');}
      do {
      sum = prompt('Во сколько это обойдется?', 500);
      }
      while (!isNumber(sum)); 
      appData.expenses[expenses] = +sum;
    }
  },
  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];
    }
    return appData.expensesMonth;
  },
  getBudget: function () {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function () {
    if (appData.budgetMonth > 0) {
      return console.log('Цель будет достигнута ' + Math.ceil(appData.mission / (appData.budgetMonth + 0.1)) + ' мес.');
    } else {
      return console.log('Цель не будет достигнута');
    }
  },
  getStatusIncome: function () {
    if (appData.budgetDay < 0) {
      return ('Что то пошло не так');
    } else if (appData.budgetDay === 0) {
      return ('У вас низкий доход');
    } else if (appData.budgetDay <= 600) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else if (appData.budgetDay <= 1200) {
      return ('У вас средний уровень дохода');
    } else if (appData.budgetDay >= 1200) {
      return ('У вас высокий уровень дохода');
    }
  },
  calcSavedMoney: function() { 
    return appData.budgetMonth * appData.period;
  },
}; 

appData.asking();
appData.getExpensesMonth();
console.log("Расходы за месяц: " + appData.getExpensesMonth());
appData.getBudget();
appData.getTargetMonth();
console.log(appData.getStatusIncome());



for (let key in appData) {
console.log('Наша программа включает в себя данные:' + key + ': ' + appData[key]);}

