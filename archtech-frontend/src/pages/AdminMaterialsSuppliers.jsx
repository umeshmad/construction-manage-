import React from 'react';
import AdminLayout from '../components/AdminLayout';

const AdminMaterialsSuppliers = () => {
  return (
    <AdminLayout title="Materials & Suppliers" subtitle="Manage your inventory, suppliers, and procurement pipelines.">
      {/* Header Action */}
      <div className="flex justify-end">
        <button className="bg-primary text-on-primary font-label-md text-label-md px-6 py-3 rounded-lg flex items-center space-x-2 hover:bg-[#b55a00] transition-colors shadow-sm">
          <span className="icon-mask text-[20px]" style={{ WebkitMaskImage: 'url(/icons/add.svg)', maskImage: 'url(/icons/add.svg)' , width: '20px', height: '20px'}}></span>
          <span>Add Material</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-outline-variant flex space-x-8">
        <button className="pb-3 px-2 border-b-2 border-primary text-primary font-label-md text-label-md transition-colors">
          Materials
        </button>
        <button className="pb-3 px-2 border-b-2 border-transparent text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md">
          Suppliers
        </button>
      </div>

      {/* Content Card (Table) */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden shadow-sm">
        {/* Toolbar */}
        <div className="p-6 border-b border-outline-variant flex flex-col md:flex-row justify-between items-center gap-4 bg-[#FCFAFA]">
          <div className="relative w-full md:w-96">
            <span className="icon-mask absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" style={{ WebkitMaskImage: 'url(/icons/search.svg)', maskImage: 'url(/icons/search.svg)' , width: '20px', height: '20px'}}></span>
            <input
              className="w-full pl-10 pr-4 py-2 bg-[#F9F8F7] border border-outline-variant rounded-lg font-body-md text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              placeholder="Search inventory..."
              type="text"
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

        {/* Table */}
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
              {/* Row 1 */}
              <tr className="hover:bg-surface-container-low transition-colors group">
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded bg-surface-container flex items-center justify-center text-primary">
                      <span className="icon-mask" style={{ WebkitMaskImage: 'url(/icons/construction.svg)', maskImage: 'url(/icons/construction.svg)' , width: '20px', height: '20px'}}></span>
                    </div>
                    <div>
                      <p className="font-medium">Steel Rebar #4</p>
                      <p className="text-caption font-caption text-on-surface-variant">SKU: RB-0042</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">$1.85 / ft</td>
                <td className="py-4 px-6">
                  <div className="flex flex-col space-y-1">
                    <div className="flex justify-between text-caption font-caption">
                      <span>65% (Good)</span>
                      <span className="text-on-surface-variant">6,500 ft</span>
                    </div>
                    <div className="w-full bg-[#F0EEED] rounded-full h-1.5">
                      <div className="bg-primary h-1.5 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="inline-block px-3 py-1 rounded-full bg-surface-container-high text-on-surface text-caption font-caption">Skyline Plaza</span>
                </td>
                <td className="py-4 px-6 text-right">
                  <button className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full hover:bg-surface-container opacity-0 group-hover:opacity-100 focus:opacity-100">
                    <span className="icon-mask" style={{ WebkitMaskImage: 'url(/icons/more_vert.svg)', maskImage: 'url(/icons/more_vert.svg)' , width: '20px', height: '20px'}}></span>
                  </button>
                </td>
              </tr>

              {/* Row 2 (Low Stock) */}
              <tr className="hover:bg-surface-container-low transition-colors group">
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded bg-surface-container flex items-center justify-center text-primary">
                      <span className="icon-mask" style={{ WebkitMaskImage: 'url(/icons/layers.svg)', maskImage: 'url(/icons/layers.svg)' , width: '20px', height: '20px'}}></span>
                    </div>
                    <div>
                      <p className="font-medium flex items-center gap-2">
                        Portland Cement
                        <span className="bg-error-container text-on-error-container text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Low</span>
                      </p>
                      <p className="text-caption font-caption text-on-surface-variant">SKU: CM-P94</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">$12.50 / bag</td>
                <td className="py-4 px-6">
                  <div className="flex flex-col space-y-1">
                    <div className="flex justify-between text-caption font-caption">
                      <span className="text-error">15% (Critical)</span>
                      <span className="text-on-surface-variant">150 bags</span>
                    </div>
                    <div className="w-full bg-[#F0EEED] rounded-full h-1.5">
                      <div className="bg-error h-1.5 rounded-full" style={{ width: '15%' }}></div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex gap-1 flex-wrap">
                    <span className="inline-block px-3 py-1 rounded-full bg-surface-container-high text-on-surface text-caption font-caption">Apex Villa</span>
                    <span className="inline-block px-3 py-1 rounded-full bg-surface-container-high text-on-surface text-caption font-caption">Oak Heights</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-right">
                  <button className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full hover:bg-surface-container opacity-0 group-hover:opacity-100 focus:opacity-100">
                    <span className="icon-mask" style={{ WebkitMaskImage: 'url(/icons/more_vert.svg)', maskImage: 'url(/icons/more_vert.svg)' , width: '20px', height: '20px'}}></span>
                  </button>
                </td>
              </tr>

              {/* Row 3 */}
              <tr className="hover:bg-surface-container-low transition-colors group">
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded bg-surface-container flex items-center justify-center text-primary">
                      <span className="icon-mask" style={{ WebkitMaskImage: 'url(/icons/format_paint.svg)', maskImage: 'url(/icons/format_paint.svg)' , width: '20px', height: '20px'}}></span>
                    </div>
                    <div>
                      <p className="font-medium">Exterior Primer</p>
                      <p className="text-caption font-caption text-on-surface-variant">SKU: PT-E01</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">$35.00 / gal</td>
                <td className="py-4 px-6">
                  <div className="flex flex-col space-y-1">
                    <div className="flex justify-between text-caption font-caption">
                      <span className="text-secondary">42% (Medium)</span>
                      <span className="text-on-surface-variant">84 gal</span>
                    </div>
                    <div className="w-full bg-[#F0EEED] rounded-full h-1.5">
                      <div className="bg-secondary h-1.5 rounded-full" style={{ width: '42%' }}></div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="inline-block px-3 py-1 rounded-full bg-surface-container-high text-on-surface text-caption font-caption">Apex Villa</span>
                </td>
                <td className="py-4 px-6 text-right">
                  <button className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full hover:bg-surface-container opacity-0 group-hover:opacity-100 focus:opacity-100">
                    <span className="icon-mask" style={{ WebkitMaskImage: 'url(/icons/more_vert.svg)', maskImage: 'url(/icons/more_vert.svg)' , width: '20px', height: '20px'}}></span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-outline-variant bg-[#FCFAFA] flex justify-between items-center text-caption font-caption text-on-surface-variant">
          <span>Showing 1 to 3 of 42 entries</span>
          <div className="flex space-x-2">
            <button className="p-1 rounded hover:bg-surface-container text-on-surface disabled:opacity-50" disabled>
              <span className="icon-mask text-[18px]" style={{ WebkitMaskImage: 'url(/icons/chevron_left.svg)', maskImage: 'url(/icons/chevron_left.svg)' , width: '18px', height: '18px'}}></span>
            </button>
            <button className="p-1 rounded hover:bg-surface-container text-on-surface">
              <span className="icon-mask text-[18px]" style={{ WebkitMaskImage: 'url(/icons/chevron_right.svg)', maskImage: 'url(/icons/chevron_right.svg)' , width: '18px', height: '18px'}}></span>
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminMaterialsSuppliers;
