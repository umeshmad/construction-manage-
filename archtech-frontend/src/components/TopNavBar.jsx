import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const TopNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-surface-container-lowest dark:bg-inverse-surface fixed top-0 w-full z-50 border-b border-outline-variant shadow-sm transition-all duration-200">
      <div className="flex justify-between items-center h-20 px-margin-mobile md:px-margin-desktop max-w-container-max-width mx-auto">
        <Link to="/" className="font-headline-md text-headline-md font-bold text-on-surface dark:text-inverse-on-surface cursor-pointer active:scale-95">
          ArchTech Pro
        </Link>
        <div className="hidden md:flex items-center space-x-gutter">
          <Link className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors hover:bg-surface-container-low transition-all duration-200 cursor-pointer active:scale-95 px-3 py-2 rounded-md" to="/services">Services</Link>
          <Link className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors hover:bg-surface-container-low transition-all duration-200 cursor-pointer active:scale-95 px-3 py-2 rounded-md" to="/projects">Projects</Link>
          <Link className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors hover:bg-surface-container-low transition-all duration-200 cursor-pointer active:scale-95 px-3 py-2 rounded-md" to="/about">About Us</Link>
          <Link className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors hover:bg-surface-container-low transition-all duration-200 cursor-pointer active:scale-95 px-3 py-2 rounded-md" to="/contact">Contact</Link>
        </div>
        <button className="hidden md:flex bg-primary text-on-primary font-label-md text-label-md px-6 py-2.5 rounded-full hover:bg-surface-tint transition-colors shadow-sm diffuse-shadow cursor-pointer active:scale-95">
          Request Quote
        </button>
        {/* Mobile Menu Button */}
        <button className="md:hidden text-on-surface p-2" onClick={() => setIsOpen(!isOpen)}>
          <span className="icon-mask" style={{ WebkitMaskImage: 'url(/icons/menu.svg)', maskImage: 'url(/icons/menu.svg)' , width: '20px', height: '20px'}}></span>
        </button>
      </div>
      {/* Mobile Menu (Simplistic version for now) */}
      {isOpen && (
        <div className="md:hidden bg-surface-container-lowest border-t border-outline-variant p-4 flex flex-col space-y-4">
          <Link className="font-label-md text-label-md text-on-surface-variant" to="/services">Services</Link>
          <Link className="font-label-md text-label-md text-on-surface-variant" to="/projects">Projects</Link>
          <Link className="font-label-md text-label-md text-on-surface-variant" to="/about">About Us</Link>
          <Link className="font-label-md text-label-md text-on-surface-variant" to="/contact">Contact</Link>
        </div>
      )}
    </nav>
  );
};

export default TopNavBar;
