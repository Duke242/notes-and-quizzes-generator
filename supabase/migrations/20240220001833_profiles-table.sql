CREATE TABLE stripe (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  customer_id text,
  price_id text,
  has_access boolean,
  email text,
  CONSTRAINT stripe_id_fkey FOREIGN KEY (id)
    REFERENCES auth.users (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL
);

-- alter table public.profiles enable row level security;
