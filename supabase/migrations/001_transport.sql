-- ============================================
-- PAIS — Transport Module Migration
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Transport Requests
CREATE TABLE IF NOT EXISTS transport_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  senior_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  origin_address TEXT NOT NULL,
  origin_lat DOUBLE PRECISION NOT NULL,
  origin_lng DOUBLE PRECISION NOT NULL,
  destination_address TEXT NOT NULL,
  destination_lat DOUBLE PRECISION NOT NULL,
  destination_lng DOUBLE PRECISION NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'assigned', 'in_transit', 'completed', 'cancelled')),
  scheduled_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ,
  driver_id UUID REFERENCES auth.users(id),
  rating INT CHECK (rating >= 1 AND rating <= 5),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for efficient queries
CREATE INDEX idx_transport_senior ON transport_requests(senior_id);
CREATE INDEX idx_transport_status ON transport_requests(status);

-- RLS
ALTER TABLE transport_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Seniors can view own trips"
  ON transport_requests FOR SELECT
  USING (auth.uid() = senior_id);

CREATE POLICY "Seniors can create trips"
  ON transport_requests FOR INSERT
  WITH CHECK (auth.uid() = senior_id);

CREATE POLICY "Seniors can update own trips"
  ON transport_requests FOR UPDATE
  USING (auth.uid() = senior_id);

-- 2. Favorite Places
CREATE TABLE IF NOT EXISTS favorite_places (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  senior_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  lat DOUBLE PRECISION NOT NULL,
  lng DOUBLE PRECISION NOT NULL,
  icon TEXT NOT NULL DEFAULT 'other'
    CHECK (icon IN ('hospital', 'pharmacy', 'church', 'home', 'park', 'other')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_favorites_senior ON favorite_places(senior_id);

-- RLS
ALTER TABLE favorite_places ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Seniors can view own favorites"
  ON favorite_places FOR SELECT
  USING (auth.uid() = senior_id);

CREATE POLICY "Seniors can manage favorites"
  ON favorite_places FOR ALL
  USING (auth.uid() = senior_id);
