import { ACE, Card, JACK, KING, QUEEN } from "./types";

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

export function createDeckOfCards(): Card[] {
  const cards = [];

  for (let suit = 0; suit <= 3; suit++) {
    for (let value = ACE; value <= KING; value++) {
      cards.push({ suit, value });
    }
  }

  return cards;
}
