-- Create booking status enum for data integrity
CREATE TYPE public.booking_status AS ENUM (
  'requested',
  'accepted', 
  'declined',
  'paid',
  'checked_in',
  'completed',
  'cancelled',
  'expired'
);

-- Create payout status enum
CREATE TYPE public.payout_status AS ENUM (
  'pending',
  'paid',
  'hold'
);

-- Drop the CHECK constraints that prevent enum conversion
ALTER TABLE public.bookings DROP CONSTRAINT IF EXISTS bookings_status_check;
ALTER TABLE public.bookings DROP CONSTRAINT IF EXISTS bookings_payout_status_check;

-- Remove defaults before changing column types
ALTER TABLE public.bookings ALTER COLUMN status DROP DEFAULT;
ALTER TABLE public.bookings ALTER COLUMN payout_status DROP DEFAULT;

-- Convert status column to enum type
ALTER TABLE public.bookings 
ALTER COLUMN status TYPE booking_status 
USING status::booking_status;

-- Convert payout_status column to enum type
ALTER TABLE public.bookings 
ALTER COLUMN payout_status TYPE payout_status 
USING payout_status::payout_status;

-- Set defaults with proper enum types
ALTER TABLE public.bookings ALTER COLUMN status SET DEFAULT 'requested'::booking_status;
ALTER TABLE public.bookings ALTER COLUMN payout_status SET DEFAULT 'pending'::payout_status;

-- Update the overlap_check function to work with the enum
CREATE OR REPLACE FUNCTION public.overlap_check(p_listing_id uuid, p_start date, p_end date)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.bookings b
    WHERE b.listing_id = p_listing_id
      AND b.status IN ('accepted'::booking_status, 'paid'::booking_status, 'checked_in'::booking_status)
      AND daterange(b.start_date, b.end_date, '[]') && daterange(p_start, p_end, '[]')
  );
$$;

-- Update the expire_old_requests function to work with the enum
CREATE OR REPLACE FUNCTION public.expire_old_requests()
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  UPDATE public.bookings
  SET status = 'expired'::booking_status
  WHERE status = 'requested'::booking_status
    AND created_at < now() - interval '24 hours';
$$;