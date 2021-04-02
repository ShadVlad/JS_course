let money = 50000;
let incom = "Freelance";
let addExpenses = "Интернет, такси, коммуналка";
let deposit = true;
let mission = 1000000;
let period = 6;

console.log("Переменная 'money' имеет тип '", typeof money, "'");
console.log("Переменная 'incom' имеет тип '", typeof incom, "'");
console.log("Переменная 'deposit' имеет тип '", typeof deposit, "'");

console.log("Длина строки '" + addExpenses + "' = " + addExpenses.length);

console.log("Период равен " + period + " месяцев ");
console.log("Цель заработать " + mission + " рублей");

console.log(addExpenses.toLowerCase().split(","));
let budgetDay = money / 30;
console.log("Доход за день " + budgetDay.toFixed(2) + " рублей");
