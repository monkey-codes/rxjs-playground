import Rx from 'rxjs/Rx';
import { createSubscriber } from './lib/util';
// ----------------
// Part 1
const simple$ = new Rx.Observable(observer => {
  console.log('generating observable');
  setTimeout(() =>{
    observer.next('an item!');
    setTimeout(() => {
      observer.next('Another item');
      observer.complete();
    })

  }, 1000);
});

const error$ = new Rx.Observable(observer => {
  observer.error(new Error('Stuff')); //can pass in an object too, but error gives you a stacktrace.
});

error$.subscribe(
  item => () => {},
  error => console.log(`one error ${error.stack}`)
);

simple$.subscribe(
  item => console.log(`one next ${item}`),
  error => console.log(`one error ${error}`),
  () => console.log('complete')
);

setTimeout(() => {
  simple$.subscribe({
    next: item => console.log(`two.next ${item}`),
    error(error) { console.log(`two.error ${error}`) },
    complete: function(){ console.log('two.complete') }
  });
}, 3000);

// ----------------
// Part 2
//
function createInterval$(time){
  return new Rx.Observable(observer => {
    let index = 0;
    let interval = setInterval(() => {
      console.log(`Generating ${index}`);
      observer.next(index++);
    }, time);

    //returning a function from a generator will be invoked when subscribers unsubscribe.
    return () => {
      clearInterval(interval);
    };
  });
}



function take$(sourceObservable$, amount) {
  return new Rx.Observable( observer => {
     let count = 0;
     const subscription = sourceObservable$.subscribe({
       next(item) {
         observer.next(item);
         if(++count >= amount) observer.complete();
       },
       error(error) { observer.error(error)},
       complete() { observer.complete()}
     });
     return () => subscription.unsubscribe();
  });
}

const everySecond$ = createInterval$(1000);
const firstFiveSeconds$ = take$(everySecond$, 5);
const subscription = firstFiveSeconds$.subscribe(createSubscriber('p2.one'));

//setTimeout(()=> {
// subscription.unsubscribe();
//}, 3000)
