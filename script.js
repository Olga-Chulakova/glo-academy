const appData = {
    title: '',
    screens: '',
    screenPrice: 0,
    adaptive: true,
    rollback: 15,
    service1: '',
    service2: '',
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPr: 0,
    asking: function () {
        appData.title = prompt('Как называется ваш проект?', 'Калькулятор верстки');
        appData.screens = prompt('Какие типы экранов нужно разработать?', 'Простые, сложные');

        do {
            appData.screenPrice = +prompt('Сколько будет стоить данная работа?');
        } while (!appData.isNumber(appData.screenPrice))

        appData.adaptive = confirm('Нужен ли адаптив на сайте?');
    },
    isNumber: function (num) {
        return !isNaN((parseFloat(num))) && isFinite(num)
    },
    getAllServicePrices: function () {
        let sum = 0;
        let price;

        for (let i = 0; i < 2; i++) {

            if (i === 0) {
                appData.service1 = prompt('Какой дополнительный тип услуги нужен?')
            } else if (i === 1) {
                appData.service2 = prompt('Какой дополнительный тип услуги нужен?')
            }

            do {
                price = +prompt('Сколько это будет стоить')
            } while (!appData.isNumber(price))

            sum += price;
        }

        return sum;
    },
    getFullPrice() {
        return +appData.screenPrice + appData.allServicePrices;
    },
    getTitle() {
        return appData.title.trim()[0].toUpperCase() + appData.title.slice(1).toLowerCase();
    },
    getServicePercentPrices() {
        return Math.ceil(appData.fullPrice - (appData.fullPrice * (appData.rollback / 100)));
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
        appData.allServicePrices = appData.getAllServicePrices();
        appData.fullPrice = appData.getFullPrice();
        appData.title = appData.getTitle();
        appData.servicePercentPrice = appData.getServicePercentPrices();
        appData.logger();
    },
    logger: function () {
        for (let key in appData) {
        console.log(key + ":", appData[key]);
    }
    }
}

appData.start();
