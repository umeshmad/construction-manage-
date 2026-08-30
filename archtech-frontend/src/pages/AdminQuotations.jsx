import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';

const initialQuotations = [
  { id: 1, project: 'Smith Residence Renovation', client: 'John Smith', timeAgo: '2 days ago', status: 'Needs Attention', statusClass: 'bg-secondary-container text-on-secondary-container' },
  { id: 2, project: 'Oceanside Commercial Complex', client: 'Elena Rodriguez', date: 'Oct 12, 2024', amount: 24500.00, status: 'Accepted', statusClass: 'bg-[#E8F5E9] text-[#2E7D32]' },
  { id: 3, project: 'Downtown Loft Conversion', client: 'Marcus Chen', date: 'Oct 10, 2024', amount: 8200.00, status: 'Pending', statusClass: 'bg-surface-container-high text-on-surface-variant' },
  { id: 4, project: 'Valley View Estate', client: 'Sarah Jenkins', date: 'Oct 05, 2024', amount: 12000.00, status: 'Rejected', statusClass: 'bg-error-container text-on-error-container' }
];

const AdminQuotations = () => {
  const [quotations, _setQuotations] = useState(initialQuotations);
  const [lineItems, setLineItems] = useState([
    { id: 1, desc: 'Initial Architectural Consultation & Site Visit', amount: 1500 },
    { id: 2, desc: 'Drafting - Floor Plans (Ground & First Floor)', amount: 4500 }
  ]);
  const [newDesc, setNewDesc] = useState('');
  const [newAmt, setNewAmt] = useState('');

  const handleAddLine = () => {
    if (!newDesc || !newAmt) return;
    setLineItems([...lineItems, { id: Date.now(), desc: newDesc, amount: parseFloat(newAmt) }]);
    setNewDesc('');
    setNewAmt('');
  };

  const handleRemoveLine = (id) => {
    setLineItems(lineItems.filter(item => item.id !== id));
  };

  const handleSendQuotation = (project) => {
    const totalAmt = lineItems.reduce((acc, item) => acc + item.amount, 0);
    alert(`Quotation of $${totalAmt.toLocaleString()} sent successfully to client for project "${project}"!`);
  };

  return (
    <AdminLayout title="Quotations Management" subtitle="Review pending requests and manage sent quotes.">
      <div className="flex justify-between items-end pb-6 border-b border-outline-variant">
        <div />
        <button className="flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-lg font-label-md text-label-md hover:bg-surface-tint transition-colors">
          <span className="icon-mask" style={{ WebkitMaskImage: 'url(/icons/add.svg)', maskImage: 'url(/icons/add.svg)' , width: '20px', height: '20px'}}></span>
          New Quote
        </button>
      </div>

      {/* Pending Quotation Requests with Line Item Builder */}
      <section className="space-y-6">
        <h3 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
          <span className="icon-mask text-primary" style={{ WebkitMaskImage: 'url(/icons/pending_actions.svg)', maskImage: 'url(/icons/pending_actions.svg)' , width: '20px', height: '20px'}}></span>
          Pending Quotation Requests
        </h3>
        <div className="space-y-6">
          <div className="glass-card rounded-xl p-8 bg-white/95 border border-[#E5E0DD]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div>
                <h4 className="font-headline-sm text-lg font-semibold text-on-surface">Smith Residence Renovation</h4>
                <p className="font-body-md text-body-md text-on-surface-variant">Requested by: John Smith • 2 days ago</p>
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-md text-label-md">
                Needs Attention
              </span>
            </div>

            {/* Line Item Builder */}
            <div className="bg-[#F9F8F7] rounded-lg p-6 border border-outline-variant">
              <h5 className="font-label-md text-label-md text-on-surface mb-4 font-semibold uppercase tracking-wider">Line Item Builder</h5>
              <div className="space-y-4 mb-6">
                {lineItems.map(item => (
                  <div key={item.id} className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                    <div className="flex-1 w-full">
                      <input
                        className="w-full bg-surface-container-lowest border border-outline-variant rounded-md px-4 py-2 font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-shadow"
                        type="text"
                        value={item.desc}
                        onChange={(e) => {
                          const updated = [...lineItems];
                          updated.find(x => x.id === item.id).desc = e.target.value;
                          setLineItems(updated);
                        }}
                      />
                    </div>
                    <div className="w-full md:w-48 relative">
                      <span className="absolute left-3 top-2.5 text-on-surface-variant">$</span>
                      <input
                        className="w-full pl-8 bg-surface-container-lowest border border-[#E5E0DD] rounded-md px-4 py-2 font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-shadow"
                        type="number"
                        value={item.amount}
                        onChange={(e) => {
                          const updated = [...lineItems];
                          updated.find(x => x.id === item.id).amount = parseFloat(e.target.value) || 0;
                          setLineItems(updated);
                        }}
                      />
                    </div>
                    <button onClick={() => handleRemoveLine(item.id)} className="text-error hover:bg-error-container p-2 rounded-md transition-colors" title="Remove Line">
                      <span className="icon-mask" style={{ WebkitMaskImage: 'url(/icons/delete.svg)', maskImage: 'url(/icons/delete.svg)' , width: '20px', height: '20px'}}></span>
                    </button>
                  </div>
                ))}

                {/* Empty Row for new entry */}
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center pt-2">
                  <div className="flex-1 w-full">
                    <input
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded-md px-4 py-2 font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-shadow"
                      placeholder="Add new description..."
                      type="text"
                      value={newDesc}
                      onChange={e => setNewDesc(e.target.value)}
                    />
                  </div>
                  <div className="w-full md:w-48 relative">
                    <span className="absolute left-3 top-2.5 text-on-surface-variant">$</span>
                    <input
                      className="w-full pl-8 bg-surface-container-lowest border border-[#E5E0DD] rounded-md px-4 py-2 font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                      placeholder="0.00"
                      type="number"
                      value={newAmt}
                      onChange={e => setNewAmt(e.target.value)}
                    />
                  </div>
                  <button onClick={handleAddLine} className="text-primary hover:bg-surface-container-low p-2 rounded-md transition-colors animate-pulse" title="Add Line">
                    <span className="icon-mask" style={{ WebkitMaskImage: 'url(/icons/add_circle.svg)', maskImage: 'url(/icons/add_circle.svg)' , width: '20px', height: '20px'}}></span>
                  </button>
                </div>
              </div>

              <div className="border-t border-[#E5E0DD] pt-4 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-right w-full md:w-auto">
                  <span className="font-body-md text-body-md text-on-surface-variant mr-4">Estimated Total:</span>
                  <span className="font-headline-md text-headline-md font-bold text-on-surface">
                    ${lineItems.reduce((acc, item) => acc + item.amount, 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <button onClick={() => handleSendQuotation('Smith Residence Renovation')} className="w-full md:w-auto bg-primary text-on-primary px-8 py-3 rounded-lg font-label-md text-label-md hover:bg-surface-tint transition-colors flex items-center justify-center gap-2 shadow-md">
                  <span className="icon-mask" style={{ WebkitMaskImage: 'url(/icons/send.svg)', maskImage: 'url(/icons/send.svg)' , width: '20px', height: '20px'}}></span>
                  Send Quotation to Client
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sent Quotations Table */}
      <section className="mb-12">
        <h3 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
          <span className="icon-mask text-tertiary" style={{ WebkitMaskImage: 'url(/icons/history.svg)', maskImage: 'url(/icons/history.svg)' , width: '20px', height: '20px'}}></span>
          Sent Quotations
        </h3>
        <div className="glass-card rounded-xl overflow-hidden bg-white/90 border border-[#E5E0DD] shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F9F8F7] border-b border-outline-variant">
                  <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Recipient / Project</th>
                  <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Date Sent</th>
                  <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider text-right">Total Amount</th>
                  <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider text-center">Status</th>
                  <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="font-body-md text-body-md divide-y divide-[#F0EEED]">
                {quotations.filter(q => q.status !== 'Needs Attention').map(q => (
                  <tr key={q.id} className="hover:bg-surface-bright transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-on-surface">{q.project}</div>
                      <div className="text-on-surface-variant text-sm">{q.client}</div>
                    </td>
                    <td className="px-6 py-4 text-on-surface-variant">{q.date}</td>
                    <td className="px-6 py-4 text-right font-medium text-on-surface">${q.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-label-md text-xs font-medium ${q.statusClass}`}>
                        {q.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-primary hover:text-surface-tint p-1" title="View Details">
                        <span className="icon-mask text-sm" style={{ WebkitMaskImage: 'url(/icons/visibility.svg)', maskImage: 'url(/icons/visibility.svg)' , width: '14px', height: '14px'}}></span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </AdminLayout>
  );
};

export default AdminQuotations;
