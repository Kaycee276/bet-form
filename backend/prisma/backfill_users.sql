-- This script copies any existing users from Supabase's auth.users table
-- over to your public.users table, skipping anyone who is already in there.

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
SELECT 
  gen_random_uuid(),
  id::text,
  email,
  split_part(email, '@', 1) || '_' || substring(id::text from 1 for 6),
  raw_user_meta_data->>'avatar_url',
  false,
  created_at,
  COALESCE(updated_at, created_at)
FROM auth.users
WHERE id::text NOT IN (SELECT supabase_id FROM public.users);
