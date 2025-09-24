const MINI_EVENTS = {
  q4: createSparkleChase,
  q11: createPaletteMatch
};

export function createMiniEventManager({ container, playSound }) {
  let teardown = null;

  function render(question) {
    teardown?.();
    container.innerHTML = "";

    if (!question) {
      container.hidden = true;
      teardown = null;
      return;
    }

    const builder = MINI_EVENTS[question.id];
    if (!builder) {
      container.hidden = true;
      teardown = null;
      return;
    }

    container.hidden = false;
    teardown = builder(container, playSound);
  }

  return {
    render
  };
}

function createSparkleChase(container, playSound) {
  container.innerHTML = "";
  const heading = document.createElement("h3");
  heading.className = "mini-event__title";
  heading.textContent = "특별 이벤트 · 집중력 체크";

  const hint = document.createElement("p");
  hint.className = "mini-event__hint";
  hint.textContent = "✨ 반짝이는 별을 세 번 잡아 카드 뒷면을 점등하세요.";

  const playfield = document.createElement("div");
  playfield.className = "mini-event__playfield";

  const star = document.createElement("button");
  star.type = "button";
  star.className = "sparkle-star";
  star.setAttribute("aria-label", "반짝이는 별 잡기");
  star.textContent = "⭐";
  playfield.appendChild(star);

  container.append(heading, hint, playfield);

  let captures = 0;
  let active = true;

  const reposition = () => {
    if (!active) return;
    const bounds = playfield.getBoundingClientRect();
    const size = 56;
    const x = Math.random() * Math.max(bounds.width - size, 0);
    const y = Math.random() * Math.max(bounds.height - size, 0);
    star.style.transform = `translate(${x}px, ${y}px)`;
  };

  const timer = window.setInterval(reposition, 1000);
  reposition();

  star.addEventListener("click", () => {
    if (!active) return;
    captures += 1;
    playSound?.("sparkle");
    if (captures >= 3) {
      active = false;
      window.clearInterval(timer);
      hint.textContent = "완료! 다음 카드에도 행운이 따라붙을 거예요.";
      star.classList.add("hidden");
      setTimeout(() => {
        star.remove();
      }, 200);
    } else {
      reposition();
    }
  });

  return () => {
    active = false;
    window.clearInterval(timer);
  };
}

function createPaletteMatch(container, playSound) {
  container.innerHTML = "";
  const heading = document.createElement("h3");
  heading.className = "mini-event__title";
  heading.textContent = "특별 이벤트 · 감각 체크";

  const hint = document.createElement("p");
  hint.className = "mini-event__hint";

  const palette = ["#ffaec9", "#b4f8c8", "#cdb4db", "#a0c4ff"];
  const targetIndex = Math.floor(Math.random() * palette.length);
  const targetColor = palette[targetIndex];

  hint.innerHTML = `🎨 <strong>${colorName(targetIndex)}</strong> 느낌을 찾으세요.`;

  const grid = document.createElement("div");
  grid.className = "palette-grid";

  palette.forEach((color, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "palette-swatch";
    button.style.background = color;
    button.setAttribute("aria-label", `${colorName(index)} 선택`);
    button.addEventListener("click", () => {
      if (index === targetIndex) {
        playSound?.("reward");
        hint.textContent = "맞았어요! 색감 센서가 반짝이고 있어요.";
        grid.querySelectorAll("button").forEach((node) => (node.disabled = true));
      } else {
        playSound?.("flip");
        hint.textContent = "다른 색이었어요! 다시 시도해보세요.";
      }
    });
    grid.appendChild(button);
  });

  container.append(heading, hint, grid);

  return () => {
    grid.querySelectorAll("button").forEach((node) => node.replaceWith(node.cloneNode(true)));
  };
}

function colorName(index) {
  switch (index) {
    case 0:
      return "딸기 스무디";
    case 1:
      return "민트 젤리";
    case 2:
      return "포도 솜사탕";
    case 3:
      return "하늘 보석";
    default:
      return "비밀 컬러";
  }
}
