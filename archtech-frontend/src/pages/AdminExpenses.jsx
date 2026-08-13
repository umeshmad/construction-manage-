import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';

const initialExpenses = [
  { id: 1, date: 'Oct 24, 2024', project: 'Riverfront Complex', category: 'Materials', amount: 12450.00, user: 'David C.', status: 'Approved', userImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBE3ERtUyUFLO6m5yk8zqkfg99u_zfThpvuL8ShiP6kVeLbxmyFkA_M1MvkJ3rM70dHBKbgDiuXi1UOUmTgRBAoqZHMR9DwVfvRGvfoIU_uaVb7hcCFBXNNIk3cRVeSzpEVJOhquFt9Zsy6Trw-ZxFvge6Vt2IUN31XDMVHawHMTKMNqC5hk0_Jgkni6XQJJ04IHVObVdRLDf42zUGtAGZH0z6fvhcqU2i-4k7Mer12yq9Xqn8LYg', badgeClass: 'bg-secondary-fixed text-on-secondary-fixed', statusClass: 'bg-tertiary-fixed text-on-tertiary-fixed' },
  { id: 2, date: 'Oct 23, 2024', project: 'Skyline Tower B', category: 'Equipment', amount: 8900.50, user: 'Sarah L.', status: 'Pending', userImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfSD5ZLiTS14wxrtAlqgbigu0cFdr__GI1FX1HSCdO-OJGLUO2UUnEMGN9PXJvHM58XEOKyf0wLxhqYKjOFWuAIgiCIseS8I5fxGDqUNE4C-wT-biJjggbUKQCAmQ0HeIs-qNcpeRVPnXlPUPaOFxqAfthGjcoss-Y4jsYRXykHSLO7P0Cc-G0FlYB2TTRRaKR4PH1tz3u6NlUTCMj-LipoS5RRIadHxOJwyzMRAeYlVJsKTzgHg', badgeClass: 'bg-primary-fixed text-on-primary-fixed', statusClass: 'bg-secondary-container text-on-secondary-container' },
  { id: 3, date: 'Oct 23, 2024', project: 'Oakwood Estates', category: 'Labor', amount: 15200.00, user: 'Michael K.', status: 'Pending', userImg: null, badgeClass: 'bg-surface-variant text-on-surface', statusClass: 'bg-secondary-container text-on-secondary-container' },
  { id: 4, date: 'Oct 21, 2024', project: 'Metro Station Reno', category: 'Permits', amount: 1250.00, user: 'Elena R.', status: 'Rejected', userImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8k6BKSXcgod5DhVaDL7heh_YGWDB3Fv6rqtF8enjWUIfSdzcZKK7wxOhLB60A92dlb2Ud-pT-GTITLqEP4tRaperxUx2OkXC0krD4jg5qTQUorjO2BsJ6c-CEqBSjgkWfTNs2_MctWIGsq2Tx4bwuYe503zh2MZxiIoQGWRRociNmyjT5mrXw_1p-rqA1mpXXzC6rHeREKCBHVUAbIvHwcr8J5rHvUg8g4H-zZT7vpgx0D0kB5w', badgeClass: 'border border-outline-variant text-on-surface-variant', statusClass: 'border border-error text-error bg-error-container' }
];

const AdminExpenses = () => {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const handleApprove = (id) => {
    setExpenses(expenses.map(e => e.id === id ? { ...e, status: 'Approved', statusClass: 'bg-tertiary-fixed text-on-tertiary-fixed' } : e));
  };

  const handleReject = (id) => {
    setExpenses(expenses.map(e => e.id === id ? { ...e, status: 'Rejected', statusClass: 'border border-error text-error bg-error-container' } : e));
  };

  const filtered = expenses.filter(e => {
    const matchesSearch = e.project.toLowerCase().includes(search.toLowerCase()) || e.user.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'All' || e.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout title="Expenses" subtitle="Manage and review project financials.">
      {/* Stat Row */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6 hover:-translate-y-1 transition-transform duration-300" style={{ boxShadow: '0px 4px 20px rgba(44,62,80,0.04)' }}>
          <div className="font-caption text-caption text-on-surface-variant uppercase tracking-wider mb-2">Total Expenses (MTD)</div>
          <div className="font-display-lg text-display-lg text-on-surface mb-2">$124,500.00</div>
          <div className="font-caption text-caption flex items-center text-tertiary">
            <span className="icon-mask text-[16px] mr-1 text-on-surface-variant" style={{ WebkitMaskImage: 'url(/icons/trending_up.svg)', maskImage: 'url(/icons/trending_up.svg)' , width: '16px', height: '16px'}}></span>
            <span>+4.2% vs last month</span>
          </div>
        </div>
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6 hover:-translate-y-1 transition-transform duration-300" style={{ boxShadow: '0px 4px 20px rgba(44,62,80,0.04)' }}>
          <div className="font-caption text-caption text-on-surface-variant uppercase tracking-wider mb-2">Largest Category</div>
          <div className="font-headline-md text-headline-md text-on-surface mb-2 flex items-center">
            Materials <span className="text-tertiary-container mx-2">—</span> 42%
          </div>
          <div className="font-caption text-caption flex items-center text-secondary">
            <span className="icon-mask text-[16px] mr-1" style={{ fontVariationSettings: "'FILL' 1" ,  WebkitMaskImage: 'url(/icons/category.svg)', maskImage: 'url(/icons/category.svg)' , width: '16px', height: '16px'}}></span>
            <span>Structural &amp; Finishes</span>
          </div>
        </div>
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6 hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden" style={{ boxShadow: '0px 4px 20px rgba(44,62,80,0.04)' }}>
          <div className="absolute right-0 top-0 w-24 h-24 bg-primary-container opacity-10 rounded-bl-full -mr-4 -mt-4" />
          <div className="font-caption text-caption text-on-surface-variant uppercase tracking-wider mb-2">Pending Approvals</div>
          <div className="font-display-lg text-display-lg text-primary-container mb-2">
            {expenses.filter(e => e.status === 'Pending').length}
          </div>
          <div className="font-caption text-caption flex items-center text-on-surface-variant">
            <span className="icon-mask text-[16px] mr-1 text-primary-container" style={{ WebkitMaskImage: 'url(/icons/pending_actions.svg)', maskImage: 'url(/icons/pending_actions.svg)' , width: '16px', height: '16px'}}></span>
            <span>Needs Review</span>
          </div>
        </div>
      </section>

      {/* Expense Table Area */}
      <section className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden" style={{ boxShadow: '0px 4px 20px rgba(44,62,80,0.04)' }}>
        <div className="p-6 border-b border-outline-variant flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#FCFAFA]">
          <h2 className="font-headline-sm text-headline-sm font-semibold text-on-surface">Transactions</h2>
          <div className="flex gap-3 flex-wrap w-full sm:w-auto">
            <div className="relative flex-grow sm:flex-grow-0">
              <span className="icon-mask absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" style={{ WebkitMaskImage: 'url(/icons/search.svg)', maskImage: 'url(/icons/search.svg)' , width: '20px', height: '20px'}}></span>
              <input
                className="pl-10 pr-4 py-2 bg-[#F9F8F7] border border-outline-variant rounded-lg focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none font-body-md text-body-md w-full sm:w-64 transition-all"
                placeholder="Search expenses..."
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <select
              className="bg-[#F9F8F7] border border-outline-variant rounded-lg px-4 py-2 font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none cursor-pointer"
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#F0EEED] bg-surface-bright">
                <th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant font-medium whitespace-nowrap">Date</th>
                <th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant font-medium">Project Name</th>
                <th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant font-medium">Category Tag</th>
                <th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant font-medium text-right">Amount</th>
                <th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant font-medium">Submitted By</th>
                <th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant font-medium text-center">Status</th>
                <th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant font-medium text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="font-body-md text-body-md text-on-surface divide-y divide-[#F0EEED]">
              {filtered.map(exp => (
                <tr key={exp.id} className="hover:bg-surface-container-low transition-colors group">
                  <td className="py-4 px-6 whitespace-nowrap">{exp.date}</td>
                  <td className="py-4 px-6 font-medium">{exp.project}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${exp.badgeClass}`}>{exp.category}</span>
                  </td>
                  <td className="py-4 px-6 text-right font-bold text-on-surface">${exp.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      {exp.userImg ? (
                        <div className="w-8 h-8 rounded-full overflow-hidden mr-3 border border-outline-variant shrink-0">
                          <img className="w-full h-full object-cover" src={exp.userImg} alt={exp.user} />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full overflow-hidden mr-3 border border-outline-variant shrink-0 bg-surface-dim flex items-center justify-center text-on-surface font-medium text-sm">
                          {exp.user.split(' ').map(n => n[0]).join('')}
                        </div>
                      )}
                      <span>{exp.user}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${exp.statusClass}`}>{exp.status}</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    {exp.status === 'Pending' ? (
                      <div className="flex justify-center items-center space-x-2">
                        <button onClick={() => handleApprove(exp.id)} className="w-8 h-8 rounded-full border border-tertiary text-tertiary flex items-center justify-center hover:bg-tertiary hover:text-white transition-colors" title="Approve">
                          <span className="icon-mask text-[18px]" style={{ WebkitMaskImage: 'url(/icons/check.svg)', maskImage: 'url(/icons/check.svg)' , width: '18px', height: '18px'}}></span>
                        </button>
                        <button onClick={() => handleReject(exp.id)} className="w-8 h-8 rounded-full border border-error text-error flex items-center justify-center hover:bg-error hover:text-white transition-colors" title="Reject">
                          <span className="icon-mask text-[18px]" style={{ WebkitMaskImage: 'url(/icons/close.svg)', maskImage: 'url(/icons/close.svg)' , width: '18px', height: '18px'}}></span>
                        </button>
                      </div>
                    ) : (
                      <button className="text-on-surface-variant hover:text-on-surface p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="icon-mask text-[20px]" style={{ WebkitMaskImage: 'url(/icons/more_vert.svg)', maskImage: 'url(/icons/more_vert.svg)' , width: '20px', height: '20px'}}></span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-on-surface-variant">No transactions match your search filter.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </AdminLayout>
  );
};

export default AdminExpenses;
