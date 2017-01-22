import $ from 'jquery';
import Rx  from 'rxjs/Rx';

const $title = $('#title');
const $results = $('#results');

Rx.Observable.fromEvent($title, 'keyup')
  .map(e => e.target.value)
  .distinctUntilChanged()
  .debounceTime(500)
  .switchMap(getItems)
  .subscribe(items => {
    $results.empty();
    $results.append(items.map(i => $('<li />').text(i)));
  });


//----------------------
//long version
//
//convention to place $ at the end to indicate that its an observable stream
//const keyUps$ = Rx.Observable.fromEvent($title, 'keyup'); //stream of keyup events.
//const queries$ = keyUps$
//  .map( e => e.target.value)
//  .distinctUntilChanged() // Rx Operator that returns a new observable stream that will only produce a value if its different from the previous one.
//  .debounceTime(250) //Rx operator only produce a value after 500ms of inactivity on the input.
//  .switchMap(query => getItems(query) ) //Rx operator - alias flatMapLatest
//
////switchMap is virtually the same is mergeMap except that if a query comes down 
////the pipeline before the promise resolves, it will discard the result from the promise (discard
////old data)
////Rx operator - mergeMap - flatMap is an alias of mergeMap
//
//
//
//queries$.subscribe(items => {
//  //gets the result of the resolved promise
//  $results.empty();
//  $results.append(items.map(r => $('<li />').text(r)));
//});



function getItems(title){
  console.log(`Querying ${title}`);
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      resolve([title, "Item 2", `Another ${Math.random()}`]);
    }, 500 + (Math.random() * 5000)); //take between 500 and 1500 ms to resolve
  });
}
