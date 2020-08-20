import React, { FunctionComponent, useState, useRef } from "react";
import styles from "./Pomodoro.module.css";

const Pomodoro: FunctionComponent = () => {
  const [title, setTitle] = useState("Let the countdown begin");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | undefined>();

  const minutes: string = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0");

  const seconds: string = (timeLeft % 60).toString().padStart(2, "0");

  const startTimer = () => {
    if (isRunning) {
      return;
    }

    setRunning(true);

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
      return;
    }

    setRunning(false);

    if (timerRef.current) {
      clearInterval(timerRef.current);
      setTitle("Keep it up");
    }
  };

  const resetTimer = () => {
    if (timerRef.current) {
      setRunning(false);
      clearInterval(timerRef.current);
      setTitle("Ready to go another round?");
      setTimeLeft(25 * 60);
    }
  };

  return (
    <div className={styles.app}>
      <h2>{title}</h2>

      <div className={`my-5 ${styles.timer}`}>
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>

      <div className={`${styles.buttons}`}>
        <button className={`btn btn-success mr-2`} onClick={startTimer}>
          Start
        </button>
        <button className={`btn btn-warning mr-2`} onClick={stopTimer}>
          Stop
        </button>
        <button className={`btn btn-secondary`} onClick={resetTimer}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Pomodoro;
