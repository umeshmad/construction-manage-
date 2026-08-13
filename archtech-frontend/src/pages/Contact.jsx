import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="text-on-surface antialiased min-h-screen flex flex-col font-body-md bg-[#FAFAF9]">
      <style>{`
        .input-field {
          width: 100%; background: #F9F8F7; border: 1.5px solid #E5E0DD;
          border-radius: 12px; padding: 14px 16px 14px 48px; color: #1a1a2e; font-size: 14px;
          transition: border-color 0.2s, box-shadow 0.2s; outline: none;
        }
        .input-field:focus { border-color: #e67e22; box-shadow: 0 0 0 3px rgba(230,126,34,0.12); }
        .textarea-field {
          width: 100%; background: #F9F8F7; border: 1.5px solid #E5E0DD;
          border-radius: 12px; padding: 14px 16px; color: #1a1a2e; font-size: 14px;
          transition: border-color 0.2s, box-shadow 0.2s; outline: none; resize: none;
        }
        .textarea-field:focus { border-color: #e67e22; box-shadow: 0 0 0 3px rgba(230,126,34,0.12); }
        .select-field {
          width: 100%; background: #F9F8F7; border: 1.5px solid #E5E0DD;
          border-radius: 12px; padding: 14px 48px 14px 48px; color: #1a1a2e; font-size: 14px;
          transition: border-color 0.2s, box-shadow 0.2s; outline: none; appearance: none; cursor: pointer;
        }
        .select-field:focus { border-color: #e67e22; box-shadow: 0 0 0 3px rgba(230,126,34,0.12); }
        @keyframes check-pop { 0% { transform: scale(0.5); opacity: 0; } 80% { transform: scale(1.1); } 100% { transform: scale(1); opacity: 1; } }
        .check-pop { animation: check-pop 0.4s ease-out forwards; }
      `}</style>

      <NavBar activeLink="Contact" />

      <div className="flex-grow">

        {/* ───────── HERO ───────── */}
        <section className="relative min-h-[55vh] flex items-center pt-20 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuATXzK9NZ7TBJvQBQ8JNwLWOtEsIGrRowjN9rQBjLCyCshpn6NkAoZ_YVh7NkIN52W731avZeoa4GwVOqSVSC2jt2eB4B77TBivoLULXhuwraeADx7HPE71H9V9IcB1Afx1tr3iTFt_jqK4BZ6u-8vURQr_ZhqTS4n-su_6IIQBVNEtQtAAeptnjIczoXla19NBVoGxEYO6WGyj3DKoBU81bkTFTDCkv3UDKc29eTkiNAgkjwKAXQ')" }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.65) 60%, rgba(15,23,42,0.4) 100%)' }} />
          <div className="absolute bottom-0 right-1/4 w-96 h-48 opacity-20 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at bottom, #e67e22, transparent 70%)', filter: 'blur(40px)' }} />

          <div className="relative z-10 w-full max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-20">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
              <span className="icon-mask text-[#e67e22] text-[16px]" style={{ fontVariationSettings: "'FILL' 1" ,  WebkitMaskImage: 'url(/icons/handshake.svg)', maskImage: 'url(/icons/handshake.svg)' , width: '16px', height: '16px'}}></span>
              <span className="text-white/90 text-sm font-medium tracking-wide">Let's Collaborate</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-4">
              Let's Build<br />
              <span style={{ background: 'linear-gradient(90deg, #e67e22, #f39c12)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Something Extraordinary.
              </span>
            </h1>
            <p className="text-white/70 text-xl max-w-xl font-light leading-relaxed">
              Our team of experts is ready to transform your most ambitious architectural vision into reality.
            </p>
          </div>
        </section>

        {/* ───────── CONTACT CARD ───────── */}
        <section className="w-full max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop -mt-16 relative z-20 pb-24">
          <div className="bg-white rounded-3xl border border-[#E5E0DD] overflow-hidden"
            style={{ boxShadow: '0 24px 80px rgba(44,62,80,0.12)' }}>

            {/* Info strip */}
            <div className="grid grid-cols-1 md:grid-cols-3 border-b border-[#E5E0DD]">
              {[
                { icon: 'location_on', title: 'Our Office', lines: ['123 Architectural Way, Suite 400', 'Design District, NY 10001'] },
                { icon: 'mail', title: 'Email Us', lines: ['hello@archtechpro.com', 'projects@archtechpro.com'] },
                { icon: 'phone', title: 'Call Us', lines: ['+1 (555) 987-6543', 'Mon–Fri 9am–6pm EST'] },
              ].map((item, i) => (
                <div
                  key={item.title}
                  className={`flex items-start gap-4 p-8 ${i < 2 ? 'md:border-r border-b md:border-b-0 border-[#E5E0DD]' : ''}`}
                >
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #fff3e0, #ffe0b2)' }}>
                    <span className="icon-mask text-[#e67e22] text-[22px]" style={{ fontVariationSettings: "'FILL' 1" ,  WebkitMaskImage: `url(/icons/${item.icon}.svg)`, maskImage: `url(/icons/${item.icon}.svg)` }}></span>
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface mb-1">{item.title}</h4>
                    {item.lines.map(l => <p key={l} className="text-on-surface-variant text-sm">{l}</p>)}
                  </div>
                </div>
              ))}
            </div>

            {/* Form + map */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Form */}
              <div className="lg:col-span-7 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-[#E5E0DD]">
                <h3 className="text-2xl font-bold text-on-surface mb-8">Send a Message</h3>

                {submitted ? (
                  <div className="check-pop flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                      style={{ background: 'linear-gradient(135deg, #e67e22, #f39c12)' }}>
                      <span className="icon-mask text-white text-[36px]" style={{ fontVariationSettings: "'FILL' 1" ,  WebkitMaskImage: 'url(/icons/check_circle.svg)', maskImage: 'url(/icons/check_circle.svg)' , width: '36px', height: '36px'}}></span>
                    </div>
                    <h4 className="text-xl font-bold text-on-surface mb-2">Message Sent!</h4>
                    <p className="text-on-surface-variant text-sm max-w-xs">
                      Thank you for reaching out. Our team will respond within 1 business day.
                    </p>
                  </div>
                ) : (
                  <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-on-surface mb-2">First Name</label>
                        <div className="relative">
                          <input className="input-field" placeholder="John" type="text" required />
                          <span className="icon-mask absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]" style={{ WebkitMaskImage: 'url(/icons/person.svg)', maskImage: 'url(/icons/person.svg)' , width: '18px', height: '18px'}}></span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-on-surface mb-2">Last Name</label>
                        <div className="relative">
                          <input className="input-field" placeholder="Doe" type="text" required />
                          <span className="icon-mask absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]" style={{ WebkitMaskImage: 'url(/icons/badge.svg)', maskImage: 'url(/icons/badge.svg)' , width: '18px', height: '18px'}}></span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-on-surface mb-2">Email Address</label>
                        <div className="relative">
                          <input className="input-field" placeholder="you@example.com" type="email" required />
                          <span className="icon-mask absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]" style={{ WebkitMaskImage: 'url(/icons/mail.svg)', maskImage: 'url(/icons/mail.svg)' , width: '18px', height: '18px'}}></span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-on-surface mb-2">Phone (Optional)</label>
                        <div className="relative">
                          <input className="input-field" placeholder="+1 (555) 000-0000" type="tel" />
                          <span className="icon-mask absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]" style={{ WebkitMaskImage: 'url(/icons/phone.svg)', maskImage: 'url(/icons/phone.svg)' , width: '18px', height: '18px'}}></span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-on-surface mb-2">Subject</label>
                      <div className="relative">
                        <select className="select-field" defaultValue="">
                          <option value="" disabled>Select a topic...</option>
                          <option>New Project Inquiry</option>
                          <option>Consultation Request</option>
                          <option>Partnership Opportunity</option>
                          <option>Press & Media</option>
                          <option>Other</option>
                        </select>
                        <span className="icon-mask absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]" style={{ WebkitMaskImage: 'url(/icons/topic.svg)', maskImage: 'url(/icons/topic.svg)' , width: '18px', height: '18px'}}></span>
                        <span className="icon-mask absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px] pointer-events-none" style={{ WebkitMaskImage: 'url(/icons/expand_more.svg)', maskImage: 'url(/icons/expand_more.svg)' , width: '18px', height: '18px'}}></span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-on-surface mb-2">Your Message</label>
                      <textarea
                        className="textarea-field"
                        placeholder="Tell us about your project, timeline, and goals..."
                        rows={5}
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl text-white font-bold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl flex items-center justify-center gap-2"
                      style={{ background: 'linear-gradient(135deg, #e67e22, #f39c12)', boxShadow: '0 4px 16px rgba(230,126,34,0.3)' }}
                    >
                      <span className="icon-mask text-[18px]" style={{ WebkitMaskImage: 'url(/icons/send.svg)', maskImage: 'url(/icons/send.svg)' , width: '18px', height: '18px'}}></span>
                      Send Message
                    </button>
                  </form>
                )}
              </div>

              {/* Right side */}
              <div className="lg:col-span-5 p-8 md:p-12 flex flex-col gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-on-surface mb-6">Find Us</h3>
                  {/* Map placeholder */}
                  <div
                    className="rounded-2xl overflow-hidden relative"
                    style={{ height: '240px', background: 'linear-gradient(135deg, #f5f5f0 0%, #ede9e3 100%)', border: '1.5px solid #E5E0DD' }}
                  >
                    <div className="absolute inset-0 opacity-10"
                      style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.3) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex flex-col items-center">
                        <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl mb-2"
                          style={{ background: 'linear-gradient(135deg, #e67e22, #f39c12)' }}>
                          <span className="icon-mask text-white text-[26px]" style={{ fontVariationSettings: "'FILL' 1" ,  WebkitMaskImage: 'url(/icons/location_on.svg)', maskImage: 'url(/icons/location_on.svg)' , width: '26px', height: '26px'}}></span>
                        </div>
                        <div className="bg-white px-3 py-1.5 rounded-lg shadow-sm text-xs font-semibold text-on-surface border border-[#E5E0DD]">
                          ArchTech Pro HQ
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Press & Careers */}
                <div className="bg-[#F9F8F7] p-6 rounded-2xl border border-[#E5E0DD] flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #fff3e0, #ffe0b2)' }}>
                    <span className="icon-mask text-[#e67e22] text-[18px]" style={{ fontVariationSettings: "'FILL' 1" ,  WebkitMaskImage: 'url(/icons/campaign.svg)', maskImage: 'url(/icons/campaign.svg)' , width: '18px', height: '18px'}}></span>
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface text-sm mb-1">Press & Careers</h4>
                    <p className="text-on-surface-variant text-xs leading-relaxed">
                      Looking to join the team or feature our work? Reach out at{' '}
                      <a href="mailto:media@archtechpro.com" className="text-[#e67e22] hover:underline">media@archtechpro.com</a>
                    </p>
                  </div>
                </div>

                {/* Social */}
                <div>
                  <p className="text-sm font-semibold text-on-surface mb-4">Follow Our Work</p>
                  <div className="flex gap-3">
                    {[
                      { icon: 'share', label: 'LinkedIn' },
                      { icon: 'camera_alt', label: 'Instagram' },
                      { icon: 'work', label: 'Glassdoor' },
                    ].map(s => (
                      <a
                        key={s.label}
                        href="#"
                        title={s.label}
                        className="w-11 h-11 rounded-xl flex items-center justify-center border border-[#E5E0DD] bg-white text-on-surface-variant hover:text-white hover:border-transparent transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                        style={{ '--hover-bg': 'linear-gradient(135deg, #e67e22, #f39c12)' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'linear-gradient(135deg, #e67e22, #f39c12)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'white'}
                      >
                        <span className="icon-mask text-[18px]" style={{ WebkitMaskImage: `url(/icons/${s.icon}.svg)`, maskImage: `url(/icons/${s.icon}.svg)` }}></span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Response time */}
                <div className="mt-auto p-5 rounded-2xl border border-green-100 bg-green-50 flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse flex-shrink-0"></span>
                  <p className="text-green-800 text-xs font-medium">
                    Our team typically responds within <strong>4–6 business hours</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
