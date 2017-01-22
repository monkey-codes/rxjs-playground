import $ from 'jquery';

const $title = $('#title');
const $results = $('#results');
/*
 * Issues with 1st implementation
 * 1) last query that resolves is not necessarily the same as the last query issued.
 * 2) keys that don't change the input (up and down arrows) still trigger queries.
 * 3) on every key press queries are issued.
 */

let lastQuery = null;
let lastTimeout = null;
let nextQueryId = 0;
$title.on('keyup', e => {
  const title = e.target.value;
  if(title == lastQuery){
    //fixes issue 2
    return
  }
  lastQuery = title;

  if(lastTimeout){
    window.clearTimeout(lastTimeout);
  }
  let ourQueryId = ++nextQueryId;

  //solves issue 3 (kinda debounce - wait 500ms after last key press before issuing the query)
  lastTimeout = window.setTimeout(() => {
    getItems(title)
      .then(items => {
        //fixes issue 1, by thorwing away results that don't match the last requested query id
        if(ourQueryId != nextQueryId) return;

        $results.empty();
        const $items = items.map(item => $('<li />').text(item));
        $results.append($items);
      });
  }, 500)

});

function getItems(title){
  console.log(`Querying ${title}`);
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      resolve([title, "Item 2", `Another ${Math.random()}`]);
    }, 500 + (Math.random() * 1000)); //take between 500 and 1500 ms to resolve
  });
}
