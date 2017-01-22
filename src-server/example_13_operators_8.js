import Rx from 'rxjs/Rx';
import {createSubscriber} from './lib/util';

//Once an observable throws an error it does not continue. This
//example will never emit 10.
//Rx.Observable.concat(
//  Rx.Observable.of(42),
//  Rx.Observable.throw(new Error('blah')),
//  Rx.Observable.of(10)
//)
//  .subscribe(createSubscriber('catch'));


Rx.Observable.fromPromise(getApi())
  .catch(error => Rx.Observable.of(error))
  .do(() => console.log('thing'))
  .subscribe(createSubscriber('api'));

function getApi(){
  console.log('getting API');
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error());
    });
  }, 1000);
}

getApi2()
  .retry(3)
  .catch(error => Rx.Observable.of(error))
  .do(() => console.log('thing'))
  .subscribe(createSubscriber('api2'));


//using fromPromise does not work well with demonstrating
//retry since the value of the promise is cached.
function getApi2() {

  return new Rx.Observable(observer => {
    console.log('getting api2');
    setTimeout(() => {
      observer.error(new Error());
    },1000);
  });
}
