export const initQuery = `
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

-- Insert default statuses with colors
INSERT INTO status (name, color) VALUES
  ('Todo',        '#fbbf24'),  -- Amber
  ('In Progress', '#3b82f6'),  -- Blue
  ('Done',        '#22c55e')   -- Green
ON CONFLICT (name) DO NOTHING;

CREATE INDEX IF NOT EXISTS task_space_idx ON task(space_id);
CREATE INDEX IF NOT EXISTS task_status_idx ON task(status_id);
CREATE INDEX IF NOT EXISTS task_due_date_idx ON task(due_date);
CREATE INDEX IF NOT EXISTS sub_task_task_id_idx ON sub_task(task_id);
`
