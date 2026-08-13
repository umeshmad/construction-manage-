import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';

const AdminWorkers = () => {
  return (
    <AdminLayout title="Workers" subtitle="Manage your project teams and field personnel.">
      {/* Top Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <span className="icon-mask absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" style={{ WebkitMaskImage: 'url(/icons/search.svg)', maskImage: 'url(/icons/search.svg)' , width: '20px', height: '20px'}}></span>
            <input
              className="w-full pl-10 pr-4 py-2 bg-[#F9F8F7] border border-outline-variant rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md transition-all"
              placeholder="Search workers..."
              type="text"
            />
          </div>
          <select className="w-full sm:w-auto bg-[#F9F8F7] border border-outline-variant rounded-lg px-4 py-2 font-body-md text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none cursor-pointer">
            <option value="">Filter by Role</option>
            <option value="architect">Architect</option>
            <option value="pm">Project Manager</option>
            <option value="site_supervisor">Site Supervisor</option>
            <option value="field_worker">Field Worker</option>
          </select>
        </div>
        <button className="w-full sm:w-auto bg-primary text-on-primary px-6 py-2 rounded-lg font-label-md text-label-md hover:bg-[#b55a00] transition-colors flex items-center justify-center gap-2 whitespace-nowrap">
          <span className="icon-mask text-sm" style={{ WebkitMaskImage: 'url(/icons/add.svg)', maskImage: 'url(/icons/add.svg)' , width: '14px', height: '14px'}}></span> Add Worker
        </button>
      </div>

      {/* Workers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter">
        {/* Card 1 */}
        <div className="bg-white rounded-xl border border-[#E5E0DD] p-6 hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center">
          <div className="relative mb-4">
            <img className="w-20 h-20 rounded-full object-cover border-2 border-surface-container-low" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEdneepB9OYeEopc1bOT2O_KSpRFEbYhf7kALTY6tbRq6re0jJFjKPB1BwICaDmTHmdivxYXTUxfG5T-wYwrK1DuL4xGeT4DznwZ7mTeNVXAnPcCbZ7pvUJfNRzRCfsPBDSisrHPlO7UybkLakCCIhJzQ2e-AKbkwZv1jSnQ0SaXC30j8Gq5iXt4lxDVMfvGNFmXSGsVD7pd4Z_d1xjXs4v9CTaQydH8KrGotDw4ALUcbB1XDMbA" alt="David Chen" />
            <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-green-500 border-2 border-white" title="Available"></div>
          </div>
          <h3 className="font-headline-md text-[18px] font-bold text-on-surface mb-1">David Chen</h3>
          <p className="font-body-md text-[14px] text-tertiary mb-4">Senior Architect</p>
          <div className="w-full border-t border-[#F0EEED] my-4"></div>
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <span className="px-3 py-1 bg-surface-container-low text-on-surface-variant rounded-full font-caption text-caption">Skyline Plaza</span>
            <span className="px-3 py-1 bg-surface-container-low text-on-surface-variant rounded-full font-caption text-caption">The Apex Villa</span>
          </div>
          <Link className="mt-auto text-primary font-label-md text-label-md hover:text-surface-tint transition-colors flex items-center gap-1" to="#">
            View Profile <span className="icon-mask text-sm" style={{ WebkitMaskImage: 'url(/icons/arrow_forward.svg)', maskImage: 'url(/icons/arrow_forward.svg)' , width: '14px', height: '14px'}}></span>
          </Link>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-xl border border-[#E5E0DD] p-6 hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center">
          <div className="relative mb-4">
            <img className="w-20 h-20 rounded-full object-cover border-2 border-surface-container-low" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBq802glgckrwyjfVtYeV3R2Zs4SCVMz-dtaxNOI2J7ePEkmphCePxET_yV74DIh_2utwBEJYm4gcP8WuGVli1Bz894zh3bfHJGnQdfEriOKE3FtHMij0wX0MndQMSFAe7B1l8L0oLuDB19BAM9uGpCf-V3vz8ZJtHxXTyyrNmligQWeFhlQdVORCytejUycIjQQeKeP6m06YG7Uf7jOzDiYeVTwRCaJDEnwoQ0Sr60coAnmBID7g" alt="Sarah Jenkins" />
            <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-amber-500 border-2 border-white" title="On Site"></div>
          </div>
          <h3 className="font-headline-md text-[18px] font-bold text-on-surface mb-1">Sarah Jenkins</h3>
          <p className="font-body-md text-[14px] text-tertiary mb-4">Project Manager</p>
          <div className="w-full border-t border-[#F0EEED] my-4"></div>
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <span className="px-3 py-1 bg-surface-container-low text-on-surface-variant rounded-full font-caption text-caption">Harbor Heights</span>
          </div>
          <Link className="mt-auto text-primary font-label-md text-label-md hover:text-surface-tint transition-colors flex items-center gap-1" to="#">
            View Profile <span className="icon-mask text-sm" style={{ WebkitMaskImage: 'url(/icons/arrow_forward.svg)', maskImage: 'url(/icons/arrow_forward.svg)' , width: '14px', height: '14px'}}></span>
          </Link>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-xl border border-[#E5E0DD] p-6 hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center">
          <div className="relative mb-4">
            <img className="w-20 h-20 rounded-full object-cover border-2 border-surface-container-low" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsEpnNug9wKIbG45Gs7a2bTDiiLd-NUA8-JIBI25Ixy-bCefgpeqdiqSw9HNutGm0VwrUj_bCvbf01SVfAlvGxPASGk0udhvgYmJ-sE9HKx1xhcg3SSbqOlabi1J8UgGddGVDLl6-dWc6kMr-i6t_XuRNw7rcy62Q4YwerU2MJJwsYlyKxsKaYajNx294rAWUandAKmLv3mOYWAoWn2Hw1jZALnjUgB9XDxK3VKKxfBFbCr9wKFw" alt="Marcus Thorne" />
            <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-amber-500 border-2 border-white" title="On Site"></div>
          </div>
          <h3 className="font-headline-md text-[18px] font-bold text-on-surface mb-1">Marcus Thorne</h3>
          <p className="font-body-md text-[14px] text-tertiary mb-4">Site Supervisor</p>
          <div className="w-full border-t border-[#F0EEED] my-4"></div>
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <span className="px-3 py-1 bg-surface-container-low text-on-surface-variant rounded-full font-caption text-caption">Skyline Plaza</span>
            <span className="px-3 py-1 bg-surface-container-low text-on-surface-variant rounded-full font-caption text-caption">Metro Hub</span>
          </div>
          <Link className="mt-auto text-primary font-label-md text-label-md hover:text-surface-tint transition-colors flex items-center gap-1" to="#">
            View Profile <span className="icon-mask text-sm" style={{ WebkitMaskImage: 'url(/icons/arrow_forward.svg)', maskImage: 'url(/icons/arrow_forward.svg)' , width: '14px', height: '14px'}}></span>
          </Link>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-xl border border-[#E5E0DD] p-6 hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center">
          <div className="relative mb-4">
            <img className="w-20 h-20 rounded-full object-cover border-2 border-surface-container-low" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjM8sYP3sBl7cfCvkjG7fL4ig01KFO0YB5ynl_Ox-1w13HdxbidzWIClXaJ7GAruVj5WAZZC19SOQmkMIAnq_qLzBzbOqZJKvQMdRk95SB6LUFKc1QTumQFLuURfwW96nTcwOMvVZMsybjS31mOoJNlenCbVcXkpa4gUY7AtYPovlqQpJxDuTo2uv3Htnb9ttjhQ75xx6THu67YSZWjPsR4BQicBX1O2VuJ4FOOE9sM1Rr3eF-aQ" alt="Elena Rostova" />
            <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-green-500 border-2 border-white" title="Available"></div>
          </div>
          <h3 className="font-headline-md text-[18px] font-bold text-on-surface mb-1">Elena Rostova</h3>
          <p className="font-body-md text-[14px] text-tertiary mb-4">Field Engineer</p>
          <div className="w-full border-t border-[#F0EEED] my-4"></div>
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <span className="px-3 py-1 bg-surface-container-low text-on-surface-variant rounded-full font-caption text-caption">The Apex Villa</span>
          </div>
          <Link className="mt-auto text-primary font-label-md text-label-md hover:text-surface-tint transition-colors flex items-center gap-1" to="#">
            View Profile <span className="icon-mask text-sm" style={{ WebkitMaskImage: 'url(/icons/arrow_forward.svg)', maskImage: 'url(/icons/arrow_forward.svg)' , width: '14px', height: '14px'}}></span>
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminWorkers;
