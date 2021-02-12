"use strict";
let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let start = document.getElementById('start');
let buttonPlusIncome = document.querySelector('.income_add');
let buttonPlusExpenses = document.querySelector('.expenses_add');
let depositCheck = document.querySelector('#deposit-check');
let inputAdditionalIncomeItem = document.querySelectorAll('.additional_income-item');
let valueBudgetMonth = document.querySelector('.budget_month-value');
let valueBudgetDay = document.querySelector('.budget_day-value');
let valueExpensesMonth = document.querySelector('.expenses_month-value');
let valueAdditionalIncome = document.querySelector('.additional_income-value');
let valueAdditionalExpenses = document.querySelector('.additional_expenses-value');
let valueIncomePeriod = document.querySelector('.income_period-value');
let valueTargetMonth = document.querySelector('.target_month-value');
let inputSalaryAmount = document.querySelector('.salary-amount');
let expensesItems = document.querySelectorAll('.expenses-items');
let inputAdditionalExpensesItem = document.querySelector('.additional_expenses-item');
let inputTargetAmount = document.querySelector('.target-amount');
let inputPeriodSelect = document.querySelector('.period-select');
let incomeItems = document.querySelectorAll('.income-items');
let periodAmount  = document.querySelector('.period-amount');




let appData = {
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  expensesMonth: 0,
  addExpenses: [],
  deposit: false,
  precentDeposit: 0,
  moneyDeposit: 0,
  
  startOff: function(){
    if(inputSalaryAmount.value === '') {
    start.disabled = true;
    } else {start.disabled = false;}

  },
  
  start: function () {
    
    appData.budget = +inputSalaryAmount.value;
    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getAddIncome();
    appData.getAddExpenses();
    
    appData.getBudget();

    appData.showResult();
  },

  
  changePeriod(){
    periodAmount.textContent = inputPeriodSelect.value;
  },
  
  showResult: function() {
     valueBudgetMonth.value = appData.budgetMonth;
     valueBudgetDay.value = appData.budgetDay;
     valueExpensesMonth.value = appData.expensesMonth;
     valueAdditionalExpenses.value = appData.addExpenses.join(', ');
     valueAdditionalIncome.value = appData.addIncome.join(', ');
     valueTargetMonth.value = Math.ceil(appData.getTargetMonth());
     valueIncomePeriod.value = appData.calcPeriod();
     inputPeriodSelect.addEventListener('mousemove', function(){
       valueIncomePeriod.value = appData.calcPeriod();
     });

  },
  
  addExpensesBlock: function(){
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, buttonPlusExpenses);
    expensesItems = document.querySelectorAll('.expenses-items');
    if(expensesItems.length === 3) {
      buttonPlusExpenses.style.display = 'none';
    }
  },
  getExpenses: function (){
     expensesItems.forEach(function(item){
       let itemExpenses = item.querySelector('.expenses-title').value;
       let cashExpenses = item.querySelector('.expenses-amount').value;
       if(itemExpenses !== '' && cashExpenses !== '' ){
         appData.expenses[itemExpenses] = cashExpenses;
       }
     });
  },
  addIncomeBlock: function(){
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, buttonPlusIncome);
    incomeItems = document.querySelectorAll('.income-items');
    if(incomeItems.length === 3) {
      buttonPlusIncome.style.display = 'none';
    }
  },
  getIncome: function(){
    incomeItems.forEach(function(item){
       let itemIncome = item.querySelector('.income-title').value;
       let cashIncome = item.querySelector('.income-amount').value;
       if(itemIncome !== '' && cashIncome !== '' ){
         appData.income[itemIncome] = cashIncome;
       }
     });
    for (let key in appData.income){
      appData.incomeMonth += +appData.income[key];
    }
    },

  getAddExpenses: function(){
   let addExpenses = inputAdditionalExpensesItem.value.split(',');
   addExpenses.forEach(function(item){
     item = item.trim();
     if(item !==''){
        appData.addExpenses.push(item);
     }
   });
  },
  getAddIncome: function(){
      inputAdditionalIncomeItem.forEach(function(item){
        let itemValue = item.value.trim();
        if(itemValue !== ''){
          appData.addIncome.push(itemValue);
        }
      });
  },
  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }
    return appData.expensesMonth;
  },
  getBudget: function () {
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function () {
    return inputTargetAmount.value / (appData.budgetMonth + 0.1);
  },
  getStatusIncome: function () {
    if (appData.budgetDay < 0) {
      return "Что то пошло не так";
    } else if (appData.budgetDay === 0) {
      return "У вас низкий доход";
    } else if (appData.budgetDay <= 600) {
      return "К сожалению у вас уровень дохода ниже среднего";
    } else if (appData.budgetDay <= 1200) {
      return "У вас средний уровень дохода";
    } else if (appData.budgetDay >= 1200) {
      return "У вас высокий уровень дохода";
    }
  },
  calcPeriod: function () {
    return appData.budgetMonth * inputPeriodSelect.value;
  },

};

document.addEventListener('mouseover', appData.startOff);     
start.addEventListener('click', appData.start);
buttonPlusExpenses.addEventListener('click', appData.addExpensesBlock);
buttonPlusIncome.addEventListener('click', appData.addIncomeBlock);
inputPeriodSelect.addEventListener('mousemove', appData.changePeriod);




