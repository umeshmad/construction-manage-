import React, { useState, useEffect } from 'react';
import ClientLayout from '../components/ClientLayout';

const ClientPortalQuotations = () => {
  const [quotations, setQuotations] = useState([]);
  const [expandedBreakdown, setExpandedBreakdown] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchQuotations = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:3000/api/auth/quotations', {
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to load quotations');
      
      setQuotations(data.quotations || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotations();
  }, []);

  const handleAccept = async (id) => {
    try {
      const res = await fetch('http://localhost:3000/api/auth/quotations', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ id, status: 'accepted' }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to accept quotation');
      }
      fetchQuotations();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await fetch('http://localhost:3000/api/auth/quotations', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ id, status: 'rejected' }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to reject quotation');
      }
      fetchQuotations();
    } catch (err) {
      alert(err.message);
    }
  };

  const toggleBreakdown = (id) => {
    setExpandedBreakdown(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getStatusClass = (status) => {
    if (status === 'accepted') return 'bg-[#e8f5e9] text-[#1b5e20]';
    if (status === 'rejected') return 'border border-error text-error';
    return 'bg-secondary-container text-on-secondary-container';
  };

  const getStatusIcon = (status) => {
    if (status === 'accepted') return 'check_circle';
    if (status === 'rejected') return 'cancel';
    return 'pending_actions';
  };

  const getDisplayStatus = (status) => {
    if (status === 'accepted') return 'Accepted';
    if (status === 'rejected') return 'Rejected';
    return 'Pending Review';
  };

  return (
    <ClientLayout title="Quotations" subtitle="Review and respond to quotations from our team.">
      
      {error && <div className="p-3 mb-6 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">{error}</div>}
      {loading && <div className="text-center py-12 text-on-surface-variant">Loading quotations...</div>}

      {!loading && (
        <div className="flex flex-col gap-6">
          {quotations.length === 0 && (
            <div className="text-center py-12 text-on-surface-variant bg-surface-container-lowest border border-[#E5E0DD] rounded-xl">No quotations found.</div>
          )}
          {quotations.map(q => (
            <div key={q.Id} className={`bg-surface-container-lowest rounded-xl border border-[#E5E0DD] p-8 flex flex-col gap-6 transition-opacity ${q.status === 'pending' ? 'diffusion-shadow' : 'opacity-80 hover:opacity-100'}`} style={{ boxShadow: q.status === 'pending' ? '0px 4px 20px rgba(44,62,80,0.04)' : '' }}>
              {/* Card Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="font-headline-md text-headline-md font-semibold text-on-surface">{q.project_title}</h2>
                  <p className="font-caption text-caption text-on-surface-variant mt-1">Sent: {new Date(q.sent_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' })}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full font-label-md text-label-md flex items-center gap-1 ${getStatusClass(q.status)}`}>
                    <span className="icon-mask text-[16px]" style={{ WebkitMaskImage: `url(/icons/${getStatusIcon(q.status)}.svg)`, maskImage: `url(/icons/${getStatusIcon(q.status)}.svg)` }}></span>
                    {getDisplayStatus(q.status)}
                  </span>
                </div>
              </div>

              {/* Amount */}
              <div>
                <span className={`font-display-lg text-display-lg font-semibold ${q.status === 'pending' ? 'text-primary' : 'text-on-surface'}`}>
                  ${Number(q.total_amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              {/* Detailed Breakdown */}
              {q.status === 'pending' && q.items && q.items.length > 0 && (
                <div className="border border-[#E5E0DD] rounded-lg overflow-hidden">
                  <div className="flex justify-between items-center px-4 py-3 bg-[#F9F8F7] border-b border-[#E5E0DD] font-label-md text-label-md text-on-surface-variant">
                    <span>Item / Description</span>
                    <span>Amount</span>
                  </div>
                  <div className="flex flex-col">
                    {q.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center px-4 py-3 border-b border-[#F0EEED]">
                        <div>
                          <div className="font-medium text-on-surface">{item.description}</div>
                        </div>
                        <div className="text-on-surface font-medium">${Number(item.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                      </div>
                    ))}
                    <div className="flex justify-between items-center px-4 py-4 bg-surface-container-low font-headline-sm text-headline-sm font-semibold text-on-surface">
                      <span>Total</span>
                      <span>${Number(q.total_amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Expansible Summary for other statuses */}
              {q.status !== 'pending' && (
                <div>
                  <div onClick={() => toggleBreakdown(q.Id)} className="flex items-center justify-between border-t border-[#E5E0DD] pt-4 cursor-pointer text-on-surface-variant hover:text-primary transition-colors">
                    <span className="font-label-md text-label-md">View detailed breakdown</span>
                    <span className="icon-mask" style={{ WebkitMaskImage: `url(/icons/${expandedBreakdown[q.Id] ? 'expand_less' : 'expand_more'}.svg)`, maskImage: `url(/icons/${expandedBreakdown[q.Id] ? 'expand_less' : 'expand_more'}.svg)` }}></span>
                  </div>
                  {expandedBreakdown[q.Id] && (
                    <div className="mt-4 p-4 border border-[#E5E0DD] rounded-lg bg-gray-50 text-sm space-y-2">
                      {q.items && q.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between">
                           <span>{item.description}</span>
                           <span>${Number(item.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>
                      ))}
                      <div className="flex justify-between font-bold mt-2 pt-2 border-t">
                         <span>Total</span>
                         <span>${Number(q.total_amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Actions for Pending Review */}
              {q.status === 'pending' ? (
                <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4 border-t border-[#E5E0DD]">
                  <button onClick={() => handleReject(q.Id)} className="px-6 py-3 rounded border border-error text-error font-label-md text-label-md hover:bg-error-container transition-colors">
                    Reject
                  </button>
                  <button onClick={() => handleAccept(q.Id)} className="px-6 py-3 rounded bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container hover:text-on-primary transition-colors">
                    Accept Quotation
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 pt-2 text-on-surface-variant font-caption text-caption">
                  <span className="icon-mask text-[16px]" style={{ WebkitMaskImage: 'url(/icons/done_all.svg)', maskImage: 'url(/icons/done_all.svg)' , width: '16px', height: '16px'}}></span>
                  {getDisplayStatus(q.status)} on {new Date(q.responded_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' })}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </ClientLayout>
  );
};

export default ClientPortalQuotations;
