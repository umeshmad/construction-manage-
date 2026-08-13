import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const ClientLayout = ({ children, title, subtitle }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'My Projects', to: '/client/my-projects', icon: 'folder' },
    { label: 'Request a Project', to: '/client/request-project', icon: 'add_circle' },
    { label: 'Messages', to: '/client/messages', icon: 'chat' },
    { label: 'Appointments', to: '/client/appointments', icon: 'calendar_month' },
    { label: 'Payments', to: '/client/payments', icon: 'payments' },
    { label: 'Quotations', to: '/client/quotations', icon: 'request_quote' },
  ];

  return (
    <div className="font-body-md text-body-md text-on-surface antialiased flex h-screen overflow-hidden bg-[#FCFAFA] w-full">
      {/* Sidebar Navigation for Desktop */}
      <nav className="w-64 bg-surface-container-lowest border-r border-[#E5E0DD] flex flex-col h-full flex-shrink-0 hidden md:flex">
        <div className="h-20 flex items-center px-6 border-b border-[#E5E0DD]">
          <Link to="/" className="font-headline-md text-headline-md font-bold text-on-surface">ArchTech Pro</Link>
        </div>
        <div className="flex-1 py-6 px-4 flex flex-col gap-2">
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
        </div>
        <div className="p-4 border-t border-[#E5E0DD]">
          <div className="flex items-center gap-3 px-4 py-2">
            <img
              className="w-10 h-10 rounded-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCr4s-kvu9-ARSlTSpwKbz-3tkvANUD25xSzZ6_qAL_RovI0HHIswXl3ZYj7FwUxwX0A9XLpSjt_SUmtZVge1kpXzvOrkG9j40IFRilQLEpbxSID8UrmaeRDVyMdasxioQvc5kNs8ih1cpA6anAUtLvrIMwHq-YPjMbrL83QMUjDuZd-CrjFrmy5s9YMpc10kxtIFlJrE78xz57AUQKXDXSgg5bKDnH6s6k8i5qREb54vS9_5WTmg"
              alt="Robert Vance"
            />
            <div>
              <div className="font-label-md text-label-md text-on-surface">Robert Vance</div>
              <div className="font-caption text-caption text-on-surface-variant">Client</div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top App Bar */}
        <header className="bg-surface-container-lowest border-b border-[#E5E0DD] h-20 flex justify-between items-center px-margin-mobile md:px-margin-desktop sticky top-0 z-40 flex-shrink-0">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-on-surface p-2" onClick={() => setMobileOpen(!mobileOpen)}>
              <span className="icon-mask" style={{ WebkitMaskImage: 'url(/icons/menu.svg)', maskImage: 'url(/icons/menu.svg)' , width: '20px', height: '20px'}}></span>
            </button>
            <div>
              <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">{title}</h1>
              {subtitle && <p className="font-body-md text-body-md text-on-surface-variant hidden md:block">{subtitle}</p>}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/client/request-project"
              className="bg-primary-container text-on-primary font-label-md text-label-md px-6 py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <span className="icon-mask text-sm font-bold" style={{ WebkitMaskImage: 'url(/icons/add.svg)', maskImage: 'url(/icons/add.svg)' , width: '14px', height: '14px'}}></span>
              <span className="hidden sm:inline">Request New Project</span>
            </Link>
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

        {/* Inner Content Screen */}
        <div className="flex-1 overflow-y-auto p-margin-mobile md:p-margin-desktop">
          <div className="max-w-container-max-width mx-auto w-full flex flex-col gap-gutter h-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientLayout;
