import { updateHighScore, getState } from "./state.js";

const DIFFICULTY_SETTINGS = {
  normal: {
    label: "기본 모드",
    interval: 1200,
    points: 10
  },
  challenge: {
    label: "도전 모드",
    interval: 800,
    points: 14
  }
};

export function setupGame({
  boardEl,
  messageEl,
  scoreEl,
  highScoreEl,
  controlButtons,
  stopButton,
  soundPlayer
}) {
  let activeMode = null;
  let score = 0;
  let timerId = null;
  const sound = normalizeSoundPlayer(soundPlayer);

  controlButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const mode = button.dataset.difficulty;
      startGame(mode);
    });
  });

  stopButton.addEventListener("click", () => {
    stopGame("게임을 중단했습니다. 다시 도전해보세요.");
  });

  function startGame(mode) {
    if (!DIFFICULTY_SETTINGS[mode]) {
      return;
    }
    activeMode = mode;
    score = 0;
    updateScore(0);
    messageEl.textContent = `${DIFFICULTY_SETTINGS[mode].label} 시작! 타겟이 나타나면 즉시 클릭하세요.`;
    boardEl.focus();
    sound.onStart(mode);
    spawnTarget();
  }

  function spawnTarget() {
    clearTimeout(timerId);
    boardEl.innerHTML = "";

    const target = document.createElement("button");
    target.className = "game-target";
    target.setAttribute("aria-label", "타겟 클릭");
    target.addEventListener("click", handleHit, { once: true });

    const { width, height } = boardEl.getBoundingClientRect();
    const size = 48;
    const maxX = Math.max(width - size, 0);
    const maxY = Math.max(height - size, 0);
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;
    target.style.transform = `translate(${x}px, ${y}px)`;

    boardEl.appendChild(target);

    const interval = jitterInterval(DIFFICULTY_SETTINGS[activeMode].interval);
    timerId = window.setTimeout(() => {
      stopGame("시간 초과! 타겟을 놓쳤습니다.");
      sound.onMiss();
    }, interval + 300);
  }

  function handleHit() {
    if (!activeMode) return;
    const { points, interval } = DIFFICULTY_SETTINGS[activeMode];
    score += points;
    updateScore(score);
    const delay = jitterInterval(interval);
    timerId = window.setTimeout(spawnTarget, delay);
    sound.onHit();
  }

  function updateScore(value) {
    scoreEl.textContent = value.toString();
    if (activeMode) {
      const currentState = updateHighScore(activeMode, value);
      const best = currentState.highScores?.[activeMode] ?? 0;
      highScoreEl.textContent = best.toString();
    }
  }

  function stopGame(reason) {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
    boardEl.innerHTML = "";
    if (reason) {
      messageEl.textContent = reason;
    }
    activeMode = null;
  }

  function jitterInterval(base) {
    const variation = Math.round(base * 0.3);
    return base + Math.floor(Math.random() * variation) - variation / 2;
  }

  function refreshHighScores() {
    const state = getState();
    if (activeMode) {
      highScoreEl.textContent = (state.highScores?.[activeMode] ?? 0).toString();
    } else {
      const defaultMode = controlButtons[0]?.dataset.difficulty;
      highScoreEl.textContent = (state.highScores?.[defaultMode] ?? 0).toString();
    }
  }

  return {
    stop: stopGame,
    refreshHighScores
  };
}

function normalizeSoundPlayer(soundPlayer) {
  const noop = () => {};
  return {
    onStart: typeof soundPlayer?.onStart === "function" ? soundPlayer.onStart : noop,
    onHit: typeof soundPlayer?.onHit === "function" ? soundPlayer.onHit : noop,
    onMiss: typeof soundPlayer?.onMiss === "function" ? soundPlayer.onMiss : noop
  };
}
