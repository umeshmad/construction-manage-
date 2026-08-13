import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }} className="w-full relative overflow-hidden">
    {/* Decorative glows */}
    <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-10 pointer-events-none"
      style={{ background: 'radial-gradient(circle, #e67e22, transparent)', filter: 'blur(60px)' }} />
    <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full opacity-10 pointer-events-none"
      style={{ background: 'radial-gradient(circle, #f39c12, transparent)', filter: 'blur(60px)' }} />

    <div className="relative z-10 max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop pt-16 pb-8">
      {/* Top row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
        {/* Brand */}
        <div className="md:col-span-1">
          <div className="text-xl font-bold text-white mb-3">
            Arch<span style={{ color: '#e67e22' }}>Tech</span> Pro
          </div>
          <p className="text-white/50 text-sm leading-relaxed mb-6">
            Precision engineering meets visionary architecture. Building landmarks since 2012.
          </p>
          {/* Social icons */}
          <div className="flex gap-3">
            {['share', 'camera_alt', 'work'].map(icon => (
              <a
                key={icon}
                href="#"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-1 group"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
              >
                <span
                  className="icon-mask flex-shrink-0"
                  style={{
                    WebkitMaskImage: `url(/icons/${icon}.svg)`,
                    maskImage: `url(/icons/${icon}.svg)`,
                    width: '16px',
                    height: '16px',
                    backgroundColor: 'rgba(255,255,255,0.6)',
                  }}
                ></span>
              </a>
            ))}
          </div>
        </div>

        {/* Company links */}
        <div>
          <h4 className="text-white font-semibold text-sm tracking-wide uppercase mb-5">Company</h4>
          <ul className="space-y-3">
            {[
              { label: 'About Us', to: '/about' },
              { label: 'Our Services', to: '/services' },
              { label: 'Projects', to: '/projects' },
              { label: 'Contact', to: '/contact' },
            ].map(l => (
              <li key={l.label}>
                <Link to={l.to} className="text-white/50 hover:text-[#e67e22] text-sm transition-colors duration-200 hover:translate-x-1 inline-block">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services links */}
        <div>
          <h4 className="text-white font-semibold text-sm tracking-wide uppercase mb-5">Services</h4>
          <ul className="space-y-3">
            {['Residential Construction', 'Commercial Projects', 'Renovation', 'Infrastructure', 'Project Consulting'].map(s => (
              <li key={s}>
                <a href="#" className="text-white/50 hover:text-[#e67e22] text-sm transition-colors duration-200 hover:translate-x-1 inline-block">
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact CTA */}
        <div>
          <h4 className="text-white font-semibold text-sm tracking-wide uppercase mb-5">Get In Touch</h4>
          <div className="space-y-4 text-sm text-white/50 mb-6">
            <div className="flex items-start gap-2">
              <span className="icon-mask text-[#e67e22] text-[16px] mt-0.5" style={{ WebkitMaskImage: 'url(/icons/location_on.svg)', maskImage: 'url(/icons/location_on.svg)' , width: '16px', height: '16px'}}></span>
              <span>123 Architectural Way, Suite 400<br />Design District, NY 10001</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="icon-mask text-[#e67e22] text-[16px]" style={{ WebkitMaskImage: 'url(/icons/mail.svg)', maskImage: 'url(/icons/mail.svg)' , width: '16px', height: '16px'}}></span>
              <span>hello@archtechpro.com</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="icon-mask text-[#e67e22] text-[16px]" style={{ WebkitMaskImage: 'url(/icons/phone.svg)', maskImage: 'url(/icons/phone.svg)' , width: '16px', height: '16px'}}></span>
              <span>+1 (555) 987-6543</span>
            </div>
          </div>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, #e67e22, #f39c12)', boxShadow: '0 4px 16px rgba(230,126,34,0.3)' }}
          >
            <span className="icon-mask text-[15px]" style={{ WebkitMaskImage: 'url(/icons/login.svg)', maskImage: 'url(/icons/login.svg)' , width: '15px', height: '15px'}}></span>
            Client Portal
          </Link>
        </div>
      </div>

      {/* Bottom row */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8">
        <p className="text-white/30 text-xs">
          © 2024 ArchTech Pro. Precision in Every Detail. All rights reserved.
        </p>
        <div className="flex gap-6">
          {['Privacy Policy', 'Terms of Service', 'Careers'].map(l => (
            <a key={l} href="#" className="text-white/30 hover:text-white/60 text-xs transition-colors duration-200">{l}</a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
