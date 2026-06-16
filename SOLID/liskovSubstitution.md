## Liskov Substitution Principle

If a class `A` inherits from class `B`, then an instance of `A` should be able to replace an instance of `B` without changing the correctness of the program.

This principle is about behavioral compatibility. A subclass must preserve the contract of its base class, including:
- preconditions (what callers must provide)
- postconditions (what callers can expect)
- invariants (what stays true before and after method calls)

### Why it matters

When LSP is violated, code that works with the base type may break or behave unexpectedly when given a subclass. The failure is usually because the subclass imposes stronger requirements or weakens guarantees.

### Classic example (BAD)

This shows why inheriting `Square` from `Rectangle` can violate the principle:

```js
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

  getArea() {
    return this.width * this.height;
  }
}

class Square extends Rectangle {
  constructor(side) {
    super(side, side);
  }

  setWidth(width) {
    this.width = width;
    this.height = width;
  }

  setHeight(height) {
    this.height = height;
    this.width = height;
  }
}

const rectangles = [
  new Rectangle(5, 7),
  new Square(2)
];

rectangles.forEach(rect => {
  rect.setHeight(8);
  console.log(rect.width, rect.height);
});
```

Expected behavior for a `Rectangle` is that only height changes. For `Square`, width also changes, so the subclass does not behave like the base type.

### Better design (GOOD)

Use a shared abstraction instead of making `Square` inherit from `Rectangle`.

```js
class Shape {
  getArea() {
    throw new Error('Method must be implemented');
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
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

  getArea() {
    return this.side * this.side;
  }
}

const shapes = [
  new Rectangle(5, 7),
  new Square(2)
];

shapes.forEach(shape => {
  console.log(shape.getArea());
});
```

Here, both classes satisfy the `Shape` contract, and neither one introduces invalid behavior for the other.

LSP is not just about inheritance syntax. It's about ensuring that derived types behave like their base types so client code can use them interchangeably without surprises.


