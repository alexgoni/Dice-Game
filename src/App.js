import { useState } from "react";
import Button from "./Button";
import HandButton from "./HandButton";
import HandIcon from "./HandIcon";
import { compareHand, generateRandomHand } from "./utils";
import "./styles/App.css";

const INITIAL_VALUE = "rock";

function getResult(me, other) {
  const comparison = compareHand(me, other);
  if (comparison > 0) return "승리";
  if (comparison < 0) return "패배";
  return "무승부";
}

function App() {
  const [hand, setHand] = useState(INITIAL_VALUE);
  const [otherHand, setOtherHand] = useState(INITIAL_VALUE);
  const [gameHistory, setGameHistory] = useState([]);
  const [score, setScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [bet, setBet] = useState(1);
  const [result, setResult] = useState("");

  const handleButtonClick = (nextHand) => {
    const nextOtherHand = generateRandomHand();
    const nextHistoryItem = getResult(nextHand, nextOtherHand);
    const comparison = compareHand(nextHand, nextOtherHand);
    setResult(nextHistoryItem);
    setHand(nextHand);
    setOtherHand(nextOtherHand);
    setGameHistory([...gameHistory, nextHistoryItem]);
    if (comparison > 0) setScore(score + bet);
    if (comparison < 0) setComputerScore(computerScore + bet);
  };

  const handleClearClick = () => {
    setHand(INITIAL_VALUE);
    setOtherHand(INITIAL_VALUE);
    setGameHistory([]);
    setScore(0);
    setComputerScore(0);
    setBet(1);
  };

  const handleBetChange = (e) => {
    let num = Number(e.target.value);
    if (num > 9) num %= 10;
    if (num < 1) num = 1;
    num = Math.floor(num);
    setBet(num);
  };

  return (
    <div className="container">
      <div className="header">
        <h1 className="header__title">가위바위보</h1>
        <Button onClick={handleClearClick} className="header__reset-icon" />
      </div>

      <div className="score-board">
        <div className="score-board__score">
          <span>{score}</span>
          <span>나</span>
        </div>
        :
        <div className="score-board__score">
          <span>{computerScore}</span>
          <span>상대</span>
        </div>
      </div>

      <div className="result">
        <div className="result__icons">
          <div
            className={`result__icon ${
              result === "승리" && "result__icons-win"
            }`}
          >
            <HandIcon value={hand} />
          </div>
          VS
          <div
            className={`result__icon ${
              result === "패배" && "result__icons-win"
            }`}
          >
            <HandIcon value={otherHand} />
          </div>
        </div>

        <div className="result__bet-input">
          <span>배점</span>
          <input
            type="number"
            value={bet}
            min={1}
            max={9}
            onChange={handleBetChange}
          ></input>
        </div>
        <div className="result__history">
          <h1>승부 기록</h1>
          <p>{gameHistory.join(", ")}</p>
        </div>
      </div>

      <div className="buttons">
        <HandButton value="rock" onClick={handleButtonClick} />
        <HandButton value="scissor" onClick={handleButtonClick} />
        <HandButton value="paper" onClick={handleButtonClick} />
      </div>
    </div>
  );
}

export default App;
