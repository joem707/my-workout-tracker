CREATE TABLE workout_routine_items (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    phase VARCHAR(10) NOT NULL CHECK (phase IN ('warmup', 'cooldown')),
    name VARCHAR(120) NOT NULL,
    description TEXT NOT NULL,
    duration_seconds INTEGER NOT NULL CHECK (duration_seconds > 0),
    sort_order INTEGER NOT NULL CHECK (sort_order > 0),
    UNIQUE (phase, sort_order)
);

INSERT INTO workout_routine_items (phase, name, description, duration_seconds, sort_order)
VALUES
    ('warmup', 'Brisk walk', 'Raise your heart rate with an easy, steady walk.', 180, 1),
    ('warmup', 'Arm circles', 'Make controlled forward and backward circles with both arms.', 60, 2),
    ('warmup', 'Leg swings', 'Hold a support and swing each leg gently front to back.', 60, 3),
    ('cooldown', 'Easy walk', 'Walk slowly until your breathing begins to settle.', 180, 1),
    ('cooldown', 'Standing quadriceps stretch', 'Hold each side gently without bouncing.', 60, 2),
    ('cooldown', 'Hamstring stretch', 'Hinge at the hips and hold a comfortable stretch on each side.', 60, 3);