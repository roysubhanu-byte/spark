-- Spark App Schema
-- Users, saved ideas, active plans, completed tasks


-- PROFILES (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  deck_pref TEXT DEFAULT 'all' CHECK (deck_pref IN ('physical', 'digital', 'saas', 'all')),
  channel_pref TEXT DEFAULT 'both' CHECK (channel_pref IN ('online', 'offline', 'both')),
  interests TEXT[] DEFAULT '{}',
  region TEXT DEFAULT 'US' CHECK (region IN ('US', 'IN', 'AE', 'RU', 'KZ')),
  onboarding_done BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- SAVED IDEAS
CREATE TABLE IF NOT EXISTS saved_ideas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  idea_id TEXT NOT NULL,
  saved_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, idea_id)
);

ALTER TABLE saved_ideas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own saves" ON saved_ideas FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own saves" ON saved_ideas FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own saves" ON saved_ideas FOR DELETE USING (auth.uid() = user_id);

-- ACTIVE PLANS (30-day launch plans)
CREATE TABLE IF NOT EXISTS active_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  idea_id TEXT NOT NULL,
  idea_name TEXT NOT NULL,
  idea_image TEXT NOT NULL,
  started_at DATE DEFAULT CURRENT_DATE,
  streak INTEGER DEFAULT 0,
  last_active_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, idea_id)
);

ALTER TABLE active_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own plans" ON active_plans FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own plans" ON active_plans FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own plans" ON active_plans FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own plans" ON active_plans FOR DELETE USING (auth.uid() = user_id);

-- PLAN TASKS (completed days within a plan)
CREATE TABLE IF NOT EXISTS plan_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id UUID REFERENCES active_plans(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  day INTEGER NOT NULL CHECK (day >= 1 AND day <= 30),
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  UNIQUE(plan_id, day)
);

ALTER TABLE plan_tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own tasks" ON plan_tasks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own tasks" ON plan_tasks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own tasks" ON plan_tasks FOR UPDATE USING (auth.uid() = user_id);

-- TODOS (quick actions from stories)
CREATE TABLE IF NOT EXISTS todos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  idea_id TEXT NOT NULL,
  idea_name TEXT NOT NULL,
  section TEXT NOT NULL,
  section_label TEXT NOT NULL,
  text TEXT NOT NULL,
  done BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE todos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own todos" ON todos FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own todos" ON todos FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own todos" ON todos FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own todos" ON todos FOR DELETE USING (auth.uid() = user_id);

-- SWIPE HISTORY (analytics + don't show again)
CREATE TABLE IF NOT EXISTS swipe_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  idea_id TEXT NOT NULL,
  action TEXT NOT NULL CHECK (action IN ('save', 'skip', 'tap')),
  swiped_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, idea_id, action)
);

ALTER TABLE swipe_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own history" ON swipe_history FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own history" ON swipe_history FOR INSERT WITH CHECK (auth.uid() = user_id);

-- AUTO-CREATE PROFILE ON SIGNUP
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id) VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_saved_ideas_user ON saved_ideas(user_id);
CREATE INDEX IF NOT EXISTS idx_active_plans_user ON active_plans(user_id);
CREATE INDEX IF NOT EXISTS idx_plan_tasks_plan ON plan_tasks(plan_id);
CREATE INDEX IF NOT EXISTS idx_todos_user ON todos(user_id);
CREATE INDEX IF NOT EXISTS idx_swipe_history_user ON swipe_history(user_id);
