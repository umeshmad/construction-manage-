
CREATE DATABASE archtech_pro;
USE archtech_pro;

-- 1. users (no dependencies)
CREATE TABLE users (
  Id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  role ENUM('customer', 'admin') DEFAULT 'customer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. workers (no dependencies)
CREATE TABLE workers (
  Id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  role VARCHAR(50),
  contact_info VARCHAR(150),
  hire_date DATE
);

-- 3. services (no dependencies)
CREATE TABLE services (
  Id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  category VARCHAR(50)
);

-- 4. suppliers (no dependencies)
CREATE TABLE suppliers (
  Id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  contact_info VARCHAR(150)
);

-- 5. materials (no dependencies)
CREATE TABLE materials (
  Id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  unit VARCHAR(20),
  unit_cost DECIMAL(10,2),
  stock_quantity INT DEFAULT 0,
  reorder_threshold INT DEFAULT 0
);

-- 6. customers (needs users)
CREATE TABLE customers (
  Id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNIQUE,
  company_name VARCHAR(150),
  address VARCHAR(255),
  CONSTRAINT fk_customers_user FOREIGN KEY (user_id) REFERENCES users(Id)
);

-- 7. project_requests (needs customers, services)
CREATE TABLE project_requests (
  Id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT,
  service_id INT,
  title VARCHAR(150) NOT NULL,
  description TEXT,
  estimated_budget DECIMAL(12,2),
  preferred_start_date DATE,
  status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_requests_customer FOREIGN KEY (customer_id) REFERENCES customers(Id),
  CONSTRAINT fk_requests_service FOREIGN KEY (service_id) REFERENCES services(Id)
);

-- 8. projects (needs project_requests, customers)
CREATE TABLE projects (
  Id INT AUTO_INCREMENT PRIMARY KEY,
  request_id INT UNIQUE,
  customer_id INT,
  name VARCHAR(150) NOT NULL,
  location VARCHAR(255),
  start_date DATE,
  end_date DATE,
  budget_allocated DECIMAL(12,2),
  status ENUM('active', 'on_hold', 'completed') DEFAULT 'active',
  progress INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_projects_request FOREIGN KEY (request_id) REFERENCES project_requests(Id),
  CONSTRAINT fk_projects_customer FOREIGN KEY (customer_id) REFERENCES customers(Id)
);

-- 9. quotations (needs project_requests)
CREATE TABLE quotations (
  Id INT AUTO_INCREMENT PRIMARY KEY,
  request_id INT,
  total_amount DECIMAL(12,2),
  status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
  sent_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  responded_date DATETIME NULL DEFAULT NULL,
  CONSTRAINT fk_quotations_request FOREIGN KEY (request_id) REFERENCES project_requests(Id)
);

-- 10. quotation_items (needs quotations)
CREATE TABLE quotation_items (
  Id INT AUTO_INCREMENT PRIMARY KEY,
  quotation_id INT,
  description VARCHAR(255) NOT NULL,
  amount DECIMAL(12,2),
  CONSTRAINT fk_quotation_items_quotation FOREIGN KEY (quotation_id) REFERENCES quotations(Id)
);

-- 11. appointments (needs customers, projects)
CREATE TABLE appointments (
  Id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT,
  project_id INT,
  appointment_date DATE,
  appointment_time TIME,
  type ENUM('site_visit', 'consultation', 'progress_review'),
  status ENUM('requested', 'confirmed', 'completed', 'cancelled') DEFAULT 'requested',
  CONSTRAINT fk_appointments_customer FOREIGN KEY (customer_id) REFERENCES customers(Id),
  CONSTRAINT fk_appointments_project FOREIGN KEY (project_id) REFERENCES projects(Id)
);

-- 12. project_assignments (needs projects, workers)
CREATE TABLE project_assignments (
  Id INT AUTO_INCREMENT PRIMARY KEY,
  project_id INT,
  worker_id INT,
  role_on_project VARCHAR(50),
  start_date DATE,
  UNIQUE (project_id, worker_id),
  CONSTRAINT fk_assignments_project FOREIGN KEY (project_id) REFERENCES projects(Id),
  CONSTRAINT fk_assignments_worker FOREIGN KEY (worker_id) REFERENCES workers(Id)
);

-- 13. tasks (needs projects, workers)
CREATE TABLE tasks (
  Id INT AUTO_INCREMENT PRIMARY KEY,
  project_id INT,
  assigned_worker_id INT,
  title VARCHAR(150) NOT NULL,
  status ENUM('to_do', 'in_progress', 'completed') DEFAULT 'to_do',
  priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
  due_date DATE,
  CONSTRAINT fk_tasks_project FOREIGN KEY (project_id) REFERENCES projects(Id),
  CONSTRAINT fk_tasks_worker FOREIGN KEY (assigned_worker_id) REFERENCES workers(Id)
);

-- 14. milestones (needs projects)
CREATE TABLE milestones (
  Id INT AUTO_INCREMENT PRIMARY KEY,
  project_id INT,
  title VARCHAR(150) NOT NULL,
  due_date DATE,
  completion_pct INT DEFAULT 0,
  status ENUM('upcoming', 'in_progress', 'completed') DEFAULT 'upcoming',
  CONSTRAINT fk_milestones_project FOREIGN KEY (project_id) REFERENCES projects(Id)
);

-- 15. project_updates (needs projects)
CREATE TABLE project_updates (
  Id INT AUTO_INCREMENT PRIMARY KEY,
  project_id INT,
  description TEXT,
  photo_ref VARCHAR(255),
  posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_updates_project FOREIGN KEY (project_id) REFERENCES projects(Id)
);

-- 16. material_usage (needs projects, materials, suppliers)
CREATE TABLE material_usage (
  Id INT AUTO_INCREMENT PRIMARY KEY,
  project_id INT,
  material_id INT,
  supplier_id INT,
  quantity_used INT,
  date DATE,
  CONSTRAINT fk_usage_project FOREIGN KEY (project_id) REFERENCES projects(Id),
  CONSTRAINT fk_usage_material FOREIGN KEY (material_id) REFERENCES materials(Id),
  CONSTRAINT fk_usage_supplier FOREIGN KEY (supplier_id) REFERENCES suppliers(Id)
);

-- 17. expenses (needs projects, workers)
CREATE TABLE expenses (
  Id INT AUTO_INCREMENT PRIMARY KEY,
  project_id INT,
  category ENUM('labor', 'materials', 'equipment', 'permits', 'other'),
  amount DECIMAL(12,2),
  submitted_by INT,
  status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  date DATE,
  CONSTRAINT fk_expenses_project FOREIGN KEY (project_id) REFERENCES projects(Id),
  CONSTRAINT fk_expenses_worker FOREIGN KEY (submitted_by) REFERENCES workers(Id)
);

-- 18. payments (needs customers, projects)
CREATE TABLE payments (
  Id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT,
  project_id INT,
  amount DECIMAL(12,2),
  method ENUM('card', 'bank_transfer', 'cash'),
  status ENUM('paid', 'pending', 'overdue') DEFAULT 'pending',
  receipt_ref VARCHAR(100),
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_payments_customer FOREIGN KEY (customer_id) REFERENCES customers(Id),
  CONSTRAINT fk_payments_project FOREIGN KEY (project_id) REFERENCES projects(Id)
);

-- 19. safety_reports (needs projects, workers)
CREATE TABLE safety_reports (
  Id INT AUTO_INCREMENT PRIMARY KEY,
  project_id INT,
  reported_by INT,
  incident_type VARCHAR(100),
  severity ENUM('minor', 'moderate', 'critical'),
  status ENUM('open', 'resolved') DEFAULT 'open',
  date DATE,
  CONSTRAINT fk_safety_project FOREIGN KEY (project_id) REFERENCES projects(Id),
  CONSTRAINT fk_safety_worker FOREIGN KEY (reported_by) REFERENCES workers(Id)
);

-- 20. messages (needs customers, workers)
CREATE TABLE messages (
  Id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT,
  staff_id INT,
  content TEXT NOT NULL,
  sent_by ENUM('customer', 'staff'),
  is_read BOOLEAN DEFAULT FALSE,
  sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_messages_customer FOREIGN KEY (customer_id) REFERENCES customers(Id),
  CONSTRAINT fk_messages_worker FOREIGN KEY (staff_id) REFERENCES workers(Id)
);

-- 21. documents (needs projects, users)
CREATE TABLE documents (
  Id INT AUTO_INCREMENT PRIMARY KEY,
  project_id INT,
  doc_type ENUM('blueprint', 'permit', 'report', 'contract', 'photo'),
  file_ref VARCHAR(255) NOT NULL,
  uploaded_by INT,
  upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_documents_project FOREIGN KEY (project_id) REFERENCES projects(Id),
  CONSTRAINT fk_documents_user FOREIGN KEY (uploaded_by) REFERENCES users(Id)
);