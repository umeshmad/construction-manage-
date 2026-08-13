import React from 'react';
import AdminLayout from '../components/AdminLayout';

const AdminPayments = () => {
  return (
    <AdminLayout title="Payments Overview" subtitle="Manage and track client billing across all projects.">
      {/* Header Action */}
      <div className="flex justify-end">
        <button className="bg-primary hover:bg-[#b55a00] text-on-primary font-label-md text-label-md py-3 px-6 rounded-lg transition-all shadow-sm flex items-center space-x-2">
          <span className="icon-mask" style={{ WebkitMaskImage: 'url(/icons/add.svg)', maskImage: 'url(/icons/add.svg)' , width: '20px', height: '20px'}}></span>
          <span>Record Payment</span>
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Collected */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Total Collected</h3>
            <span className="icon-mask text-tertiary" style={{ WebkitMaskImage: 'url(/icons/account_balance_wallet.svg)', maskImage: 'url(/icons/account_balance_wallet.svg)' , width: '20px', height: '20px'}}></span>
          </div>
          <div className="font-display-lg text-display-lg text-on-surface">$1.24M</div>
          <div className="mt-2 text-primary font-label-md text-label-md flex items-center">
            <span className="icon-mask text-sm mr-1" style={{ WebkitMaskImage: 'url(/icons/trending_up.svg)', maskImage: 'url(/icons/trending_up.svg)' , width: '14px', height: '14px'}}></span> +12% this month
          </div>
        </div>

        {/* Outstanding */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Outstanding Across All Clients</h3>
            <span className="icon-mask text-secondary" style={{ WebkitMaskImage: 'url(/icons/pending_actions.svg)', maskImage: 'url(/icons/pending_actions.svg)' , width: '20px', height: '20px'}}></span>
          </div>
          <div className="font-display-lg text-display-lg text-secondary">$342K</div>
          <div className="mt-2 text-on-surface-variant font-label-md text-label-md">Waiting on 14 invoices</div>
        </div>

        {/* Overdue Count */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Overdue Count</h3>
            <span className="icon-mask text-error" style={{ WebkitMaskImage: 'url(/icons/warning.svg)', maskImage: 'url(/icons/warning.svg)' , width: '20px', height: '20px'}}></span>
          </div>
          <div className="font-display-lg text-display-lg text-error">7</div>
          <div className="mt-2 text-error font-label-md text-label-md">Requires immediate action</div>
        </div>
      </div>

      {/* Payments Table Section */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
        {/* Table Controls */}
        <div className="p-6 border-b border-outline-variant flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#FCFAFA]">
          <div className="relative w-full sm:w-96">
            <span className="icon-mask absolute left-3 top-1/2 transform -translate-y-1/2 text-on-surface-variant" style={{ WebkitMaskImage: 'url(/icons/search.svg)', maskImage: 'url(/icons/search.svg)' , width: '20px', height: '20px'}}></span>
            <input
              className="w-full bg-[#F9F8F7] border border-outline-variant rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body-md text-body-md text-on-surface"
              placeholder="Search payments, clients, or projects..."
              type="text"
            />
          </div>
          <div className="flex space-x-3 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none border border-outline bg-transparent text-on-surface font-label-md text-label-md py-2 px-4 rounded-lg hover:bg-surface-container-low transition-colors flex items-center justify-center space-x-2">
              <span className="icon-mask text-sm" style={{ WebkitMaskImage: 'url(/icons/filter_list.svg)', maskImage: 'url(/icons/filter_list.svg)' , width: '14px', height: '14px'}}></span>
              <span>Filter</span>
            </button>
            <button className="flex-1 sm:flex-none border border-outline bg-transparent text-on-surface font-label-md text-label-md py-2 px-4 rounded-lg hover:bg-surface-container-low transition-colors flex items-center justify-center space-x-2">
              <span className="icon-mask text-sm" style={{ WebkitMaskImage: 'url(/icons/download.svg)', maskImage: 'url(/icons/download.svg)' , width: '14px', height: '14px'}}></span>
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#F0EEED] bg-[#FCFAFA]">
                <th className="p-4 font-label-md text-label-md text-on-surface-variant font-medium">Customer Name</th>
                <th className="p-4 font-label-md text-label-md text-on-surface-variant font-medium">Project Name</th>
                <th className="p-4 font-label-md text-label-md text-on-surface-variant font-medium">Amount</th>
                <th className="p-4 font-label-md text-label-md text-on-surface-variant font-medium">Date</th>
                <th className="p-4 font-label-md text-label-md text-on-surface-variant font-medium">Method</th>
                <th className="p-4 font-label-md text-label-md text-on-surface-variant font-medium">Status</th>
                <th className="p-4 font-label-md text-label-md text-on-surface-variant font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="font-body-md text-body-md">
              {/* Row 1 */}
              <tr className="border-b border-[#F0EEED] hover:bg-surface-container-low transition-colors">
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <img className="w-10 h-10 rounded-full object-cover border border-outline-variant" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXUMHSMzPTk-v6sc0WJdVOmPIxmXWjTx1RljnBiUZLjnKsc5mAjM7r8F1sxvQBGBdTZ3tQdKNoBrf7np86cj7YKTaYj-wHjNchmH9Ke3UHUs0P1HxzAVJJpG4tcHN7F04lR2mb5ayTmzRT2bPePPMyoI_I2unUjj2DU67VI5EARscAhg1g9jjECG3s2Z19iypttjYquNu6wg25XnnfjMuCq58Cvw5KbwsEAPDAjxVcRtkiH8t1XQ" alt="Sarah Jenkins" />
                    <span className="font-medium text-on-surface">Sarah Jenkins</span>
                  </div>
                </td>
                <td className="p-4"><span className="bg-surface-container px-3 py-1 rounded-full text-sm font-medium border border-outline-variant">Vista Heights Reno</span></td>
                <td className="p-4 font-medium text-on-surface">$45,000.00</td>
                <td className="p-4 text-on-surface-variant">Oct 24, 2024</td>
                <td className="p-4 text-on-surface-variant">Bank Transfer</td>
                <td className="p-4">
                  <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium flex items-center w-max">
                    <span className="icon-mask text-xs mr-1" style={{ WebkitMaskImage: 'url(/icons/check_circle.svg)', maskImage: 'url(/icons/check_circle.svg)' , width: '12px', height: '12px'}}></span> Completed
                  </span>
                </td>
                <td className="p-4 text-right"><button className="text-on-surface-variant hover:text-primary transition-colors"><span className="icon-mask" style={{ WebkitMaskImage: 'url(/icons/more_vert.svg)', maskImage: 'url(/icons/more_vert.svg)' , width: '20px', height: '20px'}}></span></button></td>
              </tr>

              {/* Row 2 */}
              <tr className="border-b border-[#F0EEED] hover:bg-surface-container-low transition-colors">
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center border border-outline-variant text-primary font-medium">MR</div>
                    <span className="font-medium text-on-surface">Marcus Reed</span>
                  </div>
                </td>
                <td className="p-4"><span className="bg-surface-container px-3 py-1 rounded-full text-sm font-medium border border-outline-variant">Lakeside Commercial</span></td>
                <td className="p-4 font-medium text-on-surface">$120,500.00</td>
                <td className="p-4 text-on-surface-variant">Oct 22, 2024</td>
                <td className="p-4 text-on-surface-variant">Credit Card</td>
                <td className="p-4">
                  <span className="bg-secondary-fixed text-on-secondary-fixed px-3 py-1 rounded-full text-sm font-medium flex items-center w-max">
                    <span className="icon-mask text-xs mr-1" style={{ WebkitMaskImage: 'url(/icons/sync.svg)', maskImage: 'url(/icons/sync.svg)' , width: '12px', height: '12px'}}></span> Processing
                  </span>
                </td>
                <td className="p-4 text-right"><button className="text-on-surface-variant hover:text-primary transition-colors"><span className="icon-mask" style={{ WebkitMaskImage: 'url(/icons/more_vert.svg)', maskImage: 'url(/icons/more_vert.svg)' , width: '20px', height: '20px'}}></span></button></td>
              </tr>

              {/* Row 3 */}
              <tr className="border-b border-[#F0EEED] hover:bg-surface-container-low transition-colors">
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <img className="w-10 h-10 rounded-full object-cover border border-outline-variant" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBr04i7SUfW1JqXUzxe8t1FtiABZiYjxG940Pj6PV77OPX_ktLqURd-412Xz4qLTXF12rjoOH9tANewNYA6NmYKlZQnfqNfeAls-wdbcRwVBQRM1x_wKUUoLH646joWphl4_4fzIhew69C-KAELJ3z7rw6O1420DKRSPKweDKPXCv5IN3pYdvpXMI_GmkY9GWrWdDqPBeFv755ODOZQbpxTfmIdSA6GzufS43bNvRRbM2QcnVOSuQ" alt="David Chen" />
                    <span className="font-medium text-on-surface">David Chen</span>
                  </div>
                </td>
                <td className="p-4"><span className="bg-surface-container px-3 py-1 rounded-full text-sm font-medium border border-outline-variant">Urban Loft Build</span></td>
                <td className="p-4 font-medium text-on-surface">$18,200.00</td>
                <td className="p-4 text-error font-medium">Oct 15, 2024</td>
                <td className="p-4 text-on-surface-variant">Wire</td>
                <td className="p-4">
                  <span className="bg-error-container text-on-error-container px-3 py-1 rounded-full text-sm font-medium flex items-center w-max">
                    <span className="icon-mask text-xs mr-1" style={{ WebkitMaskImage: 'url(/icons/error.svg)', maskImage: 'url(/icons/error.svg)' , width: '12px', height: '12px'}}></span> Overdue
                  </span>
                </td>
                <td className="p-4 text-right"><button className="text-on-surface-variant hover:text-primary transition-colors"><span className="icon-mask" style={{ WebkitMaskImage: 'url(/icons/more_vert.svg)', maskImage: 'url(/icons/more_vert.svg)' , width: '20px', height: '20px'}}></span></button></td>
              </tr>

              {/* Row 4 */}
              <tr className="hover:bg-surface-container-low transition-colors">
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center border border-outline-variant text-primary font-medium">EP</div>
                    <span className="font-medium text-on-surface">Elena Patel</span>
                  </div>
                </td>
                <td className="p-4"><span className="bg-surface-container px-3 py-1 rounded-full text-sm font-medium border border-outline-variant">Summit Pavilion</span></td>
                <td className="p-4 font-medium text-on-surface">$85,000.00</td>
                <td className="p-4 text-on-surface-variant">Oct 10, 2024</td>
                <td className="p-4 text-on-surface-variant">Bank Transfer</td>
                <td className="p-4">
                  <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium flex items-center w-max">
                    <span className="icon-mask text-xs mr-1" style={{ WebkitMaskImage: 'url(/icons/check_circle.svg)', maskImage: 'url(/icons/check_circle.svg)' , width: '12px', height: '12px'}}></span> Completed
                  </span>
                </td>
                <td className="p-4 text-right"><button className="text-on-surface-variant hover:text-primary transition-colors"><span className="icon-mask" style={{ WebkitMaskImage: 'url(/icons/more_vert.svg)', maskImage: 'url(/icons/more_vert.svg)' , width: '20px', height: '20px'}}></span></button></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-outline-variant flex items-center justify-between bg-[#FCFAFA]">
          <span className="text-on-surface-variant font-caption text-caption">Showing 1 to 4 of 24 entries</span>
          <div className="flex space-x-2">
            <button className="p-2 rounded hover:bg-surface-container-low text-on-surface-variant transition-colors disabled:opacity-50" disabled>
              <span className="icon-mask text-sm" style={{ WebkitMaskImage: 'url(/icons/chevron_left.svg)', maskImage: 'url(/icons/chevron_left.svg)' , width: '14px', height: '14px'}}></span>
            </button>
            <button className="p-2 rounded hover:bg-surface-container-low text-primary transition-colors">
              <span className="icon-mask text-sm" style={{ WebkitMaskImage: 'url(/icons/chevron_right.svg)', maskImage: 'url(/icons/chevron_right.svg)' , width: '14px', height: '14px'}}></span>
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminPayments;
