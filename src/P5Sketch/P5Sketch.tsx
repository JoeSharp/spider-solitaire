import React from "react";
import p5 from "p5";

export type Sketch = (p: p5) => void;

interface Props {
  sketch: Sketch;
}

/**
 * Generic form of P5 Sketch container for react.
 *
 * @param Props containing the sketch definition
 * @returns the component
 */
const P5SketchComponent: React.FC<Props> = ({ sketch }) => {
  const sketchInUse = React.useRef<p5>();
  const refContainer = React.useRef(null);

  React.useEffect(() => {
    if (!!refContainer) {
      sketchInUse.current = new p5(
        sketch,
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

export default P5SketchComponent;
