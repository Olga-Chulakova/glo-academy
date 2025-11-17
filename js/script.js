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

let leftInputs = document.querySelectorAll('.main-controls input[type="text"]');
let leftSelects = document.querySelectorAll('.main-controls select');


const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,
    rollback: 0,
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
        this.addTitle()
        this.start()
        startButton.addEventListener('click', () => {
            this.start();
            this.disabledControlls();
        })
        screenButton.addEventListener('click', this.addScreenBlock.bind(this))
        document.addEventListener('input', () => {
            const allFilled = this.checkAllScreens();
            startButton.disabled = !allFilled;
            startButton.style.cursor = allFilled ? 'pointer' : 'not-allowed';

        })
        ressetButton.addEventListener('click', this.reset.bind(this))
    },
    addTitle: function () {
        document.title = title.textContent
    },
    showResult: function () {
        total.value = this.screenPrice
        totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber
        totalFullCount.value = this.fullPrice
        totalCountRollback.value = this.servicePercentPrice
        totalCount.value = this.totalScreensCount
    },
    addScreens: function () {
        wrapperScren = document.querySelectorAll('.screen');

        wrapperScren.forEach((screen, index) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent

            this.screens.push({
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
                this.servicesPercent[label.textContent] = +input.value
            }
        })

        controlNumber.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]')
            const label = item.querySelector('label')
            const input = item.querySelector('input[type=text]')

            if (check.checked) {
                this.servicesNumber[label.textContent] = +input.value
            }
        })
    },
    addScreenBlock: function () {
        const cloneScreen = wrapperScren[0].cloneNode(true)

        wrapperScren[wrapperScren.length - 1].after(cloneScreen)

        const allFilled = this.checkAllScreens();
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
        for (let screen of this.screens) {
            this.screenPrice += +screen.price
        }

        for (let key in this.servicesNumber) {
            this.servicePricesNumber += this.servicesNumber[key]
        }

        for (let key in this.servicesPercent) {
            this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100)
        }

        this.fullPrice = +this.screenPrice + this.servicePricesNumber + this.servicePricesPercent;

        this.servicePercentPrice = Math.ceil(this.fullPrice - (this.fullPrice * (this.rollback / 100)));

        for (let screen of this.screens) {
            this.totalScreensCount += screen.count
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
    disabledControlls: function () {

        leftInputs = document.querySelectorAll('.main-controls input[type="text"]');
        leftSelects = document.querySelectorAll('.main-controls select');

        leftInputs.forEach((input) => {
            input.disabled = true
        })

        leftSelects.forEach((select) => {
            select.disabled = true
        })

        startButton.style.display = 'none'
        ressetButton.style.display = 'block'
        screenButton.disabled = true
    },
    reset: function () {

        ressetButton.style.display = 'none'
        startButton.style.display = 'block'
        screenButton.disabled = false

        leftInputs.forEach((input) => {
            input.disabled = false
        })

        leftSelects.forEach((select) => {
            select.disabled = false
        })

        document.querySelectorAll('.screen').forEach((screen, index) => {
            if (index > 0) {
                screen.remove()
            }
        })

        document.querySelectorAll('input').forEach(input => {
            input.value = ''
        });

        document.querySelectorAll('select').forEach(select => {
            select.value = ''
        });

        document.querySelectorAll('.custom-checkbox').forEach(checkbox => {
            checkbox.checked = false;
        });

        inputRange.value = 0;
        valueRange.textContent = '0%';

        this.screens = [];
        this.screenPrice = 0;
        this.servicesPercent = {};
        this.servicesNumber = {};
        this.servicePricesPercent = 0;
        this.servicePricesNumber = 0;
        this.fullPrice = 0;
        this.servicePercentPrice = 0;
        this.totalScreensCount = 0;
        this.rollback = 0;
    },
    getValueRange: function () {
        inputRange.addEventListener('input', () => {
            const value = inputRange.value;
            valueRange.textContent = value + '%'
            this.rollback = +value;
        })
    },
    start: function () {
        this.screens = [];
        this.screenPrice = 0;
        this.servicesPercent = {};
        this.servicesNumber = {};
        this.servicePricesPercent = 0;
        this.servicePricesNumber = 0;
        this.fullPrice = 0;
        this.servicePercentPrice = 0;
        this.totalScreensCount = 0;

        this.addScreens()
        this.addServices()
        this.addPrices()
        appData.logger();
        this.showResult()
        this.getValueRange()
    },
    logger: function () {
        console.log(this.fullPrice);
        console.log(this.servicePercentPrice);
        console.log(this.screens);
    }
}

appData.init();