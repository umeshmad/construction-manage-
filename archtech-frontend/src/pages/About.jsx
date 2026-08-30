import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const teamMembers = [
  { name: 'Robert Vance', role: 'Founder & CEO', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtTnhtjieRQgGWQOt7GXOHgamjWVw1po8ZpyV0EKqiGhTbf20yx0ccxfhxiyqB7ZT0e8VGI09NpK-2_v2_knbtL9iHUXvH3Iuaxf3ivCb6PUhp67e3MV0CRTAQ6w4DT-CIjjFI4FcEF1RvH20lJTdqxun_eYKeux_447vd52U-DvIaf-U_pQCOF9mNDC-WyakJ8DGrw1HLjW8H8xUxfq6-QB67unidULwo-kSpfRC3zScNNCvPUA' },
  { name: 'Elena Rostova', role: 'Principal Architect', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFdKeRxpnLXuJpXcC29_n-O2huopYzkWJ5hpvXkLnHAX1OLlnXT1TzfyG4eolA-GIxTfFyuSEOd598JhxxyqyfYJMVAVbKzeAT5mX6c9pK_ZYwcWQMLK4J1RglWeOnMrj6mpk3r-aUaeBH_LGhyxTi0yYXupnySoDOFtOLDwwU2GBLLyWaCYuk6qWDcKJn1htun0zZ3CE0OSggoZS44RgAxTGTahm9jFlAnEotIjSH5BgzMyFPBw' },
  { name: 'Marcus Chen', role: 'Lead Engineer', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZAJlf1p8ymADWEzNyae4ddNZNuHISxejVIZ0eOlL_Em3cVPTzV507Y_oq7kNHXFOxxDeMaG1-z6_aGLnPrulvSD6_RoHfpVe7S1c4JC22fO4Nn-Z2UAcFFz_dDgNvVb-E1GjMeDNFJ1d2RHWaFBxu-8QDSuPa1VPy2Vymk-CVcwTAb3Pud_jwmIYxmGXj7_0VFNdklJQJ5n-v8aTTPeyHaWSL2r_KO-gzr4bJPGUfFq3Z5NPo4A' },
  { name: 'Sarah Jenkins', role: 'Director of Operations', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvzLHOnDQqFQcDbMsLelkHeM887aXtN9OQqcSix8NMH4f2ASg0KGR1jRK35b1uGbYHOx3vp-eHkgnsz6so8xDvjHN15jOQv6Peo_H4yeZPNb3U17SUox9JmIfjU-qbuX-DnDH9AgWeTwJP_shxp8BwtCXpy4KdQ01VcgrDgFeAfIVOL7GKxMx-DAJ8YREmBznLcGXn3twnY5bju7LLM6usBYfLWglAsHCRgqywUXl1PN51RgvbTg' },
];

const values = [
  { icon: 'my_location', title: 'Our Mission', text: 'To deliver unparalleled precision and reliability in high-end construction management — transforming ambitious blueprints into flawless realities.' },
  { icon: 'visibility', title: 'Our Vision', text: 'To set the global standard for architectural execution, where modern innovation meets tactile warmth and structural integrity.' },
];

const milestones = [
  { year: '2012', event: 'Founded in New York', icon: 'rocket_launch' },
  { year: '2015', event: 'First $100M project delivered', icon: 'emoji_events' },
  { year: '2018', event: 'Expanded to 3 continents', icon: 'public' },
  { year: '2021', event: 'ISO 9001 Certification', icon: 'verified' },
  { year: '2024', event: '250+ Projects Completed', icon: 'architecture' },
];

const About = () => (
  <div className="antialiased min-h-screen flex flex-col text-on-surface font-body-md bg-[#FAFAF9]">
    <style>{`
      .fade-up { opacity: 0; transform: translateY(28px); transition: opacity 0.65s ease, transform 0.65s ease; }
      .fade-up.visible { opacity: 1; transform: translateY(0); }
      .team-card:hover .team-overlay { opacity: 1; }
      .team-overlay { opacity: 0; transition: opacity 0.3s ease; }
      @keyframes pulse-border { 0%,100% { box-shadow: 0 0 0 0 rgba(230,126,34,0.3); } 50% { box-shadow: 0 0 0 8px rgba(230,126,34,0); } }
      .active-milestone { animation: pulse-border 2s infinite; }
    `}</style>

    <NavBar activeLink="About Us" />

    {/* ───────── CINEMATIC HERO ───────── */}
    <section className="relative min-h-[70vh] flex items-center pt-20 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBnSzJDfbuVBBAFoF84WhlB5agQyWWaFGnp0WQe7CP8-wE-D7suN5Yr9pUfuKOivTVoz-3_dJ9wqr9IHdMOUeHZnFXM77YND3n5D8H_22oSUETewUiAW2wrOsEkCfxb0RJ2_J8Cla4o1FuC8cLe0g1d1p4iB9HvE12Bs3nmFDGOQdPqTNjG6RE4IZ92zNruKSvVRS0qmzaFJSQkcjlC_CnhuWSJfr9TT6ltrzJx7EvDWSlCX7UxRQ')" }}
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.6) 60%, rgba(15,23,42,0.3) 100%)' }} />
      {/* Orange glow bottom */}
      <div className="absolute bottom-0 left-1/4 w-96 h-48 opacity-30 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom, #e67e22, transparent 70%)', filter: 'blur(40px)' }} />

      <div className="relative z-10 w-full max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-24">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#e67e22]"></span>
            <span className="text-white/90 text-sm font-medium tracking-wide">Est. 2012 — New York</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6">
            About<br />
            <span style={{ background: 'linear-gradient(90deg, #e67e22, #f39c12)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              ArchTech Pro
            </span>
          </h1>
          <p className="text-white/70 text-xl leading-relaxed font-light">
            Crafting the foundation of excellence since 2012. Where architectural vision meets structural mastery.
          </p>
        </div>
      </div>
    </section>

    <div className="flex-grow">

      {/* ───────── COMPANY STORY ───────── */}
      <section className="py-24 md:py-32 px-margin-mobile md:px-margin-desktop bg-white">
        <div className="max-w-container-max-width mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ height: '480px' }}>
              <img
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnSzJDfbuVBBAFoF84WhlB5agQyWWaFGnp0WQe7CP8-wE-D7suN5Yr9pUfuKOivTVoz-3_dJ9wqr9IHdMOUeHZnFXM77YND3n5D8H_22oSUETewUiAW2wrOsEkCfxb0RJ2_J8Cla4o1FuC8cLe0g1d1p4iB9HvE12Bs3nmFDGOQdPqTNjG6RE4IZ92zNruKSvVRS0qmzaFJSQkcjlC_CnhuWSJfr9TT6ltrzJx7EvDWSlCX7UxRQ"
                alt="Team on job site"
              />
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-2xl border border-[#E5E0DD] w-48">
              <div className="text-4xl font-bold mb-1" style={{ background: 'linear-gradient(90deg, #e67e22, #f39c12)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>250+</div>
              <div className="text-sm text-on-surface-variant font-medium">Projects Worldwide</div>
            </div>
          </div>

          <div>
            <span className="inline-block text-[#e67e22] text-sm font-semibold tracking-[0.2em] uppercase mb-4">Our Story</span>
            <h2 className="text-4xl md:text-5xl font-bold text-on-surface mb-8 leading-tight tracking-tight">A Decade of<br />Building Excellence</h2>
            <div className="space-y-5 text-on-surface-variant leading-relaxed">
              <p>ArchTech Pro was founded on a simple premise: construction management shouldn't be chaotic. What started as a small consultancy in 2012 has grown into a premier partner for high-end developers and discerning architects.</p>
              <p>We recognized that the gap between architectural vision and structural reality was often where projects lost their soul — and their budget. Our approach bridges that divide through meticulous planning and transparent communication.</p>
              <p>Today, our team of seasoned engineers, project managers, and design specialists work seamlessly to bring complex, luxury projects to life. We don't just build structures — we orchestrate excellence.</p>
            </div>
            <Link to="/contact" className="group inline-flex items-center gap-3 mt-8 bg-[#e67e22] hover:bg-[#d35400] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange-400/30">
              Work With Us
              <span className="icon-mask text-[18px] group-hover:translate-x-1 transition-transform" style={{ WebkitMaskImage: 'url(/icons/arrow_forward.svg)', maskImage: 'url(/icons/arrow_forward.svg)' , width: '18px', height: '18px'}}></span>
            </Link>
          </div>
        </div>
      </section>

      {/* ───────── TIMELINE ───────── */}
      <section className="py-24 md:py-32 px-margin-mobile md:px-margin-desktop" style={{ background: 'linear-gradient(180deg, #f5f5f0 0%, #FAFAF9 100%)' }}>
        <div className="max-w-container-max-width mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block text-[#e67e22] text-sm font-semibold tracking-[0.2em] uppercase mb-4">Our Journey</span>
            <h2 className="text-4xl md:text-5xl font-bold text-on-surface tracking-tight">Milestones That Define Us</h2>
          </div>
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-10 left-0 right-0 h-0.5 hidden md:block" style={{ background: 'linear-gradient(90deg, transparent, #e67e22, #f39c12, transparent)' }} />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {milestones.map((m, i) => (
                <div key={m.year} className="flex flex-col items-center text-center gap-4 relative">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center z-10 transition-all duration-300 hover:scale-110 ${i === milestones.length - 1 ? 'active-milestone' : ''}`}
                    style={{ background: i === milestones.length - 1 ? 'linear-gradient(135deg, #e67e22, #f39c12)' : 'white', boxShadow: '0 4px 20px rgba(230,126,34,0.2)', border: '2px solid #e67e22' }}>
                    <span className={`material-symbols-outlined text-[24px] ${i === milestones.length - 1 ? 'text-white' : 'text-[#e67e22]'}`} style={{ fontVariationSettings: "'FILL' 1" }}>{m.icon}</span>
                  </div>
                  <div className="font-bold text-[#e67e22] text-xl">{m.year}</div>
                  <div className="text-on-surface-variant text-sm leading-relaxed">{m.event}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────── MISSION / VISION ───────── */}
      <section className="py-24 md:py-32 px-margin-mobile md:px-margin-desktop bg-white">
        <div className="max-w-container-max-width mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block text-[#e67e22] text-sm font-semibold tracking-[0.2em] uppercase mb-4">Our Purpose</span>
            <h2 className="text-4xl md:text-5xl font-bold text-on-surface tracking-tight">Mission & Vision</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((item) => (
              <div key={item.title} className="group relative rounded-2xl p-10 border border-[#E5E0DD] bg-white hover:-translate-y-2 transition-all duration-400 overflow-hidden"
                style={{ boxShadow: '0 4px 24px rgba(44,62,80,0.06)' }}>
                <div className="absolute top-0 right-0 w-40 h-40 opacity-5 -translate-y-8 translate-x-8 rounded-full group-hover:opacity-10 transition-opacity duration-300"
                  style={{ background: 'radial-gradient(circle, #e67e22, transparent)' }} />
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8" style={{ background: 'linear-gradient(135deg, #fff3e0, #ffe0b2)' }}>
                  <span className="icon-mask text-[28px] text-[#e67e22]" style={{ fontVariationSettings: "'FILL' 1" ,  WebkitMaskImage: `url(/icons/${item.icon}.svg)`, maskImage: `url(/icons/${item.icon}.svg)` }}></span>
                </div>
                <h3 className="text-2xl font-bold text-on-surface mb-4">{item.title}</h3>
                <p className="text-on-surface-variant leading-relaxed">{item.text}</p>
                <div className="mt-8 w-10 h-0.5 rounded-full bg-[#e67e22] group-hover:w-20 transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── LEADERSHIP ───────── */}
      <section className="py-24 md:py-32 px-margin-mobile md:px-margin-desktop" style={{ background: 'linear-gradient(180deg, #f5f5f0 0%, #FAFAF9 100%)' }}>
        <div className="max-w-container-max-width mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block text-[#e67e22] text-sm font-semibold tracking-[0.2em] uppercase mb-4">The People</span>
            <h2 className="text-4xl md:text-5xl font-bold text-on-surface tracking-tight">Leadership Team</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="team-card group relative rounded-2xl overflow-hidden cursor-pointer" style={{ height: '380px', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={member.img} alt={member.name} />
                {/* Always-visible bottom gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-1/2" style={{ background: 'linear-gradient(to top, rgba(15,23,42,0.9), transparent)' }} />
                {/* Hover overlay */}
                <div className="team-overlay absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(230,126,34,0.85), rgba(15,23,42,0.5))' }} />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h4 className="text-white font-bold text-lg">{member.name}</h4>
                  <p className="text-white/70 text-sm">{member.role}</p>
                  <div className="team-overlay flex gap-3 mt-3">
                    <button className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-colors">
                      <span className="icon-mask text-white text-[16px]" style={{ WebkitMaskImage: 'url(/icons/mail.svg)', maskImage: 'url(/icons/mail.svg)' , width: '16px', height: '16px'}}></span>
                    </button>
                    <button className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-colors">
                      <span className="icon-mask text-white text-[16px]" style={{ WebkitMaskImage: 'url(/icons/share.svg)', maskImage: 'url(/icons/share.svg)' , width: '16px', height: '16px'}}></span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── CERTIFICATIONS ───────── */}
      <section className="py-12 px-margin-mobile md:px-margin-desktop border-y border-[#E5E0DD] bg-white">
        <div className="max-w-container-max-width mx-auto flex flex-wrap justify-center md:justify-between items-center gap-8">
          {[
            { icon: 'verified', label: 'Licensed & Insured' },
            { icon: 'shield', label: 'ISO 9001 Certified' },
            { icon: 'eco', label: 'LEED Certified' },
            { icon: 'workspace_premium', label: 'Award-Winning Firm' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-3 text-on-surface-variant hover:text-[#e67e22] transition-colors group">
              <span className="icon-mask text-[24px] text-[#e67e22]" style={{ fontVariationSettings: "'FILL' 1" ,  WebkitMaskImage: `url(/icons/${item.icon}.svg)`, maskImage: `url(/icons/${item.icon}.svg)` }}></span>
              <span className="font-semibold text-sm tracking-wide">{item.label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>

    <Footer />
  </div>
);

export default About;
