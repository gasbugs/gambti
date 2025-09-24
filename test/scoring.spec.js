import assert from "node:assert/strict";
import { questions } from "../src/data/mbti.js";
import { calculateMbti, isComplete } from "../src/public/scripts/scoring.js";

describe("MBTI scoring", () => {
  it("detects incomplete answer sets", () => {
    const answers = {};
    assert.equal(isComplete(answers), false);
    const filled = Object.fromEntries(questions.map((q) => [q.id, 0]));
    assert.equal(isComplete(filled), true);
  });

  it("prefers first letter when positive responses dominate", () => {
    const answers = Object.fromEntries(
      questions.map((question) => [question.id, question.orientation >= 0 ? 2 : -2])
    );
    const result = calculateMbti(answers);
    assert.equal(result.code, "ESTJ");
    assert.equal(result.profile.title.startsWith("ESTJ"), true);
  });

  it("prefers second letter when negative responses dominate", () => {
    const answers = Object.fromEntries(
      questions.map((question) => [question.id, question.orientation >= 0 ? -2 : 2])
    );
    const result = calculateMbti(answers);
    assert.equal(result.code, "INFP");
  });
});
