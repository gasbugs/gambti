import { questions, resultSummaries, likertScale } from "../data/mbti.js";
import {
  getState,
  setCurrentQuestion,
  recordAnswer,
  setResult,
  resetAnswers
} from "./state.js";
import { calculateMbti, isComplete, questionCount } from "./scoring.js";
import { setupGame } from "./game.js";
import { initPreferences } from "./preferences.js";
import { renderAnswerCards, getDimensionGuide, getBackdropStyle } from "./questions/cardRenderer.js";
import { createMiniEventManager } from "./questions/miniEvents.js";

const root = document.body;
const scenes = Array.from(document.querySelectorAll("[data-scene]"));
const navChips = Array.from(document.querySelectorAll(".nav-chip"));
const startButton = document.querySelector("#start-button");
const prevButton = document.querySelector("#prev-question");
const nextButton = document.querySelector("#next-question");
const retryButton = document.querySelector("#retry-test");
const goToGameButton = document.querySelector("#go-to-game");
const shareButton = document.querySelector("#share-result");
const openPackButton = document.querySelector("#open-pack");
const bonusCard = document.querySelector("#bonus-card");

const questionText = document.querySelector("#question-text");
const questionBackdrop = document.querySelector("#question-backdrop");
const questionImage = document.querySelector("#question-image");
const questionCaption = document.querySelector("#question-image-caption");
const answerFan = document.querySelector("#answer-fan");
const mascotDisplay = document.querySelector("#journey-mascot");
const progressLabel = document.querySelector("#journey-progress-label");
const trackContainer = document.querySelector("#journey-track");
const miniEventContainer = document.querySelector("#mini-event");
const resultCard = document.querySelector("#result-card");

const journeyScene = document.querySelector('[data-scene="journey"]');
const headerEl = document.querySelector('.desk-header');
const selectionFeedback = document.querySelector("#answer-selection");

const animationToggle = document.querySelector("#toggle-animations");
const soundToggle = document.querySelector("#toggle-sounds");

const gameMessage = document.querySelector("#game-message");
const gameScore = document.querySelector("#game-score");
const gameHighScore = document.querySelector("#game-high-score");
const gameBoard = document.querySelector("#game-board");
const stopGameButton = document.querySelector("#stop-game");
const difficultyButtons = Array.from(document.querySelectorAll(".game-control-panel button"));

const preferences = initPreferences({
  animationToggle,
  soundToggle,
  root
});

const soundKit = createSoundKit(() => preferences.shouldPlaySounds());
const miniEventManager = createMiniEventManager({
  container: miniEventContainer,
  playSound: (type) => soundKit.play(type)
});

const trackSteps = buildJourneyTrack(trackContainer, questionCount());

const gameController = setupGame({
  boardEl: gameBoard,
  messageEl: gameMessage,
  scoreEl: gameScore,
  highScoreEl: gameHighScore,
  controlButtons: difficultyButtons,
  stopButton: stopGameButton,
  soundPlayer: soundKit.forGame()
});
const { refreshHighScores, stop: stopGame } = gameController;

const QUESTION_ART = {
  default: {
    src: "assets/mascots/placeholder-card.png",
    alt: "카드 일러스트가 곧 표시됩니다."
  },
  q1: {
    src: "assets/mascots/01-energy-festival.png",
    alt: "활기찬 축제에서 에너지를 충전하는 장면"
  },
  q2: {
    src: "assets/mascots/02-quiet-notes.png",
    alt: "조용한 서재에서 생각을 정리하는 모습"
  },
  q3: {
    src: "assets/mascots/03-present-focus.png",
    alt: "모래시계를 바라보며 현재에 집중하는 모습"
  },
  q4: {
    src: "assets/mascots/04-idea-constellation.png",
    alt: "별자리 사이로 떠오르는 아이디어 조각들"
  },
  q5: {
    src: "assets/mascots/05-objective-scale.png",
    alt: "균형을 맞춘 저울과 차분한 계획 노트"
  },
  q6: {
    src: "assets/mascots/06-heart-compass.png",
    alt: "하트 모양 나침반이 가리키는 방향"
  },
  q7: {
    src: "assets/mascots/07-planner-clock.png",
    alt: "플래너와 시계를 정돈하는 모습"
  },
  q8: {
    src: "assets/mascots/08-flexible-wind.png",
    alt: "바람을 타고 흐르는 종이 비행기"
  },
  q9: {
    src: "assets/mascots/09-networking-lanterns.png",
    alt: "네온 조명 아래 즐겁게 인사하는 사람들"
  },
  q10: {
    src: "assets/mascots/10-blueprint-guide.png",
    alt: "청사진을 펼쳐 세부 지침을 읽는 모습"
  },
  q11: {
    src: "assets/mascots/11-checklist-glow.png",
    alt: "체크리스트를 하나씩 완료하며 빛나는 장면"
  },
  q12: {
    src: "assets/mascots/12-intuition-fireflies.png",
    alt: "직관을 상징하는 반딧불이를 모으는 장면"
  },
  q13: {
    src: "assets/mascots/13-pattern-lens.png",
    alt: "돋보기로 패턴을 찾아내는 장면"
  },
  q14: {
    src: "assets/mascots/14-leading-dialogue.png",
    alt: "대화를 활기차게 이끄는 리더"
  },
  q15: {
    src: "assets/mascots/15-adaptive-switch.png",
    alt: "전환 스위치를 유연하게 조정하는 모습"
  },
  q16: {
    src: "assets/mascots/16-empathy-teatime.png",
    alt: "차를 나누며 공감하는 따뜻한 시간"
  }
};

const LETTER_LABELS = {
  E: "외향성(E)",
  I: "내향성(I)",
  S: "감각형(S)",
  N: "직관형(N)",
  T: "사고형(T)",
  F: "감정형(F)",
  J: "판단형(J)",
  P: "인식형(P)"
};

const LETTER_TRAITS = {
  E: "외향성(E): 에너지를 외부로 집중하며, 사교적이고 대인 관계가 넓습니다.",
  I: "내향성(I): 차분한 공간에서 에너지를 충전하며, 깊이 있는 관계를 소중히 여깁니다.",
  S: "감각형(S): 현실적이고 현재를 중요시하며, 사실과 데이터를 중시하는 경향이 있습니다.",
  N: "직관형(N): 가능성과 패턴을 탐색하며, 미래의 비전과 영감을 즐깁니다.",
  T: "사고형(T): 객관적이고 논리적인 분석을 통해 문제를 해결하며, 인과 관계와 원리원칙을 중요하게 생각합니다.",
  F: "감정형(F): 공감과 가치를 기준으로 결정을 내리며, 사람 중심의 조화를 중시합니다.",
  J: "판단형(J): 계획적이고 조직적이며, 결단력 있게 일을 추진하고 마무리를 잘하는 성향을 보입니다.",
  P: "인식형(P): 변화에 유연하게 대응하며, 상황에 맞춰 계획을 조정하고 새로운 흐름을 탐색합니다."
};

const LETTER_BEHAVIORS = {
  E: "타고난 분위기 메이커: 활기찬 자리를 주도하며 사람들에게 에너지를 전합니다.",
  I: "몰입형 관찰자: 조용한 집중 속에서 깊이 있는 통찰을 찾아냅니다.",
  S: "현실 감각: 지금 이 순간의 구체적인 사실과 디테일을 놓치지 않습니다.",
  N: "아이디어 탐험가: 패턴과 가능성을 엮어 새로운 방향을 제시합니다.",
  T: "논리 추진력: 원리와 데이터에 기반해 명확한 해결책을 설계합니다.",
  F: "공감 코디네이터: 관계의 온도를 살피며 모두가 함께 나아가도록 돕습니다.",
  J: "계획 설계자: 일정과 우선순위를 정교하게 다듬어 목표를 실현합니다.",
  P: "유연한 조정자: 변화에 발맞춰 흐름을 재구성하고 즉흥력을 발휘합니다."
};

init();

function init() {
  bindEvents();
  hydrateFromState();
  soundKit.prepare();
}

function bindEvents() {
  startButton?.addEventListener("click", () => {
    soundKit.play("page");
    resetAnswers();
    navigateTo("journey");
    renderQuestion(0);
  });

  prevButton?.addEventListener("click", () => {
    const state = getState();
    const nextIndex = Math.max(0, state.currentQuestion - 1);
    setCurrentQuestion(nextIndex);
    renderQuestion(nextIndex);
    scrollJourneyIntoView();
    soundKit.play("flip");
  });

  nextButton?.addEventListener("click", () => {
    const state = getState();
    const index = state.currentQuestion;
    const question = questions[index];
    if (!question) return;
    if (!state.answers.hasOwnProperty(question.id)) {
      alert("느낌에 가장 가까운 선택지를 골라주세요!");
      return;
    }
    const isLast = index === questions.length - 1;
    if (isLast) {
      finalizeResult();
      navigateTo("result");
      soundKit.play("reward");
    } else {
      const nextIndex = Math.min(questions.length - 1, index + 1);
      setCurrentQuestion(nextIndex);
      renderQuestion(nextIndex);
      scrollJourneyIntoView();
      soundKit.play("page");
    }
  });

  retryButton?.addEventListener("click", () => {
    soundKit.play("page");
    resetAnswers();
    navigateTo("journey");
    renderQuestion(0);
  });

  goToGameButton?.addEventListener("click", () => {
    navigateTo("game");
    soundKit.play("sparkle");
  });

  shareButton?.addEventListener("click", async () => {
    const state = getState();
    if (!state.result) {
      alert("결과가 아직 준비되지 않았어요. 탐험을 끝까지 마쳐주세요!");
      return;
    }
    const sharePayload = {
      title: "GAMBTI 카드 결과",
      text: `${state.result.code} 유형 노트를 확인해보세요! ${state.result.profile.summary}`,
      url: window.location.href
    };
    try {
      if (navigator.share) {
        await navigator.share(sharePayload);
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(`${sharePayload.text}\n${sharePayload.url}`);
        alert("결과를 클립보드에 담았어요. 지금 바로 공유해보세요!");
      } else {
        alert("이 환경에서는 공유가 지원되지 않아요. 링크를 직접 복사해주세요.");
      }
    } catch (error) {
      console.warn("공유에 실패했습니다", error);
      alert("공유에 실패했어요. 잠시 후 다시 시도해주세요.");
    }
  });

  openPackButton?.addEventListener("click", () => {
    const message = drawBonusCard();
    if (bonusCard) {
      bonusCard.textContent = message;
    }
    soundKit.play("sparkle");
  });

  navChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const target = chip.dataset.target;
      if (target) {
        navigateTo(target);
        soundKit.play("flip");
      }
    });
  });
}

function hydrateFromState() {
  const state = getState();
  updateTrack(state.currentQuestion ?? 0, state.answers ?? {});
  renderQuestion(state.currentQuestion ?? 0);
  if (state.result) {
    renderResult(state.result);
  }
  refreshHighScores();
}

function navigateTo(sceneName) {
  scenes.forEach((scene) => {
    const match = scene.dataset.scene === sceneName;
    scene.hidden = !match;
    if (match) {
      if (sceneName === "journey") {
        scrollJourneyIntoView();
      } else {
        scene.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  });

  navChips.forEach((chip) => {
    chip.classList.toggle("active", chip.dataset.target === sceneName);
  });

  if (sceneName !== "game") {
    stopGame();
  } else {
    refreshHighScores();
  }
}

function prefersReducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

function scrollJourneyIntoView({ instant = false } = {}) {
  const target = journeyScene?.querySelector(".story-card") ?? journeyScene;
  if (!target) return;

  const header = headerEl ?? document.querySelector(".desk-header");
  const headerHeight = header?.offsetHeight ?? 0;
  const top = Math.max(target.getBoundingClientRect().top + window.scrollY - headerHeight - 16, 0);
  const behavior = instant || prefersReducedMotion() ? "auto" : "smooth";

  if ("scrollBehavior" in document.documentElement.style) {
    window.scrollTo({ top, behavior });
  } else {
    window.scrollTo(0, top);
  }
}

function findLikertLabel(value) {
  const match = likertScale.find((option) => option.value === value);
  return match?.label ?? "";
}

function updateSelectionFeedback(value) {
  if (!selectionFeedback) {
    return;
  }

  if (value === undefined || value === null) {
    selectionFeedback.dataset.state = "empty";
    selectionFeedback.textContent = "카드를 선택하면 느낌을 설명해 드려요.";
    return;
  }

  selectionFeedback.dataset.state = "active";
  selectionFeedback.textContent = findLikertLabel(value);
}

function renderQuestion(index) {
  const question = questions[index];
  const total = questionCount();
  if (!question) {
    return;
  }

  setCurrentQuestion(index);

  const state = getState();

  questionText.textContent = question.prompt;
  if (questionBackdrop) {
    questionBackdrop.style.background = getBackdropStyle(question.dimension);
  }

  const art = QUESTION_ART[question.id] ?? QUESTION_ART.default;
  displayQuestionArt(art);
  const guide = getDimensionGuide(question.dimension);
  if (mascotDisplay) {
    mascotDisplay.textContent = `${guide.emoji} ${guide.title} — ${guide.motto}`;
  }

  const selectedValue = state.answers[question.id];

  renderAnswerCards({
    container: answerFan,
    questionId: question.id,
    selectedValue,
    onSelect: (value) => {
      recordAnswer(question.id, value);
      soundKit.play("flip");
      renderQuestion(getState().currentQuestion);
    }
  });

  updateSelectionFeedback(selectedValue);

  miniEventManager.render(question);

  const current = index + 1;
  if (progressLabel) {
    progressLabel.textContent = `${current} / ${total}`;
  }
  updateTrack(index, state.answers);

  if (prevButton) {
    prevButton.disabled = index === 0;
  }
  if (nextButton) {
    nextButton.textContent = index === total - 1 ? "결과 보기" : "다음 카드";
  }
}

function displayQuestionArt(art) {
  if (!questionImage) return;

  questionImage.onerror = () => {
    questionImage.onerror = null;
    questionImage.src = QUESTION_ART.default.src;
    questionImage.alt = QUESTION_ART.default.alt;
  };

  questionImage.src = art.src;
  questionImage.alt = art.alt;
}

function finalizeResult() {
  const state = getState();
  if (!isComplete(state.answers)) {
    alert("모든 카드를 뒤집어야 성향 노트가 완성돼요!");
    return;
  }
  const result = calculateMbti(state.answers);
  setResult(result);
  renderResult(result);
  const profile = resultSummaries[result.code];
  if (profile && gameMessage) {
    gameMessage.textContent = `${profile.title} 유형다운 손놀림을 보여줄 준비를 해볼까요?`;
  }
}

function renderResult(result) {
  const { code, profile, breakdown } = result;
  if (!resultCard) return;
  const dimensionOrder = ["EI", "SN", "TF", "JP"];
  const dimensionEntries = dimensionOrder
    .map((dimension) => breakdown[dimension])
    .filter((entry) => Boolean(entry));

  const chartMarkup = dimensionEntries
    .map((entry) => {
      const positivePct = Math.round(entry.positiveRatio * 100);
      const negativePct = 100 - positivePct;
      const ariaLabel = `${entry.dimension} 축 - ${entry.positive} ${positivePct}%, ${entry.negative} ${negativePct}%`;
      const positiveLabel = positivePct >= 15 ? `<span>${positivePct}%</span>` : "";
      const negativeLabel = negativePct >= 15 ? `<span>${negativePct}%</span>` : "";
      return `
        <li class="dimension-chart__item">
          <div class="dimension-chart__heading">
            <span class="dimension-chart__axis dimension-chart__axis--negative">${entry.negative}</span>
            <span class="dimension-chart__dimension">${entry.dimension}</span>
            <span class="dimension-chart__axis dimension-chart__axis--positive">${entry.positive}</span>
          </div>
          <div class="dimension-chart__bar" role="img" aria-label="${ariaLabel}">
            <div class="dimension-chart__segment dimension-chart__segment--negative" style="flex-basis: ${negativePct}%">${negativeLabel}</div>
            <div class="dimension-chart__segment dimension-chart__segment--positive" style="flex-basis: ${positivePct}%">${positiveLabel}</div>
          </div>
          <p class="dimension-chart__caption">${entry.dominant} 성향 (${entry.score >= 0 ? "+" : ""}${entry.score} / ${entry.maxScore})</p>
        </li>
      `;
    })
    .join("");

  const chartSection = `
    <section class="result-section result-section--chart">
      <h4>지표 그래프</h4>
      <ul class="dimension-chart" role="list">
        ${chartMarkup}
      </ul>
    </section>
  `;

  const detail = profile.detail ?? buildTypeDetail({ code, profile });

  const headlineMarkup = detail.headline
    ? `<p class="result-detail__headline">${detail.headline}</p>`
    : "";

  const traitsMarkup = detail.traits?.length
    ? `<section class="result-section">
         <h4>${detail.traitsHeading ?? "유형의 주요 특징"}</h4>
         <ul>${detail.traits.map((item) => `<li>${item}</li>`).join("")}</ul>
       </section>`
    : "";

  const behaviorMarkup = detail.behaviors?.length
    ? `<section class="result-section">
         <h4>${detail.behaviorHeading ?? "행동 및 성격적 특징"}</h4>
         <ul>${detail.behaviors.map((item) => `<li>${item}</li>`).join("")}</ul>
       </section>`
    : "";

  let feedbackMarkup = "";
  if (detail.feedback?.positive?.length || detail.feedback?.negative?.length) {
    const buildFeedbackLine = (title, items) => {
      if (!items?.length) return "";
      const text = items.join(", ");
      return `<p class="result-feedback__line"><strong>${title ?? ""}:</strong> ${text}</p>`;
    };
    const positiveLine = buildFeedbackLine(detail.feedback.positiveTitle ?? "긍정적", detail.feedback.positive);
    const negativeLine = buildFeedbackLine(detail.feedback.negativeTitle ?? "부정적", detail.feedback.negative);
    feedbackMarkup = `
      <section class="result-section">
        <h4>${detail.feedbackHeading ?? "자주 듣는 말"}</h4>
        <div class="result-feedback">
          ${positiveLine}
          ${negativeLine}
        </div>
      </section>
    `;
  }

  const breakdownMarkup = `
    <section class="result-section">
      <h4>지표 해석</h4>
      <ul>
        ${dimensionEntries
          .map(
            (entry) =>
              `<li>${entry.dimension} — ${entry.dominant} 선호 (${entry.score >= 0 ? "+" : ""}${entry.score})</li>`
          )
          .join("")}
      </ul>
    </section>
  `;

  const strengthsMarkup = profile.strengths?.length
    ? `<section class="result-section">
         <h4>강점 카드</h4>
         <ul>${profile.strengths.map((item) => `<li>${item}</li>`).join("")}</ul>
       </section>`
    : "";

  const growthMarkup = profile.growth?.length
    ? `<section class="result-section">
         <h4>성장 포인트</h4>
         <ul>${profile.growth.map((item) => `<li>${item}</li>`).join("")}</ul>
       </section>`
    : "";

  const footerMarkup = profile.gameTip
    ? `<footer class="result-entry__footer">
         <p class="result-gametip">게임 팁: ${profile.gameTip}</p>
       </footer>`
    : "";

  resultCard.innerHTML = `
    <header class="result-entry__header">
      <p class="result-entry__badge">${code}</p>
      <h3>${profile.title}</h3>
      <p class="result-summary">${profile.summary}</p>
    </header>
    ${chartSection}
    ${headlineMarkup}
    ${traitsMarkup}
    ${behaviorMarkup}
    ${feedbackMarkup}
    ${breakdownMarkup}
    ${strengthsMarkup}
    ${growthMarkup}
    ${footerMarkup}
  `;
}

function buildTypeDetail({ code, profile }) {
  const letters = code.split("");
  const alias = profile.title.split("—")[1]?.trim() ?? profile.title;
  const letterList = letters.map((letter) => LETTER_LABELS[letter]).filter(Boolean).join(", ");
  const rawSummary = profile.summary.trim();
  const summarySentence = rawSummary.endsWith(".") ? rawSummary : `${rawSummary}.`;
  const summaryLine = summarySentence.startsWith("이 유형은")
    ? summarySentence
    : `이 유형은 ${summarySentence}`;

  const letterPhrase = letterList ? `, ${letterList} 조합의 특징을 지녔습니다.` : ".";
  const baseHeadline = `${code}는 MBTI 성격 유형으로 <strong>'${alias}'</strong>에 해당하며${letterPhrase}`;
  const tidyHeadline = baseHeadline.replace(/\s+\./g, ".").trim();
  const headline = `${tidyHeadline} ${summaryLine}`.trim();

  const traits = letters.map((letter) => LETTER_TRAITS[letter]).filter(Boolean);
  const behaviors = [
    `핵심 요약: ${rawSummary}`,
    ...letters.map((letter) => LETTER_BEHAVIORS[letter]).filter(Boolean)
  ];

  const feedback = {
    positiveTitle: "긍정적",
    positive: profile.strengths ?? [],
    negativeTitle: "부정적",
    negative: profile.growth ?? []
  };

  return {
    headline,
    traitsHeading: `${code} 유형의 주요 특징`,
    traits,
    behaviorHeading: `${code}의 행동 및 성격적 특징`,
    behaviors,
    feedbackHeading: `${code}가 자주 듣는 말`,
    feedback
  };
}

function updateTrack(currentIndex, answers) {
  if (!trackSteps?.length) return;
  trackSteps.forEach((step, index) => {
    const question = questions[index];
    const answered = question && Object.prototype.hasOwnProperty.call(answers, question.id);
    step.classList.toggle("active", index === currentIndex);
    step.classList.toggle("completed", answered && index !== currentIndex);
  });
}

function buildJourneyTrack(container, total) {
  if (!container) return [];
  container.innerHTML = "";
  const steps = [];
  for (let index = 0; index < total; index += 1) {
    const item = document.createElement("li");
    item.className = "journey-step";
    item.dataset.index = index.toString();
    item.textContent = String(index + 1).padStart(2, "0");
    container.appendChild(item);
    steps.push(item);
  }
  return steps;
}

function drawBonusCard() {
  const prompts = [
    "다음 카드에서 나온 키워드로 30초 동안 주변을 관찰해 보세요!",
    "질문 한 장을 친구에게 물어보고 서로 답을 비교해보면 어떨까요?",
    "미니 게임의 난이도를 바꿔서 새로운 기록에 도전해보세요.",
    "성향 결과 중 공감되는 문장을 캡처해 일기장에 붙여보세요.",
    "오늘의 기분을 대표하는 색으로 카드 테두리를 상상해 보세요."
  ];
  const index = Math.floor(Math.random() * prompts.length);
  return prompts[index];
}

function createSoundKit(shouldPlay) {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  let context = null;

  const ensureContext = () => {
    if (!AudioContextClass) return null;
    if (!context) {
      context = new AudioContextClass();
    }
    if (context.state === "suspended") {
      context.resume().catch(() => {});
    }
    return context;
  };

  const trigger = (frequencies, duration = 0.2, volume = 0.08) => {
    if (!shouldPlay() || !AudioContextClass) return;
    const ctx = ensureContext();
    if (!ctx) return;
    const list = Array.isArray(frequencies) ? frequencies : [frequencies];
    const now = ctx.currentTime;
    list.forEach((frequency, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(volume / list.length, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      osc.frequency.setValueAtTime(frequency, now);
      osc.type = index % 2 === 0 ? "triangle" : "sine";
      osc.connect(gain).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + duration);
    });
  };

  const play = (type) => {
    switch (type) {
      case "flip":
        trigger([420, 660], 0.18, 0.08);
        break;
      case "reward":
        trigger([520, 780, 1040], 0.32, 0.09);
        break;
      case "sparkle":
        trigger([880, 990], 0.22, 0.07);
        break;
      case "page":
        trigger(320, 0.16, 0.06);
        break;
      case "miss":
        trigger([180, 140], 0.28, 0.1);
        break;
      case "game-hit":
        trigger([640, 860], 0.16, 0.08);
        break;
      case "game-start":
        trigger(360, 0.14, 0.07);
        break;
      case "game-miss":
        trigger([200, 150], 0.24, 0.11);
        break;
      default:
        break;
    }
  };

  const forGame = () => ({
    onStart: () => play("game-start"),
    onHit: () => play("game-hit"),
    onMiss: () => play("game-miss")
  });

  const prepare = () => {
    if (!AudioContextClass) return;
    window.addEventListener(
      "pointerdown",
      () => {
        if (context && context.state === "suspended") {
          context.resume().catch(() => {});
        }
      },
      { once: true }
    );
  };

  return {
    play,
    forGame,
    prepare
  };
}
