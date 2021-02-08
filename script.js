'use strict';
let money;
let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let start = function (){
  do {
  money = prompt('Ваш месячный доход?');
  } while (!isNumber(money));
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
  asking: function (){
    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses = 'Возможные расходы: ' + addExpenses.toLowerCase().split(',');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        for (let i = 0; i<2; i++) {
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
  bubget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
};


appData.asking();

appData.getExpensesMonth = function getExpensesMonth () {
   let sum = 0;
   for (const property in appData.expenses) {
   sum+= appData.expenses[property];
  }
   return sum;
  }

let expensesAmount = appData.getExpensesMonth ();
console.log('Сумма обязательных расходов ' + expensesAmount);


appData.getAccumulatedMonth = function getAccumulatedMonth () {
  return (money - expensesAmount);
};


appData.getAccumulatedMonth();



let getBudget =  appData.getAccumulatedMonth();


appData.getTargetMonth = function getTargetMonth () {
  return (appData.mission / (getBudget + 0.1));
};


if (appData.getTargetMonth() > 0){
console.log('Цель будет достигнута ' + Math.ceil(appData.getTargetMonth()) + ' мес.');
} else {
  console.log('Цель не будет достигнута');
} 

let budgetDay = getBudget / 30;
console.log('Бюджет на день ' + Math.floor(budgetDay));


appData.getStatusIncome = function getStatusIncome(){
  if (budgetDay < 0 ) {
    return('Что то пошло не так');
  } else if (budgetDay === 0) {
    return('У вас низкий доход');   
  } else if (budgetDay <= 600){
    return('К сожалению у вас уровень дохода ниже среднего');
  } else if (budgetDay <= 1200) {
    return('У вас средний уровень дохода');
  } else if (budgetDay >= 1200) {
    return('У вас высокий уровень дохода');
  } 
};

console.log(appData.getStatusIncome());
for (let key in appData) {
  console.log('Наша программа включает в себя данные:' + key + ': ' + appData[key]);
};