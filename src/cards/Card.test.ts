import { createDeckOfCards } from "./cards";

describe("Card", () => {
  it("generates unique keys", () => {
    const cards = createDeckOfCards();
    const keys = new Set();

    cards.forEach(({ key }) => keys.add(key));

    expect(keys.size).toBe(52);
  });
});
