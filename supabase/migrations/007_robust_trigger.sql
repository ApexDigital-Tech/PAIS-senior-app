-- ============================================
-- PAIS — Robust User Trigger
-- Fixes "Database error saving new user" by handling missing metadata
-- and using ON CONFLICT to prevent 500 errors during registration/login.
-- ============================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    v_full_name TEXT;
    v_role user_role;
BEGIN
    -- 1. Extract and sanitize full_name
    v_full_name := COALESCE(NEW.raw_user_meta_data->>'full_name', '');
    
    -- 2. Extract and sanitize role with safe casting
    BEGIN
        v_role := (NEW.raw_user_meta_data->>'role')::user_role;
    EXCEPTION WHEN OTHERS THEN
        v_role := 'senior'::user_role;
    END;

    -- 3. Upsert into public.users
    INSERT INTO public.users (id, email, phone, full_name, role)
    VALUES (
        NEW.id,
        NEW.email,
        NEW.phone,
        v_full_name,
        COALESCE(v_role, 'senior'::user_role)
    )
    ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        phone = EXCLUDED.phone,
        full_name = CASE WHEN EXCLUDED.full_name <> '' THEN EXCLUDED.full_name ELSE public.users.full_name END,
        updated_at = NOW();

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
