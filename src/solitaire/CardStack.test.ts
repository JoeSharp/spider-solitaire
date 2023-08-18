import { createDeckOfCards } from "../cards/cards";
import { ACE, JACK, KING, QUEEN, Suit } from "../cards/types";
import {
  createSingleSuitOneUpStack,
  createSolitaireInPlayStack,
} from "./CardStack";

describe("CardStack", () => {
  describe("Single Suit One Up Stack", () => {
    it("allows ace to be placed", () => {
      const stack = createSingleSuitOneUpStack();
      const card = { suit: Suit.Hearts, value: ACE };

      var result = stack.placeCard(card);

      expect(result).toBeTruthy();
      expect(stack.peek()).toStrictEqual(card);
    });

    it("prevents anything other than Ace starting the stack", () => {
      const stack = createSingleSuitOneUpStack();

      var result = stack.placeCard({ suit: Suit.Clubs, value: 2 });

      expect(result).toBeFalsy();
      expect(stack.peek()).toBeUndefined();
    });

    it("allows stack to be built correctly", () => {
      const stack = createSingleSuitOneUpStack();

      let result = stack.placeCard({ suit: Suit.Hearts, value: ACE });
      result = result && stack.placeCard({ suit: Suit.Hearts, value: 2 });
      result = result && stack.placeCard({ suit: Suit.Hearts, value: 3 });
      result = result && stack.placeCard({ suit: Suit.Hearts, value: 4 });
      result = result && stack.placeCard({ suit: Suit.Hearts, value: 5 });
      result = result && stack.placeCard({ suit: Suit.Hearts, value: 6 });
      result = result && stack.placeCard({ suit: Suit.Hearts, value: 7 });
      result = result && stack.placeCard({ suit: Suit.Hearts, value: 8 });
      result = result && stack.placeCard({ suit: Suit.Hearts, value: 9 });
      result = result && stack.placeCard({ suit: Suit.Hearts, value: 10 });
      result = result && stack.placeCard({ suit: Suit.Hearts, value: JACK });
      result = result && stack.placeCard({ suit: Suit.Hearts, value: QUEEN });
      result = result && stack.placeCard({ suit: Suit.Hearts, value: KING });

      const resultTooFar = stack.placeCard({ suit: Suit.Hearts, value: 5 });

      expect(result).toBeTruthy();
      expect(resultTooFar).toBeFalsy();
      expect(stack.peek()).toStrictEqual({ suit: Suit.Hearts, value: KING });
    });

    it("prevents mixed suits", () => {
      const stack = createSingleSuitOneUpStack();

      stack.placeCard({ suit: Suit.Hearts, value: ACE });
      stack.placeCard({ suit: Suit.Hearts, value: 2 });
      const wrongSuit = stack.placeCard({ suit: Suit.Diamonds, value: 3 });

      expect(wrongSuit).toBeFalsy();
      expect(stack.peek()).toStrictEqual({ suit: Suit.Hearts, value: 2 });
    });
  });

  describe("Solitaire In Play Stack", () => {
    it("allows placement of king on empty stack", () => {
      const stack = createSolitaireInPlayStack();

      const result = stack.placeCard({ suit: Suit.Clubs, value: KING });

      expect(result).toBeTruthy();
    });

    it("prevents starting a stack with anything other than king", () => {
      const stack = createSolitaireInPlayStack();

      const result = stack.placeCard({ suit: Suit.Clubs, value: 5 });

      expect(result).toBeFalsy();
    });

    it("allows placing more cards on stack", () => {
      const stack = createSolitaireInPlayStack();

      stack.placeCard({ suit: Suit.Diamonds, value: 3 }, false);
      stack.placeCard({ suit: Suit.Hearts, value: 2 }, false);
      stack.placeCard({ suit: Suit.Clubs, value: 7 }, false);
      stack.placeCard({ suit: Suit.Spades, value: 9 }, false);
      const result = stack.placeCard({ suit: Suit.Spades, value: 10 });

      expect(result).toBeFalsy();
    });

    it("prevents placing invalid cards on stack", () => {
      const stack = createSolitaireInPlayStack();

      stack.placeCard({ suit: Suit.Diamonds, value: 3 }, false);
      stack.placeCard({ suit: Suit.Hearts, value: 2 }, false);
      stack.placeCard({ suit: Suit.Clubs, value: 7 }, false);
      stack.placeCard({ suit: Suit.Clubs, value: 9 }, false);
      const result = stack.placeCard({ suit: Suit.Spades, value: 6 });

      expect(result).toBeFalsy();
    });
  });
});
