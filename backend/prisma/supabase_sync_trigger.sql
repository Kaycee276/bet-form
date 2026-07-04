-- 1. Create the function that inserts a user into your public.users table
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (
    id,
    supabase_id,
    email,
    username,
    avatar_url,
    is_admin,
    created_at,
    updated_at
  )
  VALUES (
    gen_random_uuid(), -- Prisma generates UUIDs, so we use Postgres's built-in UUID generator here
    NEW.id::text,      -- The Supabase Auth user ID
    NEW.email,         -- The user's email address
    
    -- We need a unique username, so we combine their email prefix with part of their ID
    -- e.g., "john_a1b2c3"
    split_part(NEW.email, '@', 1) || '_' || substring(NEW.id::text from 1 for 6), 
    
    -- Extract the Google profile picture from their metadata
    NEW.raw_user_meta_data->>'avatar_url', 
    
    false,             -- is_admin defaults to false
    NOW(),
    NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Create the trigger that runs the function every time someone signs up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
