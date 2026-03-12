import { useTypingContext } from "@/contexts/useTypingContext";
import Button from "@/ui/Button";
import CompletedIcon from "@assets/images/icon-completed.svg";
import RestartIcon from "@assets/images/icon-restart.svg";
import StatsPanel from "./StatsPanel";
import { useEffect, useRef } from "react";

const TypingTest = () => {
  const {
    currentPassage,
    userInput,
    typingStatus,
    handleUserInputChange,
    updateTypingStatus,
    restartTypingTest,
  } = useTypingContext();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typingStatus === "typing" && inputRef.current && !userInput) {
      inputRef.current.focus();
    }
  }, [typingStatus, userInput]);

  const hightlightedPassage = () => {
    return currentPassage.split("").map((char, index) => {
      let className = "typing-char ";
      const userInputChar = userInput[index];
      if (index < userInput.length) {
        className =
          char === userInputChar ? className + "correct" : className + "wrong";
      }
      if (index === userInput.length) {
        className = className + "current";
      }
      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  const renderTypingArea = () => {
    switch (typingStatus) {
      case "idle":
        return (
          <div className="typing-overlay">
            <Button
              placeholder="Start Typing Test"
              className="overlay-btn"
              onClick={() => updateTypingStatus("typing")}
            />
            <p className="overlay-text">Or click the text and start typing</p>
          </div>
        );
      case "typing":
        return (
          <>
            <input
              ref={inputRef}
              className="typing-user-input"
              type="text"
              value={userInput}
              onChange={(e) => handleUserInputChange(e.target.value)}
              autoFocus
            />
            <div className="typing-footer">
              <Button
                placeholder="Restart Test"
                className="restart-btn black"
                type="custom"
                onClick={() => {
                  restartTypingTest("typing");
                }}
              >
                <p>Restart Test</p>
                <img
                  className="restart-icon white"
                  src={RestartIcon}
                  alt="restart-icon"
                />
              </Button>
            </div>
          </>
        );
      case "completed":
        return (
          <div className="typing-overlay">
            <img
              className="completed-icon"
              src={CompletedIcon}
              alt="typing-test-completed-icon"
            />
            {/* If this is the first time score is set */}
            <h1 className="heading-one">Baseline Established!</h1>
            <p className="description">
              You've set the bar. Now the real challenge begins-time to beat it.
            </p>
            <div className="typing-stats">
              <StatsPanel />
            </div>
            <Button
              placeholder="Beat This Score"
              className="restart-btn"
              type="custom"
              onClick={() => restartTypingTest("idle")}
            >
              <p>Beat This Score</p>
              <img
                className="restart-icon black"
                src={RestartIcon}
                alt="restart-icon"
              />
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="typing-area">
      <div className="typing-test">{hightlightedPassage()}</div>
      {renderTypingArea()}
    </div>
  );
};

export default TypingTest;
