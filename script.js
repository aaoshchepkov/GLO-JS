'use strict';

let money;
let start = function () {
  money = prompt('Ваш месячный доход?');
  while (isNaN(parseFloat(money)) && isFinite(money)) {
    money = prompt('Ваш месячный доход?');
  }
};

start();

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 100000,
  period: 6,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function () {
    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
    appData.addExpenses = 'Возможные расходы: ' + addExpenses.toLowerCase().split(',');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
    for (let i = 0; i < 2; i++) {
      let expenses;
      let sum = 0;
      expenses = prompt('Введите обязательную статью расходов?');
      sum = prompt('Во сколько это обойдется?');
      while (isNaN(parseFloat(sum)) && isFinite(sum)) {
        sum = prompt('Во сколько это обойдется?');
      }
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
};

appData.asking();
console.log("Расходы за месяц: " + appData.getExpensesMonth());
appData.getBudget();
appData.getTargetMonth();
console.log(appData.getStatusIncome());

for (let key in appData) {
  console.log('Наша программа включает в себя данные:' + key + ': ' + appData[key]);
};