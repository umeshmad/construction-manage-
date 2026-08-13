import React from 'react';
import AdminLayout from '../components/AdminLayout';

const AdminDashboard = () => {
  const stats = [
    { title: 'Active Projects', value: '24', icon: 'architecture', color: 'text-tertiary bg-surface-container' },
    { title: 'Pending Requests', value: '12', icon: 'pending_actions', color: 'text-secondary bg-secondary-container/20' },
    { title: 'Monthly Revenue', value: '$1.2M', icon: 'payments', color: 'text-primary bg-primary-container/10', trend: '+15%' },
    { title: 'Open Safety Issues', value: '2', icon: 'warning', color: 'text-error bg-error-container/50' }
  ];

  return (
    <AdminLayout title="Dashboard" subtitle="Company-wide overview">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
        {stats.map(s => (
          <div key={s.title} className="bg-surface-container-lowest rounded-[12px] p-6 border border-[#E5E0DD] shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex justify-between items-start mb-4">
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">{s.title}</span>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${s.color}`}>
                <span className="icon-mask" style={{ WebkitMaskImage: `url(/icons/${s.icon}.svg)`, maskImage: `url(/icons/${s.icon}.svg)` }}></span>
              </div>
            </div>
            <div className="flex items-baseline gap-3">
              <div className="font-display-lg text-display-lg font-semibold text-on-surface">{s.value}</div>
              {s.trend && (
                <div className="flex items-center text-sm font-medium text-green-700 bg-green-50 px-2 py-1 rounded">
                  <span className="icon-mask text-[16px] mr-0.5" style={{ WebkitMaskImage: 'url(/icons/trending_up.svg)', maskImage: 'url(/icons/trending_up.svg)' , width: '16px', height: '16px'}}></span>
                  {s.trend}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Main Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Revenue Overview (Bar chart mockup) */}
        <div className="lg:col-span-7 bg-surface-container-lowest rounded-[12px] p-8 border border-[#E5E0DD] shadow-sm flex flex-col">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-6">Revenue Overview</h2>
          <div className="flex-1 relative min-h-[250px]">
            <div className="absolute inset-0 flex flex-col justify-between border-l border-b border-[#F0EEED] pb-6 pl-2">
              {['$2M', '$1.5M', '$1.5M', '$1M', '$0.5M', '$0'].map(amt => (
                <div key={amt} className="w-full border-t border-[#F0EEED] h-0 relative">
                  <span className="absolute -left-12 -top-3 text-caption text-on-surface-variant w-10 text-right">{amt}</span>
                </div>
              ))}
            </div>
            {/* Mock Bars */}
            <div className="absolute inset-0 pb-6 pl-8 pr-4 flex justify-between items-end z-10">
              <div className="w-12 h-1/3 bg-[#e67e22] rounded-t-sm" />
              <div className="w-12 h-1/2 bg-[#e67e22] rounded-t-sm" />
              <div className="w-12 h-2/5 bg-[#e67e22] rounded-t-sm" />
              <div className="w-12 h-3/5 bg-[#fed65b] rounded-t-sm" />
              <div className="w-12 h-4/5 bg-[#e67e22] rounded-t-sm" />
              <div className="w-12 h-3/4 bg-[#e67e22] rounded-t-sm" />
            </div>
            {/* Mock Line */}
            <div className="absolute inset-0 pb-6 pl-14 pr-10 z-20 pointer-events-none">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                <path d="M0,60 Q20,40 40,55 T80,30 T100,20" fill="none" stroke="#fed65b" strokeWidth="2" />
              </svg>
            </div>
            {/* X Axis Labels */}
            <div className="absolute bottom-0 left-8 right-4 flex justify-between text-caption text-on-surface-variant pt-2">
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep</span>
              <span>Oct</span>
            </div>
          </div>
        </div>

        {/* Pending Actions */}
        <div className="lg:col-span-5 bg-surface-container-lowest rounded-[12px] p-8 border border-[#E5E0DD] shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-headline-md text-headline-md text-on-surface">Pending Actions</h2>
            <button className="text-primary font-label-md hover:underline">View All</button>
          </div>
          <div className="space-y-3 flex-1">
            {[
              { text: '3 new project requests', desc: 'Require initial review', icon: 'note_add', act: 'Review' },
              { text: '2 quotations awaiting approval', desc: 'Sent to client', icon: 'assignment_turned_in', act: 'Review' },
              { text: '1 overdue payment', desc: 'Invoice #INV-2023-089', icon: 'payments', act: 'Review', isError: true },
            ].map((item, i) => (
              <div key={i} className={`flex items-center justify-between py-4 border-b border-[#F0EEED] last:border-b-0`}>
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.isError ? 'bg-error-container/30 text-error' : 'bg-surface-container text-tertiary'}`}>
                    <span className="icon-mask" style={{ WebkitMaskImage: `url(/icons/${item.icon}.svg)`, maskImage: `url(/icons/${item.icon}.svg)` }}></span>
                  </div>
                  <div>
                    <p className="font-body-md text-body-md text-on-surface font-medium">{item.text}</p>
                    <p className="text-xs text-on-surface-variant">{item.desc}</p>
                  </div>
                </div>
                <a className="font-label-md text-label-md text-primary-container hover:text-primary transition-colors uppercase tracking-wide" href="#">{item.act}</a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Panels Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter pb-8">
        {/* Recent Messages */}
        <div className="bg-surface-container-lowest rounded-[12px] p-8 border border-[#E5E0DD] shadow-sm">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-6 border-b border-[#F0EEED] pb-4">Recent Customer Messages</h2>
          <div className="space-y-4">
            {[
              { name: 'Jane Doe', msg: 'Following up on the updated blueprints for the atrium...', time: '10:42 AM', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPbBIRPJ8QlACgteFbxNZQMJPMw06CxKQ3u66WXe9DXhmPi6ALy-wiS2ZuX3Go69elNU9cUJyHUW23xEzv31PXn2gh7CtRXtRtMVSjV_V8K5MVoHUyyYiDbjqD7o6aQ7zXdyA3xHW9lep3rvggMmEa-Fr9JUJfw8bTOadJmG3xGJUFzuW4yXxVh1wdv4DAydyTOObE5YHXLRknPhso9GqiyL8ttYq-TKd7F-3kdadUFXlU4ZuhBA' },
              { name: 'Marcus Vance', msg: 'The site inspection report looks good, we can proceed.', time: 'Yesterday', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZZpfGogis_TPp5VZnrGL8S6GFR9jrxYdOtV3LYpf_9U_rlEMcemH-HPNkj7AwV54HggJwW2DMnqMLyNh-B32LD3uN_QzDBJW8MkBkMmavvHCXEtzhfTGVyU-jEsNGlsHlswYjUqugL-L9UzZWEuLTfFdBRyoUMYudHWwOBpWsNY6rUGYP-LzLuh2Kw1_Dm-KMJGVa8iv2uqJUvlxESdrgOIHJTZSJUYTb4vfYF6fIjsgSPvgv3w' }
            ].map(msg => (
              <div key={msg.name} className="flex gap-4 items-start p-3 hover:bg-[#F9F8F7] rounded-lg transition-colors cursor-pointer">
                <img className="w-12 h-12 rounded-full object-cover" src={msg.img} alt={msg.name} />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-label-md text-label-md text-on-surface truncate">{msg.name}</h3>
                    <span className="font-caption text-caption text-on-surface-variant whitespace-nowrap ml-2">{msg.time}</span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant truncate">{msg.msg}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-surface-container-lowest rounded-[12px] p-8 border border-[#E5E0DD] shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-headline-md text-headline-md text-on-surface">Upcoming Appointments</h2>
            <button className="p-2 text-on-surface-variant hover:text-primary hover:bg-[#F9F8F7] rounded-full transition-colors">
              <span className="icon-mask" style={{ WebkitMaskImage: 'url(/icons/add.svg)', maskImage: 'url(/icons/add.svg)' , width: '20px', height: '20px'}}></span>
            </button>
          </div>
          <div className="space-y-4">
            {[
              { title: 'Site Visit - Skyline Tower', name: 'Marcus Vance', month: 'Oct', day: '29', time: '09:00 AM' },
              { title: 'Design Consultation', name: 'Jane Doe', month: 'Nov', day: '02', time: '02:30 PM' }
            ].map(app => (
              <div key={app.title} className="flex items-center p-4 bg-[#F9F8F7] rounded-lg border border-transparent hover:border-[#E5E0DD] transition-colors">
                <div className="flex flex-col items-center justify-center w-14 h-14 bg-surface-container-low border border-[#E5E0DD] rounded-lg flex-shrink-0">
                  <span className="font-label-md text-caption text-primary uppercase leading-tight">{app.month}</span>
                  <span className="font-headline-md text-headline-md text-on-surface leading-tight">{app.day}</span>
                </div>
                <div className="flex-1 ml-4">
                  <h3 className="font-label-md text-label-md text-on-surface">{app.title}</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-1 mt-1">
                    <span className="icon-mask text-caption" style={{ WebkitMaskImage: 'url(/icons/person.svg)', maskImage: 'url(/icons/person.svg)' , width: '20px', height: '20px'}}></span> {app.name}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-on-surface">{app.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
