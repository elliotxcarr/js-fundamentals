## Interface Segregation Principle

This principle states that a class should not be forced to implement interfaces it does not use. 

In terms of JavaScript, a class is used here instead of an interface

BAD:
```js
class Animal {
  name
  age

  run() {}
  fly() {}
  bark() {}
  tweet() {}
}

class Dog extends Animal {
  run() {
    //...
  }
  bark() {
    //...
  }
}

class Bird extends Animal {
  fly() {
    //..
  }

  tweet() {
    //...
  }
}
```

Here, fly() and tweet() are extended to the Dog class but not necessary, therefore violating the Interface Segregation Principle

GOOD:
```js
class Animal {
  name
  age
}

class Dog extends Animal {
  name
  age
  run() {
    //...
  }
  bark() {
    //...
  }
}

class Bird extends Animal {
  name
  age
  fly() {
    //...
  }
  tweet() {
    //...
  }
}
```