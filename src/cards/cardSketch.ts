import p5 from "p5";
import { createDeckOfCards } from "./cards";
import { drawCard, getCardHeight } from "./cards.p5";
import { Card } from "./types";

const cardSketch = (p: p5) => {
  let canvas;
  let deck: Card[] = [];

  p.setup = () => {
    canvas = p.createCanvas(600, 600);

    deck = createDeckOfCards();
    p.shuffle(deck, true);
  };

  p.draw = () => {
    const cWidth = p.width / 8;
    const cHeight = getCardHeight(cWidth);

    p.background(220);

    deck.forEach((card, i) => {
      const x = cWidth * Math.floor(i % 8);
      const y = cHeight * Math.floor(i / 8);

      p.push();
      p.translate(x, y);
      drawCard(p, card, cWidth);
      p.pop();
    });
  };
};

export default cardSketch;
