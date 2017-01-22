import Rx from 'rxjs/Rx';
import { createSubscriber } from './lib/util';
//----------------Subject----------------
const simple$ = new Rx.Subject();

simple$.subscribe(createSubscriber('simple$'));

simple$.next('Hello');
simple$.next('World');
simple$.complete();


const interval$ = Rx.Observable.interval(1000).take(5);
const intervalSubject$ = new Rx.Subject();

interval$.subscribe(intervalSubject$);

intervalSubject$.subscribe(createSubscriber('sub1'));
intervalSubject$.subscribe(createSubscriber('sub2'));
intervalSubject$.subscribe(createSubscriber('sub3'));

setTimeout(()=> {
  //this subsriber will miss some of the initial values.
  intervalSubject$.subscribe(createSubscriber('look at me!'));
}, 3000);



//-------------BehaviorSubect--------------
const currentUser$ = new Rx.BehaviorSubject({isLoggedIn: false});
const isLoggedIn$ = currentUser$.map(u => u.isLoggedIn);

isLoggedIn$.subscribe(createSubscriber('isLoggedIn'));

currentUser$.next({isLoggedIn: false})

setTimeout(() => {
  currentUser$.next({isLoggedIn:true, name:"nelson"});
},2000);

setTimeout(() => {
  isLoggedIn$.subscribe(createSubscriber('delayed'));
},1000);



//-------------ReplaySubject-----------------
const bufferSize = 3;
const replay$ = new Rx.ReplaySubject(bufferSize);
replay$.next(1);
replay$.next(2);

replay$.subscribe(createSubscriber('one'));

replay$.next(3);
replay$.next(4);
replay$.next(5);

replay$.subscribe(createSubscriber('two'));


//-------------AsyncSubject-----------------
const apiCall$ = new Rx.AsyncSubject();
apiCall$.next(1);
apiCall$.subscribe(createSubscriber('one'));
apiCall$.next(2);
apiCall$.complete();

setTimeout(() => {
  apiCall$.subscribe(createSubscriber('two'));
}, 2000);
