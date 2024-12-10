console.log('Script is running!');
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
      let pairs = [
        { suit: 'Hearts', value: '2' },
        { suit: 'Diamonds', value: '3' },
        { suit: 'Clubs', value: '4' },
      ];
    
      for (let pair of pairs) {
        hand.push(new Card(pair.suit, pair.value));
        hand.push(new Card(pair.suit, pair.value));
      }
    
      return hand;
    }

    public renderGameBoard(cardRowElement: HTMLElement): void {
      console.log('Rendering game board');
      console.log('Card row element:', cardRowElement);
      cardRowElement.innerHTML = '';

      // Create the card elements and add them to the card row
      for (let i = 0; i < this.hand.length; i++) {
        const card = this.hand[i];
        const cardElement = document.createElement('div');
        cardElement.classList.add('card', 'card-face-down');
        cardElement.setAttribute('data-card-index', i.toString());
        cardElement.innerHTML = `<img src="../images/card-flip-card-image.png" alt="${card.value} of ${card.suit}">`;

        console.log(`Adding card ${i + 1} to game board`);
        console.log(cardElement);
        cardRowElement.appendChild(cardElement);
        console.log('Card element appended:', cardElement);

        // Add a click event listener to each card
        cardElement.addEventListener('click', () => {
          console.log(`Card ${i + 1} clicked`);

          // Flip the card and check for a match
          cardElement.classList.remove('card-face-down');
          cardElement.classList.add('card-face-up');
          cardElement.innerHTML = `${card.value} of ${card.suit}`;

          // Check for a match
          const otherCard = document.querySelector(`[data-card-index="${i}"]`);
          if (otherCard && otherCard.classList.contains('card-face-up')) {
            console.log('Match found!');
            // Handle the match
          } else {
            console.log('No match found');
            // Handle the non-match
          }
        });
      }

      console.log('Finished rendering game board');
      console.log(cardRowElement);
      console.log('Card row element inner HTML:', cardRowElement.innerHTML);
    }
  }

  console.log('Script is running');
  const gameBoard = document.querySelector('.game-board') as HTMLElement;
  const cardRow = gameBoard.querySelector('.game-container .card-row') as HTMLElement;
  console.log(cardRow);

  var game = new Game();

  console.log('Game board:', gameBoard);
  console.log('Card row:', cardRow);

  if (cardRow) {
    console.log('Card row element found!');
    game.renderGameBoard(cardRow);
  } else {
    console.log('Card row element not found!');
  }

  if (newGameButton) {
    newGameButton.addEventListener('click', () => {
      game = new Game();
      if (cardRow) {
        game.renderGameBoard(cardRow);
      }
    });
  }
});