-- Phase 5: Health Module Migration

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "postgis";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Update existing enums or create new ones
DO $$ BEGIN
    CREATE TYPE medication_status AS ENUM ('active', 'completed', 'paused');
    CREATE TYPE log_status AS ENUM ('taken', 'skipped', 'missed');
    CREATE TYPE appointment_type AS ENUM ('presencial', 'teleconsulta', 'estudio');
    CREATE TYPE sos_status AS ENUM ('triggered', 'active', 'resolved', 'false_alarm');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Medications Table
CREATE TABLE medications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    dosage TEXT NOT NULL, -- e.g., "500mg"
    instructions TEXT, -- e.g., "Tomar con agua después del almuerzo"
    frequency_hours INTEGER, -- e.g., 8, 12, 24
    start_date TIMESTAMPTZ DEFAULT NOW(),
    end_date TIMESTAMPTZ,
    status medication_status DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Medication Compliance Logs
CREATE TABLE medication_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    medication_id UUID REFERENCES medications(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    status log_status NOT NULL,
    logged_at TIMESTAMPTZ DEFAULT NOW(),
    notes TEXT
);

-- Medical Appointments
CREATE TABLE medical_appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    doctor_name TEXT NOT NULL,
    specialty TEXT,
    clinic_name TEXT,
    date TIMESTAMPTZ NOT NULL,
    type appointment_type DEFAULT 'presencial',
    location_text TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- SOS Emergency Alerts
CREATE TABLE sos_alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    status sos_status DEFAULT 'triggered',
    location_point GEOGRAPHY(POINT, 4326),
    location_text TEXT,
    triggered_at TIMESTAMPTZ DEFAULT NOW(),
    resolved_at TIMESTAMPTZ,
    resolved_by UUID REFERENCES users(id),
    notes TEXT
);

-- RLS POLICIES

-- Medications
ALTER TABLE medications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own medications"
    ON medications FOR ALL
    USING (auth.uid() = user_id);

CREATE POLICY "Health professionals/Family can view medications"
    ON medications FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('medico', 'familiar')
    ));

-- Medication Logs
ALTER TABLE medication_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own medication logs"
    ON medication_logs FOR ALL
    USING (auth.uid() = user_id);

-- Appointments
ALTER TABLE medical_appointments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own appointments"
    ON medical_appointments FOR ALL
    USING (auth.uid() = user_id);

-- SOS Alerts
ALTER TABLE sos_alerts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own SOS alerts"
    ON sos_alerts FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Admins/Family can see SOS alerts"
    ON sos_alerts FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('familiar')
    ));

-- Triggers for updated_at
CREATE TRIGGER update_medications_updated_at BEFORE UPDATE ON medications FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_medical_appointments_updated_at BEFORE UPDATE ON medical_appointments FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
