// Liskov Substitution Principle

// If a class A inherits from class B, then an instance of A must be able to
// replace an instance of B without altering desirable class properties

// Classic Example (BAD)

class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  setWidth(width) {
    this.width = width;
  }

  setHeight(height) {
    this.height = height;
  }

  getArea(){
    return this.width * this.height;
  }
}

class Square extends Rectangle {
  setWidth(width) {
    this.width = width;
    this.height = width;
  }

  setHeight(height) {
    this.height = height;
    this.width = height;
  }
}

const shapes = [new Rectangle(3,6), new Rectangle(2,4), new Square(3, 5)];

const increaseRectangleWidth = (rect) => {
  rect.setWidth(rect.width + 1);
}

for (shape of shapes) {
  increaseRectangleWidth(shape);
  console.log('Area: ', shape.getArea())
}

// Using a Square() object in increaseRectangleWidth() incidentally replaces the
// height attribute giving us an area of 4 * 4 = 16 not 4 * 5 = 20
// This means that Square() cannot be used in place of Rectangle() and breaks
// the Liskov Substitution principle

// Classic Example (GOOD)

class Shape {
  getArea() {
    throw new Error('Method getArea() must be implemented by subclasses');
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }

  setWidth(width) {
    this.width = width;
  }

  setHeight(height) {
    this.height = height;
  }

  getArea() {
    return this.width * this.height;
  }
}

class Square extends Shape {
  constructor(sideLength) {
    super();
    this.sideLength = sideLength;
  }

  setSideLength(sideLength) {
    this.sideLength = sideLength;
  }

  getArea() {
    return this.sideLength * this.sideLength;
  }
}

const shapes = [new Rectangle(3, 6), new Square(4)];

const printArea = (shape) => {
  console.log('Area:', shape.getArea());
};

for (const shape of shapes) {
  printArea(shape);
}

// This is a good example because both Rectangle and Square share the Shape
// contract. The client code only depends on getArea(), so a Square can safely
// substitute for any Shape without breaking expectations.


