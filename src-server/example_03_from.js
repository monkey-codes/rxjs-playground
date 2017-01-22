import Rx from 'rxjs/Rx';
import { createSubscriber } from './lib/util';
import fs from 'fs';


//----------------The traditional node way to read files

fs.readdir('./src-server', (err, items)=>{
  if(err) console.log(err);
  else console.log(items);
});

//---------------Rx way
//Observable.bindNodeCallback returns a factory function for an Observable.
const readdir$ = Rx.Observable.bindNodeCallback(fs.readdir);

readdir$('./src-server')
  .mergeMap(files => Rx.Observable.from(files))
  .map(file => `manipulated ${file}`)
  .subscribe(createSubscriber('readdir'));


function getItem(){

  return new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve('Hello');
    }, 1000);
  });
}

Rx.Observable.fromPromise(getItem())
  .subscribe(createSubscriber('promise'));
