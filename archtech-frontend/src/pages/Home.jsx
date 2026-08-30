import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const stats = [
  { value: '250+', label: 'Projects Completed' },
  { value: '$2.4B', label: 'In Construction Value' },
  { value: '12', label: 'Years of Excellence' },
  { value: '98%', label: 'Client Satisfaction' },
];

const features = [
  { icon: 'groups', title: 'Experienced Team', desc: 'Decades of combined expertise in complex architectural builds across 5 continents.' },
  { icon: 'schedule', title: 'On-Time Delivery', desc: 'Rigorous project management ensuring every milestone is hit with precision.' },
  { icon: 'request_quote', title: 'Transparent Pricing', desc: 'Clear, upfront cost structures with zero hidden surprises — ever.' },
  { icon: 'construction', title: 'Quality Materials', desc: 'Sourcing only premium, sustainable materials for lasting structural integrity.' },
];

const recentProjects = [
  {
    title: 'The Apex Villa',
    location: 'Beverly Hills, CA',
    category: 'Residential',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWP2QfhhfrNlcYNLs-ijIwbn9VCFXDseH0KTXByBcLDgtbxMY_90ziKLH8HecxuMXXdbeQzS6855qY84_W2zPixZOKluYFHnxkWPt_k3seofCHmC195MP-8KxCUyYTfcZgg1nATwEHMFiGlIPDGgnTP8zBHvoLKaI63l_XdNnPI8QtZHR0Ykowyw2gMTqDnMVi-gMKH-8prEeIRXXOFFuJHH0ZutzVPhjiNTQ6ccuTHVqawyC0bQ',
  },
  {
    title: 'Nexus Corporate Hub',
    location: 'Downtown Seattle, WA',
    category: 'Commercial',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYpQ-AnDJAvgG7sBUps72EeOUY8fTYBNjTyjPK-b98p-KYI3goqYjndQ7JzleQ4cc0lQM1pa6YFIfdmZlBW-iDE29c1BtrL71waWl_Ea3lrSIh4xCHam22knNX-eDJ4Oe1YCoOBkoeAr2BEaH7XbVsoRYlZONYKUZTPW9H5S1A9zjkKhEyfI1e23-66u_NyqoNlFyPuTHTF6eKGSL1tw9bys7wl_ji2UX28X-GeWVG-fkz-Oz2hA',
  },
  {
    title: 'Lumina Arts Center',
    location: 'Austin, TX',
    category: 'Commercial',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJ4KTUhd6xRENvuMB6SG37Fb5-IKW2XXR3flkHf3jMQ78wQrptD_R4F03J6AyZxLlHiHUIgXLblmSxuSEq14CcB3WHksjY34Et7OTWlu6nBE50SfPuvYHuGkvAorqzJLN5bdMHxNUJYv5mknqsTBnOU_7fG3RLQOpnnyzJ4_IHe0jZDXZTCeVc6gxk8f_raIIwglImc9u-mvMgbsHOC64CSCvzDYsCa6kcnGkRO48_AqZ-EsOX7Q',
  },
];

const Home = () => {

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-[#FAFAF9] text-on-surface font-body-md antialiased overflow-x-hidden">
      <style>{`
        .fade-up { opacity: 0; transform: translateY(32px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .fade-up.animate-in { opacity: 1; transform: translateY(0); }
        .fade-up:nth-child(2) { transition-delay: 0.1s; }
        .fade-up:nth-child(3) { transition-delay: 0.2s; }
        .fade-up:nth-child(4) { transition-delay: 0.3s; }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes shimmer { 0% { background-position: -400px 0; } 100% { background-position: 400px 0; } }
        .hero-grain::after {
          content: ''; position: absolute; inset: 0; pointer-events: none; z-index: 1;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          mix-blend-mode: overlay;
        }
        .card-glow:hover { box-shadow: 0 20px 60px rgba(230, 126, 34, 0.15), 0 4px 20px rgba(44,62,80,0.08); }
        .project-card-overlay { background: linear-gradient(to top, rgba(15,23,42,0.9) 0%, rgba(15,23,42,0.3) 50%, transparent 100%); }
        .stat-number { font-variant-numeric: tabular-nums; }
      `}</style>

      <NavBar activeLink="Home" />

      {/* ───────── HERO ───────── */}
      <section className="hero-grain relative w-full min-h-screen flex items-center overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{
            backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC9Oo7jPZcEsoseblzJjC5pJmRsQ-gavzMcZMOo8pnhlM2F4c_5Ol9nXNie9fKD103TFmMlt0OtNMCioZEWZc6Fat5LlW6f_06koGNMkMW_vqlgi_UEXWUYiWM2CifP4lCENx1kUmcmFHbCPkFoliluhaSlXP5AyqfARUUMmZCrXGHxZKEqHYvZr7mgq5iHl3SlEQdZ0pn_M07PJ7RtA1lhyRD20_FHwVFg_r-LFc-tgKuc66nFbA')",
            transition: 'transform 8s ease-out',
          }}
        />
        {/* Dark gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Decorative accent glow */}
        <div className="absolute bottom-0 left-0 w-[600px] h-[400px] rounded-full opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at bottom left, #e67e22, transparent 70%)' }} />

        <div className="relative z-10 w-full max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop pt-32 pb-24">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 rounded-full bg-[#e67e22] animate-pulse"></span>
              <span className="text-white/90 text-sm font-medium tracking-wide">Premier Architectural Construction</span>
            </div>

            <h1 className="font-display-lg text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-[1.05] tracking-tight">
              Building<br />
              <span style={{ background: 'linear-gradient(90deg, #e67e22, #f39c12)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Tomorrow's
              </span>
              <br />Landmarks
            </h1>

            <p className="text-xl text-white/80 mb-10 max-w-xl leading-relaxed font-light">
              Precision engineering meets visionary architecture. We construct spaces that define skylines and elevate communities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/login"
                className="group inline-flex items-center justify-center gap-3 bg-[#e67e22] hover:bg-[#d35400] text-white px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/30 hover:-translate-y-0.5"
              >
                Request a Project
                <span className="icon-mask text-[18px] group-hover:translate-x-1 transition-transform" style={{ WebkitMaskImage: 'url(/icons/arrow_forward.svg)', maskImage: 'url(/icons/arrow_forward.svg)' , width: '18px', height: '18px'}}></span>
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 text-white px-8 py-4 rounded-full font-semibold text-base transition-all duration-300"
              >
                <span className="icon-mask text-[18px]" style={{ WebkitMaskImage: 'url(/icons/play_circle.svg)', maskImage: 'url(/icons/play_circle.svg)' , width: '18px', height: '18px'}}></span>
                View Our Work
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 opacity-60">
          <span className="text-white text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white to-transparent animate-pulse"></div>
        </div>
      </section>

      {/* ───────── STATS BAND ───────── */}
      <section style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }} className="py-16">
        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((s, i) => (
              <div key={i}>
                <div className="stat-number text-4xl md:text-5xl font-bold mb-2" style={{ background: 'linear-gradient(90deg, #e67e22, #f39c12)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {s.value}
                </div>
                <div className="text-white/60 text-sm font-medium tracking-wide uppercase">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── WHY CHOOSE US — BOXED CARD LAYOUT ───────── */}
      <section className="py-16 bg-[#FAFAF9]">
        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="bg-white rounded-3xl border border-[#E5E0DD] overflow-hidden grid grid-cols-1 md:grid-cols-12 shadow-sm" style={{ minHeight: '600px' }}>
            {/* Left: Image Column */}
            <div className="md:col-span-5 relative min-h-[300px] md:min-h-full">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnSzJDfbuVBBAFoF84WhlB5agQyWWaFGnp0WQe7CP8-wE-D7suN5Yr9pUfuKOivTVoz-3_dJ9wqr9IHdMOUeHZnFXM77YND3n5D8H_22oSUETewUiAW2wrOsEkCfxb0RJ2_J8Cla4o1FuC8cLe0g1d1p4iB9HvE12Bs3nmFDGOQdPqTNjG6RE4IZ92zNruKSvVRS0qmzaFJSQkcjlC_CnhuWSJfr9TT6ltrzJx7EvDWSlCX7UxRQ"
                alt="ArchTech Pro team at work"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(15,23,42,0.4) 0%, rgba(15,23,42,0.1) 100%)' }} />
              {/* Floating experience badge */}
              <div className="absolute bottom-8 left-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5">
                <div className="text-4xl font-black text-white mb-1" style={{ background: 'linear-gradient(90deg,#e67e22,#f39c12)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>12+</div>
                <div className="text-white/80 text-xs font-semibold uppercase tracking-wider">Years of Excellence</div>
              </div>
            </div>

            {/* Right: Content Column */}
            <div className="md:col-span-7 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              <span className="inline-block text-[#e67e22] text-sm font-semibold tracking-[0.2em] uppercase mb-4">Why ArchTech Pro</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-on-surface mb-4 leading-tight tracking-tight">
                Engineering Trust,<br />Delivering Excellence
              </h2>
              <p className="text-on-surface-variant text-base leading-relaxed mb-10 max-w-xl">
                From the first blueprint to the final finish, we bring precision, transparency, and relentless commitment to every project we undertake.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {features.map((card, i) => (
                  <div
                    key={card.title}
                    className="card-glow group relative bg-[#FAFAF9] rounded-2xl p-6 border border-[#E5E0DD] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                  >
                    {/* Number watermark */}
                    <span className="absolute top-3 right-4 text-6xl font-black leading-none select-none"
                      style={{ color: 'rgba(230,126,34,0.06)' }}>{String(i + 1).padStart(2,'0')}</span>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-105"
                      style={{ background: 'linear-gradient(135deg, #fff3e0, #ffe0b2)' }}>
                      <span className="icon-mask text-[20px] text-[#e67e22]" style={{ fontVariationSettings: "'FILL' 1" ,  WebkitMaskImage: `url(/icons/${card.icon}.svg)`, maskImage: `url(/icons/${card.icon}.svg)` }}></span>
                    </div>
                    <h3 className="font-bold text-sm text-on-surface mb-1">{card.title}</h3>
                    <p className="text-on-surface-variant text-xs leading-relaxed">{card.desc}</p>
                    <div className="mt-4 w-5 h-0.5 rounded-full bg-[#e67e22] group-hover:w-10 transition-all duration-300"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── HOW WE WORK ───────── */}
      <section style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)' }} className="py-28 px-margin-mobile md:px-margin-desktop relative overflow-hidden">
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '64px 64px' }} />
        {/* Glow orbs */}
        <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full opacity-15 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #e67e22, transparent)', filter: 'blur(60px)' }} />
        <div className="absolute bottom-0 right-1/4 w-60 h-60 rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #f39c12, transparent)', filter: 'blur(60px)' }} />

        <div className="relative z-10 max-w-container-max-width mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block text-[#e67e22] text-sm font-semibold tracking-[0.2em] uppercase mb-4">Our Process</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              How We <span style={{ background: 'linear-gradient(90deg,#e67e22,#f39c12)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Work</span>
            </h2>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting dashed line (desktop) */}
            <div className="absolute top-14 left-[16.67%] right-[16.67%] h-px border-t-2 border-dashed border-white/10 hidden md:block" />

            {[{
              step: '01', icon: 'lightbulb', title: 'Discovery & Vision',
              desc: 'We sit down with you to deeply understand your vision, constraints, timeline, and budget. Every great build begins with listening.'
            }, {
              step: '02', icon: 'architecture', title: 'Blueprint & Planning',
              desc: 'Our engineers and architects craft detailed plans, sourcing optimal materials and partners while managing permits and compliance.'
            }, {
              step: '03', icon: 'verified', title: 'Build & Deliver',
              desc: 'We execute with surgical precision — real-time progress updates, rigorous QC checks, and an unwavering commitment to your deadline.'
            }].map((s) => (
              <div key={s.step} className="group relative flex flex-col items-center text-center">
                {/* Step circle */}
                <div className="w-28 h-28 rounded-full flex items-center justify-center mb-8 relative transition-all duration-300 group-hover:scale-105"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '2px solid rgba(230,126,34,0.4)', boxShadow: '0 0 40px rgba(230,126,34,0.15)' }}>
                  <span className="icon-mask text-[36px] text-[#e67e22]" style={{ fontVariationSettings: "'FILL' 1" ,  WebkitMaskImage: `url(/icons/${s.icon}.svg)`, maskImage: `url(/icons/${s.icon}.svg)` }}></span>
                  {/* Step number badge */}
                  <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white"
                    style={{ background: 'linear-gradient(135deg, #e67e22, #f39c12)' }}>{s.step}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed max-w-xs">{s.desc}</p>
                {/* Bottom accent */}
                <div className="mt-6 w-8 h-0.5 rounded-full mx-auto group-hover:w-16 transition-all duration-300"
                  style={{ background: 'linear-gradient(90deg, #e67e22, #f39c12)' }} />
              </div>
            ))}
          </div>

          {/* CTA inside */}
          <div className="text-center mt-16">
            <Link to="/contact" className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              style={{ background: 'linear-gradient(135deg, #e67e22, #f39c12)', boxShadow: '0 4px 20px rgba(230,126,34,0.35)' }}>
              Start Your Project
              <span className="icon-mask text-[18px] group-hover:translate-x-1 transition-transform" style={{ WebkitMaskImage: 'url(/icons/arrow_forward.svg)', maskImage: 'url(/icons/arrow_forward.svg)' , width: '18px', height: '18px'}}></span>
            </Link>
          </div>
        </div>
      </section>

      {/* ───────── RECENT PROJECTS ───────── */}
      <section className="py-28 px-margin-mobile md:px-margin-desktop" style={{ background: 'linear-gradient(180deg, #f5f5f0 0%, #FAFAF9 100%)' }}>
        <div className="max-w-container-max-width mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-4">
            <div>
              <span className="inline-block text-[#e67e22] text-sm font-semibold tracking-[0.2em] uppercase mb-4">Our Work</span>
              <h2 className="font-display-lg text-4xl md:text-5xl text-on-surface tracking-tight">Featured Projects</h2>
            </div>
            <Link to="/projects" className="group inline-flex items-center gap-2 text-[#e67e22] font-semibold text-sm tracking-wide uppercase hover:gap-4 transition-all duration-300">
              View All Projects
              <span className="icon-mask text-[18px] group-hover:translate-x-1 transition-transform" style={{ WebkitMaskImage: 'url(/icons/arrow_forward.svg)', maskImage: 'url(/icons/arrow_forward.svg)' , width: '18px', height: '18px'}}></span>
            </Link>
          </div>

          {/* Equal height grid cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {recentProjects.map((p) => (
              <div
                key={p.title}
                className="group relative rounded-2xl overflow-hidden cursor-pointer"
                style={{
                  height: '400px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.14)',
                }}
              >
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  style={{ display: 'block' }}
                />
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.3) 55%, transparent 100%)' }}
                />
                {/* Category pill */}
                <div className="absolute top-5 left-5 z-10">
                  <span className="bg-white/15 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full tracking-wide">
                    {p.category}
                  </span>
                </div>
                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 right-0 p-7 z-10">
                  <h3 className="text-white font-bold text-xl mb-1">{p.title}</h3>
                  <p className="text-white/70 text-sm flex items-center gap-1 mb-4">
                    <span className="icon-mask text-[14px]" style={{ WebkitMaskImage: 'url(/icons/location_on.svg)', maskImage: 'url(/icons/location_on.svg)' , width: '14px', height: '14px'}}></span>
                    {p.location}
                  </p>
                  <div className="inline-flex items-center gap-2 text-[#e67e22] text-sm font-semibold opacity-0 group-hover:opacity-100 group-hover:translate-y-0 -translate-y-2 transition-all duration-300">
                    View Details
                    <span className="icon-mask text-[16px]" style={{ WebkitMaskImage: 'url(/icons/arrow_forward.svg)', maskImage: 'url(/icons/arrow_forward.svg)' , width: '16px', height: '16px'}}></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── CTA BANNER ───────── */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)' }} />
        {/* Geometric shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 -translate-y-1/2 translate-x-1/4"
          style={{ background: 'radial-gradient(circle, #e67e22, transparent)' }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10 translate-y-1/2 -translate-x-1/4"
          style={{ background: 'radial-gradient(circle, #f39c12, transparent)' }} />

        <div className="relative z-10 max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop text-center fade-up">
          <span className="inline-block text-[#e67e22] text-sm font-semibold tracking-[0.2em] uppercase mb-6">Get Started Today</span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
            Ready to Build Your<br />
            <span style={{ background: 'linear-gradient(90deg, #e67e22, #f39c12)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Vision?
            </span>
          </h2>
          <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto font-light leading-relaxed">
            From concept to completion — our experts are ready to transform your most ambitious architectural dreams into reality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center gap-3 bg-[#e67e22] hover:bg-[#d35400] text-white px-10 py-4 rounded-full font-semibold text-base transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/30 hover:-translate-y-0.5"
            >
              Schedule a Consultation
              <span className="icon-mask text-[18px] group-hover:translate-x-1 transition-transform" style={{ WebkitMaskImage: 'url(/icons/calendar_month.svg)', maskImage: 'url(/icons/calendar_month.svg)' , width: '18px', height: '18px'}}></span>
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white px-10 py-4 rounded-full font-semibold text-base transition-all duration-300"
            >
              Browse Portfolio
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
