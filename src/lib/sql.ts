export const initDBQuery = `
CREATE TABLE IF NOT EXISTS space (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL CHECK (char_length(name) > 0),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS status (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL CHECK (name IN ('Todo', 'In Progress', 'Done')),
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

export const initDummyDataQuery = `
-- Insert default statuses with colors
INSERT INTO status (name, color) VALUES
  ('Todo',        '#fbbf24'),
  ('In Progress', '#3b82f6'),
  ('Done',        '#22c55e')
ON CONFLICT (name) DO NOTHING;

-- Insert sample spaces
INSERT INTO space (name) VALUES
  ('Personal Projects'),
  ('Work Tasks')
ON CONFLICT DO NOTHING;

-- Insert sample tags
INSERT INTO tag (name, color) VALUES
  ('urgent', '#ef4444'),
  ('frontend', '#8b5cf6'),
  ('backend', '#06b6d4'),
  ('design', '#f59e0b'),
  ('meeting', '#10b981')
ON CONFLICT (name) DO NOTHING;

-- Insert sample tasks
INSERT INTO task (title, description, due_date, space_id, status_id, priority) VALUES
  (
    'Build Landing Page',
    'Create a responsive landing page for the new product launch',
    '2025-06-25 17:00:00',
    1,
    1,
    'high'
  ),
  (
    'API Integration',
    'Integrate third-party payment API into the application',
    '2025-06-22 12:00:00',
    1,
    2,
    'urgent'
  ),
  (
    'Team Standup Meeting',
    'Daily standup meeting with the development team',
    '2025-06-19 10:00:00',
    2,
    3,
    'normal'
  ),
  (
    'Database Optimization',
    'Optimize database queries and add proper indexing',
    '2025-06-28 16:00:00',
    2,
    1,
    'high'
  ),
  (
    'User Interface Redesign',
    'Redesign the main dashboard interface based on user feedback',
    '2025-07-05 18:00:00',
    1,
    2,
    'normal'
  )
ON CONFLICT DO NOTHING;

-- Insert sub-tasks for some tasks
INSERT INTO sub_task (title, completed, task_id) VALUES
  ('Create wireframes and mockups', false, 1),
  ('Set up HTML structure', false, 1),
  ('Research API documentation', true, 2),
  ('Implement authentication flow', false, 2),
  ('Analyze slow queries', false, 4),
  ('Add missing indexes', false, 4)
ON CONFLICT DO NOTHING;

-- Connect tasks with tags
INSERT INTO task_tag (task_id, tag_id) VALUES
  (1, 2),
  (1, 4),
  (2, 1),
  (2, 3),
  (3, 5),
  (4, 1),
  (4, 3),
  (5, 2),
  (5, 4)
ON CONFLICT DO NOTHING;`
