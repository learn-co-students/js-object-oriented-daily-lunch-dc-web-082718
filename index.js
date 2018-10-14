// global datastore

function getSum(total, num) {
  return total + num;
}

let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

const Neighborhood = (() => {
  let neighborhoodId = 0;
  return class {

    constructor(name) {
      this.name = name;
      this.id = ++neighborhoodId;
      store.neighborhoods.push(this);
    }

    deliveries() {
      return store.deliveries.filter(e => e.neighborhoodId === this.id)
    }

    customers() {
      return store.customers.filter(e => e.neighborhoodId === this.id)
    }

    meals() {
      let mealIds = this.deliveries().map(e => e.mealId)
      let mealsArray = mealIds.map(id => store.meals.find(e => e.id === id))
      let set = new Set(mealsArray)
      let uniqueArray = Array.from(set);
      return uniqueArray;
    }

  }

})();

const Customer = (() => {
  let customerId = 0;
  return class {

    constructor(name, neighborhoodId) {
      this.id = ++customerId;
      this.neighborhoodId = neighborhoodId;
      this.name = name;
      store.customers.push(this);
    }

    deliveries() {
      return store.deliveries.filter(e => e.customerId === this.id)
    }

    meals() {
      let mealIds = this.deliveries().map(e => e.mealId)
      return mealIds.map(id => store.meals.find(meal => meal.id === id ))
    }

    totalSpent() {
      return this.meals().map(e => e.price).reduce(getSum)
    }

  }
})();

const Meal = (() => {
  let mealId = 0;
  return class {

    constructor(title, price) {
      this.title = title;
      this.price = price;
      this.id = ++mealId;
      store.meals.push(this);
    }

    deliveries() {
      return store.deliveries.filter(e => e.mealId === this.id);
    }

    customers() {
      let customerIds = this.deliveries().map(e => e.customerId);
      return customerIds.map(id => store.customers.find(c => c.id === id))
    }

    static byPrice() {
      return store.meals.sort(function(a, b){return a.price < b.price})
    }

  }

})();

const Delivery = (() => {
  let deliveryId = 0;
  return class {

    constructor(mealId, neighborhoodId, customerId) {
      this.id = ++deliveryId;
      this.neighborhoodId = neighborhoodId;
      this.customerId = customerId;
      this.mealId = mealId;
      store.deliveries.push(this);
    }

    meal() {
      return store.meals.find(e => e.id === this.mealId)
    }

    customer() {
      return store.customers.find(e => e.id === this.customerId)
    }

    neighborhood() {
      return store.neighborhoods.find(e => e.id === this.neighborhoodId)
    }

  }
})();
