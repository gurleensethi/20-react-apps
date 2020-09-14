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
  losesTo: number[];
}

const choices: Choice[] = [
  { id: 1, name: "rock", losesTo: [2] },
  { id: 2, name: "paper", losesTo: [3] },
  { id: 3, name: "scissors", losesTo: [1] },
];

const RockPaperScissors: FunctionComponent = () => {
  const [userChoice, setUserChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [wins, setWins] = useState<number>(0);
  const [losses, setLosses] = useState<number>(0);
  const [gameState, setGameState] = useState<string | null>(null);

  const resetComputer = () => {
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(randomChoice);
  };

  useEffect(() => {
    resetComputer();
  }, []);

  const handleUserChoice = (id: number) => {
    const choice = choices.find((choice) => choice.id === id);
    if (!choice) return alert("Something went wrong!");
    setUserChoice(choice);

    if (choice && computerChoice) {
      if (choice.id === computerChoice.id) {
        setGameState("draw");
      } else if (choice.losesTo.find((item) => item === computerChoice.id)) {
        setGameState("loss");
        setLosses((losses) => losses + 1);
      } else {
        setWins((wins) => wins + 1);
        setGameState("win");
      }
    }
  };

  const resetGameState = useCallback(() => {
    setGameState(null);
    setUserChoice(null);
    resetComputer();
  }, []);

  return (
    <div className={styles.app}>
      {gameState && (
        <div className={`${styles["game-state"]}`} onClick={resetGameState}>
          <div className={`${styles["content"]} ${styles[gameState]}`}>
            {gameState.toUpperCase()}
            <div>User: {userChoice?.name}</div>
            <div>Computer: {computerChoice?.name}</div>
          </div>
        </div>
      )}
      <div className={styles.info}>
        <h2>Rock. Paper. Scissors</h2>
        <div className={styles["wins-losses"]}>
          <div className={styles.wins}>
            <div className={styles.number}>{wins}</div>
            <div className={styles.text}>{wins === 1 ? "Win" : "Wins"}</div>
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
                key={choice.id}
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
