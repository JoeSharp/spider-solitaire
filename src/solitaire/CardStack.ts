import Card from "../cards/Card";
import { createDeckOfCards, suitColor } from "../cards/cards";
import { ACE, KING, Suit } from "../cards/types";

type CardVerifier = (card: Card, lastCard: Card | undefined) => boolean;

/**
 * General form of a stack of cards.
 * Contains the stack, ability to peek.
 */
export class CardStack {
  cards: Card[];
  selected: boolean;
  canPlaceCard: CardVerifier;

  constructor(canPlaceCard: CardVerifier) {
    this.cards = [];
    this.selected = false;
    this.canPlaceCard = canPlaceCard;
  }

  fill(shuffleDeck: boolean = false) {
    this.placeCards(createDeckOfCards(shuffleDeck));
  }

  select() {
    this.selected = true;
  }

  deselect() {
    this.selected = false;
  }

  clear() {
    this.cards = [];
  }

  placeCards(cards: Card[]) {
    cards.forEach((card) => this.placeCard(card, false));
  }

  placeCard(card: Card, validate: boolean = true): boolean {
    if (validate && !this.canPlaceCard(card, this.peek())) {
      return false;
    }

    this.cards.push(card);

    return true;
  }

  extractCard(suit: Suit, value: number): Card | undefined {
    const index = this.cards.findIndex(
      (c) => c.suit === suit && c.value === value
    );

    if (index === -1) {
      return undefined;
    }

    const result = this.cards.splice(index, 1);

    return result[0];
  }

  pop(): Card | undefined {
    return this.cards.pop();
  }

  popThoseThatMatch(selector: (c: Card) => boolean): Card[] {
    const cards: Card[] = [];

    while (
      this.cards.length > 0 &&
      selector(this.cards[this.cards.length - 1])
    ) {
      cards.push(this.cards.pop()!);
    }

    return cards;
  }

  peek(): Card | undefined {
    if (this.cards.length === 0) {
      return undefined;
    }

    return this.cards[this.cards.length - 1];
  }
}

export const createSingleSuitOneUpStack = () =>
  new CardStack((card: Card, currentTop: Card | undefined) => {
    // Is this the ACE and we are still waiting for first card?
    if (currentTop === undefined) {
      return card.value === ACE;
    }

    if (currentTop.value !== card.value - 1) {
      return false;
    }

    if (currentTop.suit !== card.suit) {
      return false;
    }

    return true;
  });

function areOppositeColours(suit1: Suit, suit2: Suit) {
  return suitColor(suit1) !== suitColor(suit2);
}

export const createSimpleStack = () => new CardStack(() => true);

export const createSolitaireInPlayStack = () =>
  new CardStack((card: Card, currentTop: Card | undefined) => {
    if (currentTop === undefined) {
      return card.value === KING;
    }

    if (currentTop.value !== card.value + 1) {
      return false;
    }

    if (!areOppositeColours(card.suit, currentTop.suit)) {
      return false;
    }

    return true;
  });
