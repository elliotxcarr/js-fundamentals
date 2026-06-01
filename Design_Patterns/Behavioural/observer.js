// The observer pattern allows many objects to subscribe to events
// that are broadcasted by another object

// E.g. Radio tower which broadcasts a signal, which many recievers can pick up

/////////// Bare javascript example ///////////
const Subject = function() {
  let observers = [];

  return {
    subscribeObserver: function(observer) {
      observers = [...observers, observer];
    },
    unsubscribeObserver: function(observer) {
      const index = observers.indexOf(observer);
      if (index > -1) {
        observers = observers.filter((_,i) => i !== index)
      }
    },
    // can be compared to the addEventListener() method
    notifyObserver: function(observer) {
      const index = observers.indexOf(observer);
      if (index > -1) {
        observers[index].notify();
      }
    },
    notifyAllObservers: function() {
      observers.forEach((o, i) => o.notify())
    }
  }
}

const Observer = (number) => ({
  notify: () => console.log(`Observer ${number} is notified.`)
})

const subject = new Subject();
const observer1 = new Observer(1);

subject.subscribeObserver(observer1);
subject.notifyObserver(observer1);


/////////// Example with RXJS ///////////

import { Subject } from 'rxjs';

const news = new Subject();

// here the callback within subscribe() is the observer which will receive outputs
// emitted by the subject
const tv1 = news.subscribe(v => console.log(`${v} - Lobby TV`));
const tv2 = news.subscribe(v => console.log(`${v} - Bar TV`));
const tv3 = news.subscribe(v => console.log(`${v} - Room 201 TV`));

// the next() method emits the passed value, and every subscribers
// (tv1, tv2, tv3) callback runs
news.next('Breaking news...');
news.next('Latest on weather...');