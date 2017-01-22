import Rx from 'rxjs/Rx';
import {createSubscriber} from './lib/util';

// simple zip implementation on arrays
//function arrayZip(array1, array2, selector){
//  const count = Math.min(array1.length, array2.length);
//  const results = [];
//
//  for(let i = 0; i < count; i++){
//    const combined =  selector(array1[i], array2[i]);
//    results.push(combined);
//  }
//  return results;
//}

Rx.Observable.range(1, 10)
.zip(Rx.Observable.interval(500), (left, right) => `item: ${left}, at ${right * 500} ms`)
.subscribe(createSubscriber('zip'));


Rx.Observable.interval(1000)
  .withLatestFrom(Rx.Observable.interval(500))
  .take(10)
  .subscribe(createSubscriber('withLatestFrom'));

Rx.Observable.interval(1000)
  .combineLatest(Rx.Observable.interval(500))
  .take(10)
  .subscribe(createSubscriber('combineLatest'));


//example of where withLatestFrom could be used.

const currentUser$ = new Rx.BehaviorSubject({isLoggedIn:false});

Rx.Observable.interval(1000)
  .withLatestFrom(currentUser$)
  .filter(([i, user]) => user.isLoggedIn)
  .subscribe(createSubscriber('do stuff when user is logged in'));

setTimeout(() => {
  currentUser$.next({isLoggedIn: true});
},3000);
