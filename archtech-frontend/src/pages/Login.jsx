import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="min-h-screen flex font-body-md text-on-surface">
      <style>{`
        .input-field {
          width: 100%; background: rgba(255,255,255,0.06); border: 1.5px solid rgba(255,255,255,0.12);
          border-radius: 12px; padding: 14px 16px; color: #1a1a2e; font-size: 14px;
          transition: border-color 0.2s, box-shadow 0.2s; outline: none;
          background: #F9F8F7;
        }
        .input-field.pl-12 { padding-left: 48px; }
        .input-field.pr-12 { padding-right: 48px; }
        .input-field:focus { border-color: #e67e22; box-shadow: 0 0 0 3px rgba(230,126,34,0.12); }
        .auth-card { backdrop-filter: blur(20px); }
        @keyframes float-slow { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-20px) rotate(2deg); } }
        @keyframes float-slow2 { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-15px) rotate(-2deg); } }
        .shape1 { animation: float-slow 8s ease-in-out infinite; }
        .shape2 { animation: float-slow2 10s ease-in-out infinite; }
      `}</style>

      {/* Left panel — visual showcase */}
      <div
        className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)' }}
      >
        {/* Background architecture image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC9Oo7jPZcEsoseblzJjC5pJmRsQ-gavzMcZMOo8pnhlM2F4c_5Ol9nXNie9fKD103TFmMlt0OtNMCioZEWZc6Fat5LlW6f_06koGNMkMW_vqlgi_UEXWUYiWM2CifP4lCENx1kUmcmFHbCPkFoliluhaSlXP5AyqfARUUMmZCrXGHxZKEqHYvZr7mgq5iHl3SlEQdZ0pn_M07PJ7RtA1lhyRD20_FHwVFg_r-LFc-tgKuc66nFbA')" }}
        />

        {/* Floating geometric shapes */}
        <div className="shape1 absolute top-24 right-12 w-48 h-48 rounded-3xl opacity-10 rotate-12"
          style={{ background: 'linear-gradient(135deg, #e67e22, #f39c12)' }} />
        <div className="shape2 absolute bottom-40 left-8 w-32 h-32 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #e67e22, transparent)' }} />

        {/* Orange glow */}
        <div className="absolute bottom-0 left-1/4 w-80 h-48 opacity-25 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at bottom, #e67e22, transparent 70%)', filter: 'blur(40px)' }} />

        {/* Logo */}
        <div className="relative z-10">
          <Link to="/" className="text-2xl font-bold text-white">
            Arch<span style={{ color: '#e67e22' }}>Tech</span> Pro
          </Link>
        </div>

        {/* Main message */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#e67e22] animate-pulse"></span>
            <span className="text-white/80 text-sm font-medium">Client Portal Access</span>
          </div>
          <h2 className="text-4xl font-bold text-white leading-tight mb-4">
            Your Project.<br />
            <span style={{ background: 'linear-gradient(90deg, #e67e22, #f39c12)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Your Insights.
            </span>
          </h2>
          <p className="text-white/60 text-lg leading-relaxed max-w-sm">
            Track progress, review blueprints, approve quotations, and communicate with your team — all in one place.
          </p>

          {/* Feature bullets */}
          <div className="mt-8 space-y-3">
            {[
              { icon: 'bar_chart', text: 'Real-time project progress tracking' },
              { icon: 'receipt_long', text: 'Instant quotation review & approval' },
              { icon: 'chat', text: 'Direct messaging with your team' },
            ].map(item => (
              <div key={item.text} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(230,126,34,0.2)', border: '1px solid rgba(230,126,34,0.3)' }}>
                  <span className="icon-mask text-[#e67e22] text-[16px]" style={{ fontVariationSettings: "'FILL' 1" ,  WebkitMaskImage: `url(/icons/${item.icon}.svg)`, maskImage: `url(/icons/${item.icon}.svg)` }}></span>
                </div>
                <span className="text-white/70 text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="relative z-10 bg-white/8 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <p className="text-white/70 text-sm italic leading-relaxed mb-4">
            "The client portal transformed how we communicate with ArchTech Pro. Every update, document, and approval is at my fingertips."
          </p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-xs font-bold">RV</div>
            <div>
              <div className="text-white text-xs font-semibold">Robert Vance</div>
              <div className="text-white/40 text-xs">Apex Villa Client</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel — auth form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 md:p-12 bg-[#FAFAF9] min-h-screen">
        {/* Mobile logo */}
        <div className="lg:hidden mb-8 text-center">
          <Link to="/" className="text-2xl font-bold">
            Arch<span style={{ color: '#e67e22' }}>Tech</span> Pro
          </Link>
        </div>

        <div className="w-full max-w-[420px]">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-on-surface mb-2">
              {activeTab === 'login' ? 'Welcome back' : 'Create account'}
            </h1>
            <p className="text-on-surface-variant text-sm">
              {activeTab === 'login'
                ? 'Sign in to your ArchTech Pro client portal'
                : 'Set up your client portal account'
              }
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-[#F0EEED] p-1 rounded-xl mb-8">
            {[['login', 'Sign In'], ['register', 'Register']].map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${activeTab === key ? 'bg-white text-on-surface shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* LOGIN FORM */}
          {activeTab === 'login' && (
            <form className="space-y-5" onSubmit={e => e.preventDefault()}>
              <div>
                <label className="block text-sm font-semibold text-on-surface mb-2" htmlFor="login-email">Email Address</label>
                <div className="relative">
                  <input
                    className="input-field pl-12"
                    id="login-email"
                    placeholder="you@example.com"
                    type="email"
                    required
                  />
                  <span className="icon-mask absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]" style={{ WebkitMaskImage: 'url(/icons/mail.svg)', maskImage: 'url(/icons/mail.svg)' , width: '18px', height: '18px'}}></span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-semibold text-on-surface" htmlFor="login-password">Password</label>
                  <a href="#" className="text-xs font-medium text-[#e67e22] hover:text-[#d35400] transition-colors">Forgot password?</a>
                </div>
                <div className="relative">
                  <input
                    className="input-field pl-12 pr-12"
                    id="login-password"
                    placeholder="••••••••"
                    type={showPassword ? 'text' : 'password'}
                    required
                  />
                  <span className="icon-mask absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]" style={{ WebkitMaskImage: 'url(/icons/lock.svg)', maskImage: 'url(/icons/lock.svg)' , width: '18px', height: '18px'}}></span>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-[#e67e22] transition-colors"
                  >
                    <span className="icon-mask text-[18px]" style={{ WebkitMaskImage: `url(/icons/${showPassword ? 'visibility_off' : 'visibility'}.svg)`, maskImage: `url(/icons/${showPassword ? 'visibility_off' : 'visibility'}.svg)` }}></span>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input type="checkbox" id="remember" className="w-4 h-4 rounded accent-orange-500" />
                <label htmlFor="remember" className="text-sm text-on-surface-variant">Remember me for 30 days</label>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl text-white font-bold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl flex items-center justify-center gap-2"
                style={{ background: 'linear-gradient(135deg, #e67e22, #f39c12)', boxShadow: '0 4px 16px rgba(230,126,34,0.3)' }}
              >
                <span className="icon-mask text-[18px]" style={{ WebkitMaskImage: 'url(/icons/login.svg)', maskImage: 'url(/icons/login.svg)' , width: '18px', height: '18px'}}></span>
                Sign In to Portal
              </button>

              <div className="relative flex items-center gap-4 py-2">
                <div className="flex-1 h-px bg-[#E5E0DD]"></div>
                <span className="text-xs text-on-surface-variant font-medium">or continue with</span>
                <div className="flex-1 h-px bg-[#E5E0DD]"></div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl border border-[#E5E0DD] bg-white text-on-surface text-sm font-semibold hover:border-[#e67e22] hover:bg-orange-50 transition-all duration-200"
                >
                  <img src="/google-logo.svg" alt="Google" className="w-[18px] h-[18px]" />
                  Google
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl border border-[#E5E0DD] bg-white text-on-surface text-sm font-semibold hover:border-[#e67e22] hover:bg-orange-50 transition-all duration-200"
                >
                  <img src="/microsoft-logo.svg" alt="Microsoft" className="w-[18px] h-[18px]" />
                  Microsoft
                </button>
              </div>
            </form>
          )}

          {/* REGISTER FORM */}
          {activeTab === 'register' && (
            <form className="space-y-5" onSubmit={e => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-on-surface mb-2" htmlFor="reg-first">First Name</label>
                  <div className="relative">
                    <input className="input-field pl-12" id="reg-first" placeholder="John" type="text" required />
                    <span className="icon-mask absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]" style={{ WebkitMaskImage: 'url(/icons/person.svg)', maskImage: 'url(/icons/person.svg)' , width: '18px', height: '18px'}}></span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-on-surface mb-2" htmlFor="reg-last">Last Name</label>
                  <div className="relative">
                    <input className="input-field pl-12" id="reg-last" placeholder="Doe" type="text" required />
                    <span className="icon-mask absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]" style={{ WebkitMaskImage: 'url(/icons/badge.svg)', maskImage: 'url(/icons/badge.svg)' , width: '18px', height: '18px'}}></span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-on-surface mb-2" htmlFor="reg-email">Email Address</label>
                <div className="relative">
                  <input className="input-field pl-12" id="reg-email" placeholder="you@example.com" type="email" required />
                  <span className="icon-mask absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]" style={{ WebkitMaskImage: 'url(/icons/mail.svg)', maskImage: 'url(/icons/mail.svg)' , width: '18px', height: '18px'}}></span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-on-surface mb-2" htmlFor="reg-phone">Phone Number</label>
                <div className="relative">
                  <input className="input-field pl-12" id="reg-phone" placeholder="+1 (555) 000-0000" type="tel" />
                  <span className="icon-mask absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]" style={{ WebkitMaskImage: 'url(/icons/phone.svg)', maskImage: 'url(/icons/phone.svg)' , width: '18px', height: '18px'}}></span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-on-surface mb-2" htmlFor="reg-pass">Password</label>
                <div className="relative">
                  <input
                    className="input-field pl-12 pr-12"
                    id="reg-pass"
                    placeholder="Min 8 characters"
                    type={showPassword ? 'text' : 'password'}
                    required
                  />
                  <span className="icon-mask absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]" style={{ WebkitMaskImage: 'url(/icons/lock.svg)', maskImage: 'url(/icons/lock.svg)' , width: '18px', height: '18px'}}></span>
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-[#e67e22]">
                    <span className="icon-mask text-[18px]" style={{ WebkitMaskImage: `url(/icons/${showPassword ? 'visibility_off' : 'visibility'}.svg)`, maskImage: `url(/icons/${showPassword ? 'visibility_off' : 'visibility'}.svg)` }}></span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-on-surface mb-2" htmlFor="reg-confirm">Confirm Password</label>
                <div className="relative">
                  <input
                    className="input-field pl-12 pr-12"
                    id="reg-confirm"
                    placeholder="Repeat your password"
                    type={showConfirm ? 'text' : 'password'}
                    required
                  />
                  <span className="icon-mask absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]" style={{ WebkitMaskImage: 'url(/icons/lock.svg)', maskImage: 'url(/icons/lock.svg)' , width: '18px', height: '18px'}}></span>
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-[#e67e22]">
                    <span className="icon-mask text-[18px]" style={{ WebkitMaskImage: `url(/icons/${showConfirm ? 'visibility_off' : 'visibility'}.svg)`, maskImage: `url(/icons/${showConfirm ? 'visibility_off' : 'visibility'}.svg)` }}></span>
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <input type="checkbox" id="terms" className="w-4 h-4 mt-0.5 rounded accent-orange-500" required />
                <label htmlFor="terms" className="text-sm text-on-surface-variant leading-relaxed">
                  I agree to the{' '}
                  <a href="#" className="text-[#e67e22] font-medium hover:underline">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="text-[#e67e22] font-medium hover:underline">Privacy Policy</a>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl text-white font-bold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl flex items-center justify-center gap-2"
                style={{ background: 'linear-gradient(135deg, #e67e22, #f39c12)', boxShadow: '0 4px 16px rgba(230,126,34,0.3)' }}
              >
                <span className="icon-mask text-[18px]" style={{ WebkitMaskImage: 'url(/icons/person_add.svg)', maskImage: 'url(/icons/person_add.svg)' , width: '18px', height: '18px'}}></span>
                Create My Account
              </button>
            </form>
          )}

          {/* Back to site */}
          <div className="mt-8 text-center">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-on-surface-variant hover:text-[#e67e22] transition-colors">
              <span className="icon-mask text-[16px]" style={{ WebkitMaskImage: 'url(/icons/arrow_back.svg)', maskImage: 'url(/icons/arrow_back.svg)' , width: '16px', height: '16px'}}></span>
              Back to ArchTech Pro
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
