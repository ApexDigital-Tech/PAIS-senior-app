-- ============================================
-- PAIS — Extra Entities Migration
-- Creates missing tables from the Tech Stack diagram:
-- health_records, volunteers, emergency_contacts
-- ============================================

-- 1. Health Records
CREATE TABLE IF NOT EXISTS health_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    senior_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    record_type TEXT NOT NULL CHECK (record_type IN ('diagnosis', 'allergy', 'condition')),
    description TEXT NOT NULL,
    severity TEXT CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    recorded_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Volunteers Details
CREATE TABLE IF NOT EXISTS volunteers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    bio TEXT,
    languages TEXT[],
    activities TEXT[],
    availability TEXT[],
    rating_avg FLOAT DEFAULT 0.0,
    total_hours INTEGER DEFAULT 0,
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Emergency Contacts
CREATE TABLE IF NOT EXISTS emergency_contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    senior_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    relationship TEXT,
    priority INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_health_records_senior ON health_records(senior_id);
CREATE INDEX IF NOT EXISTS idx_emergency_contacts_senior ON emergency_contacts(senior_id);
CREATE INDEX IF NOT EXISTS idx_volunteers_user ON volunteers(user_id);

-- RLS Enablement
ALTER TABLE health_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE emergency_contacts ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Health Records
CREATE POLICY "Seniors and linked family can view health records"
  ON health_records FOR SELECT
  USING (
    auth.uid() = senior_id OR 
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND (
        linked_senior_id = health_records.senior_id OR role = 'medico'
      )
    )
  );

CREATE POLICY "Seniors can manage their own health records"
  ON health_records FOR ALL
  USING (auth.uid() = senior_id);

-- Volunteers
CREATE POLICY "Everyone can view volunteer profiles"
  ON volunteers FOR SELECT
  USING (true);

CREATE POLICY "Volunteers can update their own data"
  ON volunteers FOR UPDATE
  USING (auth.uid() = user_id);

-- Emergency Contacts
CREATE POLICY "Seniors and linked family can view emergency contacts"
  ON emergency_contacts FOR SELECT
  USING (
    auth.uid() = senior_id OR 
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND linked_senior_id = emergency_contacts.senior_id
    )
  );

CREATE POLICY "Seniors can manage their own emergency contacts"
  ON emergency_contacts FOR ALL
  USING (auth.uid() = senior_id);
