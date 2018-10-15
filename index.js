// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = 0;
let customerId = 0;
let mealId = 0;
let deliveryId = 0;


/////////////////////////////////////////////////////////////////////
class Neighborhood{
  constructor(name){
    this.id = ++neighborhoodId
    this.name = name

    store.neighborhoods.push(this)
  }

  deliveries(){
    return store.deliveries.filter(delivery => delivery.neighborhoodId == this.id)
  }

  customers(){
    let deliveriesInThisNeighborhood = this.deliveries()

    let customers = deliveriesInThisNeighborhood.map(delivery => delivery.customer())

    return Array.from(new Set(customers))
  }

  meals(){
    let deliveriesInThisNeighborhood = this.deliveries()

    let meals = deliveriesInThisNeighborhood.map(delivery => delivery.meal())

    return Array.from(new Set(meals))
  }

}


/////////////////////////////////////////////////////////////////////
class Customer {
  constructor(name, neighborhoodId){
    this.id = ++customerId
    this.name = name
    this.neighborhoodId = neighborhoodId

    store.customers.push(this)
  }

  deliveries(){
    return store.deliveries.filter(delivery => delivery.customerId == this.id)
  }

  meals(){
    let deliveriesFromThisCustomer = this.deliveries()
    return deliveriesFromThisCustomer.map(delivery => delivery.meal())
  }

  totalSpent(){
    let sum = 0
    let allMeals = this.meals()
    for (const meal of allMeals) {
      sum += meal.price
    }
    return sum
  }

}


/////////////////////////////////////////////////////////////////////
class Meal {
  constructor(title, price){
    this.id = ++mealId
    this.title = title
    this.price = parseInt(price)

    store.meals.push(this)
  }

  deliveries(){
    return store.deliveries.filter(delivery => delivery.mealId == this.id)
  }

  customers(){
    let deliveriesFromThisMeal = this.deliveries()

    return deliveriesFromThisMeal.map(delivery => delivery.customer())
  }

  static byPrice(){
    return store.meals.sort(function(firstMeal,secondMeal){return secondMeal.price - firstMeal.price })
  }

}

/////////////////////////////////////////////////////////////////////
class Delivery {
  constructor(mealId, neighborhoodId, customerId){
    this.id = ++deliveryId
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId

    store.deliveries.push(this)
  }

  meal(){
    return store.meals.find(meal => meal.id == this.mealId)
  }

  customer(){
    return store.customers.find(customer => customer.id == this.customerId)
  }

  neighborhood(){
    return store.neighborhoods.find(neighborhood => neighborhood.id == this.neighborhoodId)
  }

}
