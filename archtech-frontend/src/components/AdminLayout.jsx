import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminLayout = ({ children, title, subtitle }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const location = useLocation();

  const getMonthDateRange = () => {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return `${firstDay.toLocaleDateString('en-US', options)} - ${lastDay.toLocaleDateString('en-US', options)}`;
  };

  const navLinks = [
    { label: 'Dashboard', to: '/admin/dashboard', icon: 'dashboard' },
    { label: 'Tasks', to: '/admin/tasks', icon: 'task_alt' },
    { label: 'Workers', to: '/admin/workers', icon: 'groups' },
    { label: 'Materials & Suppliers', to: '/admin/materials', icon: 'inventory' },
    { label: 'Payments', to: '/admin/payments', icon: 'credit_card' },
    { label: 'Expenses', to: '/admin/expenses', icon: 'payments' },
    { label: 'Quotations', to: '/admin/quotations', icon: 'request_quote' },
    { label: 'Reports', to: '/admin/reports', icon: 'bar_chart' },
  ];

  return (
    <div className="font-body-md text-body-md text-on-surface antialiased flex h-screen overflow-hidden bg-[#FCFAFA] w-full">
      {/* Sidebar for Desktop */}
      <aside className="w-64 bg-surface-container-lowest border-r border-[#E5E0DD] flex flex-col h-full flex-shrink-0 hidden md:flex">
        <div className="h-20 flex items-center px-6 border-b border-[#E5E0DD]">
          <Link to="/" className="font-headline-md text-headline-md font-bold text-on-surface">ArchTech Pro</Link>
        </div>
        <nav className="flex-1 py-6 px-4 flex flex-col gap-2 overflow-y-auto">
          {navLinks.map(link => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.label}
                to={link.to}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-surface-container-low text-primary font-medium border-l-4 border-primary'
                    : 'text-on-surface-variant hover:bg-surface-container-low hover:text-primary'
                }`}
              >
                <span className={`material-symbols-outlined ${isActive ? 'fill' : ''}`}>{link.icon}</span>
                <span className="font-label-md text-label-md">{link.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-[#E5E0DD]">
          <div className="flex items-center gap-3 px-4 py-2">
            <img
              className="w-10 h-10 rounded-full object-cover border border-[#E5E0DD]"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAULCjnCCpMn-gmpJkuzP2ttDaDSyusm-k4jRmT3hzR-4DuZAFLv4cduVbe8McaGdprNgXYwnSUu1gcrVZBZCKr50ayJh-WtVK6bRdrZj8s7DkNwAZyphrxnrS_LewFJ_aVYMCt5vWcdjjy2Q4np8SdeM0Ja7_qOnLq4URMMaApzGtnvs2sLZn3maK_55Xc6fygH9qRgKUuUIKjD0URgVm-nOX2JxZCpx26azdYkVHNzkSghSLSyg"
              alt="Admin User"
            />
            <div>
              <p className="font-label-md text-label-md text-on-surface">Admin User</p>
              <p className="font-caption text-caption text-on-surface-variant">Director</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-surface-container-lowest border-b border-[#E5E0DD] flex items-center justify-between px-8 flex-shrink-0 z-10">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-on-surface p-2" onClick={() => setMobileOpen(!mobileOpen)}>
              <span className="icon-mask" style={{ WebkitMaskImage: 'url(/icons/menu.svg)', maskImage: 'url(/icons/menu.svg)' , width: '20px', height: '20px'}}></span>
            </button>
            <div>
              <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">{title}</h1>
              {subtitle && <p className="font-body-md text-body-md text-on-surface-variant hidden md:block">{subtitle}</p>}
            </div>
          </div>
          <div className="flex items-center gap-4 relative">
            <div className="hidden lg:flex items-center bg-surface-container-low border border-[#E5E0DD] rounded-lg px-4 py-2 text-sm">
              <span className="icon-mask text-on-surface-variant mr-2 text-[20px]" style={{ WebkitMaskImage: 'url(/icons/calendar_today.svg)', maskImage: 'url(/icons/calendar_today.svg)' , width: '20px', height: '20px'}}></span>
              <span className="font-label-md text-label-md text-on-surface">{getMonthDateRange()}</span>
            </div>
            
            <div className="relative">
              <button 
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-dim transition-colors relative"
              >
                <span className="icon-mask" style={{ WebkitMaskImage: 'url(/icons/notifications.svg)', maskImage: 'url(/icons/notifications.svg)' , width: '20px', height: '20px'}}></span>
                <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border border-white"></span>
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-[#E5E0DD] z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-[#F0EEED] flex justify-between items-center bg-[#F9F8F7]">
                    <h3 className="font-label-md font-bold text-on-surface">Notifications</h3>
                    <span className="text-xs text-primary cursor-pointer hover:underline">Mark all as read</span>
                  </div>
                  <div className="max-h-[300px] overflow-y-auto">
                    {[
                      { title: "New Project Request", desc: "Alpha Tower submitted a new request.", time: "10 min ago", unread: true },
                      { title: "Payment Overdue", desc: "Invoice #1042 is overdue by 3 days.", time: "1 hr ago", unread: true },
                      { title: "Task Completed", desc: "Foundation inspection completed.", time: "Yesterday", unread: false }
                    ].map((n, i) => (
                      <div key={i} className={`px-4 py-3 border-b border-[#F0EEED] last:border-b-0 cursor-pointer hover:bg-surface-container-low transition-colors ${n.unread ? 'bg-primary-container/10' : ''}`}>
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-label-md text-sm text-on-surface">{n.title}</h4>
                          <span className="text-xs text-on-surface-variant">{n.time}</span>
                        </div>
                        <p className="text-xs text-on-surface-variant line-clamp-2">{n.desc}</p>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2 text-center border-t border-[#F0EEED] bg-[#F9F8F7] cursor-pointer hover:bg-surface-container-low transition-colors">
                    <span className="text-xs text-primary font-medium">View All Notifications</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-black/40" onClick={() => setMobileOpen(false)}>
            <div className="w-64 bg-surface-container-lowest h-full flex flex-col p-6 gap-4" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-6">
                <span className="font-headline-md text-headline-md font-bold text-on-surface">ArchTech Pro</span>
                <button onClick={() => setMobileOpen(false)} className="material-symbols-outlined">close</button>
              </div>
              <div className="flex flex-col gap-2">
                {navLinks.map(link => (
                  <Link
                    key={link.label}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                      location.pathname === link.to ? 'bg-surface-container-low text-primary font-medium' : 'text-on-surface-variant'
                    }`}
                  >
                    <span className="icon-mask" style={{ WebkitMaskImage: `url(/icons/${link.icon}.svg)`, maskImage: `url(/icons/${link.icon}.svg)` }}></span>
                    <span className="font-label-md text-label-md">{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Main Panel */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-container-max-width mx-auto space-y-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
