## Single Responsibility Principle

The Single Responsibility principle states that every class should only have one reason to change
This helps developers understand the context and responsibility of what theyre building and when there is a need to change

BAD (not single responsibility):
```js
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
```
The Menu class is handling logic surrounding dishes, as well as bookings which violates the single responsibility principle.


GOOD:

```js
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
```
