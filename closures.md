## Closures

A function that remembers the variables from the scope where it was created, even after that outer function has finished running

```js
function makeAClosure() {
  let count = 10;
  return function() {
    count ++;
    return count;
  }
}

const closure = makeAClosure();
```
Outer function is called and 'closure' is assigned to the function within makeAClosure(). This inner function still has access to 'count'.

```js
console.log(closure());
```
This calls the inner function and increments count to 11 then returns it.

```js
console.log(closure());
```
This calls the inner function again and increments count to 12 then returns it.

This can all still happen after makeAClosure() was called.

```js
function multiplyBy(x) {
  return function (y) {
    return x * y;
  };
}

// calls multiplyBy with 2 and returns inner function
const double = multiplyBy(2);

// calls the inner function with 5 which remembers
// the value of x = 2 and returns 10
double(5);