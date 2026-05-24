CREATE TABLE IF NOT EXISTS t_p42150728_gosuslugi_similar.users (
  id SERIAL PRIMARY KEY,
  last_name VARCHAR(100) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  phone VARCHAR(30) NOT NULL UNIQUE,
  email VARCHAR(200) NOT NULL UNIQUE,
  snils VARCHAR(20),
  password_hash VARCHAR(255) NOT NULL,
  gosuslugi_connected BOOLEAN DEFAULT FALSE,
  gosuslugi_phone VARCHAR(30),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS t_p42150728_gosuslugi_similar.applications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES t_p42150728_gosuslugi_similar.users(id),
  app_uid VARCHAR(50) NOT NULL UNIQUE,
  title VARCHAR(300) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'Принято',
  status_color VARCHAR(10) NOT NULL DEFAULT 'yellow',
  source VARCHAR(20) NOT NULL DEFAULT 'site',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS t_p42150728_gosuslugi_similar.sessions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES t_p42150728_gosuslugi_similar.users(id),
  token VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP DEFAULT NOW() + INTERVAL '30 days'
);
