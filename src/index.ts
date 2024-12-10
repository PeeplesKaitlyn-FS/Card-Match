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
  private attemptsLeft: number;

  constructor() {
    this.deck = this.generateDeck();
    this.shuffleDeck();
    this.hand = this.dealCards();
    this.attemptsLeft = 3;
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
    const pairs = [
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
    cardRowElement.innerHTML = '';

    for (let i = 0; i < this.hand.length; i++) {
      const card = this.hand[i];
      const cardElement = document.createElement('div');
      cardElement.classList.add('card', 'card-face-down');
      cardElement.setAttribute('data-card-index', i.toString());
      cardElement.innerHTML = `<img src="card-back.png" alt="${card.value} of ${card.suit}">`;

      cardRowElement.appendChild(cardElement);

      cardElement.addEventListener('click', () => {
        this.flipCard(cardElement, i);
      });
    }
  }

  private flipCard(cardElement: HTMLElement, index: number): void {
    cardElement.classList.remove('card-face-down');
    cardElement.classList.add('card-face-up');
    cardElement.innerHTML = `${this.hand[index].value} of ${this.hand[index].suit}`;

    const previouslyFlippedCard = document.querySelector('.card-face-up:not([data-card-index="' + index + '"])');

    if (previouslyFlippedCard) {
      const previouslyFlippedCardValue = previouslyFlippedCard.innerHTML;
      if (previouslyFlippedCardValue === cardElement.innerHTML) {
        console.log('Match found!');
        // Handle the match
      } else {
        console.log('No match found');
        // Handle the non-match
        this.attemptsLeft--;
        document.getElementById('attempts-left').textContent = `Attempts left: ${this.attemptsLeft}`;
        // Flip the cards back
        setTimeout(() => {
          previouslyFlippedCard.classList.remove('card-face-up');
          previouslyFlippedCard.classList.add('card-face-down');
          previouslyFlippedCard.innerHTML = `<img src="card-back.png" alt="${previouslyFlippedCard.getAttribute('alt')}">`;
          cardElement.classList.remove('card-face-up');
          cardElement.classList.add('card-face-down');
          cardElement.innerHTML = `<img src="card-back.png" alt="${cardElement.getAttribute('alt')}">`;
        }, 1000);
      }
    }
  }
}

const game = new Game();
const cardRowElement = document.querySelector('.card-row');
