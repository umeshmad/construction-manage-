import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ activeLink }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Services', to: '/services' },
    { label: 'Projects', to: '/projects' },
    { label: 'About Us', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ];

  return (
    <nav
      className="fixed top-0 w-full z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? 'rgba(255,255,255,0.95)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(229,224,221,0.8)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 24px rgba(44,62,80,0.08)' : 'none',
      }}
    >
      <div className="flex justify-between items-center h-20 px-margin-mobile md:px-margin-desktop max-w-container-max-width mx-auto">
        {/* Logo */}
        <Link
          to="/"
          className="font-bold text-xl tracking-tight transition-colors duration-300"
          style={{ color: scrolled ? '#1a1a2e' : 'white' }}
        >
          Arch<span style={{ color: '#e67e22' }}>Tech</span> Pro
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <Link
              key={link.label}
              to={link.to}
              className="relative px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 group"
              style={{
                color: activeLink === link.label
                  ? '#e67e22'
                  : scrolled ? '#374151' : 'rgba(255,255,255,0.85)',
              }}
            >
              {link.label}
              {/* Active underline */}
              <span
                className="absolute bottom-1 left-4 right-4 h-0.5 rounded-full transition-all duration-300"
                style={{
                  background: '#e67e22',
                  transform: activeLink === link.label ? 'scaleX(1)' : 'scaleX(0)',
                  transformOrigin: 'left',
                }}
              />
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <Link
          to="/login"
          className="hidden md:flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 hover:-translate-y-0.5"
          style={{
            background: scrolled
              ? 'linear-gradient(135deg, #e67e22, #f39c12)'
              : 'rgba(255,255,255,0.15)',
            border: scrolled ? 'none' : '1.5px solid rgba(255,255,255,0.4)',
            color: 'white',
            backdropFilter: scrolled ? 'none' : 'blur(8px)',
            boxShadow: scrolled ? '0 4px 16px rgba(230,126,34,0.3)' : 'none',
          }}
        >
          <span className="icon-mask text-[16px]" style={{ WebkitMaskImage: 'url(/icons/login.svg)', maskImage: 'url(/icons/login.svg)' , width: '16px', height: '16px'}}></span>
          Client Portal
        </Link>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg transition-colors duration-200"
          style={{ color: scrolled ? '#1a1a2e' : 'white' }}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span className="icon-mask" style={{ WebkitMaskImage: `url(/icons/${mobileOpen ? 'close' : 'menu'}.svg)`, maskImage: `url(/icons/${mobileOpen ? 'close' : 'menu'}.svg)` }}></span>
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-[#E5E0DD] px-4 py-4 flex flex-col gap-1 shadow-xl">
          {navLinks.map(link => (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                activeLink === link.label
                  ? 'text-[#e67e22] bg-orange-50'
                  : 'text-on-surface-variant hover:text-[#e67e22] hover:bg-orange-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/login"
            onClick={() => setMobileOpen(false)}
            className="mt-2 flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white"
            style={{ background: 'linear-gradient(135deg, #e67e22, #f39c12)' }}
          >
            <span className="icon-mask text-[16px]" style={{ WebkitMaskImage: 'url(/icons/login.svg)', maskImage: 'url(/icons/login.svg)' , width: '16px', height: '16px'}}></span>
            Client Portal
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
