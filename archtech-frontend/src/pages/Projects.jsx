import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const projects = [
  { id: 1, title: 'The Apex Villa', location: 'Beverly Hills, CA', desc: 'A stunning contemporary home blending indoor and outdoor living spaces with precision structural engineering.', category: 'Residential', status: 'Completed', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWP2QfhhfrNlcYNLs-ijIwbn9VCFXDseH0KTXByBcLDgtbxMY_90ziKLH8HecxuMXXdbeQzS6855qY84_W2zPixZOKluYFHnxkWPt_k3seofCHmC195MP-8KxCUyYTfcZgg1nATwEHMFiGlIPDGgnTP8zBHvoLKaI63l_XdNnPI8QtZHR0Ykowyw2gMTqDnMVi-gMKH-8prEeIRXXOFFuJHH0ZutzVPhjiNTQ6ccuTHVqawyC0bQ', progress: null },
  { id: 2, title: 'Nexus Corporate Hub', location: 'Downtown Seattle, WA', desc: 'State-of-the-art office complex designed for sustainable energy efficiency and collaborative workspaces.', category: 'Commercial', status: 'Completed', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYpQ-AnDJAvgG7sBUps72EeOUY8fTYBNjTyjPK-b98p-KYI3goqYjndQ7JzleQ4cc0lQM1pa6YFIfdmZlBW-iDE29c1BtrL71waWl_Ea3lrSIh4xCHam22knNX-eDJ4Oe1YCoOBkoeAr2BEaH7XbVsoRYlZONYKUZTPW9H5S1A9zjkKhEyfI1e23-66u_NyqoNlFyPuTHTF6eKGSL1tw9bys7wl_ji2UX28X-GeWVG-fkz-Oz2hA', progress: null },
  { id: 3, title: 'Heritage Loft Restoration', location: 'Brooklyn, NY', desc: 'Meticulous restoration of a 1920s warehouse into luxury residential lofts, preserving original architectural integrity.', category: 'Renovation', status: 'Completed', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVEjoBmUfaAMArKruKmiHNyIv3dAAlUe9ogEKqjmDe4dkbizUFttaAFJuPxpl_nuRCUrlQ9gP_CRDf5e0EktnIMm6twwomPIAccugk31LAA1xn_vn_l-jgGiWf1lZph4nbsJWN4MypMwc9JiSIBtQqidW6RamZNWrWT8-0kqXzVMEf9dhqqHWLTuKTC6gqRAFlOIlxkU31Dc6Lw0yDBFj2QVz2yxY8SyWtmqf0XGo54gdTe0xpNg', progress: null },
  { id: 4, title: 'Lumina Arts Center', location: 'Austin, TX', desc: 'Construction of a new modern arts facility featuring complex geometric roof structures and acoustic engineering.', category: 'Commercial', status: 'Ongoing', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJ4KTUhd6xRENvuMB6SG37Fb5-IKW2XXR3flkHf3jMQ78wQrptD_R4F03J6AyZxLlHiHUIgXLblmSxuSEq14CcB3WHksjY34Et7OTWlu6nBE50SfPuvYHuGkvAorqzJLN5bdMHxNUJYv5mknqsTBnOU_7fG3RLQOpnnyzJ4_IHe0jZDXZTCeVc6gxk8f_raIIwglImc9u-mvMgbsHOC64CSCvzDYsCa6kcnGkRO48_AqZ-EsOX7Q', progress: 65 },
  { id: 5, title: 'Riverwalk Crossing', location: 'Chicago, IL', desc: 'A structurally innovative pedestrian suspension bridge integrating seamless urban connectivity.', category: 'Infrastructure', status: 'Completed', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqyEt-iG6xV13gfV7UdBJGgxJO8lf9Kn8uvsup472fUWysxT8h0gto0pIfh_sGMM3kMT-04W08tX7hB8BMA7p6TuD-soaa46Ucp1xIt7yRioLbuL1Thw8yY4sZv9FtQ4xC5yqt-KUIeRL7_iYj6Vl77rAU3KT5TOMr4on2yHFv6ycN1Q6kdXT5o5iX2EhpgvULokEuw6TgLll2q1Df4NG4sd0N0VG3mi717fSRyTJj0_K8IdpQMg', progress: null },
  { id: 6, title: 'Aura Flagship Store', location: 'Miami, FL', desc: 'A premium retail environment designed with bespoke structural elements and advanced lighting integration.', category: 'Commercial', status: 'Completed', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCx_VNJPvC5lVIA2HsFrG8NWUppUjTAFKZqbFRPf2kAKzBhjj9athofasAH845AA7px8jBdBBKpHRqb8FwTwYMM5PNSTWHoHphpzIDdbkFjNCdrJ9y7Y8FgkI_HzV5Scyb8LRxVTd0FT4zFjUGPIdN-omTSChcXWCwhtyytzdDOc6aXiISd2h2tJmggw72MK1YQcBWP23dUcTQUDNTq6Hbb9awDdzNL5rT--moJaZGFGYsmtaDWeQ', progress: null },
];

const categories = ['All', 'Residential', 'Commercial', 'Renovation', 'Infrastructure'];

const categoryColors = {
  Residential: 'bg-amber-100 text-amber-800',
  Commercial: 'bg-blue-100 text-blue-800',
  Renovation: 'bg-purple-100 text-purple-800',
  Infrastructure: 'bg-green-100 text-green-800',
};

const Projects = () => {
  const [activeStatus, setActiveStatus] = useState('Completed');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = projects.filter(p =>
    p.status === activeStatus &&
    (activeCategory === 'All' || p.category === activeCategory)
  );

  return (
    <div className="font-body-md text-on-surface antialiased min-h-screen flex flex-col bg-[#FAFAF9]">
      <style>{`
        .project-card { transition: transform 0.4s cubic-bezier(0.23,1,0.32,1), box-shadow 0.4s ease; }
        .project-card:hover { transform: translateY(-8px); box-shadow: 0 24px 60px rgba(0,0,0,0.15) !important; }
        .project-card:hover .project-img { transform: scale(1.08); }
        .project-img { transition: transform 0.7s ease; }
        .project-card:hover .view-details { opacity: 1; transform: translateY(0); }
        .view-details { opacity: 0; transform: translateY(8px); transition: opacity 0.3s ease, transform 0.3s ease; }
        .filter-btn { transition: all 0.2s cubic-bezier(0.23,1,0.32,1); }
      `}</style>

      <NavBar activeLink="Projects" />

      {/* ───────── HERO ───────── */}
      <section className="relative pt-20 overflow-hidden" style={{ minHeight: '380px' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }} />
        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        {/* Orange glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 opacity-25 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at bottom, #e67e22, transparent 70%)', filter: 'blur(30px)' }} />

        <div className="relative z-10 max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
            <span className="icon-mask text-[#e67e22] text-[16px]" style={{ fontVariationSettings: "'FILL' 1" ,  WebkitMaskImage: 'url(/icons/architecture.svg)', maskImage: 'url(/icons/architecture.svg)' , width: '16px', height: '16px'}}></span>
            <span className="text-white/90 text-sm font-medium tracking-wide">250+ Projects Delivered</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight mb-4">
            Our <span style={{ background: 'linear-gradient(90deg, #e67e22, #f39c12)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Portfolio</span>
          </h1>
          <p className="text-white/60 text-xl max-w-2xl mx-auto font-light">
            Explore landmark projects spanning residential, commercial, renovation, and infrastructure.
          </p>
        </div>
      </section>

      <main className="flex-grow pb-24 px-margin-mobile md:px-margin-desktop max-w-container-max-width mx-auto w-full">

        {/* ───────── FILTERS ───────── */}
        <div className="sticky top-16 z-20 bg-[#FAFAF9]/95 backdrop-blur-md pt-8 pb-6 -mx-margin-mobile md:-mx-margin-desktop px-margin-mobile md:px-margin-desktop border-b border-[#E5E0DD] mb-10">
          <div className="max-w-container-max-width mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
            {/* Status tabs */}
            <div className="flex gap-1 bg-[#F0EEED] p-1 rounded-xl">
              {['Completed', 'Ongoing'].map(s => (
                <button
                  key={s}
                  onClick={() => setActiveStatus(s)}
                  className={`filter-btn px-5 py-2 rounded-lg font-semibold text-sm ${activeStatus === s
                    ? 'bg-white text-on-surface shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                >
                  {s}
                  {s === 'Ongoing' && (
                    <span className="ml-2 inline-flex w-2 h-2 rounded-full bg-[#e67e22] animate-pulse align-middle"></span>
                  )}
                </button>
              ))}
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map(c => (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  className={`filter-btn px-4 py-2 rounded-full text-sm font-semibold ${activeCategory === c
                    ? 'text-white shadow-md'
                    : 'bg-white border border-[#E5E0DD] text-on-surface-variant hover:border-[#e67e22] hover:text-[#e67e22]'
                    }`}
                  style={activeCategory === c ? { background: 'linear-gradient(135deg, #e67e22, #f39c12)' } : {}}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ───────── GRID ───────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filtered.map(project => (
            <div
              key={project.id}
              className="project-card bg-white rounded-2xl overflow-hidden flex flex-col cursor-pointer"
              style={{ boxShadow: '0 4px 24px rgba(44,62,80,0.08)' }}
            >
              {/* Image */}
              <div className="relative overflow-hidden" style={{ height: '260px' }}>
                <img
                  className="project-img w-full h-full object-cover"
                  src={project.img}
                  alt={project.title}
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${categoryColors[project.category] || 'bg-gray-100 text-gray-700'}`}>
                    {project.category}
                  </span>
                </div>

                {/* Ongoing badge */}
                {project.status === 'Ongoing' && (
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-[#e67e22] text-white px-3 py-1.5 rounded-full text-xs font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                    In Progress
                  </div>
                )}

                {/* Progress bar */}
                {project.progress && (
                  <div className="absolute bottom-0 left-0 w-full h-2 bg-black/20">
                    <div
                      className="h-full transition-all duration-1000"
                      style={{ width: `${project.progress}%`, background: 'linear-gradient(90deg, #e67e22, #f39c12)' }}
                    />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-7 flex flex-col flex-grow">
                <h3 className="font-bold text-xl text-on-surface mb-2">{project.title}</h3>
                <div className="flex items-center gap-1 text-on-surface-variant mb-4 text-sm">
                  <span className="icon-mask text-[15px] text-[#e67e22]" style={{ WebkitMaskImage: 'url(/icons/location_on.svg)', maskImage: 'url(/icons/location_on.svg)' , width: '15px', height: '15px'}}></span>
                  <span>{project.location}</span>
                </div>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-6 flex-grow">{project.desc}</p>

                {project.progress && (
                  <div className="mb-5">
                    <div className="flex justify-between text-xs text-on-surface-variant mb-2 font-medium">
                      <span>Completion</span>
                      <span className="text-[#e67e22] font-bold">{project.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#F0EEED] rounded-full">
                      <div className="h-full rounded-full" style={{ width: `${project.progress}%`, background: 'linear-gradient(90deg, #e67e22, #f39c12)' }} />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between border-t border-[#F0EEED] pt-5 mt-auto">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${project.status === 'Completed' ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-700'}`}>
                    {project.status === 'Completed' ? '✓ Completed' : '⟳ Ongoing'}
                  </span>
                  <a href="#" className="view-details inline-flex items-center gap-1.5 text-[#e67e22] font-semibold text-sm hover:gap-3 transition-all duration-200">
                    Details <span className="icon-mask text-[16px]" style={{ WebkitMaskImage: 'url(/icons/arrow_forward.svg)', maskImage: 'url(/icons/arrow_forward.svg)' , width: '16px', height: '16px'}}></span>
                  </a>
                </div>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-3 text-center py-28">
              <span className="icon-mask text-[48px] text-on-surface-variant/30 mb-4 block" style={{ WebkitMaskImage: 'url(/icons/search_off.svg)', maskImage: 'url(/icons/search_off.svg)' , width: '48px', height: '48px'}}></span>
              <p className="text-on-surface-variant text-lg">No projects found for this filter.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Projects;
