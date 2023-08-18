import React from "react";
import p5 from "p5";
import solitaireSketch from "./solitaire/solitaire.p5";

const App: React.FC = () => {
  const sketchInUse = React.useRef<p5>();
  const refContainer = React.useRef(null);

  React.useEffect(() => {
    if (!!refContainer) {
      sketchInUse.current = new p5(
        solitaireSketch,
        refContainer.current as unknown as HTMLElement
      );
    }

    return () => {
      if (!!sketchInUse.current) {
        sketchInUse.current.remove();
      }
    };
  }, []);

  return <div ref={refContainer} />;
};

export default App;
