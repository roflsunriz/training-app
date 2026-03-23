interface IllustrationProps {
  readonly className?: string
}

function SupineBellyHold({ className }: IllustrationProps): React.JSX.Element {
  return (
    <svg viewBox="0 0 120 60" className={className} aria-hidden="true">
      <line x1="20" y1="48" x2="100" y2="48" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <ellipse cx="30" cy="38" rx="6" ry="6" fill="currentColor" opacity="0.7" />
      <line x1="36" y1="40" x2="65" y2="42" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="65" y1="42" x2="80" y2="32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="80" y1="32" x2="82" y2="46" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M48 38 Q50 30 52 38" stroke="#10b981" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M52 38 Q54 32 56 38" stroke="#10b981" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  )
}

function SupinePelvicTilt({ className }: IllustrationProps): React.JSX.Element {
  return (
    <svg viewBox="0 0 120 60" className={className} aria-hidden="true">
      <line x1="20" y1="48" x2="100" y2="48" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <ellipse cx="30" cy="38" rx="6" ry="6" fill="currentColor" opacity="0.7" />
      <line x1="36" y1="40" x2="65" y2="42" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="65" y1="42" x2="80" y2="32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="80" y1="32" x2="82" y2="46" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M55 44 L60 48 L65 44" stroke="#10b981" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  )
}

function SupineHeelSlide({ className }: IllustrationProps): React.JSX.Element {
  return (
    <svg viewBox="0 0 120 60" className={className} aria-hidden="true">
      <line x1="20" y1="48" x2="100" y2="48" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <ellipse cx="30" cy="38" rx="6" ry="6" fill="currentColor" opacity="0.7" />
      <line x1="36" y1="40" x2="65" y2="42" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="65" y1="42" x2="78" y2="34" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="78" y1="34" x2="80" y2="46" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="65" y1="42" x2="100" y2="46" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="4 3" opacity="0.5" />
      <path d="M88 42 L94 42 L91 38" stroke="#10b981" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  )
}

function SupineBridge({ className }: IllustrationProps): React.JSX.Element {
  return (
    <svg viewBox="0 0 120 60" className={className} aria-hidden="true">
      <line x1="20" y1="48" x2="100" y2="48" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <ellipse cx="30" cy="42" rx="6" ry="6" fill="currentColor" opacity="0.7" />
      <path d="M36 42 Q55 28 75 34" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
      <line x1="75" y1="34" x2="82" y2="28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="82" y1="28" x2="84" y2="46" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M55 30 L55 24" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M53 26 L55 22 L57 26" stroke="#10b981" strokeWidth="1" fill="none" strokeLinecap="round" />
    </svg>
  )
}

function SupineKneeDrop({ className }: IllustrationProps): React.JSX.Element {
  return (
    <svg viewBox="0 0 120 60" className={className} aria-hidden="true">
      <line x1="20" y1="48" x2="100" y2="48" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <ellipse cx="30" cy="38" rx="6" ry="6" fill="currentColor" opacity="0.7" />
      <line x1="36" y1="40" x2="65" y2="42" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="65" y1="42" x2="76" y2="30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="76" y1="30" x2="72" y2="46" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="65" y1="42" x2="82" y2="28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
      <line x1="82" y1="28" x2="86" y2="46" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
      <path d="M78 24 C82 20 86 24 82 28" stroke="#10b981" strokeWidth="1.5" fill="none" />
    </svg>
  )
}

function SupineMarching({ className }: IllustrationProps): React.JSX.Element {
  return (
    <svg viewBox="0 0 120 60" className={className} aria-hidden="true">
      <line x1="20" y1="48" x2="100" y2="48" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <ellipse cx="30" cy="38" rx="6" ry="6" fill="currentColor" opacity="0.7" />
      <line x1="36" y1="40" x2="65" y2="42" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="65" y1="42" x2="72" y2="22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="72" y1="22" x2="68" y2="28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="65" y1="42" x2="80" y2="32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
      <line x1="80" y1="32" x2="82" y2="46" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
      <path d="M68 18 L72 14 L74 20" stroke="#10b981" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  )
}

function SeatedBrace({ className }: IllustrationProps): React.JSX.Element {
  return (
    <svg viewBox="0 0 120 60" className={className} aria-hidden="true">
      <rect x="55" y="20" width="30" height="35" rx="3" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="1" opacity2="0.3" />
      <ellipse cx="60" cy="14" rx="5" ry="5" fill="currentColor" opacity="0.7" />
      <line x1="60" y1="19" x2="60" y2="38" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="60" y1="38" x2="55" y2="52" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="55" y1="52" x2="50" y2="52" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M56 28 Q52 30 56 32" stroke="#10b981" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  )
}

function WallPlank({ className }: IllustrationProps): React.JSX.Element {
  return (
    <svg viewBox="0 0 120 60" className={className} aria-hidden="true">
      <line x1="20" y1="55" x2="100" y2="55" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <rect x="88" y="5" width="6" height="50" rx="1" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1" opacity2="0.3" />
      <ellipse cx="60" cy="10" rx="5" ry="5" fill="currentColor" opacity="0.7" />
      <line x1="62" y1="15" x2="70" y2="38" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="70" y1="38" x2="68" y2="54" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="70" y1="38" x2="74" y2="54" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="64" y1="20" x2="88" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function SupineDeadBug({ className }: IllustrationProps): React.JSX.Element {
  return (
    <svg viewBox="0 0 120 60" className={className} aria-hidden="true">
      <line x1="20" y1="48" x2="100" y2="48" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <ellipse cx="30" cy="38" rx="6" ry="6" fill="currentColor" opacity="0.7" />
      <line x1="36" y1="40" x2="65" y2="42" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="65" y1="42" x2="68" y2="22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="68" y1="22" x2="64" y2="30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="65" y1="42" x2="95" y2="38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="4 3" opacity="0.5" />
      <line x1="42" y1="36" x2="38" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function QuadrupedHold({ className }: IllustrationProps): React.JSX.Element {
  return (
    <svg viewBox="0 0 120 60" className={className} aria-hidden="true">
      <line x1="20" y1="55" x2="100" y2="55" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <ellipse cx="38" cy="22" rx="5" ry="5" fill="currentColor" opacity="0.7" />
      <line x1="43" y1="24" x2="75" y2="26" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="48" y1="28" x2="44" y2="54" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="55" y1="28" x2="52" y2="54" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="70" y1="28" x2="68" y2="54" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="75" y1="28" x2="78" y2="54" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

function BirdDog({ className }: IllustrationProps): React.JSX.Element {
  return (
    <svg viewBox="0 0 120 60" className={className} aria-hidden="true">
      <line x1="20" y1="55" x2="100" y2="55" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <ellipse cx="38" cy="22" rx="5" ry="5" fill="currentColor" opacity="0.7" />
      <line x1="43" y1="24" x2="75" y2="26" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="48" y1="28" x2="30" y2="16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="55" y1="28" x2="52" y2="54" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="70" y1="28" x2="68" y2="54" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="75" y1="28" x2="98" y2="22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

function InclinePlank({ className }: IllustrationProps): React.JSX.Element {
  return (
    <svg viewBox="0 0 120 60" className={className} aria-hidden="true">
      <line x1="20" y1="55" x2="100" y2="55" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <rect x="82" y="30" width="14" height="25" rx="2" fill="currentColor" opacity="0.12" stroke="currentColor" strokeWidth="1" opacity2="0.3" />
      <ellipse cx="50" cy="18" rx="5" ry="5" fill="currentColor" opacity="0.7" />
      <line x1="54" y1="22" x2="72" y2="38" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="72" y1="38" x2="58" y2="54" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="72" y1="38" x2="64" y2="54" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="56" y1="26" x2="82" y2="32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function KneelingPlank({ className }: IllustrationProps): React.JSX.Element {
  return (
    <svg viewBox="0 0 120 60" className={className} aria-hidden="true">
      <line x1="20" y1="55" x2="100" y2="55" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <ellipse cx="35" cy="24" rx="5" ry="5" fill="currentColor" opacity="0.7" />
      <line x1="40" y1="26" x2="75" y2="32" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="38" y1="30" x2="32" y2="54" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="75" y1="32" x2="80" y2="54" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="75" y1="32" x2="86" y2="54" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="80" cy="54" r="2" fill="currentColor" opacity="0.4" />
    </svg>
  )
}

function CrunchIntro({ className }: IllustrationProps): React.JSX.Element {
  return (
    <svg viewBox="0 0 120 60" className={className} aria-hidden="true">
      <line x1="20" y1="48" x2="100" y2="48" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <ellipse cx="36" cy="30" rx="6" ry="6" fill="currentColor" opacity="0.7" />
      <path d="M42 32 Q52 30 58 38 Q62 42 65 42" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
      <line x1="65" y1="42" x2="80" y2="32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="80" y1="32" x2="82" y2="46" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M38 26 L42 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M46 28 L46 22" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M44 24 L46 20 L48 24" stroke="#10b981" strokeWidth="1" fill="none" strokeLinecap="round" />
    </svg>
  )
}

type ExerciseCategory =
  | 'belly-hold'
  | 'pelvic-tilt'
  | 'heel-slide'
  | 'bridge'
  | 'knee-drop'
  | 'marching'
  | 'seated-brace'
  | 'wall-plank'
  | 'dead-bug'
  | 'quadruped'
  | 'bird-dog'
  | 'incline-plank'
  | 'kneeling-plank'
  | 'crunch'

function categorizeExercise(exerciseId: string): ExerciseCategory {
  if (exerciseId.includes('belly-hold')) return 'belly-hold'
  if (exerciseId.includes('pelvic-tilt')) return 'pelvic-tilt'
  if (exerciseId.includes('heel-slide')) return 'heel-slide'
  if (exerciseId.includes('bridge')) return 'bridge'
  if (exerciseId.includes('knee-drop')) return 'knee-drop'
  if (exerciseId.includes('marching')) return 'marching'
  if (exerciseId.includes('seated-brace')) return 'seated-brace'
  if (exerciseId.includes('wall-plank')) return 'wall-plank'
  if (exerciseId.includes('dead-bug')) return 'dead-bug'
  if (exerciseId.includes('quadruped')) return 'quadruped'
  if (exerciseId.includes('bird-dog')) return 'bird-dog'
  if (exerciseId.includes('incline-plank')) return 'incline-plank'
  if (exerciseId.includes('kneeling-plank')) return 'kneeling-plank'
  if (exerciseId.includes('crunch')) return 'crunch'
  return 'belly-hold'
}

const ILLUSTRATION_MAP: Record<ExerciseCategory, React.ComponentType<IllustrationProps>> = {
  'belly-hold': SupineBellyHold,
  'pelvic-tilt': SupinePelvicTilt,
  'heel-slide': SupineHeelSlide,
  'bridge': SupineBridge,
  'knee-drop': SupineKneeDrop,
  'marching': SupineMarching,
  'seated-brace': SeatedBrace,
  'wall-plank': WallPlank,
  'dead-bug': SupineDeadBug,
  'quadruped': QuadrupedHold,
  'bird-dog': BirdDog,
  'incline-plank': InclinePlank,
  'kneeling-plank': KneelingPlank,
  'crunch': CrunchIntro,
}

interface ExerciseIllustrationProps {
  readonly exerciseId: string
  readonly className?: string
}

export function ExerciseIllustration({
  exerciseId,
  className = 'h-12 w-20 text-stone-400',
}: ExerciseIllustrationProps): React.JSX.Element {
  const category = categorizeExercise(exerciseId)
  const Component = ILLUSTRATION_MAP[category]
  return <Component className={className} />
}
