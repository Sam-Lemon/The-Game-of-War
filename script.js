import { doc } from 'mocha/lib/reporters';
import Deck from './deck.js';

const cardValue = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    "J": 11,
    "Q": 12,
    "K": 13,
    "A": 14,
}

const computerCardPile = document.querySelector(".computer-card-pile")
const playerCardPile = document.querySelector(".player-card-pile")
const computerDeckElement = document.querySelector(".computer-deck")
const playerDeckElement = document.querySelector(".player-deck")
const text = document.querySelector(".text")
const playerScoreElement = document.querySelector(".p-score")
const computerScoreElement = document.querySelector(".c-score")

let playerDeck, computerDeck, inRound, stop

document.addEventListener('click', () => {
    if (stop) {
        startGame()
        return
    }

    if (inRound) {
        resetRound()
    } else {
        flipCards()
    }
})

startGame()
function startGame() {
    const deck = new Deck()
    deck.shuffle()

    const deckMidpoint = deck.numberOfCards / 2
    playerDeck = new Deck(deck.cards.slice(0, deckMidpoint))
    computerDeck = new Deck(deck.cards.slice(deckMidpoints, deck.numberOfCards))

    inRound = false
    stop = false
    
    resetRound()
}

function resetRound() {
    inRound = false;
    computerCardPile.innerHTML = "";
    playerCardPile.innerHTML = "";
    text.innerText = "";

    updateDeckCount();
}

function flipCards() {
    inRound = true;

    const playerCard = playerDeck.topCard()
    const computerCard = computer.Deck.topCard()

    playerCardPile.appendChild(playerCard.getHTML())
    computerCardPile.appendChild(computerCard.getHTML())

    updateDeckCount();

    if (isRoundWinner(playerCard, computerCard)) {
        text.innerText = "Player wins";
        playerDeck.push(playerCard);
        playerDeck.push(computerCard);
        updatePlayerScore();
    } else if (isRoundWinner(computerCard, playerCard)) {
        text.innerText = "Player loses";
        computerDeck.push(playerCard);
        computerDeck.push(computerCard);
        updateComputerScore();
    } else {
        text.innerText = "Tie"
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

function updateDeckCount () {
    computerDeckElement.innerText = computerDeck.numberOfCards;
    playerDeckElement.innerText = playerDeck.numberOfCards;
}

function isRoundWinner (cardOne, cardTwo) {
    return cardValue[cardOne.rank] > cardValue[cardTwo.rank];
}

let playerScore = 0;
function updatePlayerScore() {
    playerScoreElement.innerText = ' ' + (playerScore += 1);
}

let computerScore = 0;
function updateComputerScore() {
    computerScoreElement.innerText = " " + (computerScore += 1);
}

function isGameOver(deck) {
    return deck.numberOfCards === 0;
}

