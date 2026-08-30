import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const services = [
  {
    icon: 'home_work', tag: 'Architecture', title: 'Residential\nConstruction',
    desc: 'Custom luxury homes and estates built with unyielding attention to detail. We turn blueprints into bespoke living spaces that resonate with your personal vision and lifestyle.',
    items: ['Site Analysis & Planning', 'Bespoke Structural Design', 'Premium Material Sourcing'],
    price: 'Starting from $500k', reversed: false,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYRjRUD4skUnRc4UaJUJmsuOgxd-6M4w7LX1xAP3L0nhRh1nEr2Mj74hV0-tCNxZcv7uiyDm9WTqAjWMXojqHxcFbteUxeHxv2LqcrpwPmRYNxaLAMjXZDOob-98rbKWECDf_yxMf7wHslAwnCEXiD2v3nWvFM87UkyfErZ896Wj0JjWq-eFDd6p_16USwP6BIsxZ1_Pv7FaQA5_ZniHdONidh6gUZROH7Jd4nPvtw9mk4pF6VRg',
  },
  {
    icon: 'business', tag: 'Corporate', title: 'Commercial\nConstruction',
    desc: 'Office complexes and retail centers engineered for functionality and aesthetic superiority. Built to scale your business and inspire your workforce.',
    items: ['Zoning & Permitting Strategy', 'Core & Shell Build-Outs', 'High-End Tenant Improvements'],
    price: 'Starting from $1.2M', reversed: true,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOW8Yi7UmJXSUWBf0_S0EwqXPzQwHV78c-rl0XiD7dH-pkSkYigWwQNv3ZAo-36aAiSz6rKtbSbbSowXc_ujJxnyvQ4RFVcEr-6DiS3oCHeSlBYhyXIyMVkTFBRaA1-q2ONqNt_cBJUJTMRjZRb9wFGOtzrLFnDTaobTZDavKW8CsQsoRsYRxjyUlMcbMzAP3OGXKlEnwFzrvAa7_S29viNN-pcJqozmawoIGtTQEXbhcia4AVRQ',
  },
  {
    icon: 'architecture', tag: 'Restoration', title: 'Renovation &\nRemodeling',
    desc: 'Modernizing heritage buildings and interiors while preserving their architectural soul. Seamless and sustainable integration of contemporary technology.',
    items: ['Historical Preservation', 'Advanced Energy Upgrades', 'Intelligent Spatial Reconfiguration'],
    price: 'Starting from $150k', reversed: false,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxWgfbjKWYdDfenOETxHjxbfcXVVbAI29UF2Z9XVutOvBCk5pKEmiruBMN52PqIUvR9hnRGH4mTfUdEVmStZHgGIp1aQEp-P32Hed4JRr9qVsEw5MCLz_X7kNBBaEWbtjaQgPOr9HEM2Z7jIWhfFlj_twTfk_iIKj7XI0h9Bh_scWsnUnvjxZ7FiXfFkcH48ESb3I0wNcla44RM_yQ61NtPCxSwexeC7D_t6FaIT7EZwzkmXhBlw',
  },
  {
    icon: 'construction', tag: 'Civil Engineering', title: 'Infrastructure\nDevelopment',
    desc: 'Bridges, roads, and public utilities designed for longevity and positive community impact. Heavy civil engineering expertise executed with precision.',
    items: ['Precision Earthwork & Grading', 'Complex Utility Installation', 'Monumental Concrete Structures'],
    price: 'Custom Pricing', reversed: true,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0HPPus0D9DKMrqyNKmzbj3vYYpUwuSpbvTVgPU5Lyjm1PIReyiMO8pz3aMUyCUmdhy3PhAkcajpVcazl-YwMJqQF4ILw8zsOgqRMIja_oMtWtvE4A-orMRohlfClRAlmJ7IdK9JDljMLeKWh7nmBF8vL_m44xXS4-mJLQwiqPjFMWa-vMHJmIwcdVVcHQt9Qof4q3NZvN2Al9SkVzaa-GN1gH0Y7iqxTBYZCR-mGTHFpbDJOaRQ',
  },
];

const specialised = [
  {
    icon: 'engineering', title: 'Project Consulting',
    desc: 'Feasibility studies and project management to ensure your vision is executed flawlessly, on time, and on budget.',
    items: ['Comprehensive Risk Assessment', 'Detailed Budget Estimation', 'Strategic Contractor Management'],
    price: 'From $15k',
  },
  {
    icon: 'chair', title: 'Interior Fit-Out',
    desc: 'Bespoke interior architectural solutions that transform structural shells into premium, highly functional environments.',
    items: ['Advanced Space Planning', 'Artisanal Custom Millwork', 'Curated FF&E Procurement'],
    price: 'From $50k',
  },
];

const Services = () => {
  const [serviceList, setServiceList] = React.useState(services);

  React.useEffect(() => {
    fetch('http://localhost:3000/api/auth/services', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (data && data.services && data.services.length > 0) {
          const fetched = data.services.map((s, idx) => ({
            icon: services[idx % services.length]?.icon || 'home_work',
            tag: s.category || 'General',
            title: s.name,
            desc: s.description || 'Professional construction and architectural service.',
            items: services[idx % services.length]?.items || ['Quality Assurance', 'Expert Execution', 'On-time Delivery'],
            price: services[idx % services.length]?.price || 'Custom Quote',
            reversed: idx % 2 !== 0,
            img: services[idx % services.length]?.img || services[0].img,
          }));
          setServiceList(fetched);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="text-on-surface font-body-md antialiased" style={{ backgroundColor: '#FAFAF9' }}>
      <NavBar activeLink="Services" />

    {/* Hero */}
    <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center pt-20">
      <div className="absolute inset-0 z-0">
        <img alt="Services hero" className="w-full h-full object-cover" src={services[0].img} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, rgba(9,29,46,0.6) 0%, rgba(9,29,46,0.2) 100%)' }} />
      </div>
      <div className="relative z-10 text-center px-margin-mobile md:px-margin-desktop max-w-5xl mx-auto mt-12">
        <h1 className="font-display-lg text-4xl md:text-6xl lg:text-7xl text-white mb-6 tracking-tight drop-shadow-2xl">Our Expertise</h1>
        <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light leading-relaxed drop-shadow-md">
          Comprehensive construction solutions tailored to your needs. Precision in every detail, delivered with architectural integrity.
        </p>
      </div>
    </section>

    {/* Services */}
    <main className="w-full pb-32 pt-32" style={{ background: 'linear-gradient(180deg, #FAFAF9 0%, #F5F5F4 100%)' }}>
      <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop space-y-40">
        {serviceList.map((s) => (
          <div key={s.title} className={`flex flex-col ${s.reversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 lg:gap-0 relative`}>
            <div className="w-full md:w-8/12 relative group rounded-2xl overflow-hidden shadow-2xl z-0">
              <img alt={s.title} className="w-full h-[600px] lg:h-[700px] object-cover transition-transform duration-700 group-hover:scale-105" src={s.img} />
            </div>
            <div className={`w-full md:w-5/12 bg-white/95 backdrop-blur-md p-12 lg:p-16 ${s.reversed ? 'md:-mr-32 lg:-mr-48' : 'md:-ml-32 lg:-ml-48'} z-10 rounded-2xl border border-white/50 shadow-xl`}>
              <div className="mb-6 flex items-center gap-4">
                <span className="icon-mask text-primary-container text-3xl" style={{ WebkitMaskImage: `url(/icons/${s.icon}.svg)`, maskImage: `url(/icons/${s.icon}.svg)` }}></span>
                <span className="text-sm uppercase tracking-[0.25em] font-semibold text-primary-container">{s.tag}</span>
              </div>
              <h2 className="font-headline-lg text-4xl lg:text-5xl text-on-surface mb-6 leading-tight whitespace-pre-line">{s.title}</h2>
              <p className="text-lg text-on-surface-variant mb-10 leading-relaxed">{s.desc}</p>
              <ul className="space-y-5 text-on-surface-variant mb-12">
                {s.items.map(item => (
                  <li key={item} className="flex items-center gap-4">
                    <span className="icon-mask text-primary-container text-xl" style={{ WebkitMaskImage: 'url(/icons/horizontal_rule.svg)', maskImage: 'url(/icons/horizontal_rule.svg)' , width: '20px', height: '20px'}}></span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between border-t border-outline-variant/40 pt-8">
                <span className="text-sm text-on-surface-variant tracking-widest uppercase font-medium">{s.price}</span>
                <button className="text-primary-container font-semibold hover:text-[#d67118] transition-colors flex items-center gap-2 uppercase tracking-wide text-sm">
                  Discover More <span className="icon-mask text-base" style={{ WebkitMaskImage: 'url(/icons/arrow_forward.svg)', maskImage: 'url(/icons/arrow_forward.svg)' , width: '16px', height: '16px'}}></span>
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Specialised */}
        <div className="pt-24 border-t border-outline-variant/30 mt-32">
          <div className="text-center mb-20">
            <h3 className="font-headline-lg text-4xl md:text-5xl text-on-surface mb-6">Specialised Services</h3>
            <p className="text-xl text-on-surface-variant max-w-2xl mx-auto">Targeted expertise to complete your project's lifecycle.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
            {specialised.map(s => (
              <div key={s.title} className="bg-white rounded-2xl border border-outline-variant/40 p-12 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <span className="icon-mask text-primary-container text-5xl mb-6 block" style={{ WebkitMaskImage: `url(/icons/${s.icon}.svg)`, maskImage: `url(/icons/${s.icon}.svg)` }}></span>
                <h2 className="text-3xl text-on-surface mb-4 font-semibold">{s.title}</h2>
                <p className="text-on-surface-variant leading-relaxed mb-10">{s.desc}</p>
                <ul className="space-y-4 text-on-surface-variant mb-10 pt-6 border-t border-outline-variant/30">
                  {s.items.map(item => (
                    <li key={item} className="flex items-center gap-4">
                      <span className="icon-mask text-primary-container text-base" style={{ WebkitMaskImage: 'url(/icons/circle.svg)', maskImage: 'url(/icons/circle.svg)' , width: '16px', height: '16px'}}></span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-sm text-on-surface-variant uppercase tracking-widest font-medium">{s.price}</span>
                  <button className="text-primary-container font-semibold hover:text-[#d67118] transition-colors flex items-center gap-2 uppercase tracking-wide text-sm">
                    Inquire Now <span className="icon-mask text-sm" style={{ WebkitMaskImage: 'url(/icons/arrow_forward.svg)', maskImage: 'url(/icons/arrow_forward.svg)' , width: '14px', height: '14px'}}></span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>

    {/* CTA */}
    <section className="bg-[#1A2634] py-32 text-center relative overflow-hidden">
      <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        <h3 className="font-headline-lg text-5xl md:text-6xl text-white mb-8 tracking-tight">Begin Your Next Project</h3>
        <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
          Our experts are ready to discuss your vision and recommend the perfect combination of services for your architectural endeavor.
        </p>
        <button className="bg-primary-container text-white px-12 py-5 rounded-full hover:bg-[#d67118] transition-all duration-300 cursor-pointer active:scale-95 shadow-2xl tracking-widest uppercase text-sm font-semibold">
          Schedule a Consultation
        </button>
      </div>
    </section>

    <Footer />
  </div>
);
};

export default Services;
