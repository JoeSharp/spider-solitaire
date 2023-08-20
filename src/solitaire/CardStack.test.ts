import Card from "../cards/Card";
import { ACE, JACK, KING, QUEEN, Suit } from "../cards/types";
import {
  createSimpleStack,
  createSingleSuitOneUpStack,
  createSolitaireInPlayStack,
} from "./CardStack";

describe("CardStack", () => {
  describe("Single Suit One Up Stack", () => {
    it("extracts card correctly", () => {
      const stack = createSimpleStack();
      stack.fill();

      const result1 = stack.extractCard(Suit.Hearts, 5);
      const result2 = stack.extractCard(Suit.Hearts, 5);

      expect(stack.cards.length).toBe(51);
      expect(result1).toMatchObject({
        suit: Suit.Hearts,
        value: 5,
      });
      expect(result2).toBeUndefined();
    });

    it("allows ace to be placed", () => {
      const stack = createSingleSuitOneUpStack();
      const card = new Card(Suit.Hearts, ACE);

      var result = stack.placeCard(card);

      expect(result).toBeTruthy();
      expect(stack.peek()).toStrictEqual(card);
    });

    it("prevents anything other than Ace starting the stack", () => {
      const stack = createSingleSuitOneUpStack();

      var result = stack.placeCard(new Card(Suit.Clubs, 2));

      expect(result).toBeFalsy();
      expect(stack.peek()).toBeUndefined();
    });

    it("allows stack to be built correctly", () => {
      const stack = createSingleSuitOneUpStack();

      let result = stack.placeCard(new Card(Suit.Hearts, ACE));
      result = result && stack.placeCard(new Card(Suit.Hearts, 2));
      result = result && stack.placeCard(new Card(Suit.Hearts, 3));
      result = result && stack.placeCard(new Card(Suit.Hearts, 4));
      result = result && stack.placeCard(new Card(Suit.Hearts, 5));
      result = result && stack.placeCard(new Card(Suit.Hearts, 6));
      result = result && stack.placeCard(new Card(Suit.Hearts, 7));
      result = result && stack.placeCard(new Card(Suit.Hearts, 8));
      result = result && stack.placeCard(new Card(Suit.Hearts, 9));
      result = result && stack.placeCard(new Card(Suit.Hearts, 10));
      result = result && stack.placeCard(new Card(Suit.Hearts, JACK));
      result = result && stack.placeCard(new Card(Suit.Hearts, QUEEN));
      result = result && stack.placeCard(new Card(Suit.Hearts, KING));

      const resultTooFar = stack.placeCard(new Card(Suit.Hearts, 5));

      expect(result).toBeTruthy();
      expect(resultTooFar).toBeFalsy();
      expect(stack.peek()).toStrictEqual(new Card(Suit.Hearts, KING));
    });

    it("prevents mixed suits", () => {
      const stack = createSingleSuitOneUpStack();

      stack.placeCard(new Card(Suit.Hearts, ACE));
      stack.placeCard(new Card(Suit.Hearts, 2));
      const wrongSuit = stack.placeCard(new Card(Suit.Diamonds, 3));

      expect(wrongSuit).toBeFalsy();
      expect(stack.peek()).toStrictEqual(new Card(Suit.Hearts, 2));
    });
  });

  describe("Solitaire In Play Stack", () => {
    it("allows placement of king on empty stack", () => {
      const stack = createSolitaireInPlayStack();

      const result = stack.placeCard(new Card(Suit.Clubs, KING));

      expect(result).toBeTruthy();
    });

    it("prevents starting a stack with anything other than king", () => {
      const stack = createSolitaireInPlayStack();

      const result = stack.placeCard(new Card(Suit.Clubs, 5));

      expect(result).toBeFalsy();
    });

    it("allows placing more cards on stack", () => {
      const stack = createSolitaireInPlayStack();

      stack.placeCard(new Card(Suit.Diamonds, 3), false);
      stack.placeCard(new Card(Suit.Hearts, 2), false);
      stack.placeCard(new Card(Suit.Clubs, 7), false);
      stack.placeCard(new Card(Suit.Spades, 9), false);
      const result = stack.placeCard(new Card(Suit.Spades, 10));

      expect(result).toBeFalsy();
    });

    it("prevents placing invalid cards on stack", () => {
      const stack = createSolitaireInPlayStack();

      stack.placeCard(new Card(Suit.Diamonds, 3), false);
      stack.placeCard(new Card(Suit.Hearts, 2), false);
      stack.placeCard(new Card(Suit.Clubs, 7), false);
      stack.placeCard(new Card(Suit.Clubs, 9), false);
      const result = stack.placeCard(new Card(Suit.Spades, 6));

      expect(result).toBeFalsy();
    });
  });
});
