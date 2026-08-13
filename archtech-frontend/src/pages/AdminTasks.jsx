import React from 'react';
import AdminLayout from '../components/AdminLayout';

const AdminTasks = () => {
  return (
    <AdminLayout title="Tasks" subtitle="Track work assignments across active projects.">
      {/* Filters & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <select className="appearance-none bg-surface border border-outline-variant rounded-lg px-4 py-2 pr-10 font-label-md text-label-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:ring-opacity-50 cursor-pointer">
              <option>All Projects</option>
              <option>Skyline Plaza</option>
              <option>The Apex Villa</option>
            </select>
            <span className="icon-mask absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant" style={{ WebkitMaskImage: 'url(/icons/arrow_drop_down.svg)', maskImage: 'url(/icons/arrow_drop_down.svg)' , width: '20px', height: '20px'}}></span>
          </div>
          <div className="relative">
            <select className="appearance-none bg-surface border border-outline-variant rounded-lg px-4 py-2 pr-10 font-label-md text-label-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:ring-opacity-50 cursor-pointer">
              <option>All Statuses</option>
              <option>To Do</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
            <span className="icon-mask absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant" style={{ WebkitMaskImage: 'url(/icons/arrow_drop_down.svg)', maskImage: 'url(/icons/arrow_drop_down.svg)' , width: '20px', height: '20px'}}></span>
          </div>
        </div>
        <button className="bg-primary text-on-primary font-label-md text-label-md px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-[#b55a00] transition-colors shadow-sm">
          <span className="icon-mask text-[20px]" style={{ WebkitMaskImage: 'url(/icons/add.svg)', maskImage: 'url(/icons/add.svg)' , width: '20px', height: '20px'}}></span>
          New Task
        </button>
      </div>

      {/* Kanban Board */}
      <div className="overflow-x-auto pb-4">
        <div className="flex flex-col md:flex-row gap-6 min-w-max">
          {/* To Do Column */}
          <div className="w-full md:w-80 flex flex-col gap-4">
            <div className="flex items-center gap-3 px-2">
              <span className="w-3 h-3 rounded-full bg-tertiary"></span>
              <h2 className="font-headline-md text-headline-md text-[18px] font-bold">To Do</h2>
              <span className="bg-surface-variant text-on-surface-variant font-caption text-caption px-2 py-1 rounded-full ml-auto">5</span>
            </div>
            <div className="flex flex-col gap-4">
              {/* Task Card 1 */}
              <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant hover:shadow-md transition-shadow cursor-grab">
                <div className="flex justify-between items-start mb-3">
                  <span className="bg-surface-container px-2 py-1 rounded text-on-surface-variant font-caption text-caption inline-block">Skyline Plaza</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-error" title="High Priority"></span>
                </div>
                <h3 className="font-label-md text-label-md font-bold text-on-surface mb-4">Foundation Inspection</h3>
                <div className="flex items-center justify-between border-t border-[#F0EEED] pt-4 mt-2">
                  <div className="flex items-center gap-2">
                    <img className="w-6 h-6 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6lZPJQMpmcHq2uW0dweDjGAyOOPKu_F_x7CuqUXHKiAoRC7HjCHdEKLTAq8SUhvw-CwXVgIMksEVWwomAb19IUxrWS0UqbhSnA5Ux9FFP9-VmxCw-_06mqC_CZUGoD56SIcE7BOItnjpEdsDZxP5oRl31lcPjbfzpetuqhfina6aSGvGFPIKIRYbvKGFQT06PkbLQRUj3QU-byFR_MHenPiesbK_ZqzJvrTccr9UVf-6Hb79rLQ" alt="Marcus Vance" />
                    <span className="font-caption text-caption text-on-surface-variant">Marcus Vance</span>
                  </div>
                  <div className="flex items-center gap-1 text-on-surface-variant">
                    <span className="icon-mask text-[16px]" style={{ WebkitMaskImage: 'url(/icons/calendar_today.svg)', maskImage: 'url(/icons/calendar_today.svg)' , width: '16px', height: '16px'}}></span>
                    <span className="font-caption text-caption">Oct 24</span>
                  </div>
                </div>
              </div>
              {/* Add Task Placeholder */}
              <button className="w-full border border-dashed border-outline-variant rounded-xl p-4 text-on-surface-variant hover:text-primary hover:border-primary transition-colors flex items-center justify-center gap-2 font-label-md text-label-md">
                <span className="icon-mask" style={{ WebkitMaskImage: 'url(/icons/add.svg)', maskImage: 'url(/icons/add.svg)' , width: '20px', height: '20px'}}></span> Add Task
              </button>
            </div>
          </div>

          {/* In Progress Column */}
          <div className="w-full md:w-80 flex flex-col gap-4">
            <div className="flex items-center gap-3 px-2">
              <span className="w-3 h-3 rounded-full bg-secondary-container"></span>
              <h2 className="font-headline-md text-headline-md text-[18px] font-bold">In Progress</h2>
              <span className="bg-surface-variant text-on-surface-variant font-caption text-caption px-2 py-1 rounded-full ml-auto">3</span>
            </div>
            <div className="flex flex-col gap-4">
              {/* Task Card 2 */}
              <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant hover:shadow-md transition-shadow cursor-grab">
                <div className="flex justify-between items-start mb-3">
                  <span className="bg-surface-container px-2 py-1 rounded text-on-surface-variant font-caption text-caption inline-block">The Apex Villa</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary-container" title="Medium Priority"></span>
                </div>
                <h3 className="font-label-md text-label-md font-bold text-on-surface mb-4">Blueprint Revisions</h3>
                <div className="flex items-center justify-between border-t border-[#F0EEED] pt-4 mt-2">
                  <div className="flex items-center gap-2">
                    <img className="w-6 h-6 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBv4m4XsuQG_EdsIhO9KLEnu1RIO2jyH90TtSSlUm4l4DceZ1T6f8gLdEISL6LzH05N8Uw2k8dYWC8r9_hztoHQRYnCUm6F0vbF8UklSI00raNf4-xiSi_qq7U2PJqsV5K5NWZBL4-raX4vfTI4S-M7QvWLzrPFn4Je_SpB-Nf_Vse4Ly1BCfzAoLGfWFrP8MxoBclCUjrHWGaxL0sHotb6gAD4xP-7ZJbpwun0Icb6QEWwX-QkNQ" alt="Jane Doe" />
                    <span className="font-caption text-caption text-on-surface-variant">Jane Doe</span>
                  </div>
                  <div className="flex items-center gap-1 text-on-surface-variant">
                    <span className="icon-mask text-[16px]" style={{ WebkitMaskImage: 'url(/icons/calendar_today.svg)', maskImage: 'url(/icons/calendar_today.svg)' , width: '16px', height: '16px'}}></span>
                    <span className="font-caption text-caption">Oct 26</span>
                  </div>
                </div>
              </div>
              <button className="w-full border border-dashed border-outline-variant rounded-xl p-4 text-on-surface-variant hover:text-primary hover:border-primary transition-colors flex items-center justify-center gap-2 font-label-md text-label-md">
                <span className="icon-mask" style={{ WebkitMaskImage: 'url(/icons/add.svg)', maskImage: 'url(/icons/add.svg)' , width: '20px', height: '20px'}}></span> Add Task
              </button>
            </div>
          </div>

          {/* Completed Column */}
          <div className="w-full md:w-80 flex flex-col gap-4">
            <div className="flex items-center gap-3 px-2">
              <span className="w-3 h-3 rounded-full bg-[#8f9c9d]"></span>
              <h2 className="font-headline-md text-headline-md text-[18px] font-bold text-on-surface-variant">Completed</h2>
              <span className="bg-surface-variant text-on-surface-variant font-caption text-caption px-2 py-1 rounded-full ml-auto">12</span>
            </div>
            <div className="flex flex-col gap-4 opacity-75">
              {/* Task Card 3 */}
              <div className="bg-[#F9F8F7] rounded-xl p-6 border border-outline-variant cursor-default">
                <div className="flex justify-between items-start mb-3">
                  <span className="bg-surface-container px-2 py-1 rounded text-on-surface-variant font-caption text-caption inline-block line-through">Site Clearing</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#8f9c9d]" title="Completed"></span>
                </div>
                <h3 className="font-label-md text-label-md font-bold text-on-surface mb-4 line-through">Site Clearing</h3>
                <div className="flex items-center justify-between border-t border-[#F0EEED] pt-4 mt-2">
                  <div className="flex items-center gap-2">
                    <img className="w-6 h-6 rounded-full object-cover grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDG-Dkc7GB1pCfmNMMmpdtLu_O0USOVabP6HRJywB9kZS4_qF-MAMTp8pApgDoLLAKH4_oH-GjUXkzcGxhz-6a4CjMcOxKHpF3l8b6-tgKqoCm_J1G800vTlm0z9wzQEMjkAy3-Os4xvBlfgnJSSHCxgNFu4lVlL88TWCnNi_WgZ5Ln9rtzU9Dr7f_Vu0_tBYb1aS3PgZNpUoBeawkzDNRaETR6Te5JXaWTQ6zfHG2xtlSDWRCA_Q" alt="Sarah Jenkins" />
                    <span className="font-caption text-caption text-on-surface-variant">Sarah Jenkins</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#8f9c9d]">
                    <span className="icon-mask text-[16px]" style={{ WebkitMaskImage: 'url(/icons/check_circle.svg)', maskImage: 'url(/icons/check_circle.svg)' , width: '16px', height: '16px'}}></span>
                    <span className="font-caption text-caption">Oct 20</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminTasks;
