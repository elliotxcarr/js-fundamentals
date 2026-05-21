//////////////////////////////////////// PROMISES ////////////////////////////////////////////////////////////////////////

new Promise((resolve, reject) => { 
  // some asynchronous code
})

// creates a new promise object:

// [[PromiseState]]: "pending"
// [[PromiseResult]]: undefined
// [[PromiseFulfillReactions]]: []
// [[PromiseRejectReactions]]: []
// [[PromiseIsHandled]]: false

new Promise((resolve, reject) => { 
  resolve('Success!');
  // or reject('Error!');
}).then(result => console.log(result));

// creates a new promise object
// when resolve is called:

// [[PromiseState]]: "fulfilled"
// [[PromiseResult]]: "Success!"
// [[PromiseFulfillReactions]]: [result => console.log(result)]
// [[PromiseRejectReactions]]: []
// [[PromiseIsHandled]]: true

// .then() callback is added to microtask queue (gets priority over task queue)