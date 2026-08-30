import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Contact from './pages/Contact';

// Client Portal Pages
import ClientPortalMyProjects from './pages/ClientPortalMyProjects';
import ClientPortalMessages from './pages/ClientPortalMessages';
import ClientPortalAppointments from './pages/ClientPortalAppointments';
import ClientPortalPayments from './pages/ClientPortalPayments';
import ClientPortalQuotations from './pages/ClientPortalQuotations';
import ClientPortalRequestAProject from './pages/ClientPortalRequestAProject';

// Admin Pages
import AdminDashboard from './pages/AdminDashboard';
import AdminTasks from './pages/AdminTasks';
import AdminWorkers from './pages/AdminWorkers';
import AdminMaterials from './pages/AdminMaterials';
import AdminMaterialsSuppliers from './pages/AdminMaterialsSuppliers';
import AdminPayments from './pages/AdminPayments';
import AdminExpenses from './pages/AdminExpenses';
import AdminQuotations from './pages/AdminQuotations';
import AdminReports from './pages/AdminReports';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />

        {/* Client Portal Routes */}
        <Route path="/client/my-projects" element={<ClientPortalMyProjects />} />
        <Route path="/client/messages" element={<ClientPortalMessages />} />
        <Route path="/client/appointments" element={<ClientPortalAppointments />} />
        <Route path="/client/payments" element={<ClientPortalPayments />} />
        <Route path="/client/quotations" element={<ClientPortalQuotations />} />
        <Route path="/client/request-project" element={<ClientPortalRequestAProject />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/tasks" element={<AdminTasks />} />
        <Route path="/admin/workers" element={<AdminWorkers />} />
        <Route path="/admin/materials" element={<AdminMaterials />} />
        <Route path="/admin/suppliers" element={<AdminMaterialsSuppliers />} />
        <Route path="/admin/payments" element={<AdminPayments />} />
        <Route path="/admin/expenses" element={<AdminExpenses />} />
        <Route path="/admin/quotations" element={<AdminQuotations />} />
        <Route path="/admin/reports" element={<AdminReports />} />
      </Routes>
    </Router>
  );
}

export default App;

