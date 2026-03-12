import { RESULTS } from "@/data/typing";
import { Difficulty } from "@/types/typing";
import TypingPassages from "@data/typing-passages.json";

export const randomizeNumber = (limit: number) => {
  return Math.floor(Math.random() * limit);
};

export const getCurrentPassage = (difficulty: Difficulty) => {
  const passages = TypingPassages[difficulty];
  const totalPassages = passages.length;
  return passages[randomizeNumber(totalPassages)].text;
};

export const getMistakesCount = (input: string, passage: string) => {
  let mistakeCount = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] !== passage[i]) {
      mistakeCount++;
    }
  }
  return mistakeCount;
};

export const calculateWpm = (input: string, startTime: number | null) => {
  console.log("startTime: ", startTime);
  if (!startTime) return 0; // Handle null or invalid startTime

  const timeInMinutes = (Date.now() - startTime) / 60000;
  if (timeInMinutes <= 0) return 0;

  const charactersTyped = input.length;
  const words = charactersTyped / 5;

  return Math.round(words / timeInMinutes);
};

export const calculateAccuracy = (
  totalTypedCharacters: number,
  correctCharacters: number,
) => {
  const accuracy = (correctCharacters / totalTypedCharacters) * 100;
  return Math.round(accuracy);
};

export const getResultsData = (resultsKey: string) => {
  return RESULTS[resultsKey as keyof typeof RESULTS] || RESULTS["default"];
};
