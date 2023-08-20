import p5 from "p5";
import { drawCard, getCardHeight } from "../cards/cards.p5";
import Solitaire from "./Solitaire";
import { CardStack } from "./CardStack";
import { Dimensions } from "../dimensions";

interface GameDimensions {
  canvas: Dimensions;
  card: Dimensions;
  margin: number;
  inPlayStackY: number;
  deckX: number;
}

interface StackDraw {
  value: number;
  stagger: number;
}

function drawStack(
  p: p5,
  dim: GameDimensions,
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
      dim.card.width,
      dim.card.height + y.stagger * (stack.cards.length - 1)
    );
  } else {
    p.strokeWeight(1);
    p.stroke("black");
  }

  if (stack.cards.length === 0) {
    drawEmptySpace(p, dim, x.value, y.value);
  } else {
    stack.cards.forEach((card, i) => {
      drawCard(
        p,
        x.value + i * x.stagger,
        y.value + i * y.stagger,
        card,
        faceUp.has(card.key),
        dim.card
      );
    });
  }
}

function drawEmptySpace(p: p5, dim: GameDimensions, x: number, y: number) {
  p.noFill();
  p.rect(x, y, dim.card.width, dim.card.height);
}

const drawCompleteStacks = (
  p: p5,
  dim: GameDimensions,
  x: number,
  y: number,
  { completeStacks, faceUp }: Solitaire
) => {
  let cX = x;
  for (const [_suit, stack] of completeStacks) {
    drawStack(
      p,
      dim,
      { value: cX, stagger: 0 },
      { value: y, stagger: 0 },
      stack,
      faceUp
    );
    cX += dim.card.width + dim.margin;
  }
};

const drawInPlayStacks = (
  p: p5,
  dim: GameDimensions,
  x: number,
  y: number,
  { inPlayStacks, faceUp }: Solitaire
) => {
  for (const [i, stack] of inPlayStacks) {
    drawStack(
      p,
      dim,
      { value: x + i * (dim.card.width + dim.margin), stagger: 0 },
      { value: y, stagger: 2 * dim.margin },
      stack,
      faceUp
    );
  }
};

const drawDeck = (
  p: p5,
  dim: GameDimensions,
  x: number,
  y: number,
  { availableCards, seenCards, faceUp }: Solitaire
) => {
  drawStack(
    p,
    dim,
    { value: x, stagger: 0 },
    { value: y, stagger: 0 },
    seenCards,
    faceUp
  );
  drawStack(
    p,
    dim,
    { value: x + dim.card.width + dim.margin, stagger: 0 },
    { value: y, stagger: 0 },
    availableCards,
    faceUp
  );
};

/**
 * 7 cards across
 * 8 margins
 * cards should be 6 * margin wide
 * 8m + 7*6m
 * 8m + 52m = 60m across
 *
 * cardHeight = 2.5 / 1.5 * cardWidth = 10m
 *
 * longest stack = 6 hidden cards + 13 visible cards
 * = (6 + 13) * 2 * margin + 1 card
 * = 38m + 10m
 * = 48m for longest stack
 * + 1 card + 2 margins = 10m + 2m = 12m
 * 48 + 12m = 60m; It's a square!
 *
 * @returns
 */

function getGameDimensions(): GameDimensions {
  const canvas = {
    width: window.screen.width,
    height: window.screen.width,
  };
  const margin = canvas.width / 60;
  const card: Dimensions = {
    width: margin * 6,
    height: getCardHeight(margin * 6),
  };

  return {
    canvas,
    card,
    margin,
    inPlayStackY: 2 * margin + card.height,
    deckX: 5 * card.width + 6 * margin,
  };
}

const solitaireSketch = (p: p5) => {
  let solitaire: Solitaire;
  let dim: GameDimensions;

  p.setup = () => {
    dim = getGameDimensions();
    p.createCanvas(dim.canvas.width, dim.canvas.height);

    solitaire = new Solitaire();
    solitaire.deal();
  };

  p.draw = () => {
    p.background("darkgreen");

    drawCompleteStacks(p, dim, dim.margin, dim.margin, solitaire);
    drawInPlayStacks(p, dim, dim.margin, dim.inPlayStackY, solitaire);
    drawDeck(p, dim, dim.deckX, dim.margin, solitaire);
  };

  p.mouseClicked = () => {
    const xIndex = Math.floor(p.mouseX / (dim.card.width + dim.margin));
    const yIndex = Math.floor(p.mouseY / (dim.card.height + dim.margin));

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
