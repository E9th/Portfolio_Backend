-- Create comments table for portfolio website
CREATE TABLE IF NOT EXISTS comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries on approved comments
CREATE INDEX IF NOT EXISTS idx_comments_approved ON comments(is_approved);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments(created_at DESC);

-- Enable Row Level Security
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert comments (they go to pending approval)
CREATE POLICY "Anyone can submit comments" ON comments
  FOR INSERT
  WITH CHECK (true);

-- Policy: Anyone can view approved comments only
CREATE POLICY "Anyone can view approved comments" ON comments
  FOR SELECT
  USING (is_approved = true);

-- Policy: Service role can do everything (for admin operations)
CREATE POLICY "Service role full access" ON comments
  FOR ALL
  USING (auth.role() = 'service_role');
