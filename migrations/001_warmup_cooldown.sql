-- 1. Warm-Up Exercises Table
CREATE TABLE IF NOT EXISTS warmup_exercises (
    warmup_id INTEGER PRIMARY KEY AUTOINCREMENT,
    sequence_order INT NOT NULL,
    exercise_name TEXT NOT NULL,
    exercise_category TEXT NOT NULL,
    equipment_needed TEXT NOT NULL,
    target_sets INT NOT NULL DEFAULT 1,
    target_reps INT,
    duration_seconds INT,
    applicable_split TEXT NOT NULL,
    safety_cue TEXT NOT NULL
);

-- 2. Cool-Down Exercises Table
CREATE TABLE IF NOT EXISTS cooldown_exercises (
    cooldown_id INTEGER PRIMARY KEY AUTOINCREMENT,
    sequence_order INT NOT NULL,
    target_muscle_group TEXT NOT NULL,
    stretch_name TEXT NOT NULL,
    duration_seconds INT NOT NULL DEFAULT 30,
    is_bilateral INTEGER NOT NULL DEFAULT 1,
    applicable_split TEXT NOT NULL,
    safety_cue TEXT NOT NULL
);

-- Seed Pre-Workout
INSERT INTO warmup_exercises 
(sequence_order, exercise_name, exercise_category, equipment_needed, target_sets, target_reps, duration_seconds, applicable_split, safety_cue) 
VALUES
(1, 'Cardiovascular Primer', 'CARDIO_PRIMER', 'Elliptical, Bike, or Rower', 1, NULL, 180, 'ALL', 'Maintain an easy Zone 1 conversational pace to gently elevate core temperature and promote synovial fluid flow.'),
(2, 'Quadruped Cat-Cow', 'MOBILITY', 'Workout Mat', 1, 10, NULL, 'ALL', 'Actively push the floor away at the peak of the curve to recruit the serratus anterior and optimize scapular glide.'),
(3, 'Side-Lying DB External Rotations', 'ACTIVATION', '2.5 lb Dumbbell, Rolled Towel, Mat', 2, 15, NULL, 'UPPER', 'Keep rolled towel pinned between upper elbow and ribs. Rotate forearm upward without shrugging to safely activate infraspinatus and teres minor.'),
(4, 'Banded W-Rotations (No-Moneys)', 'ACTIVATION', 'Light Resistance Band', 1, 15, NULL, 'UPPER', 'Elbows pinned to sides at 90 degrees, palms facing up. Rotate forearms outward and gently retract shoulder blades without arm flare.');

-- Seed Post-Workout
INSERT INTO cooldown_exercises 
(sequence_order, target_muscle_group, stretch_name, duration_seconds, is_bilateral, applicable_split, safety_cue) 
VALUES
(1, 'Chest / Anterior Shoulder', 'Low-Arm Doorway Pec Stretch', 30, 1, 'UPPER', 'Hand against frame at or below waist level. Never elevate arm past shoulder plane or allow it to be forced behind the torso.'),
(2, 'Lats & Thoracic Spine', 'Bench-Assisted Child''s Pose', 30, 0, 'ALL', 'Palms rest neutrally on edge of flat bench. Gently sink hips back toward heels. Opens subacromial joint space without impingement.'),
(3, 'Hip Flexors & Quads', 'Half-Kneeling Hip Flexor Stretch', 30, 1, 'LOWER', 'Knee cushioned on mat. Squeeze rear glute and shift weight forward 1-2 inches. Maintain an upright torso and neutral lumbar spine.'),
(4, 'Glutes & Piriformis', 'Supine Figure-4 Stretch', 30, 1, 'LOWER', 'Lie flat on back with spine supported by floor. Cross ankle over opposite knee and gently pull thigh toward chest.'),
(5, 'Calves & Lower Legs', 'Wall Calf & Achilles Stretch', 30, 1, 'LOWER', 'Hands against wall at chest height. Keep rear heel flat on the floor; repeat with a slightly bent knee to stretch the soleus.');
