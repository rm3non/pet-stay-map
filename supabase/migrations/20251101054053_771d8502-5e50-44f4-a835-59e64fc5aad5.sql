-- Add missing enum values to existing booking_status enum
ALTER TYPE public.booking_status ADD VALUE IF NOT EXISTS 'rejected';
ALTER TYPE public.booking_status ADD VALUE IF NOT EXISTS 'checked_out';

-- Check current column type
DO $$
BEGIN
  -- Only alter if the column is still text type
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'bookings' 
    AND column_name = 'status' 
    AND data_type = 'text'
  ) THEN
    -- Remove default
    ALTER TABLE public.bookings ALTER COLUMN status DROP DEFAULT;
    
    -- Convert to enum
    ALTER TABLE public.bookings 
    ALTER COLUMN status TYPE booking_status 
    USING status::booking_status;
    
    -- Restore default
    ALTER TABLE public.bookings 
    ALTER COLUMN status SET DEFAULT 'requested'::booking_status;
  END IF;
END $$;

-- Update functions to use enum properly
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