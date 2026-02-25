-- ============================================
-- PAIS — RLS Privacy Refactor
-- Refines access control for family/caregivers and medical staff
-- ============================================

-- 1. Redefine 'users' policies
DROP POLICY IF EXISTS "Users can view own profile" ON users;
CREATE POLICY "Users can view own profile and linked seniors"
  ON users FOR SELECT
  USING (
    auth.uid() = id OR 
    auth.uid() IN (SELECT u.id FROM users u WHERE u.linked_senior_id = users.id)
  );

-- 2. Refactor 'transport_requests'
DROP POLICY IF EXISTS "Seniors can view own trips" ON transport_requests;
CREATE POLICY "Seniors and linked family can view trips"
  ON transport_requests FOR SELECT
  USING (
    auth.uid() = senior_id OR 
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND linked_senior_id = transport_requests.senior_id
    )
  );

-- 3. Refactor 'medications'
DROP POLICY IF EXISTS "Health professionals/Family can view medications" ON medications;
CREATE POLICY "Seniors and linked family can view medications"
  ON medications FOR SELECT
  USING (
    auth.uid() = user_id OR 
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND (
        linked_senior_id = medications.user_id OR role = 'medico'
      )
    )
  );

-- 4. Refactor 'sos_alerts'
DROP POLICY IF EXISTS "Admins/Family can see SOS alerts" ON sos_alerts;
CREATE POLICY "Seniors and linked family can see SOS alerts"
  ON sos_alerts FOR SELECT
  USING (
    auth.uid() = user_id OR 
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND (
        linked_senior_id = sos_alerts.user_id OR role = 'admin'
      )
    )
  );

-- 5. Refactor 'companion_requests'
DROP POLICY IF EXISTS "Seniors can see their own requests" ON companion_requests;
CREATE POLICY "Seniors and linked family can see companion requests"
  ON companion_requests FOR SELECT
  USING (
    auth.uid() = senior_id OR 
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND linked_senior_id = companion_requests.senior_id
    )
  );
