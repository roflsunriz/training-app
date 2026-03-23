import type { Exercise, TrainingSession } from '../../../types/domain'

const s1_bellyHoldA: Exercise = {
  id: 's1a-belly-hold',
  name: 'お腹へこませキープ',
  description: '仰向けに寝て、お腹をへこませた状態をキープします。',
  purpose: '腹横筋の基礎的な活性化',
  steps: [
    '仰向けに寝て膝を立てる',
    '息を吐きながらお腹をへこませる',
    'へこませた状態を5秒キープする',
    'ゆっくり息を吸って戻す',
  ],
  tips: ['お腹を背中に近づけるイメージで行う', '呼吸を止めない'],
  warnings: ['腰が反らないように注意'],
  commonMistakes: ['息を止めてしまう', '肩に力が入る'],
  progression: 'Stage 2 ではキープ時間を10秒に延長します',
  prescription: { seconds: 5, reps: 6 },
}

const s1_pelvicTilt: Exercise = {
  id: 's1a-pelvic-tilt',
  name: 'ペルビックティルト',
  description: '骨盤を後傾させて腰を床に押し付ける動作です。',
  purpose: '骨盤周囲筋と腹筋の連携を学ぶ',
  steps: [
    '仰向けに寝て膝を立てる',
    '腰と床の隙間を埋めるように骨盤を傾ける',
    '腰が床にぴったりついたら戻す',
  ],
  tips: ['おへそを背中側に引くイメージ', '動きは小さくてOK'],
  warnings: ['腰に痛みが出たら中止する'],
  commonMistakes: ['お尻を浮かせすぎる', '足で踏ん張ってしまう'],
  progression: 'Stage 2 では回数を10回に増やします',
  prescription: { reps: 8, sets: 2 },
}

const s1_heelSlide: Exercise = {
  id: 's1a-heel-slide',
  name: 'かかとスライド',
  description: '仰向けで片足ずつかかとを滑らせて伸ばします。',
  purpose: '体幹を安定させながら脚を動かす練習',
  steps: [
    '仰向けに寝て膝を立てる',
    'お腹をへこませた状態を維持する',
    '片足のかかとを床に沿って滑らせて伸ばす',
    'ゆっくり元に戻す',
    '反対側も同様に行う',
  ],
  tips: ['腰が反らないことを最優先にする', 'ゆっくり動かす'],
  warnings: ['腰が反ってきたら脚を伸ばす距離を短くする'],
  commonMistakes: ['脚を伸ばすことに集中しすぎて腰が反る'],
  progression: 'Stage 2 のマーチング強化につながります',
  prescription: { reps: 6, sets: 2, perSide: true },
}

const s1_bridgeLight: Exercise = {
  id: 's1a-bridge-light',
  name: 'ブリッジ超軽量版',
  description: 'お尻をわずかに浮かせてキープします。',
  purpose: '臀筋と体幹の連携を学ぶ',
  steps: [
    '仰向けに寝て膝を立てる',
    'お尻をほんの少しだけ浮かせる',
    '3秒キープして下ろす',
  ],
  tips: ['高く上げる必要はない', 'お腹に力を入れたまま行う'],
  warnings: ['腰が反って痛む場合は中止する'],
  commonMistakes: ['お尻を高く上げすぎる', '腰で持ち上げてしまう'],
  progression: 'Stage 2 では5秒キープに延長します',
  prescription: { seconds: 3, reps: 5 },
}

const s1_bellyHoldB: Exercise = {
  id: 's1b-belly-hold',
  name: 'お腹へこませキープ',
  description: '仰向けに寝て、お腹をへこませた状態をキープします。',
  purpose: '腹横筋の基礎的な活性化',
  steps: [
    '仰向けに寝て膝を立てる',
    '息を吐きながらお腹をへこませる',
    'へこませた状態を5秒キープする',
    'ゆっくり息を吸って戻す',
  ],
  tips: ['お腹を背中に近づけるイメージで行う', '呼吸を止めない'],
  warnings: ['腰が反らないように注意'],
  commonMistakes: ['息を止めてしまう', '肩に力が入る'],
  progression: 'Stage 2 ではキープ時間を10秒に延長します',
  prescription: { seconds: 5, reps: 6 },
}

const s1_kneeDrop: Exercise = {
  id: 's1b-knee-drop',
  name: '膝左右倒し（小さく）',
  description: '仰向けで両膝を小さく左右に倒します。',
  purpose: '体幹の回旋制御を学ぶ',
  steps: [
    '仰向けに寝て膝を立てる',
    '両膝を揃えたまま小さく右に倒す',
    '中央に戻して左に倒す',
  ],
  tips: ['動きは小さくてOK、腰が床から浮かない範囲で', '肩は床につけたまま'],
  warnings: ['腰に違和感があれば動きをさらに小さくする'],
  commonMistakes: ['大きく倒しすぎる', '勢いで動かしてしまう'],
  prescription: { reps: 6, perSide: true },
}

const s1_marching: Exercise = {
  id: 's1b-marching',
  name: 'マーチング',
  description: '仰向けで片膝ずつ交互に持ち上げます。',
  purpose: '体幹の安定性を保ちながら脚を動かす',
  steps: [
    '仰向けに寝て膝を立てる',
    'お腹に力を入れたまま片膝を胸の方に持ち上げる',
    'ゆっくり下ろして反対の脚も同様に行う',
  ],
  tips: ['腰が反らないことを確認しながら行う', 'ゆっくり行う'],
  warnings: ['腰が反る場合は膝を高く上げすぎない'],
  commonMistakes: ['脚を上げるとき腰が反る', '速く動かしすぎる'],
  progression: 'Stage 2 ではマーチング強化として回数が増えます',
  prescription: { reps: 5, sets: 2, perSide: true },
}

const s1_seatedBrace: Exercise = {
  id: 's1b-seated-brace',
  name: '椅子座位で腹圧',
  description: '椅子に座った状態でお腹に力を入れてキープします。',
  purpose: '座位での体幹安定性を養う',
  steps: [
    '椅子に浅く座り背筋を伸ばす',
    '息を吐きながらお腹をへこませる',
    'その状態を10秒キープする',
    'ゆっくり息を吸って戻す',
  ],
  tips: ['背もたれに寄りかからない', '自然な呼吸を続ける'],
  warnings: ['腰が丸まりすぎないように注意'],
  commonMistakes: ['背中が丸まる', '息を止めてしまう'],
  prescription: { seconds: 10, reps: 5 },
}

const s2_bellyHold: Exercise = {
  id: 's2a-belly-hold',
  name: 'お腹へこませキープ',
  description: '仰向けに寝て、お腹をへこませた状態を長めにキープします。',
  purpose: '腹横筋の持久力向上',
  steps: [
    '仰向けに寝て膝を立てる',
    '息を吐きながらお腹をへこませる',
    'へこませた状態を10秒キープする',
    'ゆっくり息を吸って戻す',
  ],
  tips: ['Stage 1 より長い時間を意識する', '呼吸を止めない'],
  warnings: ['腰が反らないように注意'],
  commonMistakes: ['息を止めてしまう', '途中で力が抜ける'],
  regression: 'きつい場合は5秒に戻してOK',
  prescription: { seconds: 10, reps: 5 },
}

const s2_bridge: Exercise = {
  id: 's2a-bridge',
  name: 'ブリッジ',
  description: 'お尻を持ち上げてキープします。',
  purpose: '臀筋・体幹の強化',
  steps: [
    '仰向けに寝て膝を立てる',
    'お尻を持ち上げて体が一直線になるようにする',
    '5秒キープして下ろす',
  ],
  tips: ['腰を反らせずお腹に力を入れたまま', '高さよりフォーム重視'],
  warnings: ['腰に痛みが出たら高さを下げるか中止する'],
  commonMistakes: ['腰を反らせて持ち上げる', 'お腹の力が抜ける'],
  regression: 'Stage 1 の超軽量版（3秒キープ）に戻す',
  prescription: { seconds: 5, reps: 6 },
}

const s2_marchingPlus: Exercise = {
  id: 's2a-marching-plus',
  name: 'マーチング強化',
  description: '仰向けで片膝ずつ交互に持ち上げます（回数増加版）。',
  purpose: '体幹安定性の向上',
  steps: [
    '仰向けに寝て膝を立てる',
    'お腹に力を入れたまま片膝を持ち上げる',
    'ゆっくり下ろして反対の脚も行う',
  ],
  tips: ['Stage 1 より回数が多いのでペース配分を意識する'],
  warnings: ['腰が反る場合は無理をしない'],
  commonMistakes: ['疲れてフォームが崩れる'],
  regression: 'きつい場合は左右5回に減らす',
  prescription: { reps: 8, perSide: true },
}

const s2_wallPlank: Exercise = {
  id: 's2a-wall-plank',
  name: '壁プランク',
  description: '壁に手をついてプランクの姿勢を保ちます。',
  purpose: '体幹の静的耐久力を養う（低負荷版プランク）',
  steps: [
    '壁から一歩離れて立つ',
    '両手を肩幅で壁につく',
    '体を一直線に保ちながら壁に向かって傾く',
    '10〜15秒キープする',
  ],
  tips: ['頭からかかとまで一直線を意識', 'お腹に力を入れ続ける'],
  warnings: ['腰が反る場合は壁との距離を近くする'],
  commonMistakes: ['腰が沈む', 'お尻が突き出る'],
  progression: 'Stage 3 の斜めプランクにつながります',
  prescription: { rangeText: '10〜15秒', reps: 4 },
}

const s2_pelvicTiltPlus: Exercise = {
  id: 's2b-pelvic-tilt-plus',
  name: 'ペルビックティルト',
  description: '骨盤を後傾させて腰を床に押し付ける動作です（回数増加版）。',
  purpose: '骨盤周囲筋と腹筋の連携強化',
  steps: [
    '仰向けに寝て膝を立てる',
    '腰と床の隙間を埋めるように骨盤を傾ける',
    '腰が床にぴったりついたら戻す',
  ],
  tips: ['動きの質を保ちながら回数をこなす'],
  warnings: ['腰に痛みが出たら中止する'],
  commonMistakes: ['雑になって効果が下がる'],
  regression: '8回に減らしてOK',
  prescription: { reps: 10, sets: 2 },
}

const s2_deadBugPrep: Exercise = {
  id: 's2b-dead-bug-prep',
  name: 'デッドバグ予備動作',
  description: '仰向けで片脚を交互にゆっくり伸ばします。',
  purpose: '対角線の協調動作と体幹安定性',
  steps: [
    '仰向けに寝て両膝を90度に曲げて持ち上げる',
    'お腹に力を入れたまま片脚をゆっくり伸ばす',
    '元に戻して反対側も行う',
  ],
  tips: ['腰が床から浮かないことを最優先にする'],
  warnings: ['腰が反ったら脚を伸ばす距離を短くする'],
  commonMistakes: ['脚を伸ばしすぎて腰が反る', '速く動かしてしまう'],
  prescription: { reps: 6, perSide: true },
}

const s2_quadrupedHold: Exercise = {
  id: 's2b-quadruped-hold',
  name: '四つ這い荷重保持',
  description: '四つ這いの姿勢を安定させてキープします。',
  purpose: '体幹の全周的な安定性を養う',
  steps: [
    '四つ這いになる（手は肩の下、膝は股関節の下）',
    '背中を平らに保つ',
    'そのまま10秒キープする',
  ],
  tips: ['背中が丸まったり反ったりしない', 'お腹を引き締めたまま'],
  warnings: ['手首が痛い場合は拳をつくか中止する'],
  commonMistakes: ['背中が反る', 'お腹の力が抜ける'],
  progression: 'バードドッグにつながります',
  prescription: { seconds: 10, reps: 5 },
}

const s2_birdDogPrep: Exercise = {
  id: 's2b-bird-dog-prep',
  name: 'バードドッグ予備動作',
  description: '四つ這いから片手または片脚を交互に持ち上げます。',
  purpose: '対角線の協調動作と体幹安定性の向上',
  steps: [
    '四つ這いになる',
    '片手をまっすぐ前に伸ばしてキープ',
    '下ろして反対の手も行う',
    '慣れたら片脚を後ろに伸ばす動作も追加する',
  ],
  tips: ['体が傾かないように注意', 'ゆっくり行う'],
  warnings: ['バランスが取れない場合は手だけから始める'],
  commonMistakes: ['体が左右に傾く', '腰が反る'],
  prescription: { reps: 5, perSide: true },
}

const s3_inclinePlank: Exercise = {
  id: 's3-incline-plank',
  name: '台に手をつく斜めプランク',
  description: '台や椅子に手をついてプランクを行います。',
  purpose: '床プランクへの移行準備',
  steps: [
    '安定した台や椅子に両手をつく',
    '足を後ろに引いて体を一直線にする',
    '15〜20秒キープする',
  ],
  tips: ['台が高いほど負荷が軽い', '腰が沈まないように注意'],
  warnings: ['台が滑らないことを確認する', '腰に痛みが出たら中止'],
  commonMistakes: ['腰が沈む', 'お尻が突き出る'],
  regression: '壁プランクに戻す',
  prescription: { rangeText: '15〜20秒', reps: 3 },
}

const s3_kneelingPlank: Exercise = {
  id: 's3-kneeling-plank',
  name: '膝つきプランク',
  description: '膝をついた状態でプランクを行います。',
  purpose: '床プランクへの最終段階',
  steps: [
    '両手と両膝を床につく',
    '手は肩の下、膝は股関節より少し後ろ',
    '体を一直線に保って5〜10秒キープする',
  ],
  tips: ['頭から膝まで一直線を意識する', 'お腹を引き締め続ける'],
  warnings: ['腰が反ったら即中止', '膝が痛い場合はタオルを敷く'],
  commonMistakes: ['腰が沈む', 'お尻が高く上がる'],
  regression: '斜めプランクに戻す',
  prescription: { rangeText: '5〜10秒 × 3〜5回' },
}

const s3_crunchIntro: Exercise = {
  id: 's3-crunch-intro',
  name: 'クランチ導入',
  description: '頭と肩をわずかに持ち上げるクランチの入門動作です。',
  purpose: '腹直筋の直接的な強化開始',
  steps: [
    '仰向けに寝て膝を立てる',
    '両手を胸の前で組むか耳の横に添える',
    '息を吐きながら頭と肩甲骨の上部をわずかに持ち上げる',
    'ゆっくり戻す',
  ],
  tips: ['首を引っ張らない', '動きは小さくてOK', 'おへそを覗き込むイメージ'],
  warnings: ['首が痛む場合は中止する', '腰が床から浮かないように'],
  commonMistakes: ['首だけで起き上がろうとする', '反動を使う'],
  regression: 'お腹へこませキープに戻す',
  prescription: { reps: 3, rangeText: '3〜5回' },
}

export const STAGE1_SESSION_A: TrainingSession = {
  id: 'stage1-session-a',
  stageId: 'stage1',
  sessionType: 'A',
  title: 'Stage 1 - Session A',
  estimatedMinutes: 10,
  exercises: [s1_bellyHoldA, s1_pelvicTilt, s1_heelSlide, s1_bridgeLight],
}

export const STAGE1_SESSION_B: TrainingSession = {
  id: 'stage1-session-b',
  stageId: 'stage1',
  sessionType: 'B',
  title: 'Stage 1 - Session B',
  estimatedMinutes: 10,
  exercises: [s1_bellyHoldB, s1_kneeDrop, s1_marching, s1_seatedBrace],
}

export const STAGE2_SESSION_A: TrainingSession = {
  id: 'stage2-session-a',
  stageId: 'stage2',
  sessionType: 'A',
  title: 'Stage 2 - Session A',
  estimatedMinutes: 12,
  exercises: [s2_bellyHold, s2_bridge, s2_marchingPlus, s2_wallPlank],
}

export const STAGE2_SESSION_B: TrainingSession = {
  id: 'stage2-session-b',
  stageId: 'stage2',
  sessionType: 'B',
  title: 'Stage 2 - Session B',
  estimatedMinutes: 12,
  exercises: [s2_pelvicTiltPlus, s2_deadBugPrep, s2_quadrupedHold, s2_birdDogPrep],
}

export const STAGE3_SESSION_A: TrainingSession = {
  id: 'stage3-session-a',
  stageId: 'stage3',
  sessionType: 'A',
  title: 'Stage 3 - Session A',
  estimatedMinutes: 15,
  exercises: [s3_inclinePlank, s3_kneelingPlank, s3_crunchIntro],
}

export const STAGE3_SESSION_B: TrainingSession = {
  id: 'stage3-session-b',
  stageId: 'stage3',
  sessionType: 'B',
  title: 'Stage 3 - Session B',
  estimatedMinutes: 15,
  exercises: [s3_inclinePlank, s3_kneelingPlank, s3_crunchIntro],
}

export const ALL_SESSIONS: readonly TrainingSession[] = [
  STAGE1_SESSION_A,
  STAGE1_SESSION_B,
  STAGE2_SESSION_A,
  STAGE2_SESSION_B,
  STAGE3_SESSION_A,
  STAGE3_SESSION_B,
]

export function getSessionForStage(
  stageId: string,
  sessionType: string,
): TrainingSession | undefined {
  return ALL_SESSIONS.find(
    (s) => s.stageId === stageId && s.sessionType === sessionType,
  )
}
