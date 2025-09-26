import { likertScale } from "../../data/mbti.js";

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

const BUBBLE_SCALES = [1.25, 1.05, 0.85, 1.05, 1.25];

export function renderAnswerCards({ container, questionId, selectedValue, onSelect }) {
  if (!container) return;
  container.innerHTML = "";
  container.classList.add("likert-scale");
  container.setAttribute("data-question", questionId);

  const orderedScale = [...likertScale].sort((a, b) => b.value - a.value);

  orderedScale.forEach((option, index) => {
    const label = document.createElement("label");
    label.className = "likert-option";
    label.style.setProperty("--bubble-scale", BUBBLE_SCALES[index] ?? 1);
    label.dataset.value = option.value.toString();
    label.title = option.label;

    const input = document.createElement("input");
    input.type = "radio";
    input.name = `answer-${questionId}`;
    input.value = option.value.toString();
    input.className = "likert-option__input";
    input.checked = selectedValue === option.value;
    input.setAttribute("aria-label", option.label);

    const bubble = document.createElement("span");
    bubble.className = "likert-option__bubble";
    bubble.setAttribute("aria-hidden", "true");

    const srLabel = document.createElement("span");
    srLabel.className = "likert-option__text sr-only";
    srLabel.textContent = option.label;

    input.addEventListener("change", () => {
      onSelect(option.value);
    });

    input.addEventListener("focus", () => {
      label.classList.add("is-focused");
    });

    input.addEventListener("blur", () => {
      label.classList.remove("is-focused");
    });

    if (input.checked) {
      label.classList.add("is-active");
    }

    label.append(input, bubble, srLabel);
    container.appendChild(label);
  });
}
