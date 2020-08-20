import React, { FunctionComponent, useState } from "react";
import styles from "./Pomodoro.module.css";

const Pomodoro: FunctionComponent = () => {
  const [title, setTitle] = useState("Let the countdown begin");
  const [timeLeft, setTimeLeft] = useState(1 * 60);
  const timerRef = React.useRef<number | undefined>();

  const minutes: string = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0");

  const seconds: string = (timeLeft % 60).toString().padStart(2, "0");

  const startTimer = () => {
    setInterval(() => {
      setTimeLeft((time) => {
        if (time >= 1) return time - 1;
        return time;
      });
    }, 1000);
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
        <button>Stop</button>
        <button>Reset</button>
      </div>
    </div>
  );
};

export default Pomodoro;
