import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';

const AdminMaterials = () => {
  const [activeTab, setActiveTab] = useState('inventory'); // 'inventory' | 'suppliers'
  const [search, setSearch] = useState('');
  const [modalState, setModalState] = useState({ isOpen: false, mode: 'add', item: null, type: 'inventory' });
  const [formData, setFormData] = useState({});
  const [data, setData] = useState({ materials: [], suppliers: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const openAddModal = () => {
    setFormData(activeTab === 'inventory' ? { name: '', unit: '', unit_cost: '', stock_quantity: '', reorder_threshold: '' } : { name: '', contact_info: '' });
    setModalState({ isOpen: true, mode: 'add', item: null, type: activeTab });
  };

  const openEditModal = (item) => {
    setFormData(item);
    setModalState({ isOpen: true, mode: 'edit', item, type: activeTab });
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    const dataKey = modalState.type === 'inventory' ? 'materials' : 'suppliers';
    if (modalState.mode === 'add') {
      const newItem = { Id: Date.now(), ...formData };
      setData(prev => ({ ...prev, [dataKey]: [newItem, ...prev[dataKey]] }));
    } else {
      setData(prev => ({
        ...prev,
        [dataKey]: prev[dataKey].map(item => item.Id === modalState.item.Id ? { ...item, ...formData } : item)
      }));
    }
    setModalState({ isOpen: false, mode: 'add', item: null, type: 'inventory' });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:3000/api/auth/admin/materials?tab=${activeTab}`, {
          credentials: 'include'
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result.error || 'Failed to load data');
        
        const dataKey = activeTab === 'inventory' ? 'materials' : 'suppliers';
        setData(prev => ({
          ...prev,
          [dataKey]: result[dataKey] || []
        }));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeTab]);

  const displayedItems = (activeTab === 'inventory' ? data.materials : data.suppliers).filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
    <AdminLayout title="Materials & Suppliers" subtitle="Manage inventory and supplier relationships.">
      {/* Tabs */}
      <div className="flex border-b border-[#E5E0DD] mb-8">
        <button
          onClick={() => { setActiveTab('inventory'); setSearch(''); }}
          className={`pb-3 px-6 font-label-md text-label-md transition-colors ${
            activeTab === 'inventory' ? 'border-b-2 border-primary text-primary' : 'text-on-surface-variant hover:text-primary border-b-2 border-transparent'
          }`}
        >
          Materials
        </button>
        <button
          onClick={() => { setActiveTab('suppliers'); setSearch(''); }}
          className={`pb-3 px-6 font-label-md text-label-md transition-colors ${
            activeTab === 'suppliers' ? 'border-b-2 border-primary text-primary' : 'text-on-surface-variant hover:text-primary border-b-2 border-transparent'
          }`}
        >
          Suppliers
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <div className="relative w-full sm:w-96">
          <span className="icon-mask absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" style={{ WebkitMaskImage: 'url(/icons/search.svg)', maskImage: 'url(/icons/search.svg)' , width: '20px', height: '20px'}}></span>
          <input
            className="w-full pl-10 pr-4 py-2 bg-[#F9F8F7] border border-outline-variant rounded-lg font-body-md text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            placeholder={activeTab === 'inventory' ? 'Search materials...' : 'Search suppliers...'}
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <button onClick={openAddModal} className="bg-primary text-on-primary font-label-md text-label-md px-6 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-[#b55a00] transition-colors shadow-sm whitespace-nowrap">
          <span className="icon-mask text-[20px]" style={{ WebkitMaskImage: 'url(/icons/add.svg)', maskImage: 'url(/icons/add.svg)' , width: '20px', height: '20px'}}></span>
          {activeTab === 'inventory' ? 'Add Material' : 'Add Supplier'}
        </button>
      </div>

      {error && <div className="p-4 mb-6 bg-red-50 text-red-700 rounded-lg">{error}</div>}

      {/* Content */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden shadow-sm">
        {loading ? (
          <div className="text-center py-12 text-on-surface-variant">Loading data...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-outline-variant bg-[#FCFAFA]">
                  <th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant font-medium">NAME</th>
                  {activeTab === 'inventory' ? (
                    <>
                      <th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant font-medium">STOCK</th>
                      <th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant font-medium">UNIT COST</th>
                      <th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant font-medium">STATUS</th>
                    </>
                  ) : (
                    <th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant font-medium">CONTACT INFO</th>
                  )}
                  <th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant font-medium text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0EEED] font-body-md text-body-md text-on-surface">
                {displayedItems.length === 0 && (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-on-surface-variant">No records found.</td>
                  </tr>
                )}
                {displayedItems.map(item => (
                  <tr key={item.Id} className="border-b border-[#F0EEED] hover:bg-[#F9F8F7] transition-colors">
                    <td className="py-4 px-6 font-body-md text-body-md text-on-surface font-medium">{item.name}</td>
                    {activeTab === 'inventory' ? (
                      <>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${item.stock_quantity < item.reorder_threshold ? 'bg-error' : 'bg-primary'}`}></span>
                            <span>{item.stock_quantity} {item.unit}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">${Number(item.unit_cost).toFixed(2)} / {item.unit}</td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 rounded-full text-[12px] font-bold uppercase tracking-wider ${item.stock_quantity < item.reorder_threshold ? 'bg-error-container text-on-error-container' : 'bg-[#E5E0DD] text-on-surface-variant'}`}>
                            {item.stock_quantity < item.reorder_threshold ? 'Low Stock' : 'In Stock'}
                          </span>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="py-4 px-6 font-body-md text-body-md text-on-surface">{item.contact_info}</td>
                      </>
                    )}
                    <td className="py-4 px-6 text-right relative group">
                      <button onClick={() => openEditModal(item)} className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full hover:bg-surface-container">
                        <span className="icon-mask" style={{ WebkitMaskImage: 'url(/icons/edit.svg)', maskImage: 'url(/icons/edit.svg)' , width: '20px', height: '20px'}}></span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>

    {/* Add/Edit Modal */}
    {modalState.isOpen && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4" onClick={() => setModalState({ isOpen: false })}>
        <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl flex flex-col gap-6" onClick={e => e.stopPropagation()}>
          <div className="flex justify-between items-start border-b border-[#E5E0DD] pb-4">
            <h3 className="font-headline-md text-xl font-bold text-on-surface">
              {modalState.mode === 'add' ? `Add ${modalState.type === 'inventory' ? 'Material' : 'Supplier'}` : `Edit ${modalState.type === 'inventory' ? 'Material' : 'Supplier'}`}
            </h3>
            <button onClick={() => setModalState({ isOpen: false })} className="text-on-surface-variant hover:text-error p-1">
              <span className="icon-mask" style={{ WebkitMaskImage: 'url(/icons/close.svg)', maskImage: 'url(/icons/close.svg)', width:'20px', height:'20px' }}></span>
            </button>
          </div>
          
          <form onSubmit={handleModalSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-caption font-caption text-on-surface-variant mb-1">Name</label>
              <input type="text" required className="w-full border border-outline-variant rounded-lg px-4 py-2 focus:border-primary focus:outline-none" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} placeholder={modalState.type === 'inventory' ? "e.g. Steel Rebar" : "e.g. Lanka Traders"} />
            </div>
            
            {modalState.type === 'inventory' ? (
              <>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-caption font-caption text-on-surface-variant mb-1">Unit</label>
                    <input type="text" required className="w-full border border-outline-variant rounded-lg px-4 py-2 focus:border-primary focus:outline-none" value={formData.unit || ''} onChange={e => setFormData({...formData, unit: e.target.value})} placeholder="e.g. ton" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-caption font-caption text-on-surface-variant mb-1">Unit Cost ($)</label>
                    <input type="number" step="0.01" required className="w-full border border-outline-variant rounded-lg px-4 py-2 focus:border-primary focus:outline-none" value={formData.unit_cost || ''} onChange={e => setFormData({...formData, unit_cost: e.target.value})} placeholder="0.00" />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-caption font-caption text-on-surface-variant mb-1">Stock Qty</label>
                    <input type="number" required className="w-full border border-outline-variant rounded-lg px-4 py-2 focus:border-primary focus:outline-none" value={formData.stock_quantity || ''} onChange={e => setFormData({...formData, stock_quantity: e.target.value})} placeholder="0" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-caption font-caption text-on-surface-variant mb-1">Reorder Level</label>
                    <input type="number" required className="w-full border border-outline-variant rounded-lg px-4 py-2 focus:border-primary focus:outline-none" value={formData.reorder_threshold || ''} onChange={e => setFormData({...formData, reorder_threshold: e.target.value})} placeholder="0" />
                  </div>
                </div>
              </>
            ) : (
              <div>
                <label className="block text-caption font-caption text-on-surface-variant mb-1">Contact Info</label>
                <input type="text" required className="w-full border border-outline-variant rounded-lg px-4 py-2 focus:border-primary focus:outline-none" value={formData.contact_info || ''} onChange={e => setFormData({...formData, contact_info: e.target.value})} placeholder="Email or Phone" />
              </div>
            )}
            
            <div className="flex gap-3 mt-4">
              <button type="button" onClick={() => setModalState({ isOpen: false })} className="flex-1 py-3 bg-surface border border-outline text-on-surface rounded-lg font-label-md hover:bg-surface-container transition-colors">Cancel</button>
              <button type="submit" className="flex-1 py-3 bg-primary text-on-primary rounded-lg font-label-md hover:bg-[#b55a00] transition-colors">
                {modalState.mode === 'add' ? 'Save New' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
    </>
  );
};

export default AdminMaterials;
