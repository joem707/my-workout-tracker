import { useState } from 'react';

type RoutinePhase = 'warmup' | 'cooldown';

type RoutineItem = {
  name: string;
  description: string;
  durationSeconds: number;
};

const routines: Record<RoutinePhase, RoutineItem[]> = {
  warmup: [
    {
      name: 'Brisk walk',
      description: 'Raise your heart rate with an easy, steady walk.',
      durationSeconds: 180,
    },
    {
      name: 'Arm circles',
      description: 'Make controlled forward and backward circles with both arms.',
      durationSeconds: 60,
    },
    {
      name: 'Leg swings',
      description: 'Hold a support and swing each leg gently front to back.',
      durationSeconds: 60,
    },
  ],
  cooldown: [
    {
      name: 'Easy walk',
      description: 'Walk slowly until your breathing begins to settle.',
      durationSeconds: 180,
    },
    {
      name: 'Standing quadriceps stretch',
      description: 'Hold each side gently without bouncing.',
      durationSeconds: 60,
    },
    {
      name: 'Hamstring stretch',
      description: 'Hinge at the hips and hold a comfortable stretch on each side.',
      durationSeconds: 60,
    },
  ],
};

const phases: { id: RoutinePhase; label: string }[] = [
  { id: 'warmup', label: 'Pre-Workout' },
  { id: 'cooldown', label: 'Post-Workout' },
];

function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (remainingSeconds === 0) {
    return `${minutes} min`;
  }

  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export default function WorkoutRoutineTabs() {
  const [activePhase, setActivePhase] = useState<RoutinePhase>('warmup');

  return (
    <section aria-label="Workout routines" style={{ maxWidth: 640, color: '#20332d' }}>
      <div
        aria-label="Workout phase"
        role="tablist"
        style={{ display: 'flex', gap: 8, borderBottom: '1px solid #d6e1dc' }}
      >
        {phases.map((phase) => {
          const isActive = activePhase === phase.id;

          return (
            <button
              key={phase.id}
              id={`${phase.id}-tab`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`${phase.id}-panel`}
              onClick={() => setActivePhase(phase.id)}
              style={{
                padding: '12px 16px',
                border: 0,
                borderBottom: isActive ? '3px solid #16745b' : '3px solid transparent',
                background: 'transparent',
                color: isActive ? '#145d49' : '#61736c',
                cursor: 'pointer',
                font: 'inherit',
                fontWeight: isActive ? 700 : 500,
              }}
            >
              {phase.label}
            </button>
          );
        })}
      </div>

      {phases.map((phase) => (
        <div
          key={phase.id}
          id={`${phase.id}-panel`}
          role="tabpanel"
          aria-labelledby={`${phase.id}-tab`}
          hidden={activePhase !== phase.id}
          style={{ paddingTop: 8 }}
        >
          <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {routines[phase.id].map((item, index) => (
              <li
                key={item.name}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '32px 1fr auto',
                  alignItems: 'start',
                  gap: 12,
                  padding: '16px 4px',
                  borderBottom: '1px solid #e5ece8',
                }}
              >
                <span aria-hidden="true" style={{ color: '#75877f', fontVariantNumeric: 'tabular-nums' }}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 style={{ margin: '0 0 4px', fontSize: 16 }}>{item.name}</h3>
                  <p style={{ margin: 0, color: '#61736c', lineHeight: 1.5 }}>{item.description}</p>
                </div>
                <span style={{ color: '#145d49', fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap' }}>
                  {formatDuration(item.durationSeconds)}
                </span>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </section>
  );
}