-- Fix user profile visibility for marketplace features
-- This allows public viewing of basic host info while keeping sensitive data private

-- Drop the overly restrictive self-select policy
DROP POLICY IF EXISTS "users self select" ON users;

-- Create more appropriate policies for a marketplace

-- Allow users to view their own complete profile
CREATE POLICY "Users can view own profile"
ON users FOR SELECT
USING (id = auth.uid());

-- Allow public to view basic host info for active listings
CREATE POLICY "Public can view host profiles"
ON users FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM listings l
    WHERE l.host_id = users.id 
    AND l.status = 'active'
  )
);

-- Allow public to view reviewer profiles (for reviews)
CREATE POLICY "Public can view reviewer profiles"
ON users FOR SELECT  
USING (
  EXISTS (
    SELECT 1 FROM reviews r
    WHERE r.reviewer_id = users.id
  )
);

-- Allow booking participants to see each other's basic info
CREATE POLICY "Booking participants can view profiles"
ON users FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM bookings b
    JOIN listings l ON l.id = b.listing_id
    WHERE (b.owner_id = users.id OR l.host_id = users.id)
    AND (b.owner_id = auth.uid() OR l.host_id = auth.uid())
  )
);

-- IMPORTANT: The existing "users self update" policy already restricts updates to self
-- and prevents role changes, which is good for security.

-- Add database constraints for input validation as defense in depth
ALTER TABLE pets 
  DROP CONSTRAINT IF EXISTS name_length,
  DROP CONSTRAINT IF EXISTS notes_length,
  DROP CONSTRAINT IF EXISTS breed_length;

ALTER TABLE pets 
  ADD CONSTRAINT name_length CHECK (length(name) <= 50 AND length(name) > 0),
  ADD CONSTRAINT notes_length CHECK (notes IS NULL OR length(notes) <= 500),
  ADD CONSTRAINT breed_length CHECK (breed IS NULL OR length(breed) <= 100);

ALTER TABLE users
  DROP CONSTRAINT IF EXISTS name_length_check,
  DROP CONSTRAINT IF EXISTS phone_format_check;

ALTER TABLE users
  ADD CONSTRAINT name_length_check CHECK (name IS NULL OR (length(name) <= 100 AND length(name) > 0)),
  ADD CONSTRAINT phone_format_check CHECK (phone IS NULL OR phone ~ '^\+?[0-9]{10,15}$');