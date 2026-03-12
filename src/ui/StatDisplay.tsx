import type { StatDisplayProps } from "../types/ui";
import PersonalBest from "@assets/images/icon-personal-best.svg";

const StatDisplay = ({ name, value, type, children }: StatDisplayProps) => {
  const isPersonalBestScoreStat = type === "best-score";
  return (
    <div
      className={`stat-display ${isPersonalBestScoreStat ? "personal-best" : type}`}
    >
      {isPersonalBestScoreStat && <img src={PersonalBest} />}
      <p className="stat-name">{name}:</p>
      {type === "radio-select" ? (
        <div className="stat-radio-select">{children}</div>
      ) : (
        <h3 className="stat-value">{value}</h3>
      )}
    </div>
  );
};

export default StatDisplay;
