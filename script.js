let title;
let screens;
let screenPrice;
let adaptive;
let rollback = 15;

let service1;
let service2;

let allServicePrices;
let fullPrice;
let servicePercentPrice;

const isNumber = function (num) {
    return !isNaN((parseFloat(num))) && isFinite(num)
}

const asking = function () {
    title = prompt('Как называется ваш проект?');
    screens = prompt('Какие типы экранов нужно разработать?');

    do {
        screenPrice = +prompt('Сколько будет стоить данная работа?');
    } while (!isNumber(screenPrice))

    adaptive = confirm('Нужен ли адаптив на сайте?');
}

const showTypeOf = function (variable) {
    console.log(variable, typeof variable);
}

const getAllServicePrices = function () {
    let sum = 0;
    let price;

    for (let i = 0; i < 2; i++) {

        if (i === 0) {
            service1 = prompt('Какой дополнительный тип услуги нужен?')
            console.log(typeof service1)
        } else if (i === 1) {
            service2 = prompt('Какой дополнительный тип услуги нужен?')
            console.log(typeof service2)
        }

        do {
            price = +prompt('Сколько это будет стоить')
            console.log(typeof price)
            console.log(price)
        } while (!isNumber(price))

        sum += price;
    }

    return sum;
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

asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
title = getTitle(title);
servicePercentPrice = getServicePercentPrices();

showTypeOf(title);
showTypeOf(screens);
showTypeOf(screenPrice);
showTypeOf(adaptive)
showTypeOf(allServicePrices)
showTypeOf(fullPrice)
showTypeOf(servicePercentPrice)

console.log(getRollbackMessage(fullPrice))
console.log(servicePercentPrice);