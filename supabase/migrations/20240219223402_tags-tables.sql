CREATE TABLE IF NOT EXISTS tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  creator_id uuid DEFAULT auth.uid(),
  title text,
  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT tags_creator_id_fkey FOREIGN KEY (creator_id)
    REFERENCES auth.users (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  creator_id uuid,
  title text NOT NULL,
  content text,
  CONSTRAINT notes_creator_id_fkey FOREIGN KEY (creator_id)
    REFERENCES auth.users (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS notes_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  note_id uuid NOT NULL, 
  tag_id uuid NOT NULL, 
  CONSTRAINT notes_tags_note_id_fkey FOREIGN KEY (note_id)
    REFERENCES notes (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL,
  CONSTRAINT notes_tags_tag_id_fkey FOREIGN KEY (tag_id)
    REFERENCES tags (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL
)