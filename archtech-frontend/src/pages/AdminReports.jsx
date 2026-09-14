import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';

const reportsData = [
  { id: 1, title: 'Financial Summary', icon: 'account_balance_wallet', desc: 'Overview of project expenditures, revenue, and budget variance across active developments.' },
  { id: 2, title: 'Project Status', icon: 'architecture', desc: 'Milestone tracking, critical path analysis, and completion percentages for ongoing builds.' },
  { id: 3, title: 'Worker Productivity', icon: 'engineering', desc: 'Labor hours, efficiency metrics, and contractor performance logs detailed by site.' },
  { id: 4, title: 'Material Usage', icon: 'inventory_2', desc: 'Inventory tracking, supply chain delays, and raw material cost fluctuations.' },
  { id: 5, title: 'Client Activity', icon: 'handshake', desc: 'Client portal engagement, approval workflows, and communication logs.' }
];

const initialHistory = [
  { id: 101, name: 'Q3 Financial Summary_Final.pdf', desc: 'Generated Oct 24, 2023 • 2.4 MB', icon: 'description' },
  { id: 102, name: 'ProjectStatus_AlphaTower.xlsx', desc: 'Generated Oct 22, 2023 • 1.1 MB', icon: 'table' },
  { id: 103, name: 'MaterialUsage_Weekly_W32.pdf', desc: 'Generated Oct 20, 2023 • 845 KB', icon: 'description' }
];

const AdminReports = () => {
  const [history, setHistory] = useState(initialHistory);
  const [dateRanges, setDateRanges] = useState({});
  const [apiData, setApiData] = useState({ summary: {}, projectStatuses: [], expenseByCategory: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/auth/admin/reports', {
          credentials: 'include'
        });
        const result = await res.json();
        if (res.ok) setApiData(result);
      } catch (err) {
        console.error("Failed to load report stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const handleGenerate = (reportTitle) => {
    const range = dateRanges[reportTitle] || 'Custom Range';
    const filename = `${reportTitle.replace(/\s+/g, '')}_Report_${range.replace(/\s+/g, '')}.csv`;
    const newReport = {
      id: Date.now(),
      name: filename,
      desc: `Generated Just Now • 420 KB`,
      icon: 'description'
    };
    setHistory([newReport, ...history]);

    // Actually trigger a download
    const content = `ArchTech Pro - ${reportTitle}\nDate Range: ${range}\n\n[Report Data Placeholder]`;
    const blob = new Blob([content], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadHistory = (item) => {
    const content = `ArchTech Pro - Archived Report\nFile: ${item.name}\n\n[Historical Data Placeholder]`;
    const blob = new Blob([content], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = item.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDateChange = (reportTitle, val) => {
    setDateRanges(prev => ({
      ...prev,
      [reportTitle]: val
    }));
  };

  return (
    <AdminLayout title="Reports" subtitle="Generate detailed architectural and operational analytics across your portfolio.">
      
      {/* Real-time DB Stats */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-gutter mb-8">
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-[#E5E0DD] shadow-sm">
            <h3 className="text-on-surface-variant font-label-md uppercase mb-2">Total Projects</h3>
            <p className="font-display-md text-on-surface">{apiData.summary.totalProjects || 0}</p>
          </div>
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-[#E5E0DD] shadow-sm">
            <h3 className="text-on-surface-variant font-label-md uppercase mb-2">Total Workers</h3>
            <p className="font-display-md text-on-surface">{apiData.summary.totalWorkers || 0}</p>
          </div>
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-[#E5E0DD] shadow-sm">
            <h3 className="text-on-surface-variant font-label-md uppercase mb-2">Total Tasks</h3>
            <p className="font-display-md text-on-surface">{apiData.summary.totalTasks || 0}</p>
          </div>
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-[#E5E0DD] shadow-sm">
            <h3 className="text-on-surface-variant font-label-md uppercase mb-2">Total Revenue</h3>
            <p className="font-display-md text-success">${Number(apiData.summary.totalRevenue || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
          </div>
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-[#E5E0DD] shadow-sm">
            <h3 className="text-on-surface-variant font-label-md uppercase mb-2">Total Expenses</h3>
            <p className="font-display-md text-error">${Number(apiData.summary.totalExpenses || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
          </div>
        </div>
      )}

      {/* Report Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter mb-12">
        {reportsData.map(r => (
          <div key={r.id} className="bg-surface-container-lowest rounded-xl border border-outline-variant p-8 flex flex-col hover:shadow-md transition-shadow duration-300" style={{ boxShadow: '0px 4px 20px rgba(44,62,80,0.04)' }}>
            <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-primary mb-6">
              <span className="icon-mask text-[24px]" style={{ WebkitMaskImage: `url(/icons/${r.icon}.svg)`, maskImage: `url(/icons/${r.icon}.svg)` }}></span>
            </div>
            <h2 className="font-headline-md text-headline-md text-on-surface mb-2">{r.title}</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-8 flex-grow">{r.desc}</p>
            <div className="flex flex-col gap-4 mt-auto">
              <div className="relative">
                <select
                  className="w-full appearance-none bg-surface border border-outline-variant rounded px-4 py-2.5 text-on-surface font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all cursor-pointer"
                  value={dateRanges[r.title] || ''}
                  onChange={e => handleDateChange(r.title, e.target.value)}
                >
                  <option value="" disabled>Select Date Range</option>
                  <option value="Last 7 Days">Last 7 Days</option>
                  <option value="This Month">This Month</option>
                  <option value="Last Month">Last Month</option>
                  <option value="This Quarter">This Quarter</option>
                  <option value="This Year">This Year</option>
                  <option value="All Time">All Time</option>
                </select>
                <span className="icon-mask absolute right-3 top-3 text-on-surface-variant text-[20px] pointer-events-none" style={{ WebkitMaskImage: 'url(/icons/arrow_drop_down.svg)', maskImage: 'url(/icons/arrow_drop_down.svg)' , width: '20px', height: '20px'}}></span>
              </div>
              <button
                onClick={() => handleGenerate(r.title)}
                className="w-full border border-on-surface text-on-surface font-label-md text-label-md py-2.5 rounded hover:bg-surface-container-low transition-colors duration-200"
              >
                Generate Report
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Recently Generated Section */}
      <section className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden" style={{ boxShadow: '0px 4px 20px rgba(44,62,80,0.04)' }}>
        <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest">
          <h3 className="font-headline-md text-headline-md text-on-surface">Recently Generated</h3>
          <button className="font-label-md text-label-md text-primary hover:text-surface-tint transition-colors">View All</button>
        </div>
        <div className="flex flex-col">
          {history.map(item => (
            <div key={item.id} className="flex items-center justify-between p-4 md:p-6 border-b border-surface-variant hover:bg-surface-container-low/50 transition-colors last:border-b-0">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant">
                  <span className="icon-mask text-[20px]" style={{ WebkitMaskImage: `url(/icons/${item.icon}.svg)`, maskImage: `url(/icons/${item.icon}.svg)` }}></span>
                </div>
                <div>
                  <div className="font-label-md text-label-md text-on-surface">{item.name}</div>
                  <div className="font-caption text-caption text-on-surface-variant mt-0.5">{item.desc}</div>
                </div>
              </div>
              <a className="font-label-md text-label-md text-primary hover:text-surface-tint flex items-center gap-1 cursor-pointer" onClick={() => handleDownloadHistory(item)}>
                <span className="hidden md:inline">Download</span>
                <span className="icon-mask text-[18px]" style={{ WebkitMaskImage: 'url(/icons/download.svg)', maskImage: 'url(/icons/download.svg)' , width: '18px', height: '18px'}}></span>
              </a>
            </div>
          ))}
        </div>
      </section>
    </AdminLayout>
  );
};

export default AdminReports;
