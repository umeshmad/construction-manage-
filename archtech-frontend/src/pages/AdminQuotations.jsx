import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';

const AdminQuotations = () => {
  const [data, setData] = useState({ pendingRequests: [], quotations: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [newItems, setNewItems] = useState([{ desc: '', amount: '' }]);

  const fetchQuotations = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:3000/api/auth/admin/quotations', {
        credentials: 'include'
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Failed to load quotations');
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotations();
  }, []);

  const handleSendQuotation = async (e) => {
    e.preventDefault();
    const validItems = newItems.filter(item => item.desc && item.amount);
    if (validItems.length === 0) {
      alert("Please add at least one item.");
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/auth/admin/quotations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          requestId: selectedRequest.Id,
          items: validItems
        })
      });
      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || 'Failed to send quotation');
      }
      setShowModal(false);
      setSelectedRequest(null);
      setNewItems([{ desc: '', amount: '' }]);
      fetchQuotations();
    } catch (err) {
      alert(err.message);
    }
  };

  const getStatusStyle = (status) => {
    if (status === 'accepted') return 'bg-[#e6f4ea] text-[#137333] border-[#ceead6]';
    if (status === 'rejected') return 'bg-error-container text-error border-error-container';
    return 'bg-warning-container text-warning border-warning-container';
  };

  return (
    <AdminLayout title="Quotations" subtitle="Process project requests and issue quotations.">
      {error && <div className="p-4 mb-6 bg-red-50 text-red-700 rounded-lg">{error}</div>}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* Pending Requests Column */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <h2 className="font-headline-md text-headline-md text-on-surface">Pending Requests</h2>
            <span className="bg-primary text-on-primary font-caption text-caption px-2 py-1 rounded-full">{data.pendingRequests.length}</span>
          </div>
          <div className="flex flex-col gap-4">
            {loading ? (
              <div className="text-center py-8 text-on-surface-variant">Loading...</div>
            ) : data.pendingRequests.length === 0 ? (
              <div className="text-center py-8 text-on-surface-variant bg-surface-container-lowest border border-[#E5E0DD] rounded-xl">No pending requests.</div>
            ) : (
              data.pendingRequests.map(r => (
                <div key={r.Id} className="bg-surface-container-lowest rounded-xl p-6 border border-warning shadow-sm diffusion-shadow hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-headline-md text-[18px] font-bold text-on-surface">{r.title}</h3>
                    <span className="font-caption text-caption text-on-surface-variant">
                      {new Date(r.submitted_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-4 flex items-center gap-2">
                    <span className="icon-mask text-primary" style={{ WebkitMaskImage: 'url(/icons/person.svg)', maskImage: 'url(/icons/person.svg)' , width: '16px', height: '16px'}}></span>
                    {r.customer_name}
                  </p>
                  <p className="font-body-md text-body-md text-on-surface mb-4 line-clamp-2">{r.description}</p>
                  <div className="flex items-center justify-between border-t border-[#F0EEED] pt-4">
                    <span className="font-label-md text-label-md text-on-surface-variant">Est. Budget: <strong className="text-on-surface">${Number(r.estimated_budget || 0).toLocaleString()}</strong></span>
                    <button 
                      onClick={() => { setSelectedRequest(r); setShowModal(true); }}
                      className="bg-primary text-on-primary px-4 py-2 rounded font-label-md text-label-md hover:bg-[#b55a00] transition-colors"
                    >
                      Issue Quotation
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Sent Quotations Column */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <h2 className="font-headline-md text-headline-md text-on-surface">Sent Quotations</h2>
          </div>
          <div className="flex flex-col gap-4">
            {loading ? (
              <div className="text-center py-8 text-on-surface-variant">Loading...</div>
            ) : data.quotations.length === 0 ? (
              <div className="text-center py-8 text-on-surface-variant bg-surface-container-lowest border border-[#E5E0DD] rounded-xl">No sent quotations.</div>
            ) : (
              data.quotations.map(q => (
                <div key={q.Id} className="bg-surface-container-lowest rounded-xl p-6 border border-[#E5E0DD] shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-label-md text-label-md font-bold text-on-surface">{q.project_title}</h3>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize border ${getStatusStyle(q.status)}`}>
                      {q.status}
                    </span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-4 flex items-center gap-2">
                    <span className="icon-mask text-primary" style={{ WebkitMaskImage: 'url(/icons/person.svg)', maskImage: 'url(/icons/person.svg)' , width: '16px', height: '16px'}}></span>
                    {q.customer_name}
                  </p>
                  <div className="flex justify-between items-center bg-[#F9F8F7] p-3 rounded-lg border border-[#F0EEED]">
                    <div>
                      <span className="font-caption text-caption text-on-surface-variant block mb-1">Total Amount</span>
                      <span className="font-headline-md text-on-surface font-bold">${Number(q.total_amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-caption text-caption text-on-surface-variant block mb-1">Sent Date</span>
                      <span className="font-body-md text-on-surface">{new Date(q.sent_date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* Modal */}
      {showModal && selectedRequest && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-2xl w-full border border-outline-variant shadow-2xl flex flex-col gap-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start border-b border-[#E5E0DD] pb-4">
              <div>
                <h3 className="font-headline-md text-xl font-bold text-on-surface">Issue Quotation</h3>
                <p className="text-on-surface-variant text-sm">{selectedRequest.title}</p>
              </div>
              <button onClick={() => setShowModal(false)} className="text-on-surface-variant hover:text-error">
                <span className="icon-mask text-xl" style={{ WebkitMaskImage: 'url(/icons/close.svg)', maskImage: 'url(/icons/close.svg)' }}></span>
              </button>
            </div>
            
            <form onSubmit={handleSendQuotation} className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center text-sm font-semibold text-on-surface-variant mb-1">
                  <span className="w-2/3">Description</span>
                  <span className="w-1/3 text-right pr-12">Amount ($)</span>
                </div>
                {newItems.map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-center">
                    <input 
                      required
                      className="w-2/3 border border-outline-variant rounded p-2 text-sm focus:border-primary focus:outline-none" 
                      placeholder="Line item description" 
                      value={item.desc}
                      onChange={(e) => {
                        const arr = [...newItems];
                        arr[idx].desc = e.target.value;
                        setNewItems(arr);
                      }}
                    />
                    <input 
                      required
                      type="number"
                      step="0.01"
                      className="w-1/3 border border-outline-variant rounded p-2 text-sm focus:border-primary focus:outline-none text-right" 
                      placeholder="0.00" 
                      value={item.amount}
                      onChange={(e) => {
                        const arr = [...newItems];
                        arr[idx].amount = e.target.value;
                        setNewItems(arr);
                      }}
                    />
                    <button 
                      type="button"
                      onClick={() => {
                        if(newItems.length > 1) {
                          setNewItems(newItems.filter((_, i) => i !== idx));
                        }
                      }}
                      className="text-on-surface-variant hover:text-error w-8 flex-shrink-0"
                    >
                      <span className="icon-mask" style={{ WebkitMaskImage: 'url(/icons/close.svg)', maskImage: 'url(/icons/close.svg)', width:'16px', height:'16px' }}></span>
                    </button>
                  </div>
                ))}
                <button 
                  type="button" 
                  onClick={() => setNewItems([...newItems, { desc: '', amount: '' }])}
                  className="text-primary text-sm font-medium hover:underline text-left mt-2 w-max"
                >
                  + Add Item
                </button>
              </div>

              <div className="flex justify-between items-center border-t border-[#E5E0DD] pt-4">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-lg text-primary">
                  ${newItems.reduce((acc, curr) => acc + (parseFloat(curr.amount) || 0), 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>

              <div className="flex justify-end gap-3 mt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded hover:bg-gray-50 text-sm font-medium">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-primary text-on-primary rounded hover:bg-[#b55a00] text-sm font-medium">Send Quotation</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminQuotations;
