let money = 500000;
let income = 'Инстаграмм';
let addExpenses = 'Кино, кафе, спортзал';
let deposit = true;
let mission = 10000000;
let period = 6;
let budgetDay = 'доход за месяц/30'

console.log(typeof money);
console.log(typeof income);
console.log(typeof addExpenses);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработь ' + mission + ' рублей');
addExpenses = addExpenses.toLowerCase();
console.log(addExpenses.split(', '));
console.log(budgetDay);