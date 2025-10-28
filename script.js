let title = prompt('Как называется ваш проект?');

let screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные');

let screenPrice = +prompt('Сколько будет стоить данная работа?', 1200);

let adaptive = confirm('Нужен ли адаптив на сайте?');
console.log(adaptive);

let service1 = prompt('Какой дополнительный тип услуги нужен?')
let servicePrice1 = +prompt('Сколько это будет стоить')

let service2 = prompt('Какой дополнительный тип услуги нужен?')
let servicePrice2 = +prompt('Сколько это будет стоить')

let rollback = 15;
let fullPrice = screenPrice + servicePrice1 + servicePrice2;

let servicePercentPrice = Math.ceil(fullPrice - (fullPrice * (rollback/100)));
console.log(servicePercentPrice);

switch(true) {
    case fullPrice >= 30000: 
        console.log('Даем скидку в 10%');
        break;
    case fullPrice >= 15000 && fullPrice < 30000:
        console.log('Даем скидку в 5%');
        break;
    case fullPrice >= 0 && fullPrice < 15000:
        console.log('Скидка не предусмотрена');
        break;
    default:
        console.log('Что то пошло не так');
}