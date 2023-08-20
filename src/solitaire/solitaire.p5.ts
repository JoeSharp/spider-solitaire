import p5 from "p5";
import { drawCard, getCardHeight } from "../cards/cards.p5";
import Solitaire from "./Solitaire";
import { CardStack } from "./CardStack";

const CARD_WIDTH = 70;
const CARD_HEIGHT = getCardHeight(CARD_WIDTH);
const MARGIN = 10;
const IN_PLAY_STACK_Y = 2 * MARGIN + CARD_HEIGHT;
const DECK_X = 5 * CARD_WIDTH + 6 * MARGIN;

interface StackDraw {
  value: number;
  stagger: number;
}

function drawStack(
  p: p5,
  x: StackDraw,
  y: StackDraw,
  stack: CardStack,
  faceUp: Set<number>
) {
  if (stack.selected) {
    p.strokeWeight(5);
    p.stroke("gold");
    p.rect(
      x.value,
      y.value,
      CARD_WIDTH,
      CARD_HEIGHT + y.stagger * (stack.cards.length - 1)
    );
  } else {
    p.strokeWeight(1);
    p.stroke("black");
  }

  if (stack.cards.length === 0) {
    drawEmptySpace(p, x.value, y.value);
  } else {
    stack.cards.forEach((card, i) => {
      drawCard(
        p,
        x.value + i * x.stagger,
        y.value + i * y.stagger,
        card,
        faceUp.has(card.key),
        CARD_WIDTH
      );
    });
  }
}

function drawEmptySpace(p: p5, x: number, y: number) {
  p.noFill();
  p.rect(x, y, CARD_WIDTH, CARD_HEIGHT);
}

const drawCompleteStacks = (
  p: p5,
  x: number,
  y: number,
  { completeStacks, faceUp }: Solitaire
) => {
  let cX = x;
  for (const [_suit, stack] of completeStacks) {
    drawStack(
      p,
      { value: cX, stagger: 0 },
      { value: y, stagger: 0 },
      stack,
      faceUp
    );
    cX += CARD_WIDTH + MARGIN;
  }
};

const drawInPlayStacks = (
  p: p5,
  x: number,
  y: number,
  { inPlayStacks, faceUp }: Solitaire
) => {
  for (const [i, stack] of inPlayStacks) {
    drawStack(
      p,
      { value: x + i * (CARD_WIDTH + MARGIN), stagger: 0 },
      { value: y, stagger: CARD_HEIGHT / 4 },
      stack,
      faceUp
    );
  }
};

const drawDeck = (
  p: p5,
  x: number,
  y: number,
  { availableCards, seenCards, faceUp }: Solitaire
) => {
  drawStack(
    p,
    { value: x, stagger: 0 },
    { value: y, stagger: 0 },
    seenCards,
    faceUp
  );
  drawStack(
    p,
    { value: x + CARD_WIDTH + MARGIN, stagger: 0 },
    { value: y, stagger: 0 },
    availableCards,
    faceUp
  );
};

const solitaireSketch = (p: p5) => {
  let solitaire: Solitaire;

  p.setup = () => {
    p.createCanvas((CARD_WIDTH + MARGIN) * 7 + MARGIN, CARD_HEIGHT * 5);

    solitaire = new Solitaire();
    solitaire.deal();
  };

  p.draw = () => {
    p.background("darkgreen");

    drawCompleteStacks(p, MARGIN, MARGIN, solitaire);
    drawInPlayStacks(p, MARGIN, IN_PLAY_STACK_Y, solitaire);
    drawDeck(p, DECK_X, MARGIN, solitaire);
  };

  p.mouseClicked = () => {
    const xIndex = Math.floor(p.mouseX / (CARD_WIDTH + MARGIN));
    const yIndex = Math.floor(p.mouseY / (CARD_HEIGHT + MARGIN));

    // Top row?
    if (yIndex === 0) {
      // Complete stacks
      switch (xIndex) {
        case 0:
        case 1:
        case 2:
        case 3:
          solitaire.clickCompletedStack(xIndex);
          break;
        case 5:
          solitaire.selectAvailableCard();
          break;
        case 6:
          solitaire.takeNextCard();
          break;
      }
    } else {
      solitaire.clickInPlayStack(xIndex);
    }
  };
};

export default solitaireSketch;
