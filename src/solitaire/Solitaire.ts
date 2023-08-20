import Card from "../cards/Card";
import { createDeckOfCards } from "../cards/cards";
import { Suit } from "../cards/types";
import {
  CardStack,
  createSimpleStack,
  createSingleSuitOneUpStack,
  createSolitaireInPlayStack,
} from "./CardStack";

const IN_PLAY_STACK_NUMBERS = [0, 1, 2, 3, 4, 5, 6];

enum StackType {
  NONE,
  IN_PLAY,
  SEEN,
  COMPLETED,
}

class Solitaire {
  availableCards: CardStack;
  seenCards: CardStack;

  completeStacks: Map<Suit, CardStack>;
  inPlayStacks: Map<number, CardStack>;

  selectedStack: CardStack | undefined;
  selectedStackType: StackType;

  faceUp: Set<number>;

  constructor() {
    this.availableCards = createSimpleStack();
    this.seenCards = createSimpleStack();
    this.selectedStack = undefined;
    this.selectedStackType = StackType.NONE;
    this.faceUp = new Set();

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
        const card = this.availableCards.pop();
        if (!card) throw new Error("Ran out of cards dealing");

        stack.placeCard(card, false);
      }

      this.turnOverTop(stack);
    }

    this.selectedStack = undefined;
    this.selectedStackType = StackType.NONE;
  }

  _clickStack(stack: CardStack | undefined, stackType: StackType) {
    if (!stack) return;

    // Have we just clicked on the same stack twice?
    if (stack === this.selectedStack) {
      // Auto detect shoving over to completed pile?
      if (stackType !== StackType.COMPLETED) {
        const card = this.selectedStack.peek();
        if (!!card) {
          const completedStack = this.completeStacks.get(card.suit);

          if (!!completedStack) {
            if (completedStack.placeCard(card)) {
              this.selectedStack.pop();
              this.turnOverTop(this.selectedStack);
            }
          }
        }
      }

      this.selectedStack.deselect();
      this.selectedStack = undefined;
      this.selectedStackType = StackType.NONE;
      return;
    }

    // If we already had a stack selected
    if (!!this.selectedStack) {
      if (
        StackType.IN_PLAY === this.selectedStackType &&
        stackType === StackType.IN_PLAY
      ) {
        const cards = this.selectedStack
          .popThoseThatMatch((c) => this.isFaceUp(c))
          .reverse();

        let placeFailed = false;
        for (let card of cards) {
          if (!placeFailed && stack.placeCard(card)) {
          } else {
            placeFailed = true;
            this.selectedStack.placeCard(card, false);
          }
        }

        if (!placeFailed) {
          this.turnOverTop(this.selectedStack);
        }
      } else {
        // Pop the card from the selected stack
        const card = this.selectedStack.pop();

        // If there are no cards on the 'from' stack, reset selection
        if (!card) {
          this.selectedStack.deselect();
          this.selectedStack = undefined;
          return;
        }

        if (stack.placeCard(card)) {
          this.turnOverTop(this.selectedStack);
        } else {
          // revert the change
          this.selectedStack.placeCard(card, false);
        }
      }

      this.selectedStack.deselect();
      this.selectedStack = undefined;
      this.selectedStackType = StackType.NONE;
    } else {
      if (stack.cards.length === 0) {
        return;
      }

      // Remember this stack selection
      this.selectedStack = stack;
      this.selectedStack.select();
      this.selectedStackType = stackType;
    }
  }

  clickInPlayStack(index: number) {
    this._clickStack(this.inPlayStacks.get(index), StackType.IN_PLAY);
  }

  clickCompletedStack(index: number) {
    this._clickStack(this.completeStacks.get(index), StackType.COMPLETED);
  }

  turnOverTop(stack: CardStack) {
    const card = stack.peek();

    if (card === undefined) return;

    this.faceUp.add(card.key);
  }

  isFaceUp(card: Card) {
    return this.faceUp.has(card.key);
  }

  turnOverCard(card: Card) {
    this.faceUp.add(card.key);
  }

  turnCardFaceDown(card: Card) {
    this.faceUp.delete(card.key);
  }

  takeNextCard() {
    let card = this.availableCards.pop();
    if (!!card) {
      this.turnOverCard(card);
      this.seenCards.placeCard(card);
    } else {
      card = this.seenCards.pop();
      while (card !== undefined) {
        this.turnCardFaceDown(card);
        this.availableCards.placeCard(card);
        card = this.seenCards.pop();
      }
    }
  }

  selectAvailableCard() {
    this._clickStack(this.seenCards, StackType.SEEN);
  }
}

export default Solitaire;
