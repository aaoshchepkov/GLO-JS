'use strict';

let money = 300000;
let income = 'Инстаграмм';
let addExpenses = 'Кино, кафе, спортзал';
let deposit = true;
let mission = 10000000;
let period = 6;
let budgetDay = money / 30;

console.log(typeof money);
console.log(typeof income);
console.log(typeof addExpenses);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработь ' + mission + ' рублей');
addExpenses = addExpenses.toLowerCase();
console.log(addExpenses.split(', '));
console.log(budgetDay);

money = prompt('Ваш месячный доход?');
console.log(money);

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
console.log(addExpenses);

deposit = prompt('Есть ли у вас депозит в банке?');
if (deposit.toLowerCase() === 'да'){
  deposit = true;
} else {
  deposit = false;
}
console.log(deposit);

let expenses1 = prompt('Введите обязательную статью расходов?');
console.log(expenses1);
let eamount1 = +prompt('Во сколько это обойдется?');
console.log(eamount1);
let expenses2 = prompt('Введите обязательную статью расходов?');
console.log(expenses2);
let eamount2 = +prompt('Во сколько это обойдется?');
console.log(eamount2);

let budgetMonth = eamount1 + eamount2;
console.log(budgetMonth);
period = mission / (money - budgetMonth);
console.log(Math.ceil(period));

budgetDay = (money - budgetMonth) / 30;
console.log(Math.floor(budgetDay));

if (budgetDay < 0 ) {
  console.log('Что то пошло не так');
} else if (budgetDay <= 600){
  console.log('К сожалению у вас уровень дохода ниже среднего');
} else if (budgetDay <= 1200) {
  console.log('У вас средний уровень дохода');
} else if (budgetDay >= 1200) {
  console.log('У вас высокий уровень дохода');
} 