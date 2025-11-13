const title = document.getElementsByTagName('h1')[0];

const startButton = document.getElementsByClassName('handler_btn')[0];
const ressetButton = document.getElementsByClassName('handler_btn')[1];

const screenButton = document.querySelector('.screen-btn');

const controlPercent = document.querySelectorAll('.other-items.percent');
const controlNumber = document.querySelectorAll('.other-items.number');

const inputRange = document.querySelector('.rollback input[type="range"]');
const valueRange = document.querySelector('.rollback .range-value');

const total = document.getElementsByClassName('total-input')[0];
const totalCount = document.getElementsByClassName('total-input')[1];
const totalCountOther = document.getElementsByClassName('total-input')[2];
const totalFullCount = document.getElementsByClassName('total-input')[3];
const totalCountRollback = document.getElementsByClassName('total-input')[4];

let wrapperScren = document.querySelectorAll('.screen');


const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,
    rollback: 10,
    services: [],
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPr: 0,
    asking: function () {

        do {
            appData.title = prompt('Как называется ваш проект?');
        } while (!appData.isText(appData.title))

        for (let i = 0; i < 2; i++) {
            let name;
            let price;

            do {
                name = prompt('Какие типы экранов нужно разработать?');
            } while (!appData.isText(name));


            do {
                price = +prompt('Сколько будет стоить данная работа?');
            } while (!appData.isNumber(price))

            appData.screens.push({ id: i, name: name, price: price })
        }

        for (let i = 0; i < 2; i++) {
            let name;
            let price;

            do {
                name = prompt('Какой дополнительный тип услуги нужен?');
            } while (!appData.isText(name));

            do {
                price = +prompt('Сколько это будет стоить')
            } while (!appData.isNumber(price))

            appData.services[name + i] = price;

        }

        appData.adaptive = confirm('Нужен ли адаптив на сайте?');
    },
    addPrices: function () {
        for (let screen of appData.screens) {
            appData.screenPrice += screen.price
        }

        for (let key in appData.services) {
            appData.allServicePrices += appData.services[key];
        }
    },
    isNumber: function (num) {
        return !isNaN((parseFloat(num))) && isFinite(num)
    },
    isText: function (value) {
        const trimmed = value.trim();
        if (trimmed == '') {
            return false;
        }

        if (/[а-яa-z]/i.test(trimmed)) {
            return true;
        }

        return false;
    },
    getFullPrice() {
        appData.fullPrice = +appData.screenPrice + appData.allServicePrices;
    },
    getTitle() {
        appData.title = appData.title.trim()[0].toUpperCase() + appData.title.slice(1).toLowerCase();
    },
    getServicePercentPrices() {
        appData.servicePercentPrice = Math.ceil(appData.fullPrice - (appData.fullPrice * (appData.rollback / 100)));
    },
    getRollbackMessage: function (price) {
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
    },
    start: function () {
        appData.asking();
        appData.addPrices();
        appData.getFullPrice();
        appData.getTitle();
        appData.getServicePercentPrices();
        appData.logger();
    },
    logger: function () {
        console.log(appData.fullPrice);
        console.log(appData.servicePercentPrice);
        console.log(appData.screens);
    }
}

appData.start();