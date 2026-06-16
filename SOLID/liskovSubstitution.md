## Liskov Substitution Principle

If a class A inherits from class B, then an instance of A must be able to replace an instance of B without altering desirable class properties

Classic Example (BAD):

```js
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  setHeight(height){
    this.height = height;
  }
}

class Square extends Rectangle {}

const rect = new Rectangle(5,7);
const square = new Square(2,2);

rect.setHeight(8);
square.setHeight(8);

console.log(rect.height, rect.width); // outputs 5, 8
console.log(square.height, square.width); // outputs 2, 8
```

Program is not correct as square no longer has equal sides. A square class can not be used in place of the rectangle class


Classic Example (GOOD):
```js
class Shape {
  getArea() {
    throw new Error("Method must be implemented");
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super(); // used in child class to call the constructor of parent class
    this.width = width;
    this.height = height;
  }

  setHeight(height) {
    this.height = height;
  }

  setWidth(width) {
    this.width = width;
  }

  getArea() {
    return this.width * this.height;
  }
}

class Square extends Shape {
  constructor(side) {
    super();
    this.side = side;
  }

  setSide(side) {
    this.side = side;
  }

  getArea() {
    return this.side * this.side;
  }
}

// Both can be treated as Shape
const shapes = [
  new Rectangle(5, 7),
  new Square(2)
];

shapes.forEach(shape => {
  console.log(shape.getArea());
});
```



