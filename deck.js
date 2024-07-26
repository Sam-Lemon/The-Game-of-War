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

//Deck of cards
export default class Deck {
  constructor(cards = newDeck()) {
    this.cards = cards;
  }

  // Get the number of cards in the deck
  get numberOfCards() {
    return this.cards.length;
  }

  // Remove and return the top card of the deck
  topCard() {
    return this.cards.shift();
  }

  // Add a card to the bottom of the deck
  push(card) {
    this.cards.push(card);
  }

  // Shuffle the deck using Fisher-Yates algorithm
  shuffle() {
    for (let i = this.numberOfCards - 1; i > 0; i--) {
      const newIndex = Math.floor(Math.random() * (i + 1));
      const oldValue = this.cards[newIndex];
      console.log("oldValue in loop", oldValue);
      this.cards[newIndex] = this.cards[i];
      this.cards[i] = oldValue;
    }
  }
}

// Represents single card
export class Card {
  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;
  }

  // Gets card color based on suit
  get color() {
    return this.suit === "♠" || this.suit === "♣" ? "black" : "red";
  }

  // Create and return an HTML element representing the card
  getHTML() {
    const cardDiv = document.createElement("div");
    cardDiv.innerText = this.suit;
    cardDiv.classList.add("card", this.color);
    cardDiv.dataset.rank = `${this.suit} ${this.rank}`;
    return cardDiv;
  }
}

// Create a new deck and returns an array of Card objects representing the full deck
function newDeck() {
  return suits.flatMap((suit) => {
    return ranks.map((rank) => {
      return new Card(suit, rank);
    });
  });
}
