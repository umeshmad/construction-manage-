import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';

const AdminPayments = () => {
  const [data, setData] = useState({ stats: {}, payments: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/auth/admin/payments', {
          credentials: 'include'
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result.error || 'Failed to load payments');
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  const filteredPayments = data.payments.filter(p => 
    p.customer_name.toLowerCase().includes(search.toLowerCase()) || 
    p.project_name.toLowerCase().includes(search.toLowerCase()) ||
    (p.receipt_ref && p.receipt_ref.toLowerCase().includes(search.toLowerCase()))
  );

  const getStatusStyle = (status) => {
    if (status === 'paid') return 'bg-[#e6f4ea] text-[#137333]';
    if (status === 'overdue') return 'bg-error-container/30 text-error';
    return 'bg-warning-container text-warning';
  };

  const handleExportReport = () => {
    const lines = [
      'ArchTech Pro - Payments Report',
      '==============================',
      `Total Paid: $${data.stats.totalPaid || 0}`,
      `Pending: $${data.stats.totalPending || 0}`,
      `Overdue Count: ${data.stats.overdueCount || 0}`,
      '------------------------------',
      'Details:',
      ...filteredPayments.map(p => `- ${new Date(p.date).toLocaleDateString()} | ${p.customer_name} | ${p.project_name} | $${p.amount} | ${p.status.toUpperCase()}`)
    ];
    const content = lines.join('\n');
    const blob = new Blob([content], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Payments_Report.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AdminLayout title="Payments" subtitle="Track customer payments and project revenue.">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-8">
        <div className="bg-surface-container-lowest rounded-xl p-6 border border-[#E5E0DD] shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="icon-mask text-[#137333]" style={{ WebkitMaskImage: 'url(/icons/check_circle.svg)', maskImage: 'url(/icons/check_circle.svg)' , width: '20px', height: '20px'}}></span>
            <h3 className="font-label-md text-on-surface-variant uppercase tracking-wider">Total Paid</h3>
          </div>
          <div className="font-display-lg text-on-surface">
            ${Number(data.stats.totalPaid || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>
        <div className="bg-surface-container-lowest rounded-xl p-6 border border-[#E5E0DD] shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="icon-mask text-warning" style={{ WebkitMaskImage: 'url(/icons/pending.svg)', maskImage: 'url(/icons/pending.svg)' , width: '20px', height: '20px'}}></span>
            <h3 className="font-label-md text-on-surface-variant uppercase tracking-wider">Pending</h3>
          </div>
          <div className="font-display-lg text-on-surface">
            ${Number(data.stats.totalPending || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>
        <div className="bg-surface-container-lowest rounded-xl p-6 border border-[#E5E0DD] shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="icon-mask text-error" style={{ WebkitMaskImage: 'url(/icons/warning.svg)', maskImage: 'url(/icons/warning.svg)' , width: '20px', height: '20px'}}></span>
            <h3 className="font-label-md text-on-surface-variant uppercase tracking-wider">Overdue Count</h3>
          </div>
          <div className="font-display-lg text-error">
            {data.stats.overdueCount || 0}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <div className="relative w-full sm:w-96">
          <span className="icon-mask absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" style={{ WebkitMaskImage: 'url(/icons/search.svg)', maskImage: 'url(/icons/search.svg)' , width: '20px', height: '20px'}}></span>
          <input
            className="w-full pl-10 pr-4 py-2 bg-[#F9F8F7] border border-outline-variant rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md transition-all"
            placeholder="Search by customer, project, or reference..."
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <button onClick={handleExportReport} className="w-full sm:w-auto bg-surface-container-lowest border border-outline text-on-surface font-label-md text-label-md px-6 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-surface-container transition-colors shadow-sm">
          <span className="icon-mask text-[20px]" style={{ WebkitMaskImage: 'url(/icons/download.svg)', maskImage: 'url(/icons/download.svg)' , width: '20px', height: '20px'}}></span>
          Export Report
        </button>
      </div>

      {error && <div className="p-4 mb-6 bg-red-50 text-red-700 rounded-lg">{error}</div>}

      <div className="bg-surface-container-lowest border border-[#E5E0DD] rounded-xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="text-center py-12 text-on-surface-variant">Loading payments...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F9F8F7] border-b border-[#E5E0DD]">
                  <th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Date</th>
                  <th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Customer / Project</th>
                  <th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Method & Ref</th>
                  <th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Amount</th>
                  <th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Status</th>
                  <th className="py-4 px-6 text-right font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.length === 0 && (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-on-surface-variant">No payments found.</td>
                  </tr>
                )}
                {filteredPayments.map(p => (
                  <tr key={p.Id} className="border-b border-[#F0EEED] hover:bg-[#F9F8F7] transition-colors">
                    <td className="py-4 px-6 font-body-md text-body-md text-on-surface">{new Date(p.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' })}</td>
                    <td className="py-4 px-6">
                      <div className="font-body-md font-medium text-on-surface">{p.customer_name}</div>
                      <div className="text-xs text-on-surface-variant mt-1">{p.project_name}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-body-md text-on-surface capitalize">{p.method}</div>
                      <div className="text-xs text-on-surface-variant mt-1">{p.receipt_ref || '—'}</div>
                    </td>
                    <td className="py-4 px-6 font-body-md text-body-md font-medium text-on-surface">
                      ${Number(p.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize ${getStatusStyle(p.status)}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button onClick={() => alert(`Viewing details for payment from ${p.customer_name}`)} className="text-primary hover:underline text-sm font-medium">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminPayments;
