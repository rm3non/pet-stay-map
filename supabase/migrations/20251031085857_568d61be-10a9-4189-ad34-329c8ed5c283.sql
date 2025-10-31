-- Phase 1: Critical Functionality Fixes

-- 1. Fix database functions - Add security definer protection
CREATE OR REPLACE FUNCTION public.overlap_check(p_listing_id uuid, p_start date, p_end date)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.bookings b
    WHERE b.listing_id = p_listing_id
      AND b.status IN ('accepted','paid','checked_in')
      AND daterange(b.start_date, b.end_date, '[]') && daterange(p_start, p_end, '[]')
  );
$$;

CREATE OR REPLACE FUNCTION public.expire_old_requests()
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  UPDATE public.bookings
  SET status = 'expired'
  WHERE status = 'requested'
    AND created_at < now() - interval '24 hours';
$$;

CREATE OR REPLACE FUNCTION public.uid()
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$ 
  SELECT auth.uid() 
$$;

-- 2. Add public read policy for availability table
CREATE POLICY "availability public read"
ON public.availability
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.listings l
    WHERE l.id = availability.listing_id
      AND l.status = 'active'
  )
);

-- 3. Add public read policy for host_profiles table
CREATE POLICY "host_profiles public read"
ON public.host_profiles
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.listings l
    WHERE l.host_id = host_profiles.id
      AND l.status = 'active'
  )
);

-- 4. Add policy for hosts to view pet details for their bookings
CREATE POLICY "pets host can view for bookings"
ON public.pets
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.bookings b
    JOIN public.listings l ON l.id = b.listing_id
    WHERE b.pet_id = pets.id
      AND l.host_id = auth.uid()
  )
);