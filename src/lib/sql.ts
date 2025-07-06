export const initDBQuery = `
CREATE TABLE IF NOT EXISTS space (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL CHECK (char_length(name) > 0),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS status (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  color VARCHAR(7) NOT NULL DEFAULT '#64748b',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tag (
  id SERIAL PRIMARY KEY, 
  name TEXT UNIQUE NOT NULL,
  color VARCHAR(7) DEFAULT '#64748b',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS task (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL CHECK (char_length(title) > 0),
  description TEXT,
  due_date TIMESTAMP,
  space_id INT NOT NULL REFERENCES space(id) ON DELETE CASCADE,
  status_id INT NOT NULL REFERENCES status(id) DEFAULT 1,
  priority TEXT NOT NULL DEFAULT 'normal' CHECK (priority IN ('urgent', 'high', 'normal', 'low')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sub_task (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL CHECK (char_length(title) > 0),
  completed BOOLEAN NOT NULL DEFAULT false,
  task_id INT NOT NULL REFERENCES task(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE IF NOT EXISTS task_tag (
  task_id INT NOT NULL REFERENCES task(id) ON DELETE CASCADE,
  tag_id INT NOT NULL REFERENCES tag(id) ON DELETE CASCADE,
  PRIMARY KEY (task_id, tag_id)
);

CREATE INDEX IF NOT EXISTS task_space_idx ON task(space_id);
CREATE INDEX IF NOT EXISTS task_status_idx ON task(status_id);
CREATE INDEX IF NOT EXISTS task_due_date_idx ON task(due_date);
CREATE INDEX IF NOT EXISTS sub_task_task_id_idx ON sub_task(task_id);

`

// -- Insert default statuses with colors
// INSERT INTO status (name, color) VALUES
//   ('Todo',        '#fbbf24'),
//   ('In Progress', '#3b82f6'),
//   ('Done',        '#22c55e')
// ON CONFLICT (name) DO NOTHING;

// -- Insert sample tags
// INSERT INTO tag (name, color) VALUES
//   ('personal', '#10B981'),
//   ('important', '#F59E42'),
//   ('idea', '#2563EB')
// ON CONFLICT (name) DO NOTHING;

export const initDummyDataQuery = `
-- Insert default statuses with colors
INSERT INTO status (name, color) VALUES
  ('Todo',         '#fbbf24'),
  ('In Progress',  '#3b82f6'),
  ('Review',       '#f472b6'),
  ('Blocked',      '#ef4444'),
  ('Done',         '#22c55e')
ON CONFLICT (name) DO NOTHING;

-- Insert sample spaces
INSERT INTO space (name) VALUES
  ('Personal Projects'),
  ('Work Tasks'),
  ('Learning & Growth')
ON CONFLICT DO NOTHING;

-- Insert sample tags
INSERT INTO tag (name, color) VALUES
  ('urgent',      '#ef4444'),
  ('frontend',    '#8b5cf6'),
  ('backend',     '#06b6d4'),
  ('design',      '#f59e0b'),
  ('meeting',     '#10b981'),
  ('documentation','#f472b6'),
  ('research',    '#facc15'),
  ('automation',  '#6366f1')
ON CONFLICT (name) DO NOTHING;

-- Insert sample tasks
INSERT INTO task (title, description, due_date, space_id, status_id, priority) VALUES
  ('Build Portfolio Website', 'Create a personal portfolio to showcase projects.', '2025-07-10 23:59:00', 1, 1, 'high'),
  ('Write Blog Post', 'Draft a new technical blog post about React hooks.', '2025-07-12 20:00:00', 1, 2, 'normal'),
  ('Update Resume', 'Add recent experience and skills to resume.', '2025-07-15 18:00:00', 1, 1, 'normal'),
  ('Plan Vacation', 'Research destinations and book flights.', '2025-07-20 12:00:00', 1, 3, 'low'),
  ('Read New Book', 'Finish reading "Atomic Habits".', '2025-07-22 22:00:00', 1, 1, 'low'),
  ('Organize Photos', 'Sort and backup digital photos.', '2025-07-25 17:00:00', 1, 2, 'low'),
  ('Home Automation', 'Set up smart lights and routines.', '2025-07-28 21:00:00', 1, 4, 'normal'),
  ('Fitness Tracker', 'Log workouts for the week.', '2025-07-30 09:00:00', 1, 1, 'normal'),
  ('Gardening', 'Plant new herbs in the balcony garden.', '2025-08-01 08:00:00', 1, 3, 'low'),
  ('Budget Planning', 'Review monthly expenses and savings.', '2025-08-03 10:00:00', 1, 2, 'high'),
  ('Learn TypeScript', 'Complete TypeScript course on Udemy.', '2025-08-05 20:00:00', 1, 1, 'high'),
  ('Photography Walk', 'Take photos around the city.', '2025-08-07 16:00:00', 1, 1, 'normal'),
  ('Meal Prep', 'Plan and prep meals for the week.', '2025-08-09 14:00:00', 1, 5, 'normal'),
  ('Car Maintenance', 'Schedule oil change and tire rotation.', '2025-08-11 11:00:00', 1, 1, 'normal'),
  ('Family Call', 'Catch up with family on video call.', '2025-08-13 19:00:00', 1, 2, 'low'),
  ('Volunteer Work', 'Sign up for local community event.', '2025-08-15 13:00:00', 1, 3, 'normal'),
  ('Language Practice', 'Practice Spanish with Duolingo.', '2025-08-17 18:00:00', 1, 1, 'normal'),
  ('Meditation', 'Daily meditation for 10 minutes.', '2025-08-19 07:00:00', 1, 5, 'low'),
  ('Declutter Desk', 'Organize and clean workspace.', '2025-08-21 15:00:00', 1, 2, 'normal'),
  ('Backup Laptop', 'Backup important files to cloud.', '2025-08-23 20:00:00', 1, 1, 'high'),

  ('Sprint Planning', 'Plan tasks for the next sprint.', '2025-07-11 10:00:00', 2, 1, 'high'),
  ('Client Meeting', 'Discuss project requirements with client.', '2025-07-13 15:00:00', 2, 2, 'urgent'),
  ('Code Review', 'Review pull requests from team.', '2025-07-16 17:00:00', 2, 3, 'normal'),
  ('Deploy to Production', 'Release new version to production.', '2025-07-18 22:00:00', 2, 4, 'urgent'),
  ('Write Documentation', 'Document new API endpoints.', '2025-07-21 14:00:00', 2, 2, 'normal'),
  ('Bug Triage', 'Prioritize and assign new bugs.', '2025-07-24 11:00:00', 2, 1, 'high'),
  ('Team Retrospective', 'Reflect on last sprint and improvements.', '2025-07-27 16:00:00', 2, 5, 'normal'),

  ('Watch React Conf', 'Watch recorded sessions from React Conf.', '2025-07-14 18:00:00', 3, 1, 'normal'),
  ('Complete SQL Tutorial', 'Finish advanced SQL exercises.', '2025-07-17 20:00:00', 3, 2, 'high'),
  ('Read Tech Article', 'Read latest article on AI trends.', '2025-07-19 09:00:00', 3, 3, 'normal'),
  ('Build Side Project', 'Start a new open-source project.', '2025-07-22 13:00:00', 3, 1, 'high'),
  ('Join Webinar', 'Attend webinar on productivity.', '2025-07-25 12:00:00', 3, 5, 'normal')
ON CONFLICT DO NOTHING;

-- Insert sub-tasks for some tasks
INSERT INTO sub_task (title, completed, task_id) VALUES
('Buy domain name', false, 1),
  ('Set up hosting', false, 1),
  ('Write draft', false, 2),
  ('Research destinations', true, 4),
  ('Book flights', false, 4),
  ('Sort 2024 photos', false, 6),
  ('Set up smart bulbs', true, 7),
  ('Create workout plan', false, 8),
  ('Plant basil', true, 9),
  ('List expenses', false, 10),
  ('Watch intro videos', true, 11),
  ('Scout locations', false, 12),
  ('Make shopping list', false, 13),
  ('Schedule appointment', false, 14),
  ('Send invites', true, 15),
  ('Find event', false, 16),
  ('Review vocabulary', false, 17),
  ('Set up meditation app', true, 18),
  ('Order new mousepad', false, 19),
  ('Choose backup service', false, 20),
  ('Prepare agenda', false, 21),
  ('Send meeting notes', false, 22),
  ('Check PR guidelines', false, 23),
  ('Tag release', false, 24),
  ('Write endpoint docs', false, 25),
  ('Assign bugs', false, 26),
  ('Prepare slides', false, 27),
  ('List topics', false, 28),
  ('Finish exercises', false, 29),
  ('Summarize article', false, 30),
  ('Create repo', false, 31),
  ('Register for webinar', false, 32)
ON CONFLICT DO NOTHING;

-- Connect tasks with tags
INSERT INTO task_tag (task_id, tag_id) VALUES
  (1, 2), (1, 4),
  (2, 6),
  (3, 7),
  (4, 1), (4, 7),
  (5, 7),
  (6, 4),
  (7, 8),
  (8, 5),
  (9, 4),
  (10, 7),
  (11, 2), (11, 8),
  (12, 2),
  (13, 7),
  (14, 1),
  (15, 5),
  (16, 7),
  (17, 7),
  (18, 5),
  (19, 4),
  (20, 8),
  (21, 5),
  (22, 5),
  (23, 3),
  (24, 3),
  (25, 6),
  (26, 1),
  (27, 5),
  (28, 7),
  (29, 6),
  (30, 7),
  (31, 8),
  (32, 7)
ON CONFLICT DO NOTHING;

`

export const resetDBQuery = `
	DROP TABLE IF EXISTS task_tag CASCADE;
  DROP TABLE IF EXISTS sub_task CASCADE;
  DROP TABLE IF EXISTS task CASCADE;
  DROP TABLE IF EXISTS tag CASCADE;
  DROP TABLE IF EXISTS status CASCADE;
  DROP TABLE IF EXISTS space CASCADE;
`
