import { createDeckOfCards } from "../cards/cards";
import { Suit } from "../cards/types";
import {
  CardStack,
  createSimpleStack,
  createSingleSuitOneUpStack,
  createSolitaireInPlayStack,
} from "./CardStack";

const IN_PLAY_STACK_NUMBERS = [0, 1, 2, 3, 4, 5, 6];

class Solitaire {
  availableCards: CardStack;
  seenCards: CardStack;

  completeStacks: Map<Suit, CardStack>;
  inPlayStacks: Map<number, CardStack>;

  selectedStack: CardStack | undefined;

  constructor() {
    this.availableCards = createSimpleStack();
    this.seenCards = createSimpleStack();
    this.selectedStack = undefined;

    this.completeStacks = new Map();
    [Suit.Hearts, Suit.Diamonds, Suit.Spades, Suit.Clubs].forEach((suit) => {
      this.completeStacks.set(suit, createSingleSuitOneUpStack());
    });

    this.inPlayStacks = new Map();
    IN_PLAY_STACK_NUMBERS.forEach((stackNumber) => {
      this.inPlayStacks.set(stackNumber, createSolitaireInPlayStack());
    });
  }

  deal() {
    [...this.completeStacks.values()].forEach((s) => s.clear());
    [...this.inPlayStacks.values()].forEach((s) => s.clear());
    this.seenCards.clear();
    this.availableCards.clear();

    const deck = createDeckOfCards(true);
    deck.forEach((c) => this.availableCards.placeCard(c));

    for (const [n, stack] of this.inPlayStacks.entries()) {
      for (let i = 0; i <= n; i++) {
        const card = this.availableCards.deal();
        if (!card) throw new Error("Ran out of cards dealing");

        stack.placeCard(card, false);
      }
    }

    this.selectedStack = undefined;
  }

  clickStack(stack: CardStack | undefined) {
    if (!stack) return;
    if (stack === this.selectedStack) {
      this.selectedStack.deselect();
      this.selectedStack = undefined;
      return;
    }

    if (!!this.selectedStack) {
      const card = this.selectedStack.deal();
      if (!card) {
        this.selectedStack.deselect();
        this.selectedStack = stack;
        return;
      }

      if (!stack.placeCard(card)) {
        this.selectedStack.placeCard(card, true);
      }

      this.selectedStack.deselect();
      this.selectedStack = undefined;
    } else {
      this.selectedStack = stack;
      this.selectedStack.select();
    }
  }

  clickInPlayStack(index: number) {
    this.clickStack(this.inPlayStacks.get(index));
  }

  clickCompletedStack(index: number) {
    this.clickStack(this.completeStacks.get(index));
  }

  takeNextCard() {
    let card = this.availableCards.deal();
    if (!!card) {
      this.seenCards.placeCard(card);
    } else {
      card = this.seenCards.deal();
      while (card !== undefined) {
        this.availableCards.placeCard(card);
        card = this.seenCards.deal();
      }
    }
  }

  selectAvailableCard() {
    this.clickStack(this.seenCards);
  }
}

export default Solitaire;
