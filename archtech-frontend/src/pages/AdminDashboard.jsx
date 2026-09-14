import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    stats: {
      activeProjects: 0,
      pendingRequests: 0,
      overduePayments: 0,
      openSafetyIssues: 0,
      totalRevenue: 0
    },
    monthlyRevenue: [],
    recentMessages: [],
    upcomingAppointments: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/auth/admin/dashboard', {
          credentials: 'include'
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result.error || 'Failed to load dashboard');
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const stats = [
    { title: 'Active Projects', value: data.stats.activeProjects, icon: 'architecture', color: 'text-tertiary bg-surface-container', link: '/admin/tasks' },
    { title: 'Pending Requests', value: data.stats.pendingRequests, icon: 'pending_actions', color: 'text-secondary bg-secondary-container/20', link: '/admin/quotations' },
    { title: 'Total Revenue', value: `$${(data.stats.totalRevenue / 1000).toFixed(1)}k`, icon: 'payments', color: 'text-primary bg-primary-container/10', link: '/admin/payments' },
    { title: 'Overdue Payments', value: data.stats.overduePayments, icon: 'warning', color: 'text-error bg-error-container/50', link: '/admin/payments' }
  ];

  return (
    <AdminLayout title="Dashboard" subtitle="Company-wide overview">
      {error && <div className="p-4 mb-6 bg-red-50 text-red-700 rounded-lg">{error}</div>}
      
      {loading ? (
        <div className="text-center py-12 text-on-surface-variant">Loading dashboard...</div>
      ) : (
        <>
          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {stats.map(s => (
              <div 
                key={s.title} 
                onClick={() => s.link && navigate(s.link)}
                className={`bg-surface-container-lowest rounded-[12px] p-6 border border-[#E5E0DD] shadow-sm hover:shadow-md transition-shadow duration-300 ${s.link ? 'cursor-pointer hover:border-primary' : ''}`}
              >
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter mt-8">
            {/* Revenue Overview (Dynamic Chart) */}
            <div className="lg:col-span-7 bg-surface-container-lowest rounded-[12px] p-8 border border-[#E5E0DD] shadow-sm flex flex-col">
              <h2 className="font-headline-md text-headline-md text-on-surface mb-6">Revenue Overview</h2>
              <div className="flex-1 relative min-h-[250px]">
                {data.monthlyRevenue && data.monthlyRevenue.length > 0 ? (
                  (() => {
                    const maxRevenue = Math.max(...data.monthlyRevenue.map(d => Number(d.revenue)), 1);
                    const yAxisLabels = [maxRevenue, maxRevenue * 0.75, maxRevenue * 0.5, maxRevenue * 0.25, 0];
                    
                    return (
                      <>
                        <div className="absolute inset-0 flex flex-col justify-between border-l border-b border-[#F0EEED] pb-6 pl-2">
                          {yAxisLabels.map((amt, idx) => (
                            <div key={idx} className="w-full border-t border-[#F0EEED] h-0 relative">
                              <span className="absolute -left-14 -top-3 text-caption text-on-surface-variant w-12 text-right">
                                {amt === 0 ? '$0' : `$${(amt / 1000).toFixed(1)}k`}
                              </span>
                            </div>
                          ))}
                        </div>
                        
                        {/* Dynamic Bars */}
                        <div className="absolute inset-0 pb-6 pl-8 pr-4 flex justify-around items-end z-10">
                          {data.monthlyRevenue.map((d, i) => {
                            const heightPct = (Number(d.revenue) / maxRevenue) * 100;
                            const isHighest = Number(d.revenue) === maxRevenue;
                            return (
                              <div key={i} className="flex flex-col items-center w-12 group h-full justify-end relative">
                                <div 
                                  className={`w-full rounded-t-sm transition-all duration-500 ease-out ${isHighest ? 'bg-[#fed65b]' : 'bg-[#e67e22]'}`} 
                                  style={{ height: `${heightPct}%` }}
                                >
                                  {/* Tooltip */}
                                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-surface-variant text-on-surface-variant font-caption text-[11px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-30 shadow-sm">
                                    ${Number(d.revenue).toLocaleString()}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        
                        {/* X Axis Labels */}
                        <div className="absolute bottom-0 left-8 right-4 flex justify-around text-caption text-on-surface-variant pt-2">
                          {data.monthlyRevenue.map((d, i) => (
                            <span key={i} className="w-12 text-center">{d.month}</span>
                          ))}
                        </div>
                      </>
                    );
                  })()
                ) : (
                  <div className="flex items-center justify-center h-full text-on-surface-variant font-body-md">
                    No revenue data available.
                  </div>
                )}
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
                  { text: `${data.stats.pendingRequests} new project requests`, desc: 'Require initial review', icon: 'note_add', act: 'Review', link: '/admin/quotations' },
                  { text: 'Quotations awaiting approval', desc: 'Sent to client', icon: 'assignment_turned_in', act: 'Review', link: '/admin/quotations' },
                  { text: `${data.stats.overduePayments} overdue payment(s)`, desc: 'Requires attention', icon: 'payments', act: 'Review', link: '/admin/payments', isError: data.stats.overduePayments > 0 },
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
                    <a className="font-label-md text-label-md text-primary-container hover:text-primary transition-colors uppercase tracking-wide" href={item.link}>{item.act}</a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Panels Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter mt-8 pb-8">
            {/* Recent Messages */}
            <div className="bg-surface-container-lowest rounded-[12px] p-8 border border-[#E5E0DD] shadow-sm">
              <h2 className="font-headline-md text-headline-md text-on-surface mb-6 border-b border-[#F0EEED] pb-4">Recent Customer Messages</h2>
              <div className="space-y-4">
                {data.recentMessages.length === 0 && <div className="text-on-surface-variant text-sm">No recent messages.</div>}
                {data.recentMessages.map(msg => (
                  <div key={msg.Id} className="flex gap-4 items-start p-3 hover:bg-[#F9F8F7] rounded-lg transition-colors cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary font-bold">
                      {msg.customer_name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className="font-label-md text-label-md text-on-surface truncate">{msg.customer_name}</h3>
                        <span className="font-caption text-caption text-on-surface-variant whitespace-nowrap ml-2">
                          {new Date(msg.sent_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                      <p className="font-body-md text-body-md text-on-surface-variant truncate">{msg.content}</p>
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
                {data.upcomingAppointments.length === 0 && <div className="text-on-surface-variant text-sm">No upcoming appointments.</div>}
                {data.upcomingAppointments.map(app => (
                  <div key={app.Id} className="flex items-center p-4 bg-[#F9F8F7] rounded-lg border border-transparent hover:border-[#E5E0DD] transition-colors">
                    <div className="flex flex-col items-center justify-center w-14 h-14 bg-surface-container-low border border-[#E5E0DD] rounded-lg flex-shrink-0">
                      <span className="font-label-md text-caption text-primary uppercase leading-tight">
                        {new Date(app.appointment_date).toLocaleString('en-US', { month: 'short' })}
                      </span>
                      <span className="font-headline-md text-headline-md text-on-surface leading-tight">
                        {new Date(app.appointment_date).getDate()}
                      </span>
                    </div>
                    <div className="flex-1 ml-4">
                      <h3 className="font-label-md text-label-md text-on-surface">{app.type}</h3>
                      <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-1 mt-1">
                        <span className="icon-mask text-caption" style={{ WebkitMaskImage: 'url(/icons/person.svg)', maskImage: 'url(/icons/person.svg)' , width: '20px', height: '20px'}}></span> {app.customer_name}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-on-surface">{app.appointment_time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;
