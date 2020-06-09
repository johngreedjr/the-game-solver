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

function takeTurn(secondaryHand) {
  hand = secondaryHand ? secondaryHand : hand;
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
    diff1 = getNewDiff(selection1[0], one);
  }

  if ( selection2[0] < one2 ) {
    diff2 = getNewDiff(selection2[0], one2);
  }

  if ( selection3[0] > hundred ){
    diff3 = getNewDiffBackwards(selection3[0], hundred);

  }

  if ( selection4[0] > hundred2 ){
    diff4 = getNewDiffBackwards(selection4[0], hundred2);

  }

  function getNewDiff(selection, comparisonPile, currentHand) {
    currentHand = currentHand ? currentHand : _.cloneDeep((hand));
    if (currentHand == []) {
      return 1000;
    }
    const index = currentHand.indexOf(selection);
    if (index > -1) {
      currentHand.splice(index, 1);
    }
    let newSelection = currentHand.sort((a, b) => {
      return Math.abs(comparisonPile - a) - Math.abs(comparisonPile - b);
    });

    if ( newSelection[0] < comparisonPile ) {
      getNewDiff(newSelection[0], comparisonPile, currentHand);
    }
    return Math.abs(newSelection[0] - comparisonPile);
  }

  function getNewDiffBackwards(selection, comparisonPile, currentHand) {
    currentHand = currentHand ? currentHand : _.cloneDeep((hand));
    if (currentHand = []) {
      return 1000;
    }
    const index = currentHand.indexOf(selection);
    if (index > -1) {
      currentHand.splice(index, 1);
    }

    let newSelection = currentHand.sort((a, b) => {
      return Math.abs(comparisonPile - a) - Math.abs(comparisonPile - b);
    });

    if ( newSelection[0] > comparisonPile ) {
      getNewDiff(newSelection[0], comparisonPile, currentHand);
    }
    return Math.abs(newSelection[0] - comparisonPile);
  }

  if (isNaN(diff1)) {
    diff1 = 1000;
  }

  if (isNaN(diff2)) {
    diff2 = 1000;
  }

  if (isNaN(diff3)) {
    diff3  = 1000;
  }

  if (isNaN(diff4)) {
    diff4 = 1000;
  }

  let differentials = [diff1, diff2, diff3, diff4];
  console.log('hand: ' + hand);
  console.log('differentials: ' + differentials);

  if (_.sum(differentials) === 4000) {
    //get next best number if it exists.
    console.log('Failed!!!\n')
    console.log('Remaining Cards in Pile: ' + pile);
    process.exit()
    // const index = hand.indexOf(selection1[0]);
    // let secondaryHand = _.cloneDeep(hand);
    // if (index > -1) {
    //   secondaryHand.splice(index, 1);
    // }
    // takeTurn(secondaryHand);
  }


  let lowestDiffSelection = differentials.indexOf(Math.min(...differentials)) + 1;



  let choice = `selection${lowestDiffSelection}`;
  console.log('choice ' + choice)
  let removeCard;

  if ( choice == 'selection1'  ) {
    one = selection1[0];
    removeCard = one;
  }

  if ( choice == 'selection2'  ) {
    one2 = selection2[0];
    removeCard = one2;
  }

  if ( choice == 'selection3'  ) {
    hundred = selection3[0];
    removeCard = hundred
  }

  if ( choice == 'selection4' ) {
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

console.log('Success!! All Cards used!')


