-- Add RLS policy to allow public viewing of host profiles for marketplace functionality
CREATE POLICY "Public can view active host profiles"
ON public.users FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.listings
    WHERE listings.host_id = users.id
    AND listings.status = 'active'
  )
);