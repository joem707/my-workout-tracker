import React, { useState, useEffect } from 'react';

interface RoutineExercise {
  warmup_id?: number;
  cooldown_id?: number;
  sequence_order: number;
  exercise_name?: string;
  stretch_name?: string;
  exercise_category?: string;
  target_muscle_group?: string;
  equipment_needed?: string;
  target_sets?: number;
  target_reps?: number;
  duration_seconds?: number;
  applicable_split: string;
  safety_cue: string;
}

export default function WorkoutRoutineTabs() {
  const [activeTab, setActiveTab] = useState<'warmup' | 'cooldown'>('warmup');
  const [items, setItems] = useState<RoutineExercise[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    fetch('/api/' + activeTab)
      .then((res) => {
        if (!res.ok) throw new Error('HTTP error! status: ' + res.status);
        return res.json();
      })
      .then((data: RoutineExercise[]) => {
        if (isMounted) {
          setItems(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [activeTab]);

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', fontFamily: 'system-ui, sans-serif', padding: '0 20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '24px' }}>Workout Routine Tracker</h1>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        <button
          onClick={() => setActiveTab('warmup')}
          style={{
            flex: 1,
            padding: '12px',
            cursor: 'pointer',
            fontWeight: 600,
            border: 'none',
            borderRadius: '6px',
            backgroundColor: activeTab === 'warmup' ? '#2563eb' : '#e5e7eb',
            color: activeTab === 'warmup' ? '#fff' : '#1f2937'
          }}
        >
          Warm-Up Routine
        </button>
        <button
          onClick={() => setActiveTab('cooldown')}
          style={{
            flex: 1,
            padding: '12px',
            cursor: 'pointer',
            fontWeight: 600,
            border: 'none',
            borderRadius: '6px',
            backgroundColor: activeTab === 'cooldown' ? '#2563eb' : '#e5e7eb',
            color: activeTab === 'cooldown' ? '#fff' : '#1f2937'
          }}
        >
          Cool-Down Routine
        </button>
      </div>

      {loading && <p style={{ textAlign: 'center' }}>Loading routine from D1 database...</p>}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>Error: {error}</p>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {items.map((item, idx) => (
          <div
            key={item.warmup_id ?? item.cooldown_id ?? idx}
            style={{
              padding: '16px',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              backgroundColor: '#fff',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <h3 style={{ margin: 0 }}>
                {item.sequence_order}. {item.exercise_name ?? item.stretch_name}
              </h3>
              <span style={{ fontSize: '12px', padding: '2px 8px', borderRadius: '999px', backgroundColor: '#e0f2fe', color: '#0369a1' }}>
                {item.applicable_split}
              </span>
            </div>

            <p style={{ margin: '4px 0', fontSize: '14px', color: '#4b5563' }}>
              {item.target_sets ? 'Sets: ' + item.target_sets + ' | ' : ''}
              {item.target_reps ? 'Reps: ' + item.target_reps + ' | ' : ''}
              {item.duration_seconds ? 'Duration: ' + item.duration_seconds + 's' : ''}
              {item.equipment_needed ? ' | Equipment: ' + item.equipment_needed : ''}
              {item.target_muscle_group ? 'Target: ' + item.target_muscle_group : ''}
            </p>

            <p style={{ margin: '8px 0 0', fontSize: '13px', fontStyle: 'italic', color: '#6b7280' }}>
              💡 {item.safety_cue}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}