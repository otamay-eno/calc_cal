-- Create a table for public profiles settings
create table profiles (
  id uuid references auth.users not null primary key,
  height float,
  weight float,
  age int,
  gender text, -- 'male', 'female', 'other'
  activity_level text, -- 'sedentary', 'light', 'moderate', 'active', 'very_active'
  target_calories int,
  updated_at timestamp with time zone
);

-- Create a table for logging food
create table food_logs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  food_name text not null,
  calories int,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  date date default CURRENT_DATE
);

-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table profiles enable row level security;
alter table food_logs enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

create policy "Users can view own food logs." on food_logs
  for select using (auth.uid() = user_id);

create policy "Users can insert own food logs." on food_logs
  for insert with check (auth.uid() = user_id);

create policy "Users can update own food logs." on food_logs
  for update using (auth.uid() = user_id);

create policy "Users can delete own food logs." on food_logs
  for delete using (auth.uid() = user_id);
