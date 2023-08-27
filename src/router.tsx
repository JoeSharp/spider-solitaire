import { createBrowserRouter } from "react-router-dom";
import GameMenu from "./GameMenu/index.ts";
import P5SketchComponent from "./P5Sketch";
import solitaireSketch from "./solitaire/solitaire.p5";
import TypingWars from "./TypingWars/TypingWars.tsx";

export const BASE_PATH = "/spider-solitaire";

const router = createBrowserRouter([
  {
    path: BASE_PATH,
    element: <GameMenu />,
  },
  {
    path: `${BASE_PATH}/solitaire`,
    element: <P5SketchComponent sketch={solitaireSketch} />,
  },
  {
    path: `${BASE_PATH}/typing-wars`,
    element: <TypingWars />,
  },
]);

export default router;
