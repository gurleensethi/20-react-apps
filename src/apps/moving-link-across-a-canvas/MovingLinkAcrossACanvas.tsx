import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import styles from "./MovingLinkAcrossACanvas.module.css";

const SPEED = 100;
const BOX_SIZE = 100;

enum MoveType {
  Up = "Up",
  Down = "Down",
  Left = "Left",
  Right = "Right",
}

const MovingLinkAcrossACanvas: FunctionComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);

  console.log(x, y);

  useEffect(() => {
    const context = canvasRef.current?.getContext("2d");

    if (context) {
      context.canvas.height = window.innerHeight;
      context.canvas.width = window.innerWidth;

      context.fillRect(0, 0, BOX_SIZE, BOX_SIZE);
    }
  }, []);

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      const { keyCode } = e;

      switch (keyCode) {
        case 37:
          handleMove(MoveType.Left);
          break;
        case 39:
          handleMove(MoveType.Right);
          break;
        case 38:
          handleMove(MoveType.Up);
          break;
        case 40:
          handleMove(MoveType.Down);
          break;
      }
    };

    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, []);

  useEffect(() => {
    const context = canvasRef.current?.getContext("2d");

    if (context) {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      context.fillRect(x, y, BOX_SIZE, BOX_SIZE);
    }
  }, [x, y]);

  const handleMove = (moveType: MoveType) => {
    switch (moveType) {
      case MoveType.Up:
        setY((y) => Math.max(0, y - SPEED));
        break;
      case MoveType.Down:
        setY((y) => Math.min(y + SPEED, window.innerHeight - BOX_SIZE));
        break;
      case MoveType.Left:
        setX((x) => Math.max(0, x - SPEED));
        break;
      case MoveType.Right:
        setX((x) => Math.min(x + SPEED, window.innerWidth - BOX_SIZE));
        break;
    }
  };

  return (
    <div className={styles.app}>
      <canvas ref={canvasRef} />

      <div className={styles.arrows}>
        <button onClick={() => handleMove(MoveType.Up)}>Up</button>
        <button onClick={() => handleMove(MoveType.Left)}>Left</button>
        <button onClick={() => handleMove(MoveType.Down)}>Down</button>
        <button onClick={() => handleMove(MoveType.Right)}>Right</button>
      </div>
    </div>
  );
};

export default MovingLinkAcrossACanvas;
