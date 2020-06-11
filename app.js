const _ = require('lodash');

let set = {};

set.set1 = 1;
set.set2 = 1;
set.set3 = 100;
set.set4 = 100;

let pile = [];

for (let i = 2; i <= 99; i++) {
  pile.push(i);
}

let hand = [];

function replenishHand() {
  while ( hand.length < 8 ) {
    hand.push( pile.splice(Math.floor(Math.random() * pile.length), 1)[0] );
  }
}

replenishHand();

function takeTurn() {
  let board = [set.set1, set.set2, set.set3, set.set4];
  console.log('hand: ' + hand);
  console.log('board: ' + board);

  let selections = {};
  for ( let i = 1; i < 5; i++ ) {
    selections[`selection${i}`] = getSelection(i);
  }

  if ( Object.values(selections).includes(-1) ){
    return;
  }

  let diffs = {};
  for ( let i = 1; i < 5; i++ ) {
    findDifferentials(diffs, selections, i)
  }

  let differentials = [diffs.diff1, diffs.diff2, diffs.diff3, diffs.diff4];

  console.log('differentials: ' + differentials)

  if (_.sum(differentials) === 4000) {
    console.log('Failed!! No more cards to play.')
    console.log('Cards Left in the deck: ' + pile)
    process.exit()
  }

  let lowestDiffSelection = differentials.indexOf(Math.min(...differentials)) + 1;

  let choice = `selection${lowestDiffSelection}`;
  let removeCard;

  if ( choice == 'selection1' ) {
    set.set1 = selections.selection1[0];
    removeCard = set.set1;
  }

  if ( choice == 'selection2' ) {
    set.set2 = selections.selection2[0];
    removeCard = set.set2;
  }

  if ( choice == 'selection3' && selections.selection3[0] < set.set3) {
    set.set3 = selections.selection3[0];
    removeCard = set.set3
  }

  if ( choice == 'selection4'  && selections.selection4[0] < set.set4) {
    set.set4 = selections.selection4[0];
    removeCard = set.set4
  }

  const index = hand.indexOf(removeCard);
  if (index > -1) {
    hand.splice(index, 1);
  }

  board = [set.set1, set.set2, set.set3, set.set4]
  console.log('board after playing card: ' + board)

}

let idx = 1;
while ( pile.length ) {
  console.log('ROUND ' + idx);
  console.log('PLAY FIRST CARD')
  takeTurn();
  console.log('PLAY SECOND CARD')
  takeTurn();
  replenishHand();
  console.log('-------------')
  idx++;
}

while (hand.length) {
  console.log('ROUND ' + idx);
  console.log('PLAY FIRST CARD')
  takeTurn();
  console.log('PLAY SECOND CARD')
  takeTurn();
  console.log('-------------')
  idx++;
}

console.log('Success!!!')

/* Functions */

function checkForTenAway(currentHand, pile, direction){
  let check;
  if ( direction === 'asc' ) {
    check = currentHand.filter((x) =>{
      return pile - x === 10;
    });
  }

  if ( direction === 'desc' ) {
    check = currentHand.filter((x) =>{
      return pile + x === 10;
    });
  }

  if (check.length) {
    const index = hand.indexOf(check[0]);
    if (index > -1) {
      hand.splice(index, 1);
    }
    return check[0];
  }
  return false;
}

function setCard(setNumber, check) {
  set[setNumber] = check;
  console.log('USED RULE OF TEN!');
  board = [set.set1, set.set2, set.set3, set.set4]
  console.log('board after playing card: ' + board)
}

function getSelection(index) {
  let currentHand = _.cloneDeep((hand));

  let check;
  let currentHandFiltered;
  if (index === 1 || index === 2) {
     check = checkForTenAway(currentHand, set[`set${index}`], 'asc');
      currentHandFiltered = currentHand.filter(function(x) {
      return x > set[`set${index}`];
    });
  }
  else {
     check = checkForTenAway(currentHand, set[`set${index}`], 'desc');
      currentHandFiltered = currentHand.filter(function(x) {
      return x < set[`set${index}`];
    });
  }

  // use rule of 10, return -1 to tell takeTurn function to stop
  if (check) {
    setCard(`set${index}`, check);
    return -1;
  }

  return currentHandFiltered.sort((a, b) => {
    return Math.abs(set[`set${index}`] - a) - Math.abs(set[`set${index}`] - b);
  });
}

function findDifferentials(diffs, selections, index) {
  diffs[`diff${index}`] = Math.abs( selections[`selection${index}`][0] - set[`set${index}`]);
  if ( isNaN(diffs[`diff${index}`]) ) {
    diffs[`diff${index}`] = 1000;
  }
}



