import Rx from 'rxjs/Rx';
import {createSubscriber} from './lib/util';


function arrayReduce(array, accumulator, startValue){
  let value = startValue;
  for(let item of array){
    value = accumulator(value, item);
  }
  return value;
}

const values = [1,3,4,5,3,2];
const sum =  arrayReduce(values, (acc,i) => {acc + i}, 0);
console.log(sum);


Rx.Observable.range(1, 10)
  .reduce((acc, value) => acc + value)
  .subscribe(createSubscriber('reduce'));

Rx.Observable.range(1, 10)
  .merge(Rx.Observable.never())
  .scan((acc, value) => acc + value)
  .subscribe(createSubscriber('scan'));

//Keeping track of current and previous value during scan

Rx.Observable.range(1, 10)
  .scan(([last], current) => [current, last], [])
  .subscribe(createSubscriber('scan_current_last'));


