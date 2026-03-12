export type ResultsKey = "first-time" | "personal-best" | "default" | "";

export type DifficultyLabel = "Easy" | "Medium" | "Hard";
export type DifficultyValue = "easy" | "medium" | "hard";
export type DifficultyOption = {
  label: DifficultyLabel;
  value: DifficultyValue;
  groupKey: string | "";
};

export type ModeLabel = "Timed(60s)" | "Passage";
export type ModeValue = "timed" | "passage";
export type ModeOption = {
  label: ModeLabel;
  value: ModeValue;
  groupKey: string | "";
};

export type Difficulty = "easy" | "medium" | "hard";
export type Mode = "timed" | "passage";
export type TypingStatus = "idle" | "typing" | "completed";
export type RestartTypingStatus = "idle" | "typing";

export type TypingContextType = {
  difficulty: DifficultyOption;
  mode: ModeOption;
  personalBest: number;
  wpm: number;
  accuracy: number;
  countdownTimer: number;
  typingStatus: TypingStatus;
  userInput: string;
  currentPassage: string;
  resultsKey: ResultsKey;
  mistakes: number;

  handleDifficultyChange: (newDifficulty: DifficultyOption) => void;
  handleModeChange: (newMode: ModeOption) => void;
  handleUserInputChange: (input: string) => void;
  updateTypingStatus: (status: TypingStatus) => void;
  restartTypingTest: (status?: RestartTypingStatus) => void;

  setDifficulty?: React.Dispatch<React.SetStateAction<DifficultyOption>>;
  setMode?: React.Dispatch<React.SetStateAction<ModeOption>>;
  setPersonalBest?: React.Dispatch<React.SetStateAction<number>>;
  setWpm?: React.Dispatch<React.SetStateAction<number>>;
  setAccuracy?: React.Dispatch<React.SetStateAction<number>>;
  setTypingStatus?: React.Dispatch<React.SetStateAction<TypingStatus>>;
};

export interface TypingContextProviderProps {
  children: React.ReactNode;
}
