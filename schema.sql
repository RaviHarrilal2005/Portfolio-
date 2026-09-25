-- Replace {{ADMIN_USER_ID}} with the portfolio owner's auth.users UUID before execution.
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  tech_stack TEXT[] NOT NULL DEFAULT '{}',
  github_url VARCHAR(500),
  demo_url VARCHAR(500),
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE guestbook (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  user_github_handle VARCHAR(255) NOT NULL,
  avatar_url VARCHAR(500),
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_projects_featured ON projects(featured);
CREATE INDEX idx_guestbook_user_id ON guestbook(user_id);
CREATE INDEX idx_guestbook_created_at ON guestbook(created_at DESC);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE guestbook ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Projects are publicly readable"
ON projects FOR SELECT USING (true);

CREATE POLICY "Admin can insert projects"
ON projects FOR INSERT
WITH CHECK (auth.uid() = '{{ADMIN_USER_ID}}'::uuid);

CREATE POLICY "Admin can update projects"
ON projects FOR UPDATE
USING (auth.uid() = '{{ADMIN_USER_ID}}'::uuid)
WITH CHECK (auth.uid() = '{{ADMIN_USER_ID}}'::uuid);

CREATE POLICY "Admin can delete projects"
ON projects FOR DELETE
USING (auth.uid() = '{{ADMIN_USER_ID}}'::uuid);

CREATE POLICY "Guestbook messages are publicly readable"
ON guestbook FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert their own messages"
ON guestbook FOR INSERT
WITH CHECK (auth.uid() = user_id AND auth.role() = 'authenticated');
