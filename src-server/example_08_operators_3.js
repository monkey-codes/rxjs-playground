import Rx from 'rxjs/Rx';
import {createSubscriber} from './lib/util';

// simple map
Rx.Observable.interval(1000)
  .take(3)
  .map(a => a * a)
  .subscribe(createSubscriber('map'));


Rx.Observable.range(2,3)
.mergeMap(i => Rx.Observable.timer(i *2000).map(() => `After ${i *2} seconds`))
.subscribe(createSubscriber('mergeMap'));


//Mergemap and promises

function getTracks(){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(['track 1', 'track 2', 'track 3']);
    }, 1000);
  });
}

//Emits a singe array value to the subscriber (tracks promise resolves to an array)
Rx.Observable.fromPromise(getTracks())
.subscribe(createSubscriber('promise without mergeMap'));

//Emits every item in the array one by one to the subscriber.
Rx.Observable.fromPromise(getTracks())
.mergeMap(tracks => Rx.Observable.from(tracks))
.subscribe(createSubscriber('promise with mergeMap'));



//Explaing map and mergeMap with arrays:

function arrayMap(array, projection){
  const returnArray = [];
  for(let item of array){
    const projected  = projection(item);
    returnArray.push(projected);
  }
  return returnArray;
}

function arrayMergeMap(array, projection){
  const returnArray = [];
  for(let item of array){
    const projectedArray = projection(item);
    for(let projected of projectedArray){
      returnArray.push(projected);
    }
  }
  return returnArray;
}

const albums = [
  {title: 'Album 1', tracks: [{id:1, title:'a1t1'},{id:2, title:'a1t2'}]},
  {title: 'Album 2', tracks: [{id:3, title:'a2t1'},{id:4, title:'a2t2'}]}
];

//produces an array of arrays
const tracksWrong = arrayMap(albums, album => album.tracks);
console.log(JSON.stringify(tracksWrong));

// produces an array of tracks
const tracksRight = arrayMergeMap(albums, album => album.tracks);
console.log(JSON.stringify(tracksRight));

