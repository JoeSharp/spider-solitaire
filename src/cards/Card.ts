import { Suit } from "./types";

class Card {
  suit: Suit;
  value: number;
  key: number;

  constructor(suit: Suit, value: number) {
    this.suit = suit;
    this.value = value;
    this.key = this.value * 4 + this.suit;
  }
}

export default Card;
