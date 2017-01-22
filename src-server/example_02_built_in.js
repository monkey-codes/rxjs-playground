import Rx from 'rxjs/Rx';
import { createSubscriber } from './lib/util';

Rx.Observable.interval(500)
  .take(5)
  .subscribe(createSubscriber('one'));

Rx.Observable.timer(5000,200)
  .take(3)
  .subscribe(createSubscriber('timer'));

Rx.Observable.of('Hello, World', 'Bye, World')
  .subscribe(createSubscriber('of'));

Rx.Observable.from(['Hello, World','Bye, World'])
  .subscribe(createSubscriber('from'));

Rx.Observable.throw(new Error('hey'))
  .subscribe(createSubscriber('error'));

Rx.Observable.empty()
  .subscribe(createSubscriber('empty'));

let sideEffect = 0;
const defer$ = Rx.Observable.defer(() => {
  sideEffect++;
  return Rx.Observable.of(sideEffect);
});

defer$.subscribe(createSubscriber('defer$.one'));
defer$.subscribe(createSubscriber('defer$.two'));
defer$.subscribe(createSubscriber('defer$.three'));

Rx.Observable.never()
  .subscribe(createSubscriber('never'));

Rx.Observable.range(10, 30)
 .subscribe(createSubscriber('range'));
