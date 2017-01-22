import Rx from 'rxjs/Rx';
import { createSubscriber } from './lib/util';

//------------------------------------------
const interval$ = Rx.Observable.interval(1000)
  .take(10)
  .publish();

interval$.connect();


setTimeout(() => {
  interval$.subscribe(createSubscriber('one'));
},1000);

setTimeout(() => {
  interval$.subscribe(createSubscriber('two'));
},3000);



//-----------------Chat messages socket.io--

const socket = {on: () => {}};

const chatMessages$ = new Rx.Observable(observer => {
  console.log('subscribed');
  //without publish every subscriber will cause another listener.
  socket.on('chat:message', message => observer.next(message));
}).publish();

chatMessages$.subscribe(createSubscriber('chat.one'));
chatMessages$.subscribe(createSubscriber('chat.two'));


//-----------------publishLast--------------
const simple$ = new Rx.Observable(observer => {
  observer.next('one');
  observer.next('two');
  observer.next('three');
  //without complete published$ will never emit.
  observer.complete();

  return () => console.log('Disposed');
});

const published$ = simple$.publishLast();
published$.subscribe(createSubscriber('publishLast.one'));
const connection = published$.connect();
published$.subscribe(createSubscriber('publishLast.two'));
connection.unsubscribe();

//-----------------publishReplay--------------
const publishedReplay$ = simple$.publishReplay(2);
publishedReplay$.subscribe(createSubscriber('publishReplay.one'));
publishedReplay$.connect();
publishedReplay$.subscribe(createSubscriber('publishReplay.two'));

//-----------------refCount-------------------
//.share() = .publish().refCount()
const publishedRefCount$ = simple$.publishReplay(2).refCount();
const sub1 = publishedRefCount$.subscribe(createSubscriber('publishRefCount.one'));
const sub2  = publishedRefCount$.subscribe(createSubscriber('publishRefCount.two'));

sub1.unsubscribe();
sub2.unsubscribe();

