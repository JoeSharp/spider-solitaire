import { createDeckOfCards } from "./cards";

describe("Cards", () => {
  it("Creates deck correctly", () => {
    const cards = createDeckOfCards();

    expect(cards).toHaveLength(13 * 4);
  });
});
