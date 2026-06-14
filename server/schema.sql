CREATE TABLE IF NOT EXISTS bookings (
  id           TEXT PRIMARY KEY,
  service_id   TEXT NOT NULL,
  service_name TEXT NOT NULL,
  price        INTEGER NOT NULL,
  date         TEXT NOT NULL,
  time         TEXT NOT NULL,
  client_name  TEXT NOT NULL,
  client_phone TEXT NOT NULL,
  client_email TEXT,
  notes        TEXT,
  status       TEXT NOT NULL DEFAULT 'pending',
  created_at   TEXT NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_slot_ativo
  ON bookings(date, time)
  WHERE status IN ('pending', 'confirmed');
