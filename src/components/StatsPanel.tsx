import { useTypingContext } from "@/contexts/useTypingContext";
import StatDisplay from "../ui/StatDisplay";
import { StatDisplayTypes } from "@/types/ui";

const StatsPanel = ({ type }: { type?: StatDisplayTypes }) => {
  const {
    wpm,
    accuracy,
    countdownTimer,
    mode,
    userInput,
    typingStatus,
    mistakes,
  } = useTypingContext();
  return (
    <div className={`stat-panel ${type}`}>
      <StatDisplay name="WPM" value={wpm} type={type} />
      <StatDisplay
        name="Accuracy"
        value={
          <span
            className={
              typingStatus === "idle"
                ? ""
                : accuracy < 100
                  ? "wrong"
                  : "correct"
            }
          >
            {accuracy || 0}%
          </span>
        }
        type={type}
      />
      {mode.value === "timed" && (
        <StatDisplay
          name="Time"
          value={`0:${countdownTimer < 10 ? `0${countdownTimer}` : countdownTimer}`}
          type={type}
        />
      )}
      {typingStatus === "completed" && (
        <StatDisplay
          name="Characters"
          value={
            <>
              <span className="correct">{userInput.length - mistakes}</span>
              <span className="neutral">/</span>
              <span className="wrong">{mistakes}</span>
            </>
          }
          type={type}
        />
      )}
    </div>
  );
};

export default StatsPanel;
