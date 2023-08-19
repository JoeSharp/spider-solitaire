export enum SuitColor {
  Red,
  Black,
}

export enum Suit {
  Hearts,
  Diamonds,
  Spades,
  Clubs,
}

export interface Card {
  suit: Suit;
  value: number;
  faceUp?: boolean;
}

export const ACE = 1;
export const JACK = 11;
export const QUEEN = 12;
export const KING = 13;
