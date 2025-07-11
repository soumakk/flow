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

export const initDummyDataQuery = `
-- Insert default statuses with colors
INSERT INTO status (name, color) VALUES
  ('Todo', '#fbbf24'),
  ('In Progress', '#3b82f6'),
  ('Blocked', '#ef4444'),
  ('Done', '#22c55e')
ON CONFLICT (name) DO NOTHING;

-- Insert work-related space
INSERT INTO space (name) VALUES
  ('Work & Development')
ON CONFLICT DO NOTHING;

-- Insert sample tags
INSERT INTO tag (name, color) VALUES
  ('work', '#10B981'),
  ('urgent', '#F59E42'),
  ('learning', '#2563EB'),
  ('planning', '#f472b6'),
  ('collaboration', '#facc15')
ON CONFLICT (name) DO NOTHING;

-- Insert work-focused tasks with due_date in YYYY-MM-DD format
INSERT INTO task (title, description, due_date, space_id, status_id, priority) VALUES
  ('Implement Login Feature', 'Develop and test the login functionality.', '2025-07-14', 1, 1, 'high'),
  ('Fix Critical Bug #123', 'Resolve the critical bug affecting user sessions.', '2025-07-12', 1, 3, 'urgent'),
  ('Code Refactoring', 'Improve code quality and structure.', '2025-07-21', 1, 2, 'normal'),
  ('Write Unit Tests', 'Create unit tests for new features.', '2025-07-17', 1, 1, 'high'),
  ('Review Pull Requests', 'Review code submitted by team members.', '2025-07-10', 1, 2, 'normal'),
  ('Fix UI Bugs', 'Resolve bugs in the user interface.', '2025-07-13', 1, 3, 'normal'),
  ('Optimize Database Queries', 'Improve query performance.', '2025-07-19', 1, 4, 'high'),
  ('Deploy to Production', 'Deploy the latest version to production.', '2025-07-15', 1, 1, 'high'),
  ('Update API Documentation', 'Update docs for the latest API changes.', '2025-07-22', 1, 2, 'normal'),
  ('Conduct Code Audit', 'Audit codebase for security and quality.', '2025-07-27', 1, 3, 'normal')
ON CONFLICT DO NOTHING;

-- Insert subtasks for each work-related task (some marked as completed)
INSERT INTO sub_task (title, completed, task_id) VALUES
  ('Design login UI', true, 1),
  ('Implement backend logic', false, 1),
  ('Write integration tests', false, 1),
  ('Identify bug cause', true, 2),
  ('Fix bug', true, 2),
  ('Test fix', false, 2),
  ('Analyze codebase', false, 3),
  ('Refactor modules', false, 3),
  ('Run tests', false, 3),
  ('Write test cases', true, 4),
  ('Automate tests', false, 4),
  ('Review code style', true, 5),
  ('Approve changes', true, 5),
  ('Identify UI issues', true, 6),
  ('Fix UI bugs', false, 6),
  ('Profile queries', false, 7),
  ('Optimize queries', true, 7),
  ('Prepare deployment', true, 8),
  ('Deploy', false, 8),
  ('Verify deployment', false, 8),
  ('Update docs', true, 9),
  ('Review docs', false, 9),
  ('Scan for vulnerabilities', false, 10),
  ('Fix issues', false, 10)
ON CONFLICT DO NOTHING;

-- Connect tasks with tags (each task has 2 tags)
INSERT INTO task_tag (task_id, tag_id) VALUES
  (1, 1),
  (1, 4),
  (2, 2),
  (2, 1),
  (3, 1),
  (3, 3),
  (4, 3),
  (4, 1),
  (5, 5),
  (5, 1),
  (6, 1),
  (6, 2),
  (7, 1),
  (7, 3),
  (8, 1),
  (8, 4),
  (9, 3),
  (9, 4),
  (10, 5),
  (10, 1)
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
