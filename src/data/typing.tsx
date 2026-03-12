import CompletedIcon from "@assets/images/icon-completed.svg";
import NewPersonalBestIcon from "@assets/images/icon-new-pb.svg";
import PatternConfetti from "@assets/images/pattern-confetti.svg";

export const DIFFICULTY = [
  {
    title: "",
    groupKey: "",
    type: "radio-select",
    options: [
      { label: "Easy", value: "easy" },
      { label: "Medium", value: "medium" },
      { label: "Hard", value: "hard" },
    ],
  },
];

export const MODE = [
  {
    title: "",
    groupKey: "",
    type: "radio-select",
    options: [
      { label: "Timed(60s)", value: "timed" },
      { label: "Passage", value: "passage" },
    ],
  },
];

export const RESULTS = {
  "first-time": {
    heading: "Baseline Established!",
    description:
      "You've set the bar. Now the real challenge begins-time to beat it.",
    buttonText: "Beat This Score",
    icon: CompletedIcon,
    pattern: null,
  },
  default: {
    heading: "Test Completed!",
    description: "Solid run. Keep pushing to beat your hight score.",
    buttonText: "Go again",
    icon: CompletedIcon,
    pattern: null,
  },
  "personal-best": {
    heading: "High Score Smashed!",
    description: "You're getting faster. That was incredible typing.",
    buttonText: "Go again",
    icon: NewPersonalBestIcon,
    pattern: PatternConfetti,
  },
};
