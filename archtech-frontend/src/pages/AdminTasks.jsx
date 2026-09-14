import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';

const AdminTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [projectFilter, setProjectFilter] = useState('All Projects');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [taskModal, setTaskModal] = useState({ isOpen: false });
  const [formData, setFormData] = useState({ title: '', project_name: '', priority: 'medium', due_date: '', status: 'to_do' });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/auth/admin/tasks', {
          credentials: 'include'
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to load tasks');
        setTasks(data.tasks || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const uniqueProjects = ['All Projects', ...new Set(tasks.map(t => t.project_name))];

  const openTaskModal = (defaultStatus = 'to_do') => {
    const proj = uniqueProjects.length > 1 ? uniqueProjects[1] : '';
    setFormData({ title: '', project_name: proj, priority: 'medium', due_date: '', status: defaultStatus });
    setTaskModal({ isOpen: true });
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      Id: Date.now(),
      title: formData.title,
      project_name: formData.project_name,
      priority: formData.priority,
      due_date: formData.due_date,
      status: formData.status,
      assigned_to: 'Unassigned'
    };
    setTasks([...tasks, newTask]);
    setTaskModal({ isOpen: false });
  };

  const filteredTasks = tasks.filter(t => {
    const matchProject = projectFilter === 'All Projects' || t.project_name === projectFilter;
    const dbStatusMap = {
      'To Do': 'to_do',
      'In Progress': 'in_progress',
      'Completed': 'completed'
    };
    const matchStatus = statusFilter === 'All Statuses' || t.status === dbStatusMap[statusFilter];
    return matchProject && matchStatus;
  });

  const todoTasks = filteredTasks.filter(t => t.status === 'to_do');
  const inProgressTasks = filteredTasks.filter(t => t.status === 'in_progress');
  const completedTasks = filteredTasks.filter(t => t.status === 'completed');

  const getPriorityColor = (priority) => {
    const p = priority ? priority.toLowerCase() : '';
    if (p === 'high') return 'bg-error';
    if (p === 'medium') return 'bg-secondary-container';
    return 'bg-tertiary';
  };

  const renderTaskCard = (t, isCompleted = false) => (
    <div key={t.Id} className={`${isCompleted ? 'bg-[#F9F8F7] opacity-75 cursor-default' : 'bg-surface-container-lowest hover:shadow-md cursor-grab'} rounded-xl p-6 border border-outline-variant transition-shadow`}>
      <div className="flex justify-between items-start mb-3">
        <span className={`bg-surface-container px-2 py-1 rounded text-on-surface-variant font-caption text-caption inline-block ${isCompleted ? 'line-through' : ''}`}>
          {t.project_name}
        </span>
        <span className={`w-2.5 h-2.5 rounded-full ${isCompleted ? 'bg-[#8f9c9d]' : getPriorityColor(t.priority)}`} title={t.priority}></span>
      </div>
      <h3 className={`font-label-md text-label-md font-bold text-on-surface mb-4 ${isCompleted ? 'line-through' : ''}`}>{t.title}</h3>
      <div className="flex items-center justify-between border-t border-[#F0EEED] pt-4 mt-2">
        <div className="flex items-center gap-2">
          {t.worker_name ? (
            <>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center bg-surface-variant text-[10px] font-bold ${isCompleted ? 'grayscale' : ''}`}>
                {t.worker_name.charAt(0)}
              </div>
              <span className="font-caption text-caption text-on-surface-variant">{t.worker_name}</span>
            </>
          ) : (
            <span className="font-caption text-caption text-on-surface-variant italic">Unassigned</span>
          )}
        </div>
        <div className={`flex items-center gap-1 ${isCompleted ? 'text-[#8f9c9d]' : 'text-on-surface-variant'}`}>
          <span className="icon-mask text-[16px]" style={{ WebkitMaskImage: `url(/icons/${isCompleted ? 'check_circle' : 'calendar_today'}.svg)`, maskImage: `url(/icons/${isCompleted ? 'check_circle' : 'calendar_today'}.svg)` , width: '16px', height: '16px'}}></span>
          <span className="font-caption text-caption">
            {t.due_date ? new Date(t.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'No Date'}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <AdminLayout title="Tasks" subtitle="Track work assignments across active projects.">
      {/* Filters & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <select 
              className="appearance-none bg-surface border border-outline-variant rounded-lg px-4 py-2 pr-10 font-label-md text-label-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:ring-opacity-50 cursor-pointer"
              value={projectFilter}
              onChange={(e) => setProjectFilter(e.target.value)}
            >
              {uniqueProjects.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <span className="icon-mask absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant" style={{ WebkitMaskImage: 'url(/icons/arrow_drop_down.svg)', maskImage: 'url(/icons/arrow_drop_down.svg)' , width: '20px', height: '20px'}}></span>
          </div>
          <div className="relative">
            <select 
              className="appearance-none bg-surface border border-outline-variant rounded-lg px-4 py-2 pr-10 font-label-md text-label-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:ring-opacity-50 cursor-pointer"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All Statuses">All Statuses</option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <span className="icon-mask absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant" style={{ WebkitMaskImage: 'url(/icons/arrow_drop_down.svg)', maskImage: 'url(/icons/arrow_drop_down.svg)' , width: '20px', height: '20px'}}></span>
          </div>
        </div>
        <button onClick={() => openTaskModal('to_do')} className="bg-primary text-on-primary font-label-md text-label-md px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-[#b55a00] transition-colors shadow-sm">
          <span className="icon-mask text-[20px]" style={{ WebkitMaskImage: 'url(/icons/add.svg)', maskImage: 'url(/icons/add.svg)' , width: '20px', height: '20px'}}></span>
          New Task
        </button>
      </div>

      {error && <div className="p-4 mb-6 bg-red-50 text-red-700 rounded-lg">{error}</div>}
      
      {loading ? (
        <div className="text-center py-12 text-on-surface-variant">Loading tasks...</div>
      ) : (
        <div className="overflow-x-auto pb-4">
          <div className="flex flex-col md:flex-row gap-6 min-w-max">
            
            {/* To Do Column */}
            <div className="w-full md:w-80 flex flex-col gap-4">
              <div className="flex items-center gap-3 px-2">
                <span className="w-3 h-3 rounded-full bg-tertiary"></span>
                <h2 className="font-headline-md text-headline-md text-[18px] font-bold">To Do</h2>
                <span className="bg-surface-variant text-on-surface-variant font-caption text-caption px-2 py-1 rounded-full ml-auto">{todoTasks.length}</span>
              </div>
              <div className="flex flex-col gap-4">
                {todoTasks.map(t => renderTaskCard(t))}
                <button onClick={() => openTaskModal('to_do')} className="w-full border border-dashed border-outline-variant rounded-xl p-4 text-on-surface-variant hover:text-primary hover:border-primary transition-colors flex items-center justify-center gap-2 font-label-md text-label-md">
                  <span className="icon-mask" style={{ WebkitMaskImage: 'url(/icons/add.svg)', maskImage: 'url(/icons/add.svg)' , width: '20px', height: '20px'}}></span> Add Task
                </button>
              </div>
            </div>

            {/* In Progress Column */}
            <div className="w-full md:w-80 flex flex-col gap-4">
              <div className="flex items-center gap-3 px-2">
                <span className="w-3 h-3 rounded-full bg-secondary-container"></span>
                <h2 className="font-headline-md text-headline-md text-[18px] font-bold">In Progress</h2>
                <span className="bg-surface-variant text-on-surface-variant font-caption text-caption px-2 py-1 rounded-full ml-auto">{inProgressTasks.length}</span>
              </div>
              <div className="flex flex-col gap-4">
                {inProgressTasks.map(t => renderTaskCard(t))}
                <button onClick={() => openTaskModal('in_progress')} className="w-full border border-dashed border-outline-variant rounded-xl p-4 text-on-surface-variant hover:text-primary hover:border-primary transition-colors flex items-center justify-center gap-2 font-label-md text-label-md">
                  <span className="icon-mask" style={{ WebkitMaskImage: 'url(/icons/add.svg)', maskImage: 'url(/icons/add.svg)' , width: '20px', height: '20px'}}></span> Add Task
                </button>
              </div>
            </div>

            {/* Completed Column */}
            <div className="w-full md:w-80 flex flex-col gap-4">
              <div className="flex items-center gap-3 px-2">
                <span className="w-3 h-3 rounded-full bg-[#8f9c9d]"></span>
                <h2 className="font-headline-md text-headline-md text-[18px] font-bold text-on-surface-variant">Completed</h2>
                <span className="bg-surface-variant text-on-surface-variant font-caption text-caption px-2 py-1 rounded-full ml-auto">{completedTasks.length}</span>
              </div>
              <div className="flex flex-col gap-4">
                {completedTasks.map(t => renderTaskCard(t, true))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* New Task Modal */}
      {taskModal.isOpen && (
        <div className="fixed inset-0 bg-[#1A1C18]/50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface-container-lowest rounded-2xl w-full max-w-md overflow-hidden shadow-lg border border-[#E5E0DD]">
            <div className="p-6 border-b border-[#F0EEED] flex justify-between items-center bg-[#F9F8F7]">
              <h3 className="font-headline-md text-[20px] font-bold text-on-surface">Create New Task</h3>
              <button onClick={() => setTaskModal({ isOpen: false })} className="text-on-surface-variant hover:text-error transition-colors">
                <span className="icon-mask" style={{ WebkitMaskImage: 'url(/icons/close.svg)', maskImage: 'url(/icons/close.svg)' , width: '24px', height: '24px'}}></span>
              </button>
            </div>
            <div className="p-6">
              <form onSubmit={handleTaskSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-1">Task Title</label>
                  <input required type="text" className="w-full border border-outline-variant rounded-lg px-3 py-2 focus:border-primary focus:ring-1 focus:ring-primary outline-none" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g., Install framing" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-1">Project</label>
                  <select required className="w-full border border-outline-variant rounded-lg px-3 py-2 focus:border-primary focus:ring-1 focus:ring-primary outline-none" value={formData.project_name} onChange={e => setFormData({...formData, project_name: e.target.value})}>
                    {uniqueProjects.filter(p => p !== 'All Projects').map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-on-surface mb-1">Status</label>
                    <select className="w-full border border-outline-variant rounded-lg px-3 py-2 focus:border-primary focus:ring-1 focus:ring-primary outline-none" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                      <option value="to_do">To Do</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-on-surface mb-1">Priority</label>
                    <select className="w-full border border-outline-variant rounded-lg px-3 py-2 focus:border-primary focus:ring-1 focus:ring-primary outline-none" value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value})}>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-1">Due Date</label>
                  <input required type="date" className="w-full border border-outline-variant rounded-lg px-3 py-2 focus:border-primary focus:ring-1 focus:ring-primary outline-none" value={formData.due_date} onChange={e => setFormData({...formData, due_date: e.target.value})} />
                </div>
                <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-[#F0EEED]">
                  <button type="button" onClick={() => setTaskModal({ isOpen: false })} className="px-4 py-2 rounded-lg text-on-surface-variant font-medium hover:bg-surface-variant transition-colors">Cancel</button>
                  <button type="submit" className="px-4 py-2 rounded-lg bg-primary text-on-primary font-medium hover:bg-[#b55a00] transition-colors">Create Task</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminTasks;
