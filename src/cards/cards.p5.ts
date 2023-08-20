import * as p5 from "p5";
import { ACE, Suit } from "./types";
import { isImageCard, suitChar, valueText } from "./cards";
import Card from "./Card";
import { Dimensions } from "../dimensions";

function getValueCoords(value: number, cWidth: number, cHeight: number) {
  switch (value) {
    case 2:
      return [
        { x: cWidth / 2, y: cHeight * 0.2 },
        { x: cWidth / 2, y: cHeight * 0.8 },
      ];
    case 3:
      return [
        { x: cWidth / 2, y: cHeight * 0.2 },
        { x: cWidth / 2, y: cHeight / 2 },
        { x: cWidth / 2, y: cHeight * 0.8 },
      ];
    case 4:
      return [
        { x: cWidth * 0.3, y: cHeight * 0.2 },
        { x: cWidth * 0.3, y: cHeight * 0.8 },
        { x: cWidth * 0.7, y: cHeight * 0.2 },
        { x: cWidth * 0.7, y: cHeight * 0.8 },
      ];
    case 5:
      return [
        { x: cWidth * 0.3, y: cHeight * 0.2 },
        { x: cWidth * 0.3, y: cHeight * 0.8 },
        { x: cWidth / 2, y: cHeight / 2 },
        { x: cWidth * 0.7, y: cHeight * 0.2 },
        { x: cWidth * 0.7, y: cHeight * 0.8 },
      ];
    case 6:
      return [
        { x: cWidth * 0.3, y: cHeight * 0.2 },
        { x: cWidth * 0.3, y: cHeight * 0.5 },
        { x: cWidth * 0.3, y: cHeight * 0.8 },
        { x: cWidth * 0.7, y: cHeight * 0.2 },
        { x: cWidth * 0.7, y: cHeight * 0.5 },
        { x: cWidth * 0.7, y: cHeight * 0.8 },
      ];
    case 7:
      return [
        { x: cWidth * 0.3, y: cHeight * 0.2 },
        { x: cWidth * 0.3, y: cHeight * 0.5 },
        { x: cWidth * 0.3, y: cHeight * 0.8 },
        { x: cWidth * 0.7, y: cHeight * 0.2 },
        { x: cWidth * 0.7, y: cHeight * 0.5 },
        { x: cWidth * 0.5, y: cHeight * 0.65 },
        { x: cWidth * 0.7, y: cHeight * 0.8 },
      ];
    case 8:
      return [
        { x: cWidth * 0.3, y: cHeight * 0.2 },
        { x: cWidth * 0.3, y: cHeight * 0.5 },
        { x: cWidth * 0.5, y: cHeight * 0.35 },
        { x: cWidth * 0.3, y: cHeight * 0.8 },
        { x: cWidth * 0.7, y: cHeight * 0.2 },
        { x: cWidth * 0.7, y: cHeight * 0.5 },
        { x: cWidth * 0.5, y: cHeight * 0.65 },
        { x: cWidth * 0.7, y: cHeight * 0.8 },
      ];
    case 9:
      return [
        { x: cWidth * 0.3, y: cHeight * 0.2 },
        { x: cWidth * 0.3, y: cHeight * 0.4 },
        { x: cWidth * 0.3, y: cHeight * 0.6 },
        { x: cWidth * 0.3, y: cHeight * 0.8 },
        { x: cWidth / 2, y: cHeight / 2 },
        { x: cWidth * 0.7, y: cHeight * 0.2 },
        { x: cWidth * 0.7, y: cHeight * 0.4 },
        { x: cWidth * 0.7, y: cHeight * 0.6 },
        { x: cWidth * 0.7, y: cHeight * 0.8 },
      ];
    case 10:
      return [
        { x: cWidth * 0.3, y: cHeight * 0.2 },
        { x: cWidth * 0.3, y: cHeight * 0.4 },
        { x: cWidth * 0.3, y: cHeight * 0.6 },
        { x: cWidth * 0.3, y: cHeight * 0.8 },
        { x: cWidth / 2, y: cHeight * 0.3 },
        { x: cWidth * 0.7, y: cHeight * 0.2 },
        { x: cWidth * 0.7, y: cHeight * 0.4 },
        { x: cWidth * 0.7, y: cHeight * 0.6 },
        { x: cWidth * 0.7, y: cHeight * 0.8 },
        { x: cWidth / 2, y: cHeight * 0.7 },
      ];
    default:
      return [];
  }
}

export function suitColour(s: p5, suit: Suit) {
  switch (suit) {
    case Suit.Hearts:
    case Suit.Diamonds:
      return s.color(255, 0, 0);
    case Suit.Spades:
    case Suit.Clubs:
      return s.color(0, 0, 0);
    default:
      return s.color(0, 255, 0);
  }
}

const MARGIN_FRACTION = 0.1;
const BODY_FRACTION = 1 - 2 * MARGIN_FRACTION;

export function getCardHeight(cWidth: number) {
  const CARD_WIDTH = 2.5;
  const CARD_HEIGHT = 3.5;
  return (cWidth / CARD_WIDTH) * CARD_HEIGHT;
}

export function drawCard(
  s: p5,
  x: number,
  y: number,
  card: Card,
  faceUp: boolean,
  { width: cWidth, height: cHeight }: Dimensions
) {
  s.push();
  s.translate(x, y);

  s.strokeWeight(1);
  s.stroke("black");
  s.fill("white");
  s.rect(0, 0, cWidth, cHeight);

  if (faceUp) {
    s.noStroke();

    s.fill(suitColour(s, card.suit));
    s.textAlign(s.CENTER, s.CENTER);

    if (card.value === ACE) {
      s.textSize(cWidth / 2);
      s.text(suitChar(card.suit), cWidth * 0.5, cHeight * 0.5);
    } else if (isImageCard(card.value)) {
      s.textSize(cWidth / 2);
      s.text(valueText(card.value), cWidth * 0.5, cHeight * 0.5);
    } else {
      s.textSize(cWidth / 6);
      getValueCoords(card.value, cWidth, cHeight).forEach(({ x, y }) => {
        s.text(suitChar(card.suit), x, y);
      });
    }

    // Corners
    s.textSize(cWidth / 8);
    s.text(valueText(card.value), cWidth * 0.1, cHeight * 0.1);
    s.text(suitChar(card.suit), cWidth * 0.1, cHeight * 0.2);
    s.text(valueText(card.value), cWidth * 0.9, cHeight * 0.8);
    s.text(suitChar(card.suit), cWidth * 0.9, cHeight * 0.9);
  } else {
    s.translate(cWidth * MARGIN_FRACTION, cHeight * MARGIN_FRACTION);
    s.fill("blue");
    s.rect(0, 0, cWidth * BODY_FRACTION, cHeight * BODY_FRACTION);
  }

  s.pop();
}
