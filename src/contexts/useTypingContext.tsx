/* eslint-disable react-refresh/only-export-components */
import {
  DifficultyOption,
  ModeOption,
  RestartTypingStatus,
  ResultsKey,
  TypingContextProviderProps,
  TypingContextType,
  TypingStatus,
} from "@/types/typing";
import {
  calculateAccuracy,
  calculateWpm,
  getCurrentPassage,
  getMistakesCount,
} from "@/utils/randomizeNumber";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const TypingContext = createContext<TypingContextType | undefined>(undefined);

const useTypingContext = () => {
  const context = useContext(TypingContext);

  if (!context) {
    throw new Error(
      "useTypingContext must be used within TypingContextProvider.",
    );
  }

  return context;
};

const TypingContextProvider = ({ children }: TypingContextProviderProps) => {
  const [difficulty, setDifficulty] = useState<DifficultyOption>({
    label: "Hard",
    value: "hard",
    groupKey: "",
  });
  const [mode, setMode] = useState<ModeOption>({
    label: "Passage",
    value: "passage",
    groupKey: "",
  });
  const [personalBest, setPersonalBest] = useState<number>(0);
  const [wpm, setWpm] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(100);
  const [countdownTimer, setCountdownTimer] = useState<number>(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [typingStatus, setTypingStatus] = useState<TypingStatus>("idle");
  const [userInput, setUserInput] = useState<string>("");
  const [currentPassage, setCurrentPassage] = useState<string>(
    getCurrentPassage(difficulty.value),
  );
  const [resultsKey, setResultsKey] = useState<ResultsKey>("");
  const [mistakes, setMistakes] = useState<number>(0);

  const restartTypingTest = (status?: RestartTypingStatus) => {
    setUserInput("");
    setTypingStatus(status || "idle");
    setWpm(0);
    setAccuracy(100);
    setCurrentPassage(getCurrentPassage(difficulty.value));
    setCountdownTimer(0);
    setStartTime(Date.now());
    setResultsKey("default");
    setMistakes(0);
  };

  const handleDifficultyChange = (newDifficulty: DifficultyOption) => {
    setDifficulty(newDifficulty);
    setCurrentPassage(getCurrentPassage(newDifficulty.value));
  };

  const handleModeChange = (newMode: ModeOption) => {
    setMode(newMode);
  };

  const handleUserInputChange = (input: string) => {
    if (input.length >= currentPassage.length) {
      updateTypingStatus("completed");
      return;
    }
    setUserInput(input);
    setWpm(calculateWpm(userInput, startTime));

    const mistakesCount = getMistakesCount(input, currentPassage);
    setMistakes(mistakesCount);
    const correctCharacters = input.length - mistakesCount;
    setAccuracy(calculateAccuracy(input.length, correctCharacters));
  };

  const updateTypingStatus = useCallback(
    (status: TypingStatus) => {
      if (status === "completed") {
        if (personalBest === 0 && !resultsKey) {
          setPersonalBest(wpm);
          setResultsKey("first-time");
        } else if (wpm > 0 && wpm <= personalBest) {
          setResultsKey("default");
        } else {
          setPersonalBest(wpm);
          setResultsKey("personal-best");
        }
      }
      if (status === "typing" && !startTime) {
        setStartTime(Date.now());
      }

      setTypingStatus(status);
    },
    [wpm, personalBest, startTime, resultsKey],
  );

  useEffect(() => {
    if (typingStatus === "typing" && mode.value === "timed") {
      const timer = setInterval(() => {
        setCountdownTimer((prev) => {
          if (prev === 59) {
            updateTypingStatus("completed");
            return 60;
          }
          return prev + 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [countdownTimer, typingStatus, mode, updateTypingStatus]);

  const value = {
    difficulty,
    mode,
    personalBest,
    wpm,
    accuracy,
    countdownTimer,
    typingStatus,
    userInput,
    currentPassage,
    resultsKey,
    mistakes,

    handleDifficultyChange,
    handleModeChange,
    handleUserInputChange,
    updateTypingStatus,
    restartTypingTest,

    setDifficulty,
    setMode,
    setPersonalBest,
    setWpm,
    setAccuracy,
    setTypingStatus,
  };
  return (
    <TypingContext.Provider value={value}>{children}</TypingContext.Provider>
  );
};

export { useTypingContext, TypingContextProvider };
