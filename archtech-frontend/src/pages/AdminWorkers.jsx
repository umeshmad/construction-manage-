import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';

const AdminWorkers = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [workerModal, setWorkerModal] = useState({ isOpen: false, mode: 'add', worker: null });
  const [formData, setFormData] = useState({ name: '', role: '', contact_info: '', projects: [] });
  const [allProjects, setAllProjects] = useState([]);

  const openAddModal = () => {
    setFormData({ name: '', role: 'field_worker', contact_info: '', projects: [] });
    setWorkerModal({ isOpen: true, mode: 'add', worker: null });
  };

  const openEditModal = (worker) => {
    setFormData({ 
      name: worker.name, 
      role: worker.role, 
      contact_info: worker.contact_info,
      projects: worker.projects || []
    });
    setWorkerModal({ isOpen: true, mode: 'edit', worker });
    setSelectedProfile(null); // Close profile view if open
  };

  const handleWorkerSubmit = (e) => {
    e.preventDefault();
    const updatedProjects = formData.projects || [];
    
    if (workerModal.mode === 'add') {
      const newWorker = {
        Id: Date.now(),
        name: formData.name,
        role: formData.role,
        contact_info: formData.contact_info,
        hire_date: new Date().toISOString(),
        projects: updatedProjects
      };
      setWorkers([...workers, newWorker]);
    } else {
      const updatedWorker = { ...workerModal.worker, ...formData, projects: updatedProjects };
      setWorkers(workers.map(w => w.Id === workerModal.worker.Id ? updatedWorker : w));
      if (selectedProfile && selectedProfile.Id === workerModal.worker.Id) {
        setSelectedProfile(updatedWorker);
      }
    }
    setWorkerModal({ isOpen: false, mode: 'add', worker: null });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resWorkers, resProjects] = await Promise.all([
          fetch('http://localhost:3000/api/auth/admin/workers', { credentials: 'include' }),
          fetch('http://localhost:3000/api/auth/admin/projects', { credentials: 'include' })
        ]);
        
        const workersResult = await resWorkers.json();
        if (!resWorkers.ok) throw new Error(workersResult.error || 'Failed to load workers');
        
        const projectsResult = await resProjects.json();
        if (resProjects.ok && projectsResult.projects) {
          setAllProjects(projectsResult.projects);
        }

        setWorkers(workersResult.workers || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const uniqueRoles = [...new Set(workers.map(w => w.role))].filter(Boolean).sort();

  const filteredWorkers = workers.filter(w => {
    const matchesSearch = w.name.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === '' || w.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <>
    <AdminLayout title="Workers" subtitle="Manage your project teams and field personnel.">
      {/* Top Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <span className="icon-mask absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" style={{ WebkitMaskImage: 'url(/icons/search.svg)', maskImage: 'url(/icons/search.svg)' , width: '20px', height: '20px'}}></span>
            <input
              className="w-full pl-10 pr-4 py-2 bg-[#F9F8F7] border border-outline-variant rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md transition-all"
              placeholder="Search workers..."
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <select 
            className="w-full sm:w-auto bg-[#F9F8F7] border border-outline-variant rounded-lg px-4 py-2 font-body-md text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none cursor-pointer"
            value={roleFilter}
            onChange={e => setRoleFilter(e.target.value)}
          >
            <option value="">All Roles</option>
            {uniqueRoles.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
        <button onClick={openAddModal} className="w-full sm:w-auto bg-primary text-on-primary px-6 py-2 rounded-lg font-label-md text-label-md hover:bg-[#b55a00] transition-colors flex items-center justify-center gap-2 whitespace-nowrap">
          <span className="icon-mask text-sm" style={{ WebkitMaskImage: 'url(/icons/add.svg)', maskImage: 'url(/icons/add.svg)' , width: '14px', height: '14px'}}></span> Add Worker
        </button>
      </div>

      {error && <div className="p-4 mb-6 bg-red-50 text-red-700 rounded-lg">{error}</div>}
      
      {loading ? (
        <div className="text-center py-12 text-on-surface-variant">Loading workers...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter">
          {filteredWorkers.length === 0 && <div className="col-span-full text-center py-8 text-on-surface-variant">No workers found.</div>}
          {filteredWorkers.map(w => (
            <div key={w.Id} className="bg-white rounded-xl border border-[#E5E0DD] p-6 hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center">
              <div className="relative mb-4">
                <div className="w-20 h-20 rounded-full border-2 border-surface-container-low bg-surface-container flex items-center justify-center text-primary font-bold text-xl">
                  {w.name.charAt(0)}
                </div>
                <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${w.projects.length > 0 ? 'bg-amber-500' : 'bg-green-500'}`} title={w.projects.length > 0 ? 'On Site' : 'Available'}></div>
              </div>
              <h3 className="font-headline-md text-[18px] font-bold text-on-surface mb-1">{w.name}</h3>
              <p className="font-body-md text-[14px] text-tertiary mb-4 capitalize">{w.role.replace('_', ' ')}</p>
              <div className="w-full border-t border-[#F0EEED] my-4"></div>
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {w.projects.length === 0 && <span className="text-xs text-on-surface-variant italic">No active projects</span>}
                {w.projects.map((proj, idx) => (
                  <span key={idx} className="px-3 py-1 bg-surface-container-low text-on-surface-variant rounded-full font-caption text-caption">{proj}</span>
                ))}
              </div>
              <a onClick={(e) => { e.preventDefault(); setSelectedProfile(w); }} className="mt-auto text-primary font-label-md text-label-md hover:text-surface-tint transition-colors flex items-center gap-1 cursor-pointer" href="#">
                View Profile <span className="icon-mask text-sm" style={{ WebkitMaskImage: 'url(/icons/arrow_forward.svg)', maskImage: 'url(/icons/arrow_forward.svg)' , width: '14px', height: '14px'}}></span>
              </a>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>

    {/* Worker Profile Modal */}
    {selectedProfile && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4" onClick={() => setSelectedProfile(null)}>
        <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl flex flex-col gap-6 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
          <div className="flex justify-between items-start border-b border-[#E5E0DD] pb-4">
            <h3 className="font-headline-md text-xl font-bold text-on-surface">Worker Profile</h3>
            <button onClick={() => setSelectedProfile(null)} className="text-on-surface-variant hover:text-error p-1">
              <span className="icon-mask" style={{ WebkitMaskImage: 'url(/icons/close.svg)', maskImage: 'url(/icons/close.svg)', width:'20px', height:'20px' }}></span>
            </button>
          </div>
          
          <div className="flex flex-col items-center text-center gap-2">
            <div className="w-24 h-24 rounded-full bg-surface-container flex items-center justify-center text-primary font-bold text-3xl mb-2">
              {selectedProfile.name.charAt(0)}
            </div>
            <h2 className="font-headline-md text-2xl font-bold text-on-surface">{selectedProfile.name}</h2>
            <p className="font-label-md text-primary bg-primary-container px-3 py-1 rounded-full capitalize">{selectedProfile.role.replace('_', ' ')}</p>
          </div>

          <div className="flex flex-col gap-4 bg-[#F9F8F7] p-5 rounded-xl border border-[#E5E0DD]">
            <div>
              <p className="font-caption text-on-surface-variant mb-1 uppercase tracking-wider">Contact Info</p>
              <p className="font-body-md text-on-surface">{selectedProfile.contact_info}</p>
            </div>
            <div>
              <p className="font-caption text-on-surface-variant mb-1 uppercase tracking-wider">Hire Date</p>
              <p className="font-body-md text-on-surface">{new Date(selectedProfile.hire_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
            <div>
              <p className="font-caption text-on-surface-variant mb-1 uppercase tracking-wider">Active Projects</p>
              {selectedProfile.projects.length > 0 ? (
                <ul className="list-disc pl-5 font-body-md text-on-surface">
                  {selectedProfile.projects.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
              ) : (
                <p className="font-body-md text-on-surface-variant italic">Not currently assigned</p>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => openEditModal(selectedProfile)} className="flex-1 py-3 bg-surface border border-outline text-on-surface rounded-lg font-label-md hover:bg-surface-container transition-colors">Edit</button>
            <button onClick={() => setSelectedProfile(null)} className="flex-1 py-3 bg-primary text-on-primary rounded-lg font-label-md hover:bg-[#b55a00] transition-colors">Close</button>
          </div>
        </div>
      </div>
    )}

    {/* Worker Form Modal (Add/Edit) */}
    {workerModal.isOpen && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4" onClick={() => setWorkerModal({ isOpen: false })}>
        <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl flex flex-col gap-6" onClick={e => e.stopPropagation()}>
          <div className="flex justify-between items-start border-b border-[#E5E0DD] pb-4">
            <h3 className="font-headline-md text-xl font-bold text-on-surface">
              {workerModal.mode === 'add' ? 'Add New Worker' : 'Edit Worker'}
            </h3>
            <button onClick={() => setWorkerModal({ isOpen: false })} className="text-on-surface-variant hover:text-error p-1">
              <span className="icon-mask" style={{ WebkitMaskImage: 'url(/icons/close.svg)', maskImage: 'url(/icons/close.svg)', width:'20px', height:'20px' }}></span>
            </button>
          </div>
          
          <form onSubmit={handleWorkerSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-caption font-caption text-on-surface-variant mb-1">Full Name</label>
              <input type="text" required className="w-full border border-outline-variant rounded-lg px-4 py-2 focus:border-primary focus:outline-none" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Nimal Perera" />
            </div>
            <div>
              <label className="block text-caption font-caption text-on-surface-variant mb-1">Role</label>
              <select className="w-full border border-outline-variant rounded-lg px-4 py-2 focus:border-primary focus:outline-none" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                <option value="architect">Architect</option>
                <option value="pm">Project Manager</option>
                <option value="site_supervisor">Site Supervisor</option>
                <option value="field_worker">Field Worker</option>
              </select>
            </div>
            <div>
              <label className="block text-caption font-caption text-on-surface-variant mb-1">Contact Info (Email or Phone)</label>
              <input type="text" required className="w-full border border-outline-variant rounded-lg px-4 py-2 focus:border-primary focus:outline-none" value={formData.contact_info} onChange={e => setFormData({...formData, contact_info: e.target.value})} placeholder="e.g. nimal@archtechpro.com" />
            </div>
            
            {workerModal.mode === 'edit' && (
              <div>
                <label className="block text-caption font-caption text-on-surface-variant mb-1">Assigned Projects</label>
                <div className="w-full border border-outline-variant rounded-lg px-4 py-2 max-h-40 overflow-y-auto bg-[#F9F8F7] flex flex-col gap-2">
                  {allProjects.length === 0 && <span className="text-on-surface-variant text-sm">No projects available</span>}
                  {allProjects.map(proj => (
                    <label key={proj.Id} className="flex items-center gap-2 text-on-surface text-sm cursor-pointer">
                      <input 
                        type="checkbox"
                        className="accent-primary w-4 h-4"
                        checked={formData.projects.includes(proj.name)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({...formData, projects: [...formData.projects, proj.name]});
                          } else {
                            setFormData({...formData, projects: formData.projects.filter(p => p !== proj.name)});
                          }
                        }}
                      />
                      {proj.name}
                    </label>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex gap-3 mt-4">
              <button type="button" onClick={() => setWorkerModal({ isOpen: false })} className="flex-1 py-3 bg-surface border border-outline text-on-surface rounded-lg font-label-md hover:bg-surface-container transition-colors">Cancel</button>
              <button type="submit" className="flex-1 py-3 bg-primary text-on-primary rounded-lg font-label-md hover:bg-[#b55a00] transition-colors">
                {workerModal.mode === 'add' ? 'Add Worker' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
    </>
  );
};

export default AdminWorkers;
