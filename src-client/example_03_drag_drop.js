import $  from 'jquery';
import Rx  from 'rxjs/Rx';

const $drag = $('#drag');
const $document = $(document);
const $dropAreas = $('.drop-area');


const beginDrag$ = Rx.Observable.fromEvent($drag, 'mousedown');
const endDrag$ = Rx.Observable.fromEvent($document, 'mouseup');
const mouseMove$ = Rx.Observable.fromEvent($document, 'mousemove');

const currentOverArea$ = Rx.Observable.merge(
  Rx.Observable.fromEvent($dropAreas, 'mouseover').map(e => $(e.target)), //moving in produce the elemnt
  Rx.Observable.fromEvent($dropAreas, 'mouseout').map(e => null) //moving out produce a null,
);

const drops$ = beginDrag$
  .do(e => {
    e.preventDefault();
    $drag.addClass('dragging');
  })
  .mergeMap(startEvent => {
    return mouseMove$
      .takeUntil(endDrag$)
      .do(moveEvent =>  moveDrag(startEvent, moveEvent))
      .last() //will wait until the last event is produced before emitting down the stream.
      .withLatestFrom(currentOverArea$, (_, $area) =>  $area ); // _ is last move event, don't care about that.kjj
  })
  .do(() => {
    $drag.removeClass('dragging')
    .animate({top: 0, left:0 }, 250);
  });

drops$.subscribe($dropArea => {
  console.log($dropArea);
  $dropAreas.removeClass('dropped');// remove previous css state
  if($dropArea) $dropArea.addClass('dropped');

});

function moveDrag(startEvent, moveEvent){

  $drag.css({
    left: moveEvent.clientX - startEvent.offsetX,
    top: moveEvent.clientY -  startEvent.offsetY
  });

}
