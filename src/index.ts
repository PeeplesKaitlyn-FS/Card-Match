document.addEventListener('DOMContentLoaded', () => {
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

    public renderGameBoard(cardRowElement: HTMLElement): void {
      console.log('Rendering game board');
      console.log('Card row element:', cardRowElement);
      cardRowElement.innerHTML = '';
      for (let i = 0; i < this.hand.length; i++) {
        const card = this.hand[i];
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
    
        if (i % 2 === 0) { // face down card
          cardElement.classList.add('card-face-down');
        } else { // face up card
          cardElement.classList.add('card-face-up');
          const cardFace = document.createElement('div');
          cardFace.classList.add('card-face');
          cardFace.innerHTML = `
            <span class="card-suit">${card.suit}</span>
            <span class="card-value">${card.value}</span>
          `;
          cardElement.appendChild(cardFace);
        }
    
        console.log(`Adding card ${i + 1} to game board`);
        console.log(cardElement);
        cardRowElement.appendChild(cardElement);
      }
      console.log('Finished rendering game board');
      console.log(cardRowElement);
    }
  }

  console.log('Script is running');
  const cardRow = document.querySelector('.card-row') as HTMLElement;
  console.log('Card row element:', cardRow);

  if (cardRow) {
    console.log('Card row element found');
    let game = new Game();
    console.log('Game object created');
    game.renderGameBoard(cardRow);
  } else {
    console.log('Card row element not found');
  }

  if (newGameButton) {
    console.log('New game button found');
    newGameButton.addEventListener('click', () => {
      console.log('New game button clicked');
      game = new Game();
      console.log('Game object created');
      if (cardRow) {
        console.log('Card row element found');
        game.renderGameBoard(cardRow);
      } else {
        console.log('Card row element not found');
      }
    });
  } else {
    console.log('New game button not found');
  }
});