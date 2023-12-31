import { shuffle } from "lodash";
import { ACE, JACK, KING, QUEEN, Suit, SuitColor } from "./types";
import Card from "./Card";

export function suitText(suit: Suit) {
  switch (suit) {
    case Suit.Hearts:
      return "Hearts";
    case Suit.Diamonds:
      return "Diamonds";
    case Suit.Spades:
      return "Spades";
    case Suit.Clubs:
      return "Clubs";
  }
}

export function valueText(value: number) {
  switch (value) {
    case ACE:
      return "A";
    case JACK:
      return "J";
    case QUEEN:
      return "Q";
    case KING:
      return "K";
    default:
      return value.toString();
  }
}

export function suitChar(suit: Suit) {
  switch (suit) {
    case Suit.Hearts:
      return "♥︎";
    case Suit.Diamonds:
      return "♦︎";
    case Suit.Spades:
      return "♠︎";
    case Suit.Clubs:
      return "♣︎";
  }
}

export function suitColor(suit: Suit): SuitColor {
  switch (suit) {
    case Suit.Hearts:
    case Suit.Diamonds:
      return SuitColor.Red;
    case Suit.Clubs:
    case Suit.Spades:
      return SuitColor.Black;
  }
}

export function isImageCard(value: number) {
  switch (value) {
    case ACE:
    case JACK:
    case QUEEN:
    case KING:
      return true;
    default:
      return false;
  }
}

export function createDeckOfCards(shuffleDeck: boolean = false): Card[] {
  const cards: Card[] = [];

  for (let suit = 0; suit <= 3; suit++) {
    for (let value = ACE; value <= KING; value++) {
      cards.push(new Card(suit, value));
    }
  }

  return shuffleDeck ? shuffle(cards) : cards;
}
