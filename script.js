'use strict';

let money = 300000;
let income = 'Инстаграмм';
let addExpenses = 'Кино, кафе, спортзал';
let deposit = true;
let mission = 10000000;
let period = 6;
let budgetDay = money / 30;


let showTypeOf = function (data){
  console.log(data, typeof(data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(addExpenses);

money = prompt('Ваш месячный доход?');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
console.log('Возможные расходы: ' + addExpenses);
deposit = confirm('Есть ли у вас депозит в банке?');

let expenses1 = prompt('Введите обязательную статью расходов?');
let eamount1 = +prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов?');
let eamount2 = +prompt('Во сколько это обойдется?');


function getExpensesMonth () {
  return (eamount1 + eamount2);
}
getExpensesMonth ();
console.log('Сумма обязательных расхожов ' + getExpensesMonth ());


function getAccumulatedMonth () {
  return (money - getExpensesMonth () );
}
getAccumulatedMonth ();


let accumulatedMonth =  getAccumulatedMonth ();


function getTargetMonth () {
  return (mission / (accumulatedMonth + 0.0000000001));
}


getTargetMonth ();
console.log('Период накопления ' + Math.ceil(getTargetMonth()) + ' мес.');

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



