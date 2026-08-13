import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

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

const DevNavHelper = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const close = () => setIsOpen(false);

  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary text-on-primary px-4 py-2.5 rounded-full shadow-lg font-label-md text-sm font-semibold flex items-center gap-2 hover:bg-surface-tint transition-colors"
      >
        <span className="icon-mask text-sm" style={{ WebkitMaskImage: `url(/icons/${isOpen ? 'close' : 'menu'}.svg)`, maskImage: `url(/icons/${isOpen ? 'close' : 'menu'}.svg)` }}></span>
        Dev Pages Menu
      </button>

      {isOpen && (
        <div className="absolute bottom-14 right-0 bg-white/97 border border-[#E5E0DD] p-4 rounded-xl shadow-2xl w-72 backdrop-blur-sm flex flex-col gap-4 max-h-[80vh] overflow-y-auto">

          {/* Public */}
          <div>
            <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">🌐 Public Pages</h4>
            <ul className="text-sm space-y-1 text-blue-600">
              <li><Link to="/" onClick={close}>Home</Link></li>
              <li><Link to="/about" onClick={close}>About Us</Link></li>
              <li><Link to="/services" onClick={close}>Services</Link></li>
              <li><Link to="/projects" onClick={close}>Projects Gallery</Link></li>
              <li><Link to="/contact" onClick={close}>Contact</Link></li>
              <li><Link to="/login" onClick={close}>Login / Register</Link></li>
            </ul>
          </div>

          {/* Client Portal */}
          <div className="border-t border-[#E5E0DD] pt-3">
            <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">👤 Client Portal</h4>
            <ul className="text-sm space-y-1 text-blue-600">
              <li><Link to="/client/my-projects" onClick={close}>My Projects (Dashboard)</Link></li>
              <li><Link to="/client/messages" onClick={close}>Messages / Chat</Link></li>
              <li><Link to="/client/appointments" onClick={close}>Appointments</Link></li>
              <li><Link to="/client/payments" onClick={close}>Payments Tracker</Link></li>
              <li><Link to="/client/quotations" onClick={close}>Quotations</Link></li>
              <li><Link to="/client/request-project" onClick={close}>Request a Project</Link></li>
            </ul>
          </div>

          {/* Admin */}
          <div className="border-t border-[#E5E0DD] pt-3">
            <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">🔐 Admin Panel</h4>
            <ul className="text-sm space-y-1 text-blue-600">
              <li><Link to="/admin/dashboard" onClick={close}>Dashboard Overview</Link></li>
              <li><Link to="/admin/tasks" onClick={close}>Tasks Management</Link></li>
              <li><Link to="/admin/workers" onClick={close}>Workers</Link></li>
              <li><Link to="/admin/materials" onClick={close}>Materials</Link></li>
              <li><Link to="/admin/suppliers" onClick={close}>Suppliers</Link></li>
              <li><Link to="/admin/payments" onClick={close}>Payments</Link></li>
              <li><Link to="/admin/expenses" onClick={close}>Expenses</Link></li>
              <li><Link to="/admin/quotations" onClick={close}>Quotations</Link></li>
              <li><Link to="/admin/reports" onClick={close}>Reports</Link></li>
            </ul>
          </div>

        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <Router>
      <DevNavHelper />
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
