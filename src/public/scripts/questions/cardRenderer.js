import { likertScale } from "../../../data/mbti.js";

const CARD_SYMBOLS = ["❄️", "🍀", "📜", "🔥", "🌈"];

const DIMENSION_GUIDES = {
  EI: {
    emoji: "🐧",
    title: "탐험가 펭귄",
    motto: "에너지 파동 측정 중!"
  },
  SN: {
    emoji: "🦊",
    title: "발명가 여우",
    motto: "상상 레이더 가동!"
  },
  TF: {
    emoji: "🦉",
    title: "감정 분석가 올빼미",
    motto: "균형을 맞추는 중!"
  },
  JP: {
    emoji: "🦔",
    title: "일정 큐레이터 고슴도치",
    motto: "시간표를 정리 중!"
  }
};

const DIMENSION_BACKDROPS = {
  EI: "radial-gradient(circle at 20% 20%, rgba(185, 231, 255, 0.6), transparent 70%)",
  SN: "radial-gradient(circle at 80% 30%, rgba(255, 204, 229, 0.6), transparent 70%)",
  TF: "radial-gradient(circle at 50% 50%, rgba(208, 189, 220, 0.55), transparent 75%)",
  JP: "radial-gradient(circle at 30% 70%, rgba(255, 238, 204, 0.6), transparent 75%)"
};

export function getDimensionGuide(dimension) {
  return DIMENSION_GUIDES[dimension] ?? {
    emoji: "🌟",
    title: "미지의 안내자",
    motto: "새로운 카드를 채우는 중!"
  };
}

export function getBackdropStyle(dimension) {
  return DIMENSION_BACKDROPS[dimension] ?? "radial-gradient(circle, rgba(200, 200, 200, 0.45), transparent 70%)";
}

export function renderAnswerCards(container, selectedValue, onSelect) {
  if (!container) return;
  container.innerHTML = "";
  likertScale.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "card-option";
    if (selectedValue === option.value) {
      button.classList.add("selected");
    }
    button.setAttribute("aria-pressed", selectedValue === option.value ? "true" : "false");

    const inner = document.createElement("span");
    inner.className = "card-option__inner";

    const front = document.createElement("span");
    front.className = "card-option__front";
    front.textContent = CARD_SYMBOLS[index] ?? "★";

    const back = document.createElement("span");
    back.className = "card-option__back";
    back.textContent = option.label;

    inner.append(front, back);
    button.append(inner);
    button.dataset.value = option.value;

    button.addEventListener("click", () => {
      onSelect(option.value);
    });

    container.appendChild(button);
  });
}
