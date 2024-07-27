const suits = ["♠", "♣", "♥", "♦"];
const ranks = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

export default class Deck {
  //anything that deals with a pile of cards will be encapsulated within this class
  constructor(cards = newDeck()) {
    this.cards = cards;
  }

  get numberOfCards() {
    //getter encapsulates this.cards.length instead of having to type it all the time
    return this.cards.length;
  }

  topCard() {
    return this.cards.shift(); //removes top element of array and returns it to us
  }

  push(card) {
    //put card at end of array
    this.cards.push(card);
  }

  // Fisher-Yates algorithm
  // shuffle iterates through our deck from back to front placing a card randomly in the deck somewhere earlier than the current place.
  // then it takes the old value of the card and places it in the new value, and flips the old value with the new value.
  shuffle() {
    for (let i = this.numberOfCards - 1; i > 0; i--) {
      const newIndex = Math.floor(Math.random() * (i + 1));
      const oldValue = this.cards[newIndex];
      // console.log("oldValue in loop", oldValue)
      this.cards[newIndex] = this.cards[i];
      this.cards[i] = oldValue;
    }
    console.log("Shuffled deck:", this.cards.map(card => `${card.suit}${card.rank}`).join(", "));
  }
}

class Card {
  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;
  }

  get color() {
    return this.suit === "♠" || this.suit === "♣" ? "black" : "red"; //turnery operator - if the card is a spade or a club,
    //the color of the card is black, otherwise it should be red
  }

  getHTML() {
    //this pulls the code from the div in the index.html file
    const cardDiv = document.createElement("div");
    cardDiv.innerHTML = `${this.rank}<br>${this.suit}`;
    cardDiv.classList.add("card", this.color);
    cardDiv.dataset.rank = `${this.suit} ${this.rank}`;
    return cardDiv;
  }
}

// newDeck loops through all the suits, then all the values, and combines them.
// flatMap takes the arrays and flattens them into one and then creates a new card.
function newDeck() {
  return suits.flatMap((suit) => {
    return ranks.map((rank) => {
      return new Card(suit, rank);
    });
  });
}
