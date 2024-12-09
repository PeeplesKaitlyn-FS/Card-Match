document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.querySelector('.game-container');
    const gameBoard = document.querySelector('.game-board');
    const attemptsElement = document.querySelector('#attempts');
    const newGameButton = document.querySelector('#new-game');

class Card {
  suit: string;
  value: string;

  constructor(suit: string, value: string) {
    this.suit = suit;
    this.value = value;
  }

  toString(): string {
    return `${this.value} of ${this.suit}`;
  }
}

class Game {
  private deck: Card[];
  private hand: Card[];

  constructor() {
    this.deck = this.generateDeck();
    this.shuffleDeck();
    this.hand = this.dealCards();
  }

  private generateDeck(): Card[] {
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10'];
    const deck = [];

    for (let suit of suits) {
      for (let value of values) {
        deck.push(new Card(suit, value));
      }
    }

    return deck;
  }

  private shuffleDeck(): void {
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  }

  private dealCards(): Card[] {
    const hand: Card[] = [];
    for (let i = 0; i < 4; i++) {
      const card = this.deck.pop();
      if (card) {
        hand.push(card);
      }
    }
    return hand;
  }

  public renderGameBoard(boardElement: HTMLElement): void {
    boardElement.innerHTML = '';
    for (let i = 0; i < this.hand.length; i++) {
      const card = this.hand[i];
      const cardElement = document.createElement('div');
      cardElement.classList.add('card');
      cardElement.id = `card-${i + 1}`;
      cardElement.innerHTML = card.toString();
      boardElement.appendChild(cardElement);
    }
  }
}

let game = new Game();
if (gameBoard) {
  game.renderGameBoard(gameBoard);
}

if (newGameButton) {
  newGameButton.addEventListener('click', () => {
    game = new Game();
    if (gameBoard) {
      game.renderGameBoard(gameBoard);
    }
  });
}
});