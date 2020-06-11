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
  console.log('board: ' + board);
  console.log('hand: ' + hand);

   let currentHand = _.cloneDeep((hand));
   let check = checkForTenAway(currentHand, set.set1, 'asc');
   if (check) {
     setCard('set1', check);
     return;
   }
   let currentHandFiltered = currentHand.filter(function(x) {
     return x > set.set1;
   });
   let selection1 = currentHandFiltered.sort((a, b) => {
      return Math.abs(set.set1 - a) - Math.abs(set.set1 - b);
    });

    currentHand = _.cloneDeep((hand));
    check = checkForTenAway(currentHand, set.set2, 'asc');
    if (check) {
      setCard('set2', check);
      return;
    }
    currentHandFiltered = currentHand.filter(function(x) {
      return x > set.set2;
    });
    let selection2 = currentHandFiltered.sort((a, b) => {
      return Math.abs(set.set2 - a) - Math.abs(set.set2 - b);
    });

    currentHand = _.cloneDeep((hand))
    check = checkForTenAway(currentHand, set.set3, 'desc');
    if (check) {
      setCard('set3', check);
      return;
    }
    currentHandFiltered = currentHand.filter(function(x) {
      return x < set.set3;
    });
    let selection3 = currentHandFiltered.sort((a, b) => {
      return Math.abs(set.set3 - a) - Math.abs(set.set3 - b) ;
    });

    currentHand = _.cloneDeep((hand))
    check = checkForTenAway(currentHand, set.set4, 'desc');
    if (check) {
      setCard('set4', check);
      return;
    }
    currentHandFiltered = currentHand.filter(function(x) {
      return x < set.set4;
    });
    let selection4 = currentHandFiltered.sort((a, b) => {
      return Math.abs(set.set4 - a) - Math.abs(set.set4 - b);
    });

  let diff1 = Math.abs(selection1[0] - set.set1);
  let diff2 = Math.abs(selection2[0] - set.set2);
  let diff3 = Math.abs(selection3[0] - set.set3);
  let diff4 = Math.abs(selection4[0] - set.set4);

  if ( isNaN(diff1) ) {
    diff1 = 1000;
  }

  if ( isNaN(diff2) ) {
    diff2 = 1000;
  }

  if ( isNaN(diff3) ) {
    diff3 = 1000;
  }

  if ( isNaN(diff4) ) {
    diff4 = 1000;
  }

  let differentials = [diff1, diff2, diff3, diff4];

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
    set.set1 = selection1[0];
    removeCard = set.set1;
  }

  if ( choice == 'selection2' ) {
    set.set2 = selection2[0];
    removeCard = set.set2;
  }

  if ( choice == 'selection3' && selection3[0] < set.set3) {
    set.set3 = selection3[0];
    removeCard = set.set3
  }

  if ( choice == 'selection4'  && selection4[0] < set.set4) {
    set.set4 = selection4[0];
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



