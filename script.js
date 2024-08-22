//task 1
class Weather {
    constructor(monday, tuesday, wednesday, thursday, friday, saturday, sunday) {
        this.monday = monday;
        this.tuesday = tuesday;
        this.wednesday = wednesday;
        this.thursday = thursday;
        this.friday = friday;
        this.saturday = saturday;
        this.sunday = sunday;
    }

    getValues() {
        return Object.values(this).filter(item => typeof item === "number");
    }

    getMaxTemp() {
        const temp = this.getValues();
        return Math.max(...temp);
    }

    getMinTemp() {
        const temp = this.getValues();
        return Math.min(...temp);
    }

    getMidTemp() {
        const temp = this.getValues();
        return Math.floor(temp.reduce((a, b) => (a + b)) / temp.length);
    }

    print() {
        console.log("| Day       | Temp |");
        console.log("--------------------");
        for (const [day, temp] of Object.entries(this)) {
            console.log(`| ${day.padEnd(10)} | ${temp.toString().padStart(4)} |`);
            console.log("--------------------");
        }
    }
}

const weather = new Weather(12, 8, 6, 7, 10, 9, 5);
console.log("Max Temp:", weather.getMaxTemp());
console.log("Min Temp:", weather.getMinTemp());
console.log("Mid Temp:", weather.getMidTemp());
weather.print();


//task 2
class Vehicle {
    start() {
        console.log('Транспортний засіб запущено.');
    }

    stop() {
        console.log('Транспортний засіб зупинено.');
    }
}

class Car extends Vehicle {
    constructor(brand, year) {
        super();
        this.brand = brand;
        this.year = year;
    }

    onLight() {
        console.log(`${this.brand} включив фари.`);
    }

    offLight() {
        console.log(`${this.brand} вимкнув фари.`);
    }
}

class Bike extends Vehicle {
    constructor(brand, year) {
        super();
        this.brand = brand;
        this.year = year;
    }

    openFuelTap() {
        console.log(`${this.brand} відкрив паливний кран.`);
    }

    turnOnEnergy() {
        console.log(`${this.brand} включив енергію.`);
    }
}

class Hatchback extends Car {
    constructor(brand, year) {
        super(brand, year);
    }

    start() {
        console.log(`${this.brand} (хетчбек) запущено.`);
    }
}

class Sedan extends Car {
    constructor(brand, year) {
        super(brand, year);
    }

    startAirConditioner() {
        console.log(`${this.brand} включив кондиціонер.`);
    }
}

const bmw = new Car('BMW', 2012);
const mercedes = new Hatchback('Mercedes', 2015);
const audi = new Sedan('Audi', 2020);

bmw.onLight();
mercedes.start();
audi.startAirConditioner();


//task3
class System {
    constructor() {
        this.tables = [];
        this.orders = [];
    }

    addTable(table) {
        this.tables.push(table);
    }

    addOrder(order) {
        this.orders.push(order);
    }

    getTotalAmountTable(tableNumber) {
        const tableOrders = this.orders.filter(order => order.table === tableNumber);
        return tableOrders.reduce((total, order) => total + order.getTotalAmount(), 0);
    }

    getTotalAmountOrder(id) {
        const order = this.orders.find(order => order.id === id);
        return order ? order.getTotalAmount() : 0;
    }

    changeOrderStatus(id, newStatus) {
        const order = this.orders.find(order => order.id === id);
        if (order) {
            order.changeOrderStatus(newStatus);
        }
    }

    cancelOrder(id) {
        this.orders = this.orders.filter(order => order.id !== id);
    }
}

class Table {
    constructor(number) {
        this.number = number;
    }
}

class Order {
    constructor(table, id, dishes) {
        this.table = table;
        this.id = id;
        this.dishes = dishes;
        this.status = 'в обробці';
    }

    changeOrderStatus(newStatus) {
        this.status = newStatus;
    }

    getTotalAmount() {
        return this.dishes.reduce((total, dish) => total + dish.price, 0);
    }
}

const sys = new System();

const table1 = new Table(11);
const table2 = new Table(12);

sys.addTable(table1);
sys.addTable(table2);

const order1 = new Order(11, 5, [{ name: "Лате", price: 40 }, { name: "Тірамісу", price: 60 }]);
const order2 = new Order(12, 6, [{ name: "Лате", price: 40 }, { name: "Тірамісу", price: 60 }]);

sys.addOrder(order1);
sys.addOrder(order2);

console.log("Загальна сума замовлень для столу 11:", sys.getTotalAmountTable(11));
console.log("Загальна сума для замовлення з ID 5:", sys.getTotalAmountOrder(5));

sys.changeOrderStatus(5, 'готово');
sys.cancelOrder(5);
console.log("Система після скасування замовлення з ID 5:", sys.orders);
