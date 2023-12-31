import p5 from "p5";
import { createDeckOfCards } from "./cards";
import { drawCard, getCardHeight } from "./cards.p5";
import Card from "./Card";
import { Dimensions } from "../dimensions";

const cardSketch = (p: p5) => {
  let deck: Card[] = [];

  p.setup = () => {
    p.createCanvas(600, 600);

    deck = createDeckOfCards();
    p.shuffle(deck, true);
  };

  p.draw = () => {
    const cWidth = p.width / 8;
    const cHeight = getCardHeight(cWidth);
    const cardDim: Dimensions = {
      width: cWidth,
      height: cHeight,
    };

    p.background(220);

    deck.forEach((card, i) => {
      const x = cWidth * Math.floor(i % 8);
      const y = cHeight * Math.floor(i / 8);

      p.push();
      drawCard(p, x, y, card, true, cardDim);
      p.pop();
    });
  };
};

export default cardSketch;
