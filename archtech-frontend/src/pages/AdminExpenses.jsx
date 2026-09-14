import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';

const AdminExpenses = () => {
  const [data, setData] = useState({ stats: {}, expenses: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:3000/api/auth/admin/expenses', {
        credentials: 'include'
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Failed to load expenses');
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await fetch('http://localhost:3000/api/auth/admin/expenses', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ id, status })
      });
      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || 'Failed to update expense');
      }
      fetchExpenses();
    } catch (err) {
      alert(err.message);
    }
  };

  const filteredExpenses = data.expenses.filter(e => 
    e.project_name.toLowerCase().includes(search.toLowerCase()) || 
    (e.worker_name && e.worker_name.toLowerCase().includes(search.toLowerCase())) ||
    e.category.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusStyle = (status) => {
    if (status === 'approved') return 'bg-[#e6f4ea] text-[#137333] border-[#ceead6]';
    if (status === 'rejected') return 'bg-error-container text-error border-error-container';
    return 'bg-warning-container text-warning border-warning-container';
  };

  return (
    <AdminLayout title="Expenses" subtitle="Review and approve site expenses and material costs.">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter mb-8">
        <div className="bg-surface-container-lowest rounded-xl p-6 border border-[#E5E0DD] shadow-sm flex items-center justify-between">
          <div>
            <h3 className="font-label-md text-on-surface-variant uppercase tracking-wider mb-1">Total MTD</h3>
            <div className="font-display-lg text-on-surface">
              ${Number(data.stats.totalMTD || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-primary-container text-primary flex items-center justify-center">
            <span className="icon-mask" style={{ WebkitMaskImage: 'url(/icons/payments.svg)', maskImage: 'url(/icons/payments.svg)' , width: '24px', height: '24px'}}></span>
          </div>
        </div>
        <div className="bg-surface-container-lowest rounded-xl p-6 border border-[#E5E0DD] shadow-sm flex items-center justify-between">
          <div>
            <h3 className="font-label-md text-on-surface-variant uppercase tracking-wider mb-1">Pending Approval</h3>
            <div className="font-display-lg text-warning">
              {data.stats.pendingCount || 0}
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-warning-container text-warning flex items-center justify-center">
            <span className="icon-mask" style={{ WebkitMaskImage: 'url(/icons/pending_actions.svg)', maskImage: 'url(/icons/pending_actions.svg)' , width: '24px', height: '24px'}}></span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <div className="relative w-full sm:w-96">
          <span className="icon-mask absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" style={{ WebkitMaskImage: 'url(/icons/search.svg)', maskImage: 'url(/icons/search.svg)' , width: '20px', height: '20px'}}></span>
          <input
            className="w-full pl-10 pr-4 py-2 bg-[#F9F8F7] border border-outline-variant rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md transition-all"
            placeholder="Search by project, worker, or category..."
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {error && <div className="p-4 mb-6 bg-red-50 text-red-700 rounded-lg">{error}</div>}

      <div className="bg-surface-container-lowest border border-[#E5E0DD] rounded-xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="text-center py-12 text-on-surface-variant">Loading expenses...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F9F8F7] border-b border-[#E5E0DD]">
                  <th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Date</th>
                  <th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Project & Submitted By</th>
                  <th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Category</th>
                  <th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Amount</th>
                  <th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Status</th>
                  <th className="py-4 px-6 text-right font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenses.length === 0 && (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-on-surface-variant">No expenses found.</td>
                  </tr>
                )}
                {filteredExpenses.map(e => (
                  <tr key={e.Id} className="border-b border-[#F0EEED] hover:bg-[#F9F8F7] transition-colors">
                    <td className="py-4 px-6 font-body-md text-body-md text-on-surface">{new Date(e.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' })}</td>
                    <td className="py-4 px-6">
                      <div className="font-body-md font-medium text-on-surface">{e.project_name}</div>
                      <div className="text-xs text-on-surface-variant mt-1 flex items-center gap-1">
                        <span className="icon-mask" style={{ WebkitMaskImage: 'url(/icons/person.svg)', maskImage: 'url(/icons/person.svg)' , width: '12px', height: '12px'}}></span>
                        {e.worker_name || 'Admin'}
                      </div>
                    </td>
                    <td className="py-4 px-6 font-body-md text-body-md text-on-surface capitalize">{e.category.replace('_', ' ')}</td>
                    <td className="py-4 px-6 font-body-md text-body-md font-medium text-on-surface">
                      ${Number(e.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize border ${getStatusStyle(e.status)}`}>
                        {e.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      {e.status === 'pending' ? (
                        <>
                          <button onClick={() => handleUpdateStatus(e.Id, 'approved')} className="px-3 py-1 bg-[#e6f4ea] text-[#137333] hover:bg-green-100 rounded font-label-md text-label-md transition-colors">
                            Approve
                          </button>
                          <button onClick={() => handleUpdateStatus(e.Id, 'rejected')} className="px-3 py-1 bg-error-container text-error hover:bg-red-100 rounded font-label-md text-label-md transition-colors">
                            Reject
                          </button>
                        </>
                      ) : (
                        <span className="text-on-surface-variant text-sm italic">Processed</span>
                      )}
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

export default AdminExpenses;
