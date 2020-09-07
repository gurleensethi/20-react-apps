import React, {
  FunctionComponent,
  useCallback,
  useState,
  useEffect,
} from "react";
import styles from "./RockPaperScissors.module.css";

interface Choice {
  id: number;
  name: string;
}

const choices: Choice[] = [
  { id: 1, name: "rock" },
  { id: 2, name: "paper" },
  { id: 3, name: "scissors" },
];

const RockPaperScissors: FunctionComponent = () => {
  const [userChoice, setUserChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [wins, setWins] = useState<number>(0);
  const [losses, setLosses] = useState<number>(0);

  useEffect(() => {
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(randomChoice);
  }, []);

  const handleUserChoice = useCallback((id: number) => {
    const choice = choices.find((choice) => choice.id === id);

    if (!choice) return alert("Something went wrong!");

    setUserChoice(choice);
  }, []);

  return (
    <div className={styles.app}>
      <div className={styles.info}>
        <h2>Rock. Paper. Scissors</h2>
        <div className={styles["wins-losses"]}>
          <div className={styles.wins}>
            <div className={styles.number}>{wins}</div>
            <div className={styles.text}>Wins</div>
          </div>
          <div className={styles.losses}>
            <div className={styles.number}>{losses}</div>
            <div className={styles.text}>Loss</div>
          </div>
        </div>
      </div>
      <div className={styles.choices}>
        <div className={styles.player}>
          <div className={styles.title}>You</div>
          <div className={styles.options}>
            {choices.map((choice) => (
              <button
                className={`${styles.option} ${styles[choice.name]}`}
                onClick={() => handleUserChoice(choice.id)}
              >
                {choice.name}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.player}>
          <div className={styles.title}>Computer</div>
          <div className={styles.options}>
            <button className={styles.option}>?</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RockPaperScissors;
