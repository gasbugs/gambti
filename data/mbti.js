export const questions = [
  {
    id: "q1",
    prompt: "대규모 모임에서 시간을 보내면 에너지가 충전됩니다.",
    dimension: "EI",
    orientation: 1
  },
  {
    id: "q2",
    prompt: "생각을 공유하기 전에 조용히 정리하는 편입니다.",
    dimension: "EI",
    orientation: -1
  },
  {
    id: "q3",
    prompt: "미래보다는 현재의 현실에 집중하는 편입니다.",
    dimension: "SN",
    orientation: 1
  },
  {
    id: "q4",
    prompt: "상상력을 발휘해 다양한 가설을 떠올리는 것을 즐깁니다.",
    dimension: "SN",
    orientation: -1
  },
  {
    id: "q5",
    prompt: "중요한 결정을 내릴 때 객관적인 기준을 우선으로 합니다.",
    dimension: "TF",
    orientation: 1
  },
  {
    id: "q6",
    prompt: "결정을 내릴 때 데이터보다 개인의 가치관을 따르는 편입니다.",
    dimension: "TF",
    orientation: -1
  },
  {
    id: "q7",
    prompt: "일정을 미리 세워 두어야 마음이 편합니다.",
    dimension: "JP",
    orientation: 1
  },
  {
    id: "q8",
    prompt: "계획은 상황에 따라 유연하게 바꾸는 편이 좋습니다.",
    dimension: "JP",
    orientation: -1
  },
  {
    id: "q9",
    prompt: "네트워킹 모임은 나에게 동기부여가 됩니다.",
    dimension: "EI",
    orientation: 1
  },
  {
    id: "q10",
    prompt: "프로젝트를 수행할 때는 자세한 지침을 따르는 것이 편합니다.",
    dimension: "SN",
    orientation: 1
  },
  {
    id: "q11",
    prompt: "할 일 목록을 하나씩 지우면 큰 성취감을 느낍니다.",
    dimension: "JP",
    orientation: 1
  },
  {
    id: "q12",
    prompt: "논리만으로는 부족할 때 직감을 신뢰합니다.",
    dimension: "TF",
    orientation: -1
  },
  {
    id: "q13",
    prompt: "주변에서 나타나는 미묘한 패턴을 금방 알아차립니다.",
    dimension: "SN",
    orientation: -1
  },
  {
    id: "q14",
    prompt: "대화를 이끌기 위해 자연스럽게 주도권을 잡습니다.",
    dimension: "EI",
    orientation: 1
  },
  {
    id: "q15",
    prompt: "새로운 정보가 생기면 계획을 재빨리 조정합니다.",
    dimension: "JP",
    orientation: -1
  },
  {
    id: "q16",
    prompt: "상황을 판단할 때 타인의 감정을 먼저 고려합니다.",
    dimension: "TF",
    orientation: -1
  }
];

export const likertScale = [
  { value: -2, label: "매우 그렇지 않다" },
  { value: -1, label: "그렇지 않다" },
  { value: 0, label: "보통이다" },
  { value: 1, label: "그렇다" },
  { value: 2, label: "매우 그렇다" }
];

export const resultSummaries = {
  ISTJ: {
    title: "ISTJ — 신중한 관리자",
    summary: "실용적이고 책임감 있게 프로젝트를 완수하며 약속을 지킵니다.",
    strengths: ["신뢰감 있는 실행", "세부 사항에 강함"],
    growth: ["아이디어를 더 일찍 공유하기", "과도한 일정 압박 줄이기"],
    gameTip: "꾸준한 연속 클릭으로 정확도를 높이세요."
  },
  ISFJ: {
    title: "ISFJ — 든든한 조력자",
    summary: "섬세한 배려와 성실함으로 팀을 뒷받침합니다.",
    strengths: ["주변을 살피는 공감력", "책임감 있는 지원"],
    growth: ["필요한 경계 세우기", "업무를 나누어 맡기기"],
    gameTip: "패턴을 충분히 관찰한 뒤 클릭하세요."
  },
  INFJ: {
    title: "INFJ — 통찰력 있는 안내자",
    summary: "깊이 있는 통찰로 사람과 비전을 연결합니다.",
    strengths: ["전략적 사고", "높은 공감 능력"],
    growth: ["업무를 함께 나누기", "가설을 검증하며 나아가기"],
    gameTip: "타겟이 나타나기 전 리듬을 먼저 그려보세요."
  },
  INTJ: {
    title: "INTJ — 구조적인 설계자",
    summary: "독립적으로 체계를 다듬고 목표를 향해 꾸준히 전진합니다.",
    strengths: ["분석적 사고", "단계별 추진력"],
    growth: ["성공을 함께 축하하기", "과정을 공유하기"],
    gameTip: "타이밍 간격을 추적하며 다음 움직임을 예측하세요."
  },
  ISTP: {
    title: "ISTP — 침착한 해결사",
    summary: "차분한 집중력으로 문제를 유연하게 풀어냅니다.",
    strengths: ["상황 적응력", "위기 속 침착함"],
    growth: ["통찰을 적극적으로 공유하기", "장기적 대비 마련하기"],
    gameTip: "반사 신경을 살려 빠른 연속 클릭을 연습하세요."
  },
  ISFP: {
    title: "ISFP — 감각적인 탐험가",
    summary: "자신의 가치와 미감을 따라 창의적인 결과를 만들곤 합니다.",
    strengths: ["감성적인 창의력", "따뜻한 공감"],
    growth: ["장기 목표를 구체화하기", "선호를 솔직하게 표현하기"],
    gameTip: "속도보다 정확도를 우선하며 흐름을 익히세요."
  },
  INFP: {
    title: "INFP — 의미를 찾는 중재자",
    summary: "가치와 조화를 중시하며 이야기에 생동감을 더합니다.",
    strengths: ["풍부한 상상력", "원칙을 지키는 태도"],
    growth: ["초안을 빠르게 공개하기", "이상과 현실을 균형 있게 보기"],
    gameTip: "자신만의 안정된 박자를 유지하며 플레이하세요."
  },
  INTP: {
    title: "INTP — 호기심 많은 분석가",
    summary: "논리 구조를 탐구하며 새로운 해결책을 모색합니다.",
    strengths: ["혁신적인 관점", "객관적 판단"],
    growth: ["결론을 명확히 공유하기", "세부 사항을 놓치지 않기"],
    gameTip: "다양한 패턴을 실험해 최고 점수를 찾아보세요."
  },
  ESTP: {
    title: "ESTP — 에너지 넘치는 실전가",
    summary: "빠른 판단과 행동으로 현장을 리드합니다.",
    strengths: ["순간 대응력", "관찰력"],
    growth: ["앞을 내다보는 계획 세우기", "타인의 의견 길게 듣기"],
    gameTip: "초반부터 속도를 높여 흐름을 잡으세요."
  },
  ESFP: {
    title: "ESFP — 분위기를 살리는 엔터테이너",
    summary: "즉흥적인 에너지로 주변에 활기를 불어넣습니다.",
    strengths: ["활달한 표현력", "유연한 사고"],
    growth: ["약속을 체계적으로 관리하기", "대안을 미리 준비하기"],
    gameTip: "사운드와 색을 활용해 타이밍을 맞춰보세요."
  },
  ENFP: {
    title: "ENFP — 영감을 전하는 촉진자",
    summary: "아이디어와 사람을 연결하며 변화를 이끕니다.",
    strengths: ["호기심 많은 탐색", "포용적인 협업"],
    growth: ["마무리 집중력 기르기", "우선순위를 명확히 정하기"],
    gameTip: "색상 힌트를 따라 콤보를 이어가 보세요."
  },
  ENTP: {
    title: "ENTP — 도전을 즐기는 전략가",
    summary: "가설을 시험하며 새로운 가능성을 꾸준히 발굴합니다.",
    strengths: ["재치 있는 문제 해결", "설득력 있는 전달"],
    growth: ["실행 루틴을 정교하게 만들기", "결과를 기록해 두기"],
    gameTip: "전략을 자주 바꿔 타이머의 예측을 흔드세요."
  },
  ESTJ: {
    title: "ESTJ — 결과를 이끄는 감독관",
    summary: "구조화된 계획으로 팀을 목표 지점까지 이끕니다.",
    detail: {
      headline:
        "ESTJ는 MBTI 성격 유형으로 '경영자', '관리자'를 의미하며, 외향성(E), 감각형(S), 사고형(T), 판단형(J)의 약자입니다. 이 유형은 현실적이고 실용적이며, 체계적인 계획과 원리원칙을 중시하며, 목표 지향적이고 책임감이 강한 지도자형입니다.",
      traitsHeading: "ESTJ 유형의 주요 특징",
      traits: [
        "외향성(E): 에너지를 외부로 집중하며, 사교적이고 대인 관계가 넓습니다.",
        "감각형(S): 현실적이고 현재를 중요시하며, 사실과 데이터를 중시하는 경향이 있습니다.",
        "사고형(T): 객관적이고 논리적인 분석을 통해 문제를 해결하며, 인과관계와 원리원칙을 중요하게 생각합니다.",
        "판단형(J): 계획적이고 조직적이며, 결단력 있게 일을 추진하고 마무리를 잘하는 성향을 보입니다."
      ],
      behaviorHeading: "ESTJ의 행동 및 성격적 특징",
      behaviors: [
        "타고난 지도자: 리더 역할을 맡아 책임감 있게 조직을 이끌고, 필요한 지적과 조언을 제공하는 데 능숙합니다.",
        "책임감과 실천력: 책임감이 강하고 약속을 지키려 노력하며, 일이 없으면 만들어서라도 일을 해내는 추진력을 가졌습니다.",
        "현실주의: 이상적인 것보다 실현 가능한 해결책을 찾으려 하며, 미래의 가능성이나 추상적인 대화는 선호하지 않습니다.",
        "직설적이고 단호함: 논리적이고 사실적인 근거를 바탕으로 명확하고 단호하게 표현하며, 불필요한 비효율성을 참지 못합니다.",
        "계획과 조직: 효율적인 계획을 세우고 자원을 관리하며, 정해진 규칙과 마감 시한을 중요하게 생각합니다."
      ],
      feedbackHeading: "ESTJ가 자주 듣는 말",
      feedback: {
        positiveTitle: "긍정적",
        positive: ["분위기 메이커", "일 처리 능력 탁월", "헌신적", "결단력 있음"],
        negativeTitle: "부정적",
        negative: ["잔소리가 많음", "고집이 셈", "무뚝뚝함", "융통성이 부족함"]
      }
    },
    strengths: ["체계적인 조직력", "확실한 실행력"],
    growth: ["피드백을 적극적으로 수용하기", "계획에 탄력을 더하기"],
    gameTip: "라운드마다 속도 목표를 정해 꾸준히 유지하세요."
  },
  ESFJ: {
    title: "ESFJ — 모두를 잇는 조정가",
    summary: "따뜻한 지원과 조직력으로 구성원을 챙깁니다.",
    strengths: ["섬세한 돌봄", "준비된 협업"],
    growth: ["집중 시간 확보하기", "변화에 유연하게 대응하기"],
    gameTip: "카운트다운 신호와 함께 클릭 타이밍을 맞추세요."
  },
  ENFJ: {
    title: "ENFJ — 성장을 돕는 멘토",
    summary: "비전을 제시하고 모두가 함께 성장하도록 이끕니다.",
    strengths: ["높은 공감력", "조율 능력"],
    growth: ["에너지 균형 지키기", "견해 차이를 반갑게 받아들이기"],
    gameTip: "팀원과 점수를 공유하며 동기부여를 높이세요."
  },
  ENTJ: {
    title: "ENTJ — 대담한 지휘관",
    summary: "대담한 계획을 세우고 과감하게 실행합니다.",
    strengths: ["효율적인 운영", "장기적 비전"],
    growth: ["경청 시간을 확보하기", "휴식과 재충전을 계획하기"],
    gameTip: "각 라운드를 스프린트처럼 집중해 공략하세요."
  }
};
