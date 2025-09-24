const STORAGE_KEY = "gambti-state-v1";

const clone = (value) => (typeof structuredClone === "function" ? structuredClone(value) : JSON.parse(JSON.stringify(value)));

const defaultState = {
  currentQuestion: 0,
  answers: {},
  result: null,
  highScores: {
    normal: 0,
    challenge: 0
  },
  preferences: {
    animations: true,
    sounds: true
  }
};

let state = loadState();

function loadState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return clone(defaultState);
    }
    const parsed = JSON.parse(raw);
    return {
      ...clone(defaultState),
      ...parsed,
      highScores: {
        ...defaultState.highScores,
        ...(parsed.highScores || {})
      },
      preferences: {
        ...defaultState.preferences,
        ...(parsed.preferences || {})
      }
    };
  } catch (error) {
    console.warn("Failed to load state, falling back to default", error);
    return clone(defaultState);
  }
}

function persist() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn("Unable to persist state", error);
  }
}

export function getState() {
  return state;
}

export function setCurrentQuestion(index) {
  state = { ...state, currentQuestion: index };
  persist();
  return state;
}

export function recordAnswer(questionId, value) {
  state = {
    ...state,
    answers: {
      ...state.answers,
      [questionId]: value
    }
  };
  persist();
  return state;
}

export function setResult(result) {
  state = { ...state, result };
  persist();
  return state;
}

export function resetAnswers() {
  state = {
    ...state,
    currentQuestion: 0,
    answers: {},
    result: null
  };
  persist();
  return state;
}

export function getPreferences() {
  return state.preferences ?? clone(defaultState.preferences);
}

export function updatePreferences(partial) {
  state = {
    ...state,
    preferences: {
      ...clone(defaultState.preferences),
      ...state.preferences,
      ...partial
    }
  };
  persist();
  return state.preferences;
}

export function updateHighScore(mode, score) {
  if (!mode) return state;
  const current = state.highScores?.[mode] ?? 0;
  if (score > current) {
    state = {
      ...state,
      highScores: {
        ...state.highScores,
        [mode]: score
      }
    };
    persist();
  }
  return state;
}

export function clearState() {
  state = clone(defaultState);
  persist();
  return state;
}
