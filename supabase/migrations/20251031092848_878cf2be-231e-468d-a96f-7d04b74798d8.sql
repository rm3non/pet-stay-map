-- Fix user roles security vulnerability
-- Create enum for app roles
CREATE TYPE public.app_role AS ENUM ('owner', 'host', 'admin', 'moderator');

-- Create user_roles table with proper security
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Only allow users to view their own roles
CREATE POLICY "Users can view own roles"
ON public.user_roles FOR SELECT
USING (user_id = auth.uid());

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Update users table RLS to prevent role column updates
DROP POLICY IF EXISTS "users self update" ON public.users;

CREATE POLICY "users self update"
ON public.users FOR UPDATE
USING (id = uid())
WITH CHECK (id = uid() AND role = (SELECT role FROM public.users WHERE id = uid()));

-- Create function to calculate booking costs server-side
CREATE OR REPLACE FUNCTION public.calculate_booking_cost(
  p_listing_id uuid,
  p_start_date date,
  p_end_date date
)
RETURNS TABLE(
  nights integer,
  subtotal_inr integer,
  taxes_inr integer,
  platform_fee_inr integer,
  total_inr integer
)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    (p_end_date - p_start_date)::integer as nights,
    ((p_end_date - p_start_date) * l.nightly_price_inr)::integer as subtotal_inr,
    ROUND(((p_end_date - p_start_date) * l.nightly_price_inr) * 0.18)::integer as taxes_inr,
    ROUND(((p_end_date - p_start_date) * l.nightly_price_inr) * 0.05)::integer as platform_fee_inr,
    ROUND(((p_end_date - p_start_date) * l.nightly_price_inr) * 1.23)::integer as total_inr
  FROM listings l
  WHERE l.id = p_listing_id AND l.status = 'active';
$$;