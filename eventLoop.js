//////////////////////////////////////// NON-BLOCKING EVENT LOOP ///////////////////////////////////////////////////////
// Javascript can only handle a single task at a time

setTimeout(() => {
  console.log('1');
}, 1000);

console.log('2');

Promise.resolve().then(() => {
  console.log('3');
});

// setTimeout() is initialised and callback function is registered
// '2' is logged to the console
// Promise is resolved and .then() callback is added to microtask queue
// 1000ms delay is complete and setTimeout callback is added to task queue
// Event loop checks microtask queue first and executes .then() callback logging '3'
// Event loop then checks task queue and executes setTimeout callback logging '1'

//  _____ call stack _____    __________Web API__________
// |                      |  |                           |  
// |   console.log('1')   |  |                           |
// |   console.log('3')   |  |                           |
// |   then()             |  |                           |
// |   Promise.Resolve()  |  |                           |
// |   console.log('2')   |  |                           |
// |   setTimeout()       |  |  () => console.log('1')   | // callback from setTimeout
// |______________________|  |___________________________| // waits for 1000 ms
//          ^
//          |                _______Task Queue________
//          |               | () => console.log('1')  | // after 1000ms added to task queue
//          |---------->    |                         |
//          |               |                         |
//          |               |_________________________|
//          |
//          |                _____Microtask Queue_____
//          | !Priority!    | () => console.log('3')  | // Promise is immediatley resolved
//          |---------->    |                         | // .then() callback added to microtask queue
//      Event Loop          |                         |
//                          |_________________________|
