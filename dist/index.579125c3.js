"use strict";
class Card {
    constructor(suit, value){
        this.suit = suit;
        this.value = value;
    }
    toString() {
        return `${this.value} of ${this.suit}`;
    }
}
class Game {
    constructor(){
        this.deck = this.generateDeck();
        this.shuffleDeck();
        this.hand = this.dealCards();
    }
    generateDeck() {
        const suits = [
            'Hearts',
            'Diamonds',
            'Clubs',
            'Spades'
        ];
        const values = [
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10'
        ];
        const deck = [];
        for (let suit of suits)for (let value of values)deck.push(new Card(suit, value));
        return deck;
    }
    shuffleDeck() {
        for(let i = this.deck.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [
                this.deck[j],
                this.deck[i]
            ];
        }
    }
    dealCards() {
        const hand = [];
        for(let i = 0; i < 4; i++)hand.push(this.deck.pop());
        return hand;
    }
    renderGameBoard(boardElement) {
        boardElement.innerHTML = '';
        for(let i = 0; i < this.hand.length; i++){
            const card = this.hand[i];
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.id = `card-${i + 1}`;
            cardElement.innerHTML = card.toString();
            boardElement.appendChild(cardElement);
        }
    }
}
const gameContainer = document.querySelector('.game-container');
const gameBoard = document.querySelector('.game-board');
const attemptsElement = document.querySelector('#attempts');
const newGameButton = document.querySelector('#new-game');
const game = new Game();
game.renderGameBoard(gameBoard);
newGameButton.addEventListener('click', ()=>{
    game = new Game();
    game.renderGameBoard(gameBoard);
});

//# sourceMappingURL=index.579125c3.js.map
