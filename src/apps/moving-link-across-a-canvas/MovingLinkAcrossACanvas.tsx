import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import styles from "./MovingLinkAcrossACanvas.module.css";

const MovingLinkAcrossACanvas: FunctionComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);

  useEffect(() => {
    const context = canvasRef.current?.getContext("2d");

    if (context) {
      context.canvas.height = window.innerHeight;
      context.canvas.width = window.innerWidth;

      context.fillRect(x, y, 100, 100);
    }
  }, []);

  return (
    <div className={styles.app}>
      <canvas ref={canvasRef} />

      <div className={styles.arrows}>
        <button onClick={() => setY((y) => y + 20)}>Up</button>
        <button onClick={() => setX((x) => x - 20)}>Left</button>
        <button onClick={() => setY((y) => y + 20)}>Down</button>
        <button onClick={() => setX((x) => x + 20)}>Right</button>
      </div>
    </div>
  );
};

export default MovingLinkAcrossACanvas;
