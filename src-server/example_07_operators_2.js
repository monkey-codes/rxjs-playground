import Rx from 'rxjs/Rx';
import {createSubscriber} from './lib/util';

Rx.Observable.interval(1000)
  .merge(Rx.Observable.interval(500))
  .take(5)
  .subscribe(createSubscriber('merge1'));

//or

Rx.Observable.merge(
  Rx.Observable.interval(1000).map(i => `${i} seconds`),
  Rx.Observable.interval(500).map(i => `${i} half seconds`))
    .take(10)
    .subscribe(createSubscriber('merge2'));


/* const currentUser$ = Rx.Observable.merge(
 *  socket.on$('login').map(user => prcessUser(user)),
 *  socket.on$('logout').map(() => null);
 * )
 *
*/

Rx.Observable.interval(500)
    .take(3)
    .concat(Rx.Observable.range(10, 3))
    .subscribe(createSubscriber('concat'));
//or
Rx.Observable.concat(
  Rx.Observable.interval(1000).map(i => `${i} seconds`).take(3),
  Rx.Observable.interval(500).map(i => `${i} half seconds`).take(3))
    .subscribe(createSubscriber('concat2'));
