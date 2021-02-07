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
        
  },
  bubget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
};

appData.asking();
let expenses1, expenses2; 
appData.getExpensesMonth = function getExpensesMonth () {
   let sum = 0;
   let sumIn = 0;
   for (let i = 0; i<2; i++) { 
     if (i === 0) {
     expenses1 = prompt('Введите обязательную статью расходов?');
     } else if (i === 1) {
     expenses2 = prompt('Введите обязательную статью расходов?');
     }
    sumIn=prompt('Во сколько это обойдется?');
    while (isNaN(parseFloat(sumIn)) && isFinite(sumIn)) {
    sumIn=prompt('Во сколько это обойдется?');  
    }
    sum+= +sumIn;
   }   
   return sum;
 };

let expensesAmount = appData.getExpensesMonth ();
console.log('Сумма обязательных расходов ' + expensesAmount);


appData.getAccumulatedMonth = function getAccumulatedMonth () {
  return (money - expensesAmount);
};
appData.getAccumulatedMonth();

let accumulatedMonth =  appData.getAccumulatedMonth();


appData.getTargetMonth = function getTargetMonth () {
  return (appData.mission / (accumulatedMonth + 0.1));
};


if (appData.getTargetMonth() > 0){
console.log('Цель будет достигнута ' + Math.ceil(appData.getTargetMonth()) + ' мес.');
} else {
  console.log('Цель не будет достигнута');
} 

let budgetDay = accumulatedMonth / 30;
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