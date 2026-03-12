import { useTypingContext } from "@/contexts/useTypingContext";
import { DIFFICULTY, MODE } from "@/data/typing";
import TypingTest from "@/components/TypingTest";
import Dropdown from "@/ui/Dropdown";
import RadioSelect from "@/ui/RadioSelect";
import StatDisplay from "@/ui/StatDisplay";
import StatsPanel from "@components/StatsPanel";
import Button from "@/ui/Button";
import { getResultsData } from "@/utils/randomizeNumber";

import RestartIcon from "@assets/images/icon-restart.svg";
import PatternStarOne from "@assets/images/pattern-star-1.svg";
import PatternStarTwo from "@assets/images/pattern-star-2.svg";

const Body = () => {
  const {
    difficulty,
    mode,
    typingStatus,
    resultsKey,
    handleDifficultyChange,
    handleModeChange,
    restartTypingTest,
  } = useTypingContext();

  const { heading, description, buttonText, icon, pattern } =
    getResultsData(resultsKey);

  switch (typingStatus) {
    case "completed":
      return (
        <div className="completed-layout">
          {resultsKey === "personal-best" && (
            <img
              className="pattern-confetti"
              src={pattern}
              alt="typing-test-pattern-confetti"
            />
          )}
          <div className="completed-layout-body">
            {resultsKey !== "personal-best" && (
              <>
                <img
                  className="pattern-star one"
                  src={PatternStarOne}
                  alt="typing-test-pattern-star-one"
                  width={30}
                />
                <img
                  className="pattern-star two"
                  src={PatternStarTwo}
                  alt="typing-test-pattern-star-two"
                  width={20}
                />
              </>
            )}
            <div className="completed-layout-header">
              <div className="completed-icon">
                <img src={icon} alt="typing-test-completed-icon" />
                {resultsKey !== "personal-best" && (
                  <>
                    <div className="completed-icon-ping-ring one" />
                    <div className="completed-icon-ping-ring two" />
                  </>
                )}
              </div>
              <div className="completed-layout-content">
                <h1 className="completed-layout-heading">{heading}</h1>
                <p className="completed-layout-description">{description}</p>
              </div>
            </div>
            <StatsPanel type="card" />
            <Button
              placeholder={buttonText}
              className="restart-btn"
              type="custom"
              onClick={() => restartTypingTest("idle")}
            >
              <p>{buttonText}</p>
              <img
                className="restart-icon black"
                src={RestartIcon}
                alt="restart-icon"
              />
            </Button>
          </div>
        </div>
      );
    default:
      return (
        <div className="app-layout">
          <div className="stats-container">
            <div className="stats-container-left">
              <StatsPanel />
            </div>
            <div className="stats-container-right flex lg:hidden">
              <Dropdown
                placeholder={difficulty.label}
                selectedValue={difficulty.value}
                options={DIFFICULTY}
                className="flex lg:hidden"
                onChange={handleDifficultyChange}
              />
              <Dropdown
                placeholder={mode.label}
                selectedValue={mode.value}
                options={MODE}
                className="flex lg:hidden"
                onChange={handleModeChange}
              />
            </div>
            <div className="stats-container-right hidden lg:flex">
              <StatDisplay name="Difficulty" type="radio-select">
                <RadioSelect
                  options={DIFFICULTY[0].options}
                  selectedValue={difficulty.value}
                  onChange={handleDifficultyChange}
                />
              </StatDisplay>
              <StatDisplay name="Mode" type="radio-select">
                <RadioSelect
                  options={MODE[0].options}
                  selectedValue={mode.value}
                  onChange={handleModeChange}
                />
              </StatDisplay>
            </div>
          </div>
          <TypingTest />
        </div>
      );
  }
};

export default Body;
