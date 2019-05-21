CREATE OR REPLACE FUNCTION update_crew()
RETURNS trigger AS $update_crew$
BEGIN

UPDATE crew SET updated_at = current_timestamp

RETURN NEW;
END;
$update_crew$ LANGUAGE plpgsql;
