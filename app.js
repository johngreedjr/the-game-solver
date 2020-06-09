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

function takeTurn() {
  let board = [one, one2, hundred, hundred2];
  console.log('board: ' + board);
  let currentHand = _.cloneDeep((hand));

   let selection1 = currentHand.sort((a, b) => {
      return Math.abs(one - a) - Math.abs(one - b);
    });

    currentHand = _.cloneDeep((hand))
    let selection2 = currentHand.sort((a, b) => {
      return Math.abs(one2 - a) - Math.abs(one2 - b);
    });

    currentHand = _.cloneDeep((hand))
    let selection3 = currentHand.sort((a, b) => {
      return Math.abs(hundred - a) - Math.abs(hundred - b) ;
    });

    currentHand = _.cloneDeep((hand))
    let selection4 = currentHand.sort((a, b) => {
      return Math.abs(hundred2 - a) - Math.abs(hundred2 - b);
    });

  let diff1 = Math.abs(selection1[0] - one);
  let diff2 = Math.abs(selection2[0] - one2);
  let diff3 = Math.abs(selection3[0] - hundred);
  let diff4 = Math.abs(selection4[0] - hundred2);

  if ( selection1[0] < one ) {
    diff1 = 1000;
  }

  if ( selection2[0] < one2 ) {
    diff2 = 1000;
  }

  if ( selection3[0] > hundred ){
    diff3 = 1000;

  }

  if ( selection4[0] > hundred2 ){
    diff4 = 1000;

  }

  let differentials = [diff1, diff2, diff3, diff4];
  console.log('hand: ' + hand)
  console.log('differentials: ' + differentials)
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




