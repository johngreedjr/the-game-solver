const _ = require('lodash');

let one = 1;
let one2 = 1;
let hundred = 100;
let hundred2 = 100;

let pile = [];

for (let i = 2; i <= 99; i++) {
  pile.push(i);
};

let hand = [];

function replenishHand() {
  while ( hand.length < 8 ) {
    hand.push( pile.splice(Math.floor(Math.random() * pile.length), 1)[0] );
  }
}

replenishHand();

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


function takeTurn() {
  let board = [one, one2, hundred, hundred2];
  console.log('board: ' + board);

   let currentHand = _.cloneDeep((hand));

   let check = checkForTenAway(currentHand, one, 'asc');

   if (check) {
     one = check;
     console.log('USED RULE OF TEN!');
     board = [one, one2, hundred, hundred2]
     console.log('board after playing card: ' + board)
     return;
   }

   let currentHandFiltered = currentHand.filter(function(x) {
     return x > one;
   });
   let selection1 = currentHandFiltered.sort((a, b) => {
      return Math.abs(one - a) - Math.abs(one - b);
    });

    currentHand = _.cloneDeep((hand));
  check = checkForTenAway(currentHand, one2, 'asc');

  if (check) {
    one2 = check;
    console.log('USED RULE OF TEN!');
    board = [one, one2, hundred, hundred2]
    console.log('board after playing card: ' + board)
    return;
  }
    currentHandFiltered = currentHand.filter(function(x) {
      return x > one2;
    });
    let selection2 = currentHandFiltered.sort((a, b) => {
      return Math.abs(one2 - a) - Math.abs(one2 - b);
    });

    currentHand = _.cloneDeep((hand))

  check = checkForTenAway(currentHand, hundred, 'desc');

  if (check) {
    hundred = check;
    console.log('USED RULE OF TEN!');
    board = [one, one2, hundred, hundred2]
    console.log('board after playing card: ' + board)
    return;
  }
    currentHandFiltered = currentHand.filter(function(x) {
      return x < hundred;
    });
    let selection3 = currentHandFiltered.sort((a, b) => {
      return Math.abs(hundred - a) - Math.abs(hundred - b) ;
    });

    currentHand = _.cloneDeep((hand))
  check = checkForTenAway(currentHand, hundred2, 'desc');

  if (check) {
    hundred2 = check;
    console.log('USED RULE OF TEN!');
    console.log('hand: ' + hand);
    board = [one, one2, hundred, hundred2]
    console.log('board after playing card: ' + board)
    return;
  }
    currentHandFiltered = currentHand.filter(function(x) {
      return x < hundred2;
    });
    let selection4 = currentHandFiltered.sort((a, b) => {
      return Math.abs(hundred2 - a) - Math.abs(hundred2 - b);
    });

  let diff1 = Math.abs(selection1[0] - one);
  let diff2 = Math.abs(selection2[0] - one2);
  let diff3 = Math.abs(selection3[0] - hundred);
  let diff4 = Math.abs(selection4[0] - hundred2);

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

  console.log('hand: ' + hand)
  console.log('differentials: ' + differentials)

  if (_.sum(differentials) === 4000) {
    console.log('Failed!! No more cards to play.')
    console.log('Cards Left in the deck: ' + pile)
    process.exit()
  }

  let lowestDiffSelection = differentials.indexOf(Math.min(...differentials)) + 1;

  let choice = `selection${lowestDiffSelection}`;
  console.log('choice ' + choice)
  let removeCard;

  if ( choice == 'selection1' ) {
    one = selection1[0];
    removeCard = one;
  }

  if ( choice == 'selection2' ) {
    one2 = selection2[0];
    removeCard = one2;
  }

  if ( choice == 'selection3' && selection3[0] < hundred) {
    hundred = selection3[0];
    removeCard = hundred
  }

  if ( choice == 'selection4'  && selection4[0] < hundred2) {
    hundred2 = selection4[0];
    removeCard = hundred2
  }

  const index = hand.indexOf(removeCard);
  if (index > -1) {
    hand.splice(index, 1);
  }

  board = [one, one2, hundred, hundred2]
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



