'use strict';
let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
  income = 'Инстаграмм',
  addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
  deposit = confirm('Есть ли у вас депозит в банке?'),
  mission = 1000000,
  period = 6,
  budgetDay;

let start = function (){

  do {
  money = prompt('Ваш месячный доход?');

  }while (!isNumber(money)) 
};

start();

let showTypeOf = function (item){
  console.log(typeof item);
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(addExpenses);

console.log('Возможные расходы: ' + addExpenses.toLocaleLowerCase().split(','));

let expenses = []; 

function getExpensesMonth () {
  let sum = 0;
  let sumIn;
  let i = 0; 
  do  { 
    i++;
    expenses[i] = prompt('Введите обязательную статью расходов?');
    sumIn= prompt('Во сколько это обойдется?');
    while (!isNumber(sumIn)) {
    sumIn = prompt('Ваш месячный доход?');
  }
  sum+= +sumIn;
  }while (i<2); 
   
    
  return sum;
}


let expensesAmount = getExpensesMonth ();
console.log('Сумма обязательных расходов ' + expensesAmount);


function getAccumulatedMonth () {
  return (money - expensesAmount);
}
getAccumulatedMonth ();


let accumulatedMonth =  getAccumulatedMonth ();


function getTargetMonth () {
  return (mission / (accumulatedMonth + 0.1));
}


if (getTargetMonth () > 0){
console.log('Цель будет достигнута ' + Math.ceil(getTargetMonth()) + ' мес.');
} else {
  console.log('Цель не будет достигнута');
} 

budgetDay = accumulatedMonth / 30;
console.log('Бюджет на день ' + Math.floor(budgetDay));


let getStatusIncome = function(){
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

console.log(getStatusIncome());