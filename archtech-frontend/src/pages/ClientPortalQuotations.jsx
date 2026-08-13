import React, { useState } from 'react';
import ClientLayout from '../components/ClientLayout';

const quotationsList = [
  {
    id: 1,
    project: 'The Apex Villa',
    sentDate: 'Oct 12, 2023',
    status: 'Pending Review',
    statusClass: 'bg-secondary-container text-on-secondary-container',
    amount: 425000,
    items: [
      { name: 'Labor', desc: 'Specialized masonry and framing', amount: 185000 },
      { name: 'Materials', desc: 'Premium sustainable timber and stone', amount: 140000 },
      { name: 'Equipment', desc: 'Crane rental and excavation tools', amount: 45000 },
      { name: 'Permits', desc: 'City building and environmental permits', amount: 15000 },
      { name: 'Contingency', desc: '10% unforeseen site adjustments', amount: 40000 }
    ]
  },
  {
    id: 2,
    project: 'Lumina Arts Center',
    sentDate: 'Sep 20, 2023',
    status: 'Accepted',
    statusClass: 'bg-[#e8f5e9] text-[#1b5e20]',
    amount: 1250000,
    dateAction: 'Accepted on Sep 25, 2023',
    items: []
  },
  {
    id: 3,
    project: 'Riverside Corporate',
    sentDate: 'Aug 15, 2023',
    status: 'Rejected',
    statusClass: 'border border-error text-error',
    amount: 890000,
    dateAction: 'Rejected on Aug 18, 2023',
    items: []
  }
];

const ClientPortalQuotations = () => {
  const [quotations, setQuotations] = useState(quotationsList);
  const [expandedBreakdown, setExpandedBreakdown] = useState({});

  const handleAccept = (id) => {
    setQuotations(quotations.map(q => {
      if (q.id === id) {
        return {
          ...q,
          status: 'Accepted',
          statusClass: 'bg-[#e8f5e9] text-[#1b5e20]',
          dateAction: `Accepted on ${new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}`
        };
      }
      return q;
    }));
  };

  const handleReject = (id) => {
    setQuotations(quotations.map(q => {
      if (q.id === id) {
        return {
          ...q,
          status: 'Rejected',
          statusClass: 'border border-error text-error',
          dateAction: `Rejected on ${new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}`
        };
      }
      return q;
    }));
  };

  const toggleBreakdown = (id) => {
    setExpandedBreakdown(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <ClientLayout title="Quotations" subtitle="Review and respond to quotations from our team.">
      <div className="flex flex-col gap-6">
        {quotations.map(q => (
          <div key={q.id} className={`bg-surface-container-lowest rounded-xl border border-[#E5E0DD] p-8 flex flex-col gap-6 transition-opacity ${q.status === 'Pending Review' ? 'diffusion-shadow' : 'opacity-80 hover:opacity-100'}`} style={{ boxShadow: q.status === 'Pending Review' ? '0px 4px 20px rgba(44,62,80,0.04)' : '' }}>
            {/* Card Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="font-headline-md text-headline-md font-semibold text-on-surface">{q.project}</h2>
                <p className="font-caption text-caption text-on-surface-variant mt-1">Sent: {q.sentDate}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full font-label-md text-label-md flex items-center gap-1 ${q.statusClass}`}>
                  <span className="icon-mask text-[16px]" style={{ WebkitMaskImage: `url(/icons/${q.status === 'Accepted' ? 'check_circle' : q.status === 'Rejected' ? 'cancel' : 'pending_actions'}.svg)`, maskImage: `url(/icons/${q.status === 'Accepted' ? 'check_circle' : q.status === 'Rejected' ? 'cancel' : 'pending_actions'}.svg)` }}></span>
                  {q.status}
                </span>
              </div>
            </div>

            {/* Amount */}
            <div>
              <span className={`font-display-lg text-display-lg font-semibold ${q.status === 'Pending Review' ? 'text-primary' : 'text-on-surface'}`}>
                ${q.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            {/* Detailed Breakdown */}
            {q.status === 'Pending Review' && q.items.length > 0 && (
              <div className="border border-[#E5E0DD] rounded-lg overflow-hidden">
                <div className="flex justify-between items-center px-4 py-3 bg-[#F9F8F7] border-b border-[#E5E0DD] font-label-md text-label-md text-on-surface-variant">
                  <span>Item / Description</span>
                  <span>Amount</span>
                </div>
                <div className="flex flex-col">
                  {q.items.map(item => (
                    <div key={item.name} className="flex justify-between items-center px-4 py-3 border-b border-[#F0EEED]">
                      <div>
                        <div className="font-medium text-on-surface">{item.name}</div>
                        <div className="font-caption text-caption text-on-surface-variant">{item.desc}</div>
                      </div>
                      <div className="text-on-surface font-medium">${item.amount.toLocaleString()}</div>
                    </div>
                  ))}
                  <div className="flex justify-between items-center px-4 py-4 bg-surface-container-low font-headline-sm text-headline-sm font-semibold text-on-surface">
                    <span>Total</span>
                    <span>${q.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Expansible Summary for other statuses */}
            {q.status !== 'Pending Review' && (
              <div>
                <div onClick={() => toggleBreakdown(q.id)} className="flex items-center justify-between border-t border-[#E5E0DD] pt-4 cursor-pointer text-on-surface-variant hover:text-primary transition-colors">
                  <span className="font-label-md text-label-md">View detailed breakdown</span>
                  <span className="icon-mask" style={{ WebkitMaskImage: `url(/icons/${expandedBreakdown[q.id] ? 'expand_less' : 'expand_more'}.svg)`, maskImage: `url(/icons/${expandedBreakdown[q.id] ? 'expand_less' : 'expand_more'}.svg)` }}></span>
                </div>
                {expandedBreakdown[q.id] && (
                  <div className="mt-4 p-4 border border-[#E5E0DD] rounded-lg bg-gray-50 text-sm space-y-2">
                    <p>Detailed architectural, material, and labor breakdown records are filed and registered under the corresponding project ledger.</p>
                  </div>
                )}
              </div>
            )}

            {/* Actions for Pending Review */}
            {q.status === 'Pending Review' ? (
              <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4 border-t border-[#E5E0DD]">
                <button onClick={() => handleReject(q.id)} className="px-6 py-3 rounded border border-error text-error font-label-md text-label-md hover:bg-error-container transition-colors">
                  Reject
                </button>
                <button onClick={() => handleAccept(q.id)} className="px-6 py-3 rounded bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container hover:text-on-primary transition-colors">
                  Accept Quotation
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 pt-2 text-on-surface-variant font-caption text-caption">
                <span className="icon-mask text-[16px]" style={{ WebkitMaskImage: 'url(/icons/done_all.svg)', maskImage: 'url(/icons/done_all.svg)' , width: '16px', height: '16px'}}></span>
                {q.dateAction}
              </div>
            )}
          </div>
        ))}
      </div>
    </ClientLayout>
  );
};

export default ClientPortalQuotations;
