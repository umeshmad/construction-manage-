
USE archtech_pro;

-- 1. users (12 rows: Id 1-10 = customers, Id 11-12 = admin)
INSERT INTO users (name, email, password_hash, phone, role) VALUES
('Nimal Perera', 'nimal.perera@gmail.com', 'hashed_password_nimal', '0753464097', 'customer'),
('Kumari Fernando', 'kumari.fernando@gmail.com', 'hashed_password_kumari', '0730246633', 'customer'),
('Ruwan Silva', 'ruwan.silva@gmail.com', 'hashed_password_ruwan', '0762992312', 'customer'),
('Anoma Jayasuriya', 'anoma.jayasuriya@gmail.com', 'hashed_password_anoma', '0797366946', 'customer'),
('Sanjeewa Fonseka', 'sanjeewa.fonseka@gmail.com', 'hashed_password_sanjeewa', '0716480894', 'customer'),
('Priyanka Wickramasinghe', 'priyanka.wickramasinghe@gmail.com', 'hashed_password_priyanka', '0719722233', 'customer'),
('Chaminda Bandara', 'chaminda.bandara@gmail.com', 'hashed_password_chaminda', '0781924865', 'customer'),
('Dilani Rajapaksa', 'dilani.rajapaksa@gmail.com', 'hashed_password_dilani', '0722633920', 'customer'),
('Shanaka Gunasekara', 'shanaka.gunasekara@gmail.com', 'hashed_password_shanaka', '0759081935', 'customer'),
('Ishara Mendis', 'ishara.mendis@gmail.com', 'hashed_password_ishara', '0788220482', 'customer'),
('Tharindu Jayawardena', 'tharindu@archtechpro.com', 'hashed_password_admin1', '0771234567', 'admin'),
('Nadeesha Amarasinghe', 'nadeesha@archtechpro.com', 'hashed_password_admin2', '0779876543', 'admin');

-- 2. workers (8 rows)
INSERT INTO workers (name, role, contact_info, hire_date) VALUES
('Mahesh Kumara', 'Site Engineer', 'mahesh@archtechpro.com', '2019-08-26'),
('Sarath Wijesinghe', 'Safety Officer', 'sarath@archtechpro.com', '2024-09-09'),
('Chandana Ratnayake', 'Project Manager', 'chandana@archtechpro.com', '2021-05-29'),
('Lalith Abeysekara', 'Electrician', 'lalith@archtechpro.com', '2019-06-03'),
('Nimal Dissanayake', 'Plumber', 'nimal@archtechpro.com', '2019-12-19'),
('Ajith Karunaratne', 'Mason', 'ajith@archtechpro.com', '2023-11-12'),
('Susantha Herath', 'Surveyor', 'susantha@archtechpro.com', '2023-09-09'),
('Kasun Peiris', 'Carpenter', 'kasun@archtechpro.com', '2019-10-14');

-- 3. services (6 rows)
INSERT INTO services (name, description, category) VALUES
('Residential Construction', 'Custom home building from ground up.', 'Residential'),
('Commercial Construction', 'Office and retail space construction.', 'Commercial'),
('Renovation & Remodeling', 'Upgrading and modernizing existing structures.', 'Renovation'),
('Infrastructure Development', 'Roads, drainage, and utility works.', 'Infrastructure'),
('Interior Fit-Out', 'Interior finishing and fit-out for new spaces.', 'Renovation'),
('Project Consulting', 'Feasibility studies and construction consulting.', 'Commercial');

-- 4. suppliers (5 rows)
INSERT INTO suppliers (name, contact_info) VALUES
('Lanka Cement Traders', 'info@lankacement.lk'),
('Ceylon Bricks & Blocks', 'sales@ceylonbricks.lk'),
('National Hardware Supplies', 'contact@nationalhw.lk'),
('SteelWorks Colombo', 'orders@steelworkscmb.lk'),
('Prime Timber Ltd', 'info@primetimber.lk');

-- 5. materials (12 rows)
INSERT INTO materials (name, unit, unit_cost, stock_quantity, reorder_threshold) VALUES
('Cement', 'bag', 8.5, 180, 50),
('Steel Rebar', 'ton', 750.0, 12, 3),
('Bricks', 'unit', 0.35, 6000, 1500),
('Sand', 'ton', 25.0, 90, 20),
('Gravel', 'ton', 30.0, 75, 15),
('Timber Planks', 'unit', 12.0, 220, 50),
('Roofing Sheets', 'unit', 28.0, 140, 30),
('PVC Pipes', 'unit', 6.75, 300, 60),
('Electrical Wiring', 'roll', 35.0, 40, 10),
('Paint (Interior)', 'gallon', 22.5, 60, 15),
('Ceramic Tiles', 'sqm', 18.0, 200, 40),
('Concrete Blocks', 'unit', 1.8, 1500, 300);

-- 6. customers (10 rows, user_id 1-10)
INSERT INTO customers (user_id, company_name, address) VALUES
(1, NULL, '62 Main St, Colombo'),
(2, 'Lakeview Holdings', '24 Temple Rd, Kandy'),
(3, NULL, '142 Lake Rd, Galle'),
(4, NULL, '109 Galle Rd, Negombo'),
(5, 'Metro Developers', '16 Kandy Rd, Kurunegala'),
(6, NULL, '145 Main St, Matara'),
(7, 'Heritage Homes Pvt Ltd', '32 Temple Rd, Gampaha'),
(8, NULL, '58 Lake Rd, Kalutara'),
(9, NULL, '162 Galle Rd, Ratnapura'),
(10, 'Coastal Builders Ltd', '161 Kandy Rd, Jaffna');

-- 7. project_requests (10 rows)
INSERT INTO project_requests (customer_id, service_id, title, description, estimated_budget, preferred_start_date, status) VALUES
(1, 1, 'New Family Home', 'Client request: New Family Home', 109943.48, '2026-07-01', 'approved'),
(2, 5, 'Retail Store Fit-Out', 'Client request: Retail Store Fit-Out', 22392.82, '2026-07-13', 'approved'),
(3, 3, 'Villa Renovation', 'Client request: Villa Renovation', 110370.96, '2026-07-25', 'approved'),
(4, 2, 'Warehouse Construction', 'Client request: Warehouse Construction', 20331.0, '2026-08-06', 'approved'),
(5, 2, 'Office Building Extension', 'Client request: Office Building Extension', 49141.75, '2026-08-18', 'approved'),
(6, 3, 'Apartment Renovation', 'Client request: Apartment Renovation', 105519.7, '2026-08-30', 'approved'),
(7, 4, 'Boundary Wall & Driveway', 'Client request: Boundary Wall & Driveway', 34373.37, '2026-09-11', 'approved'),
(8, 1, 'Guest House Construction', 'Client request: Guest House Construction', 82415.36, '2026-09-23', 'approved'),
(9, 3, 'Kitchen & Bathroom Remodel', 'Client request: Kitchen & Bathroom Remodel', 102835.23, '2026-10-05', 'pending'),
(10, 4, 'Small Bridge Repair', 'Client request: Small Bridge Repair', 107913.5, '2026-10-17', 'rejected');

-- 8. projects (8 rows: 6 active, 1 completed, 1 on hold)
INSERT INTO projects (request_id, customer_id, name, location, start_date, end_date, budget_allocated, status, progress) VALUES
(1, 1, 'Perera Family Home', 'Colombo District', '2026-07-01', '2027-02-19', 149109.23, 'active', 43),
(2, 2, 'Downtown Retail Fit-Out', 'Kandy District', '2026-07-13', '2026-11-06', 109708.83, 'active', 44),
(3, 3, 'Fernando Villa Renovation', 'Galle District', '2026-07-25', '2027-01-26', 28368.34, 'active', 28),
(4, 4, 'Kandy Road Warehouse', 'Negombo District', '2026-08-06', '2027-03-28', 22013.0, 'active', 46),
(5, 5, 'Metro Office Extension', 'Kurunegala District', '2026-08-18', '2027-03-23', 126307.2, 'active', 74),
(6, 6, 'Lakeview Apartment Renovation', 'Matara District', '2026-08-30', '2027-02-16', 90221.11, 'active', 78),
(7, 7, 'Heritage Homes Boundary Wall', 'Gampaha District', '2026-09-11', '2027-03-12', 62360.86, 'completed', 100),
(8, 8, 'Coastal Guest House', 'Kalutara District', '2026-09-23', '2027-02-06', 129431.06, 'on_hold', 15);

-- 9. quotations (9 rows)
INSERT INTO quotations (request_id, total_amount, status) VALUES
(1, 51031.83, 'accepted'),
(2, 105205.49, 'accepted'),
(3, 97132.23, 'accepted'),
(4, 154522.55, 'accepted'),
(5, 130629.03, 'accepted'),
(6, 58221.79, 'accepted'),
(7, 171748.67, 'accepted'),
(8, 30362.79, 'accepted'),
(9, 79572.14, 'pending');

-- 10. quotation_items (23 rows, 2-3 per quotation)
INSERT INTO quotation_items (quotation_id, description, amount) VALUES
(1, 'Labor', 10815.1),
(1, 'Materials', 30359.86),
(1, 'Permits', 4274.02),
(2, 'Labor', 46345.11),
(2, 'Materials', 35235.5),
(3, 'Labor', 21727.1),
(3, 'Materials', 22310.35),
(3, 'Permits', 30807.14),
(4, 'Labor', 5988.25),
(4, 'Materials', 7428.57),
(4, 'Permits', 17656.48),
(5, 'Labor', 5518.83),
(5, 'Materials', 42686.54),
(6, 'Labor', 18506.54),
(6, 'Materials', 24375.9),
(6, 'Permits', 40781.86),
(7, 'Labor', 56557.62),
(7, 'Materials', 22616.92),
(8, 'Labor', 30634.19),
(8, 'Materials', 14656.05),
(9, 'Labor', 9501.73),
(9, 'Materials', 16361.66),
(9, 'Permits', 24675.08);

-- 11. appointments (14 rows)
INSERT INTO appointments (customer_id, project_id, appointment_date, appointment_time, type, status) VALUES
(1, 1, '2026-07-10', '09:00:00', 'site_visit', 'confirmed'),
(2, 2, '2026-07-16', '10:30:00', 'consultation', 'requested'),
(3, 3, '2026-07-22', '11:00:00', 'progress_review', 'completed'),
(4, 4, '2026-07-28', '12:30:00', 'site_visit', 'cancelled'),
(5, 5, '2026-08-03', '13:00:00', 'consultation', 'confirmed'),
(6, 6, '2026-08-09', '14:30:00', 'progress_review', 'requested'),
(9, NULL, '2026-08-15', '15:00:00', 'site_visit', 'completed'),
(10, NULL, '2026-08-21', '16:30:00', 'consultation', 'cancelled'),
(1, 1, '2026-08-27', '09:00:00', 'progress_review', 'confirmed'),
(3, 3, '2026-09-02', '10:30:00', 'site_visit', 'requested'),
(5, 5, '2026-09-08', '11:00:00', 'consultation', 'completed'),
(2, 2, '2026-09-14', '12:30:00', 'progress_review', 'cancelled'),
(6, 6, '2026-09-20', '13:00:00', 'site_visit', 'confirmed'),
(4, 4, '2026-09-26', '14:30:00', 'consultation', 'requested');

-- 12. project_assignments (22 rows, 2-3 workers per project)
INSERT INTO project_assignments (project_id, worker_id, role_on_project, start_date) VALUES
(1, 2, 'Site Supervisor', '2026-07-01'),
(1, 8, 'Electrician Lead', '2026-07-01'),
(1, 4, 'Safety Officer', '2026-07-01'),
(2, 7, 'Electrician Lead', '2026-07-13'),
(2, 8, 'Safety Officer', '2026-07-13'),
(3, 6, 'Project Manager', '2026-07-25'),
(3, 8, 'Project Manager', '2026-07-25'),
(3, 4, 'Lead Site Engineer', '2026-07-25'),
(4, 3, 'Project Manager', '2026-08-06'),
(4, 2, 'Lead Site Engineer', '2026-08-06'),
(5, 3, 'Lead Site Engineer', '2026-08-18'),
(5, 8, 'Project Manager', '2026-08-18'),
(5, 7, 'Site Supervisor', '2026-08-18'),
(6, 6, 'Electrician Lead', '2026-08-30'),
(6, 2, 'Electrician Lead', '2026-08-30'),
(6, 8, 'Lead Site Engineer', '2026-08-30'),
(7, 7, 'Site Supervisor', '2026-09-11'),
(7, 4, 'Lead Site Engineer', '2026-09-11'),
(7, 8, 'Site Supervisor', '2026-09-11'),
(8, 1, 'Project Manager', '2026-09-23'),
(8, 2, 'Site Supervisor', '2026-09-23'),
(8, 8, 'Project Manager', '2026-09-23');

-- 13. tasks (40 rows, 4-6 per project)
INSERT INTO tasks (project_id, assigned_worker_id, title, status, priority, due_date) VALUES
(1, 2, 'Drywall installation', 'to_do', 'high', '2026-07-15'),
(1, 2, 'Exterior finishing', 'to_do', 'medium', '2026-07-24'),
(1, 2, 'Foundation inspection', 'in_progress', 'low', '2026-08-02'),
(1, 4, 'Structural framing', 'completed', 'high', '2026-08-11'),
(2, 8, 'Plumbing installation', 'in_progress', 'high', '2026-07-27'),
(2, 8, 'Exterior finishing', 'in_progress', 'medium', '2026-08-05'),
(2, 7, 'Interior painting', 'completed', 'low', '2026-08-14'),
(2, 8, 'Electrical wiring rough-in', 'in_progress', 'high', '2026-08-23'),
(3, 4, 'Flooring installation', 'in_progress', 'high', '2026-08-08'),
(3, 4, 'Roof installation', 'in_progress', 'medium', '2026-08-17'),
(3, 8, 'Structural framing', 'to_do', 'low', '2026-08-26'),
(3, 6, 'Electrical wiring rough-in', 'to_do', 'high', '2026-09-04'),
(3, 6, 'Exterior finishing', 'completed', 'medium', '2026-09-13'),
(4, 3, 'Drywall installation', 'to_do', 'high', '2026-08-20'),
(4, 2, 'Electrical wiring rough-in', 'to_do', 'medium', '2026-08-29'),
(4, 2, 'Window fitting', 'completed', 'low', '2026-09-07'),
(4, 2, 'Foundation inspection', 'completed', 'high', '2026-09-16'),
(4, 2, 'Roof installation', 'to_do', 'medium', '2026-09-25'),
(4, 3, 'Final inspection', 'to_do', 'low', '2026-10-04'),
(5, 7, 'Plumbing installation', 'in_progress', 'high', '2026-09-01'),
(5, 8, 'Interior painting', 'to_do', 'medium', '2026-09-10'),
(5, 3, 'Final inspection', 'completed', 'low', '2026-09-19'),
(5, 8, 'Exterior finishing', 'in_progress', 'high', '2026-09-28'),
(6, 2, 'Plumbing installation', 'completed', 'high', '2026-09-13'),
(6, 6, 'Exterior finishing', 'completed', 'medium', '2026-09-22'),
(6, 6, 'Drywall installation', 'in_progress', 'low', '2026-10-01'),
(6, 6, 'Flooring installation', 'in_progress', 'high', '2026-10-10'),
(6, 6, 'Site cleanup', 'in_progress', 'medium', '2026-10-19'),
(7, 8, 'Exterior finishing', 'completed', 'high', '2026-09-25'),
(7, 4, 'Foundation inspection', 'completed', 'medium', '2026-10-04'),
(7, 4, 'Flooring installation', 'completed', 'low', '2026-10-13'),
(7, 4, 'Drywall installation', 'completed', 'high', '2026-10-22'),
(7, 7, 'Structural framing', 'completed', 'medium', '2026-10-31'),
(7, 4, 'Interior painting', 'completed', 'low', '2026-11-09'),
(8, 8, 'Structural framing', 'in_progress', 'high', '2026-10-07'),
(8, 8, 'Electrical wiring rough-in', 'to_do', 'medium', '2026-10-16'),
(8, 8, 'Site cleanup', 'in_progress', 'low', '2026-10-25'),
(8, 8, 'Exterior finishing', 'in_progress', 'high', '2026-11-03'),
(8, 1, 'Foundation inspection', 'to_do', 'medium', '2026-11-12'),
(8, 1, 'Final inspection', 'to_do', 'low', '2026-11-21');

-- 14. milestones (24 rows, 3 per project)
INSERT INTO milestones (project_id, title, due_date, completion_pct, status) VALUES
(1, 'Foundation Complete', '2026-08-01', 23, 'upcoming'),
(1, 'Framing Complete', '2026-08-21', 27, 'in_progress'),
(1, 'Roofing Complete', '2026-09-10', 34, 'completed'),
(2, 'Foundation Complete', '2026-08-13', 13, 'in_progress'),
(2, 'Framing Complete', '2026-09-02', 37, 'in_progress'),
(2, 'Roofing Complete', '2026-09-22', 74, 'completed'),
(3, 'Foundation Complete', '2026-08-25', 85, 'in_progress'),
(3, 'Framing Complete', '2026-09-14', 43, 'upcoming'),
(3, 'Roofing Complete', '2026-10-04', 63, 'completed'),
(4, 'Foundation Complete', '2026-09-06', 17, 'upcoming'),
(4, 'Framing Complete', '2026-09-26', 55, 'in_progress'),
(4, 'Roofing Complete', '2026-10-16', 84, 'upcoming'),
(5, 'Foundation Complete', '2026-09-18', 63, 'upcoming'),
(5, 'Framing Complete', '2026-10-08', 26, 'upcoming'),
(5, 'Roofing Complete', '2026-10-28', 29, 'upcoming'),
(6, 'Foundation Complete', '2026-09-30', 75, 'completed'),
(6, 'Framing Complete', '2026-10-20', 66, 'completed'),
(6, 'Roofing Complete', '2026-11-09', 87, 'completed'),
(7, 'Foundation Complete', '2026-10-12', 100, 'completed'),
(7, 'Framing Complete', '2026-11-01', 100, 'completed'),
(7, 'Roofing Complete', '2026-11-21', 100, 'completed'),
(8, 'Foundation Complete', '2026-10-24', 70, 'upcoming'),
(8, 'Framing Complete', '2026-11-13', 81, 'upcoming'),
(8, 'Roofing Complete', '2026-12-03', 51, 'in_progress');

-- 15. project_updates (15 rows)
INSERT INTO project_updates (project_id, description, photo_ref) VALUES
(1, 'Foundation work completed ahead of schedule.', '/uploads/project_1_update_1.jpg'),
(1, 'Framing progress is on track.', '/uploads/project_1_update_2.jpg'),
(2, 'Framing progress is on track.', '/uploads/project_2_update_1.jpg'),
(2, 'Roofing materials delivered to site.', '/uploads/project_2_update_2.jpg'),
(3, 'Roofing materials delivered to site.', '/uploads/project_3_update_1.jpg'),
(3, 'Electrical rough-in has begun.', '/uploads/project_3_update_2.jpg'),
(4, 'Electrical rough-in has begun.', '/uploads/project_4_update_1.jpg'),
(4, 'Interior finishing underway.', '/uploads/project_4_update_2.jpg'),
(5, 'Interior finishing underway.', '/uploads/project_5_update_1.jpg'),
(5, 'Site handed over to client.', '/uploads/project_5_update_2.jpg'),
(6, 'Site handed over to client.', '/uploads/project_6_update_1.jpg'),
(6, 'Minor delay due to weather, now back on schedule.', '/uploads/project_6_update_2.jpg'),
(7, 'Minor delay due to weather, now back on schedule.', '/uploads/project_7_update_1.jpg'),
(7, 'Final walkthrough completed with client.', '/uploads/project_7_update_2.jpg'),
(8, 'Final walkthrough completed with client.', '/uploads/project_8_update_1.jpg');

-- 16. material_usage (17 rows)
INSERT INTO material_usage (project_id, material_id, supplier_id, quantity_used, date) VALUES
(1, 9, 1, 68, '2026-07-15'),
(1, 4, 3, 15, '2026-07-23'),
(2, 9, 4, 148, '2026-07-27'),
(2, 1, 1, 118, '2026-08-04'),
(3, 10, 5, 136, '2026-08-08'),
(3, 4, 3, 120, '2026-08-16'),
(3, 9, 5, 127, '2026-08-24'),
(4, 4, 5, 71, '2026-08-20'),
(4, 9, 2, 119, '2026-08-28'),
(4, 3, 4, 36, '2026-09-05'),
(4, 7, 4, 85, '2026-09-13'),
(5, 11, 2, 114, '2026-09-01'),
(5, 2, 2, 82, '2026-09-09'),
(6, 3, 3, 41, '2026-09-13'),
(6, 5, 2, 124, '2026-09-21'),
(7, 12, 1, 106, '2026-09-25'),
(7, 8, 2, 62, '2026-10-03');

-- 17. expenses (20 rows)
INSERT INTO expenses (project_id, category, amount, submitted_by, status, date) VALUES
(1, 'labor', 11640.76, 4, 'approved', '2026-07-20'),
(1, 'materials', 10989.53, 4, 'approved', '2026-07-30'),
(2, 'labor', 9880.45, 7, 'approved', '2026-08-01'),
(2, 'materials', 18470.54, 7, 'approved', '2026-08-11'),
(2, 'equipment', 9442.52, 7, 'pending', '2026-08-21'),
(3, 'labor', 18024.06, 8, 'approved', '2026-08-13'),
(3, 'materials', 9290.2, 8, 'approved', '2026-08-23'),
(3, 'equipment', 8443.17, 4, 'pending', '2026-09-02'),
(4, 'labor', 24649.46, 3, 'approved', '2026-08-25'),
(4, 'materials', 24334.86, 3, 'approved', '2026-09-04'),
(5, 'labor', 7740.76, 3, 'approved', '2026-09-06'),
(5, 'materials', 22788.62, 3, 'approved', '2026-09-16'),
(6, 'labor', 19260.75, 2, 'approved', '2026-09-18'),
(6, 'materials', 21465.31, 2, 'approved', '2026-09-28'),
(7, 'labor', 5010.15, 4, 'approved', '2026-09-30'),
(7, 'materials', 14908.98, 8, 'approved', '2026-10-10'),
(7, 'equipment', 9185.64, 8, 'pending', '2026-10-20'),
(8, 'labor', 20290.31, 1, 'approved', '2026-10-12'),
(8, 'materials', 11494.95, 1, 'approved', '2026-10-22'),
(8, 'equipment', 7819.7, 1, 'pending', '2026-11-01');

-- 18. payments (16 rows)
INSERT INTO payments (customer_id, project_id, amount, method, status, receipt_ref) VALUES
(1, 1, 4942.58, 'bank_transfer', 'paid', 'RCPT-2000'),
(1, 1, 8959.69, 'card', 'pending', 'RCPT-2001'),
(2, 2, 18590.91, 'card', 'paid', 'RCPT-2002'),
(2, 2, 38057.94, 'cash', 'overdue', 'RCPT-2003'),
(3, 3, 16454.85, 'cash', 'paid', 'RCPT-2004'),
(3, 3, 18809.26, 'bank_transfer', 'paid', 'RCPT-2005'),
(4, 4, 10813.94, 'bank_transfer', 'paid', 'RCPT-2006'),
(4, 4, 4646.59, 'card', 'pending', 'RCPT-2007'),
(5, 5, 59681.13, 'card', 'paid', 'RCPT-2008'),
(5, 5, 27394.58, 'cash', 'overdue', 'RCPT-2009'),
(6, 6, 55263.9, 'cash', 'paid', 'RCPT-2010'),
(6, 6, 38815.39, 'bank_transfer', 'paid', 'RCPT-2011'),
(7, 7, 6419.52, 'bank_transfer', 'paid', 'RCPT-2012'),
(7, 7, 43734.06, 'card', 'pending', 'RCPT-2013'),
(8, 8, 56535.05, 'card', 'paid', 'RCPT-2014'),
(8, 8, 58275.92, 'cash', 'overdue', 'RCPT-2015');

-- 19. safety_reports (5 rows, sparse — not every project has one)
INSERT INTO safety_reports (project_id, reported_by, incident_type, severity, status, date) VALUES
(1, 8, 'Minor scaffolding wobble', 'minor', 'resolved', '2026-08-01'),
(2, 7, 'Slip near entrance', 'moderate', 'resolved', '2026-08-16'),
(4, 3, 'Improper PPE usage', 'minor', 'open', '2026-08-31'),
(5, 3, 'Electrical near-miss', 'critical', 'resolved', '2026-09-15'),
(6, 2, 'Unsecured ladder', 'minor', 'open', '2026-09-30');

-- 20. messages (16 rows, 8 short threads)
INSERT INTO messages (customer_id, staff_id, content, sent_by, is_read) VALUES
(1, 3, 'Hi, could you send an update on the progress?', 'customer', TRUE),
(1, 3, 'Sure! We are on track, will update by Friday.', 'staff', FALSE),
(2, 3, 'When is the next site visit scheduled?', 'customer', TRUE),
(2, 3, 'It''s scheduled for next Tuesday at 10 AM.', 'staff', TRUE),
(3, 4, 'Can we get a copy of the latest invoice?', 'customer', TRUE),
(3, 4, 'I''ll send that over shortly.', 'staff', TRUE),
(4, 3, 'The foundation looks great, thank you!', 'customer', TRUE),
(4, 3, 'Glad you''re happy with the progress!', 'staff', FALSE),
(5, 4, 'Is the budget still within range?', 'customer', TRUE),
(5, 4, 'Yes, we are currently under budget.', 'staff', TRUE),
(6, 3, 'Any updates on the permit approval?', 'customer', TRUE),
(6, 3, 'Still waiting on the municipal office, will update soon.', 'staff', TRUE),
(2, 4, 'Can we push the handover date by a week?', 'customer', TRUE),
(2, 4, 'We can discuss this at the next review meeting.', 'staff', FALSE),
(1, 3, 'Thanks for the quick response!', 'customer', TRUE),
(1, 3, 'Happy to help — let us know if anything else comes up.', 'staff', TRUE);

-- 21. documents (16 rows)
INSERT INTO documents (project_id, doc_type, file_ref, uploaded_by) VALUES
(1, 'blueprint', '/uploads/project_1_blueprint.pdf', 12),
(1, 'permit', '/uploads/project_1_permit.pdf', 11),
(2, 'permit', '/uploads/project_2_permit.pdf', 12),
(2, 'report', '/uploads/project_2_report.pdf', 12),
(3, 'report', '/uploads/project_3_report.pdf', 11),
(3, 'contract', '/uploads/project_3_contract.pdf', 12),
(4, 'contract', '/uploads/project_4_contract.pdf', 12),
(4, 'photo', '/uploads/project_4_photo.pdf', 11),
(5, 'photo', '/uploads/project_5_photo.pdf', 12),
(5, 'blueprint', '/uploads/project_5_blueprint.pdf', 11),
(6, 'blueprint', '/uploads/project_6_blueprint.pdf', 11),
(6, 'permit', '/uploads/project_6_permit.pdf', 11),
(7, 'permit', '/uploads/project_7_permit.pdf', 11),
(7, 'report', '/uploads/project_7_report.pdf', 12),
(8, 'report', '/uploads/project_8_report.pdf', 11),
(8, 'contract', '/uploads/project_8_contract.pdf', 12);