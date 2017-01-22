import Rx from 'rxjs/Rx';
import {createSubscriber} from './lib/util';


Rx.Observable.range(1, 100)
  .bufferCount(25)
.subscribe(createSubscriber('bufferCount_items'));


Rx.Observable.interval(500)
  .bufferTime(2000)
.subscribe(createSubscriber('bufferTime'));

//alternative to bufferTime

Rx.Observable.interval(500)
  .buffer(Rx.Observable.interval(2000))
  .subscribe(createSubscriber('buffer'));

Rx.Observable.range(1,10)
  .toArray()
  .subscribe(createSubscriber('range'));
