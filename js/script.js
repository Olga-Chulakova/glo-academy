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
    servicesPercent: {},
    servicesNumber: {},
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    totalScreensCount: 0,
    init: function () {
        startButton.disabled = true;
        startButton.style.cursor = 'not-allowed';
        appData.addTitle()
        appData.start()
        startButton.addEventListener('click', appData.start)
        screenButton.addEventListener('click', appData.addScreenBlock)
        document.addEventListener('input', () => {
            const allFilled = appData.checkAllScreens();
            startButton.disabled = !allFilled;
            startButton.style.cursor = allFilled ? 'pointer' : 'not-allowed';

        })
    },
    addTitle: function () {
        document.title = title.textContent
    },
    showResult: function () {
        total.value = appData.screenPrice
        totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber
        totalFullCount.value = appData.fullPrice
        totalCountRollback.value = appData.servicePercentPrice
        totalCount.value = appData.totalScreensCount
    },
    addScreens: function () {
        wrapperScren = document.querySelectorAll('.screen');

        wrapperScren.forEach((screen, index) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent

            appData.screens.push({
                id: index,
                name: selectName,
                price: +select.value * +input.value,
                count: +input.value
            })
        })
    },
    addServices: function () {
        controlPercent.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]')
            const label = item.querySelector('label')
            const input = item.querySelector('input[type=text]')

            if (check.checked) {
                appData.servicesPercent[label.textContent] = +input.value
            }
        })

        controlNumber.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]')
            const label = item.querySelector('label')
            const input = item.querySelector('input[type=text]')

            if (check.checked) {
                appData.servicesNumber[label.textContent] = +input.value
            }
        })
    },
    addScreenBlock: function () {
        const cloneScreen = wrapperScren[0].cloneNode(true)

        wrapperScren[wrapperScren.length - 1].after(cloneScreen)

        const allFilled = appData.checkAllScreens();
        startButton.disabled = !allFilled;
        startButton.style.cursor = allFilled ? 'pointer' : 'not-allowed';
    },
    checkAllScreens: function () {
        wrapperScren = document.querySelectorAll('.screen');
        for (let screen of wrapperScren) {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');

            if (select.value === '' || input.value.trim() === '') {
                return false;
            }
        }
        return true;
    },
    addPrices: function () {
        for (let screen of appData.screens) {
            appData.screenPrice += +screen.price
        }

        for (let key in appData.servicesNumber) {
            appData.servicePricesNumber += appData.servicesNumber[key]
        }

        for (let key in appData.servicesPercent) {
            appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100)
        }

        appData.fullPrice = +appData.screenPrice + appData.servicePricesNumber + appData.servicePricesPercent;

        appData.servicePercentPrice = Math.ceil(appData.fullPrice - (appData.fullPrice * (appData.rollback / 100)));

        for (let screen of appData.screens) {
            appData.totalScreensCount += screen.count
        }
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
    getValueRange: function () {
        inputRange.addEventListener('input', () => {
            const value = inputRange.value;
            valueRange.textContent = value + '%'
            appData.rollback = +value;
        })
    },
    start: function () {
        appData.screens = [];
        appData.screenPrice = 0;
        appData.servicesPercent = {};
        appData.servicesNumber = {};
        appData.servicePricesPercent = 0;
        appData.servicePricesNumber = 0;
        appData.fullPrice = 0;
        appData.servicePercentPrice = 0;
        appData.totalScreensCount = 0;

        appData.addScreens()
        appData.addServices()
        appData.addPrices()
        // appData.logger();
        appData.showResult()
        appData.getValueRange()
    },
    logger: function () {
        console.log(appData.fullPrice);
        console.log(appData.servicePercentPrice);
        console.log(appData.screens);
    }
}

appData.init();