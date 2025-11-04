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
