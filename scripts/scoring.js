import { questions, resultSummaries } from "../data/mbti.js";

const dimensionPairs = {
  EI: ["E", "I"],
  SN: ["S", "N"],
  TF: ["T", "F"],
  JP: ["J", "P"]
};

export function calculateMbti(answers) {
  const totals = {
    EI: 0,
    SN: 0,
    TF: 0,
    JP: 0
  };
  const counts = {
    EI: 0,
    SN: 0,
    TF: 0,
    JP: 0
  };

  for (const question of questions) {
    const response = Number(answers?.[question.id] ?? 0);
    totals[question.dimension] += response * question.orientation;
    counts[question.dimension] += 1;
  }

  const breakdown = {};
  let code = "";

  for (const [dimension, [positive, negative]] of Object.entries(dimensionPairs)) {
    const score = totals[dimension];
    const totalWeight = counts[dimension] * 2 || 1;
    const positiveRatio = Math.min(Math.max((score + totalWeight) / (totalWeight * 2), 0), 1);
    const negativeRatio = 1 - positiveRatio;
    breakdown[dimension] = {
      dimension,
      score,
      maxScore: totalWeight,
      positive,
      negative,
      dominant: score >= 0 ? positive : negative,
      positiveRatio,
      negativeRatio
    };
    code += score >= 0 ? positive : negative;
  }

  const profile = resultSummaries[code] ?? {
    title: `${code} — 프로필 준비 중`,
    summary: "해당 유형에 대한 설명은 곧 추가될 예정입니다.",
    strengths: ["개인화된 결과를 기다려주세요"],
    growth: ["추후 업데이트 확인"],
    gameTip: "편안하게 게임을 즐겨보세요."
  };

  return {
    code,
    breakdown,
    profile
  };
}

export function isComplete(answers) {
  return questions.every((question) => Object.prototype.hasOwnProperty.call(answers, question.id));
}

export function questionCount() {
  return questions.length;
}
