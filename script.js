import Deck from "./deck.js"; 

const cardValue = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};
console.log("Card values", cardValue);

// these variables are linking the js to html classes
const computerCardPile = document.querySelector(".computer-card-pile");
const playerCardPile = document.querySelector(".player-card-pile");
const computerDeckElement = document.querySelector(".computer-deck");
const playerDeckElement = document.querySelector(".player-deck");
const text = document.querySelector(".text");
const playerScoreElement = document.querySelector(".p-score");
const computerScoreElement = document.querySelector(".c-score");

let playerDeck, computerDeck, inRound, stop;

document.addEventListener("click", () => {
  if (stop) {
    //stops game and starts over when player or computer is out of cards
    startGame();
    return;
  }

  if (inRound) {
    resetRound();
  } else {
    flipCards();
  }
});

startGame(); //starts game
function startGame() {
  const deck = new Deck(); //creates new deck
  console.log("New deck", deck.cards.map(card => `${card.suit}${card.rank}`).join(", "));
  deck.shuffle(); //shuffles that deck

  const deckMidpoint = Math.ceil(deck.numberOfCards / 2); //splits the deck in half
  playerDeck = new Deck(deck.cards.slice(0, deckMidpoint)); //gives player first 26 cards of the deck, index 0 to midpoint
  computerDeck = new Deck(deck.cards.slice(deckMidpoint, deck.numberOfCards)); //gives computer last 26 cards of the deck, midpoint to end
  // computerDeck = new Deck([new Card('s', 5)])     //gives computer 1 card to test functionality of gameOver

  inRound = false;
  stop = false;

  resetRound();
}

function resetRound() {
  //clears out all of our values from the previous round
  inRound = false;
  computerCardPile.innerHTML = "";
  playerCardPile.innerHTML = "";
  text.innerText = "";

  updateDeckCount();
}

function flipCards() {
  inRound = true;

  const playerCard = playerDeck.topCard(); //pulls the card off of the top of the player's deck via method in deck class
  const computerCard = computerDeck.topCard();

  playerCardPile.appendChild(playerCard.getHTML()); //renders the card
  computerCardPile.appendChild(computerCard.getHTML());

  updateDeckCount();

  if (isRoundWinner(playerCard, computerCard)) {
    //if Player wins, both player and computer card go into their hand
    text.innerText = "Player wins";
    playerDeck.push(playerCard);
    playerDeck.push(computerCard);
    updatePlayerScore();
  } else if (isRoundWinner(computerCard, playerCard)) {
    //if Computer wins, both player and computer card go into their hand
    text.innerText = "Player loses";
    computerDeck.push(playerCard);
    computerDeck.push(computerCard);
    updateComputerScore();
  } else {
    text.innerText = "Tie"; //if tie, each player/computer gets their card back
    playerDeck.push(playerCard);
    computerDeck.push(computerCard);
  }

  if (isGameOver(playerDeck)) {
    text.innerText = "You lose";
    stop = true;
  } else if (isGameOver(computerDeck)) {
    text.innerText = "Winner winner chicken dinner!!";
    stop = true;
  }
}

function updateDeckCount() {
  computerDeckElement.innerText = computerDeck.numberOfCards; //shows the number of cards in the computer's deck
  playerDeckElement.innerText = playerDeck.numberOfCards; //shows the number of cards in the player's deck
}

function isRoundWinner(cardOne, cardTwo) {
  //compares values of card
  return cardValue[cardOne.rank] > cardValue[cardTwo.rank];
}

let playerScore = 0;
function updatePlayerScore() {
  playerScoreElement.innerText = "   " + (playerScore += 1);
}

let computerScore = 0;
function updateComputerScore() {
  computerScoreElement.innerText = "   " + (computerScore += 1);
}

function isGameOver(deck) {
  return deck.numberOfCards === 0;
}
