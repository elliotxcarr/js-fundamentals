// Single Responsibility

// Everything should only have one reason to change
// This helps developers understand the context and responsibility
// of what theyre building and when there is a need to change

// BAD (not single responsibility)
class Menu {
  dishes = [];
  bookings = [];

  addDish(dish){
    this.items.push(dish)
  }

  addBooking() {
   //....
  }
}

// GOOD 
class Menu {
  dishes = [];
  addDish(dish){
    this.items.push(dish)
  }
}

class BookingService {
  bookings = [];
  addBooking() {
    //...
  }
}
