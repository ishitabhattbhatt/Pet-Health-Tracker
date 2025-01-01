CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,  -- hashed password
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE pets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,  -- references users.id
  name VARCHAR(100) NOT NULL,
  species VARCHAR(100),
  breed VARCHAR(100),
  age INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE TABLE health_records (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pet_id INT,  -- references pets.id
  user_id INT, -- references users.id
  weight DECIMAL(5, 2),  -- Pet's weight
  vaccination_status VARCHAR(255),
  medical_condition TEXT,
  last_checkup_date DATE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE TABLE appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pet_id INT,  -- references pets.id
  user_id INT, -- references users.id
  appointment_date DATE NOT NULL,
  reason VARCHAR(255),
  vet_name VARCHAR(255),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE TABLE activity_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pet_id INT,  -- references pets.id
  user_id INT, -- references users.id
  activity_type VARCHAR(100),  -- e.g., walk, feed, medication
  activity_date DATE,
  duration INT,  -- duration of the activity in minutes (optional)
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE TABLE reminders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT, -- references users.id
  pet_id INT,  -- references pets.id
  reminder_date DATE NOT NULL,
  reminder_type VARCHAR(255),  -- e.g., vaccination, medication
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE
);
CREATE TABLE medications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pet_id INT,  -- references pets.id
  user_id INT, -- references users.id
  medication_name VARCHAR(255),
  dosage VARCHAR(100),
  frequency VARCHAR(100),
  start_date DATE,
  end_date DATE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
