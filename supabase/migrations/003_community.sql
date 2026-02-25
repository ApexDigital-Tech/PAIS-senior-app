-- Create Enums for Community Module
CREATE TYPE companion_request_type AS ENUM ('visita', 'paseo', 'llamada', 'tramites');
CREATE TYPE companion_request_status AS ENUM ('pendiente', 'aceptado', 'completado', 'cancelado');
CREATE TYPE activity_type AS ENUM ('taller', 'caminata', 'lectura', 'social', 'otro');

-- Companion Requests Table
CREATE TABLE companion_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    senior_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    volunteer_id UUID REFERENCES users(id) ON DELETE SET NULL,
    type companion_request_type NOT NULL DEFAULT 'visita',
    status companion_request_status NOT NULL DEFAULT 'pendiente',
    description TEXT,
    date TIMESTAMPTZ NOT NULL,
    location_text TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Community Activities Table
CREATE TABLE community_activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    type activity_type NOT NULL DEFAULT 'social',
    date TIMESTAMPTZ NOT NULL,
    location_text TEXT,
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    max_participants INTEGER DEFAULT 10,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Activity Participants Junction Table
CREATE TABLE activity_participants (
    activity_id UUID REFERENCES community_activities(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (activity_id, user_id)
);

-- Messages Table (for Companion Requests and Activities)
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    context_type TEXT NOT NULL CHECK (context_type IN ('request', 'activity')),
    context_id UUID NOT NULL,
    sender_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    content TEXT,
    is_voice BOOLEAN DEFAULT FALSE,
    voice_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE companion_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Companion Requests
CREATE POLICY "Seniors can see their own requests"
    ON companion_requests FOR SELECT
    USING (auth.uid() = senior_id);

CREATE POLICY "Volunteers can see all pending requests"
    ON companion_requests FOR SELECT
    USING (status = 'pendiente' OR auth.uid() = volunteer_id);

CREATE POLICY "Seniors can create requests"
    ON companion_requests FOR INSERT
    WITH CHECK (auth.uid() = senior_id);

CREATE POLICY "Volunteers can accept requests"
    ON companion_requests FOR UPDATE
    USING (status = 'pendiente' OR auth.uid() = volunteer_id)
    WITH CHECK (true);

-- RLS Policies for Community Activities
CREATE POLICY "Everyone can see activities"
    ON community_activities FOR SELECT
    USING (true);

CREATE POLICY "Moderators can manage activities"
    ON community_activities FOR ALL
    USING (EXISTS (
        SELECT 1 FROM users 
        WHERE id = auth.uid() 
        AND (role = 'admin' OR role = 'voluntario')
    ));

-- RLS Policies for Activity Participants
CREATE POLICY "Everyone can see participants"
    ON activity_participants FOR SELECT
    USING (true);

CREATE POLICY "Users can join activities"
    ON activity_participants FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can leave activities"
    ON activity_participants FOR DELETE
    USING (auth.uid() = user_id);

-- RLS Policies for Messages
CREATE POLICY "Participants can see messages"
    ON messages FOR SELECT
    USING (
        CASE 
            WHEN context_type = 'request' THEN 
                EXISTS (SELECT 1 FROM companion_requests WHERE id = context_id AND (senior_id = auth.uid() OR volunteer_id = auth.uid()))
            WHEN context_type = 'activity' THEN
                EXISTS (SELECT 1 FROM activity_participants WHERE activity_id = context_id AND user_id = auth.uid())
            ELSE FALSE
        END
    );

CREATE POLICY "Participants can send messages"
    ON messages FOR INSERT
    WITH CHECK (
        CASE 
            WHEN context_type = 'request' THEN 
                EXISTS (SELECT 1 FROM companion_requests WHERE id = context_id AND (senior_id = auth.uid() OR volunteer_id = auth.uid()))
            WHEN context_type = 'activity' THEN
                EXISTS (SELECT 1 FROM activity_participants WHERE activity_id = context_id AND user_id = auth.uid())
            ELSE FALSE
        END
    );

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_companion_requests_updated_at
    BEFORE UPDATE ON companion_requests
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();
