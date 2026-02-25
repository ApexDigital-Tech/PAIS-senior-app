-- ============================================
-- PAIS — Activity & Audit Logs
-- Tracks sensitive actions for HIPAA compliance & oversight
-- ============================================

CREATE TABLE IF NOT EXISTS activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action TEXT NOT NULL, -- e.g., 'SOS_TRIGGERED', 'MED_TAKEN', 'TRIP_REQUESTED'
  entity_type TEXT NOT NULL, -- e.g., 'sos_alerts', 'medications', 'transport_requests'
  entity_id UUID,
  metadata JSONB DEFAULT '{}'::jsonb, -- Store details like location, old/new values
  ip_address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for auditing by user and action
CREATE INDEX idx_activity_user ON activity_log(user_id);
CREATE INDEX idx_activity_action ON activity_log(action);
CREATE INDEX idx_activity_created ON activity_log(created_at);

-- RLS
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can see all logs"
  ON activity_log FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Users can see own action logs"
  ON activity_log FOR SELECT
  USING (auth.uid() = user_id);

-- Function to log activity from database triggers/functions
CREATE OR REPLACE FUNCTION log_activity(
  p_user_id UUID,
  p_action TEXT,
  p_entity_type TEXT,
  p_entity_id UUID,
  p_metadata JSONB DEFAULT '{}'::jsonb
) RETURNS VOID AS $$
BEGIN
  INSERT INTO activity_log (user_id, action, entity_type, entity_id, metadata)
  VALUES (p_user_id, p_action, p_entity_type, p_entity_id, p_metadata);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
