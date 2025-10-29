let title = prompt('Как называется ваш проект?');
let screens = prompt('Какие типы экранов нужно разработать?');
let screenPrice = +prompt('Сколько будет стоить данная работа?');
let adaptive = confirm('Нужен ли адаптив на сайте?');
let service1 = prompt('Какой дополнительный тип услуги нужен?')
let servicePrice1 = +prompt('Сколько это будет стоить')
let service2 = prompt('Какой дополнительный тип услуги нужен?')
let servicePrice2 = +prompt('Сколько это будет стоить')
let rollback = 15;

const showTypeOf = function (variable) {
    console.log(variable, typeof variable);
}

const getAllServicePrices = function () {
    return servicePrice1 + servicePrice2;
}

function getFullPrice() {
    return screenPrice + allServicePrices;
}

function getTitle(title) {
    const trimmed = title.trim();
    return trimmed[0].toUpperCase() + trimmed.slice(1).toLowerCase();
}

function getServicePercentPrices() {
    return Math.ceil(fullPrice - (fullPrice * (rollback / 100)));
}

const getRollbackMessage = function (price) {
    switch (true) {
        case price >= 30000:
            return 'Даем скидку в 10%';
            break;
        case price >= 15000 && price < 30000:
            return 'Даем скидку в 5%';
            break;
        case price >= 0 && price < 15000:
            return 'Скидка не предусмотрена';
            break;
        default:
            return 'Что то пошло не так';
    }
}

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive)
const allServicePrices = getAllServicePrices();
const fullPrice = getFullPrice();
title = getTitle(title);
const servicePercentPrice = getServicePercentPrices();

console.log(screens);
console.log(getRollbackMessage(fullPrice))
console.log(servicePercentPrice);