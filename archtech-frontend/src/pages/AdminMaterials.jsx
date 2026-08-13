import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';

const initialMaterials = [
  { id: 1, name: 'Steel Rebar #4', sku: 'RB-0042', cost: 1.85, unit: 'ft', stock: 6500, maxStock: 10000, project: 'Skyline Plaza', icon: 'construction' },
  { id: 2, name: 'Portland Cement', sku: 'CM-P94', cost: 12.50, unit: 'bag', stock: 150, maxStock: 1000, project: 'Apex Villa, Oak Heights', icon: 'layers', isLow: true },
  { id: 3, name: 'Exterior Primer', sku: 'PT-E01', cost: 35.00, unit: 'gal', stock: 420, maxStock: 1000, project: 'Apex Villa', icon: 'format_paint' }
];

const initialSuppliers = [
  { id: 1, name: 'National Steel Corp', contact: 'John Carter', phone: '+1 (555) 019-2834', category: 'Metals' },
  { id: 2, name: 'Global Cement Supply', contact: 'Rita Patel', phone: '+1 (555) 012-9844', category: 'Adhesives & Concrete' },
  { id: 3, name: 'Paints & Finishes Ltd', contact: 'Tom Davis', phone: '+1 (555) 014-1188', category: 'Finishes' }
];

const AdminMaterials = () => {
  const [activeTab, setActiveTab] = useState('materials');
  const [materials, setMaterials] = useState(initialMaterials);
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [search, setSearch] = useState('');

  const filteredMaterials = materials.filter(m => m.name.toLowerCase().includes(search.toLowerCase()) || m.sku.toLowerCase().includes(search.toLowerCase()));
  const filteredSuppliers = suppliers.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.contact.toLowerCase().includes(search.toLowerCase()));

  return (
    <AdminLayout title="Materials &amp; Suppliers" subtitle="Manage your inventory, suppliers, and procurement pipelines.">
      {/* Tabs */}
      <div className="border-b border-outline-variant flex space-x-8">
        <button
          onClick={() => { setActiveTab('materials'); setSearch(''); }}
          className={`pb-3 px-2 font-label-md text-label-md transition-colors ${activeTab === 'materials' ? 'border-b-2 border-primary text-primary' : 'border-b-2 border-transparent text-on-surface-variant hover:text-primary'}`}
        >
          Materials Inventory
        </button>
        <button
          onClick={() => { setActiveTab('suppliers'); setSearch(''); }}
          className={`pb-3 px-2 font-label-md text-label-md transition-colors ${activeTab === 'suppliers' ? 'border-b-2 border-primary text-primary' : 'border-b-2 border-transparent text-on-surface-variant hover:text-primary'}`}
        >
          Suppliers Directory
        </button>
      </div>

      {/* Main Table Card */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden" style={{ boxShadow: '0px 4px 20px rgba(44,62,80,0.04)' }}>
        {/* Toolbar */}
        <div className="p-6 border-b border-outline-variant flex flex-col md:flex-row justify-between items-center gap-4 bg-[#FCFAFA]">
          <div className="relative w-full md:w-96">
            <span className="icon-mask absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" style={{ WebkitMaskImage: 'url(/icons/search.svg)', maskImage: 'url(/icons/search.svg)' , width: '20px', height: '20px'}}></span>
            <input
              className="w-full pl-10 pr-4 py-2 bg-[#F9F8F7] border border-outline-variant rounded-lg font-body-md text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              placeholder={activeTab === 'materials' ? 'Search materials by name or SKU...' : 'Search suppliers...'}
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="flex space-x-3 w-full md:w-auto">
            <button className="flex items-center space-x-2 px-4 py-2 border border-outline-variant rounded-lg text-on-surface font-label-md text-label-md hover:bg-surface-container-low transition-colors w-full md:w-auto justify-center">
              <span className="icon-mask text-[18px]" style={{ WebkitMaskImage: 'url(/icons/filter_list.svg)', maskImage: 'url(/icons/filter_list.svg)' , width: '18px', height: '18px'}}></span>
              <span>Filter</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border border-outline-variant rounded-lg text-on-surface font-label-md text-label-md hover:bg-surface-container-low transition-colors w-full md:w-auto justify-center">
              <span className="icon-mask text-[18px]" style={{ WebkitMaskImage: 'url(/icons/download.svg)', maskImage: 'url(/icons/download.svg)' , width: '18px', height: '18px'}}></span>
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Conditional Tables */}
        {activeTab === 'materials' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-outline-variant bg-[#FCFAFA]">
                  <th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant font-medium">Material Name</th>
                  <th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant font-medium">Unit Cost</th>
                  <th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant font-medium min-w-[200px]">Stock Level</th>
                  <th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant font-medium">Used In</th>
                  <th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0EEED] font-body-md text-body-md text-on-surface">
                {filteredMaterials.map(m => {
                  const percent = Math.round((m.stock / m.maxStock) * 100);
                  const isCritical = m.isLow || percent <= 20;
                  return (
                    <tr key={m.id} className="hover:bg-surface-container-low transition-colors group">
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded bg-surface-container flex items-center justify-center text-primary">
                            <span className="icon-mask" style={{ WebkitMaskImage: `url(/icons/${m.icon}.svg)`, maskImage: `url(/icons/${m.icon}.svg)` }}></span>
                          </div>
                          <div>
                            <p className="font-medium flex items-center gap-2">
                              {m.name}
                              {isCritical && (
                                <span className="bg-error-container text-on-error-container text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Low</span>
                              )}
                            </p>
                            <p className="text-caption font-caption text-on-surface-variant">SKU: {m.sku}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">${m.cost.toFixed(2)} / {m.unit}</td>
                      <td className="py-4 px-6">
                        <div className="flex flex-col space-y-1">
                          <div className="flex justify-between text-caption font-caption">
                            <span className={isCritical ? 'text-error font-medium' : 'text-on-surface'}>{percent}% ({isCritical ? 'Critical' : 'Good'})</span>
                            <span className="text-on-surface-variant">{m.stock.toLocaleString()} {m.unit}</span>
                          </div>
                          <div className="w-full bg-[#F0EEED] rounded-full h-1.5">
                            <div className={`h-1.5 rounded-full ${isCritical ? 'bg-error' : 'bg-primary-container'}`} style={{ width: `${percent}%` }} />
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-block px-3 py-1 rounded-full bg-surface-container-high text-on-surface text-caption font-caption">{m.project}</span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full hover:bg-surface-container opacity-0 group-hover:opacity-100 focus:opacity-100">
                          <span className="icon-mask" style={{ WebkitMaskImage: 'url(/icons/more_vert.svg)', maskImage: 'url(/icons/more_vert.svg)' , width: '20px', height: '20px'}}></span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-outline-variant bg-[#FCFAFA]">
                  <th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant font-medium">Supplier Name</th>
                  <th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant font-medium">Contact Person</th>
                  <th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant font-medium">Phone Number</th>
                  <th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant font-medium">Category</th>
                  <th className="py-4 px-6 font-label-md text-label-md text-on-surface-variant font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0EEED] font-body-md text-body-md text-on-surface">
                {filteredSuppliers.map(s => (
                  <tr key={s.id} className="hover:bg-surface-container-low transition-colors group">
                    <td className="py-4 px-6 font-medium text-primary">{s.name}</td>
                    <td className="py-4 px-6">{s.contact}</td>
                    <td className="py-4 px-6">{s.phone}</td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 bg-surface-container rounded-full text-xs text-on-surface font-label-md">{s.category}</span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full hover:bg-surface-container opacity-0 group-hover:opacity-100 focus:opacity-100">
                        <span className="icon-mask" style={{ WebkitMaskImage: 'url(/icons/more_vert.svg)', maskImage: 'url(/icons/more_vert.svg)' , width: '20px', height: '20px'}}></span>
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
  );
};

export default AdminMaterials;
