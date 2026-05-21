//////////////////////////////////////// CLOSURES ////////////////////////////////////////////////////////////////////////

// A function that remembers the variables from the scope where it was created,
// even after that outer function has finished running
function makeAClosure() {
  let count = 10;
  return function() {
    count ++;
    return count;
  }
}

// outer function is called and closure = inner function
// inner function still has access to count which is 0
const closure = makeAClosure();

// calls the inner function and increments count to 11 then returns it
console.log(closure());

// calls the inner function and increments count to 12 then returns it
console.log(closure());


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