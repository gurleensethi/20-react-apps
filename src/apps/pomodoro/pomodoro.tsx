import React, { FunctionComponent, useState, useRef } from "react";
import styles from "./Pomodoro.module.css";

const Pomodoro: FunctionComponent = () => {
  const [title, setTitle] = useState("Let the countdown begin");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const timerRef = useRef<NodeJS.Timeout | undefined>();

  const minutes: string = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0");

  const seconds: string = (timeLeft % 60).toString().padStart(2, "0");

  const isRunning: boolean = timerRef.current !== undefined;

  const startTimer = () => {
    if (isRunning) {
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((time) => {
        if (time >= 1) return time - 1;
        resetTimer();
        return time;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (!isRunning) {
      timerRef.current = undefined;
      return;
    }

    if (timerRef.current) {
      clearInterval(timerRef.current);
      setTitle("Keep it up");
    }
  };

  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = undefined;
      setTitle("Ready to go another round?");
      setTimeLeft(25 * 60);
    }
  };

  return (
    <div className={styles.app}>
      <h2>{title}</h2>

      <div className="timer">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>

      <div className="buttons">
        <button onClick={startTimer}>Start</button>
        <button onClick={stopTimer}>Stop</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
};

export default Pomodoro;
