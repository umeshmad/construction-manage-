import React, { useState, useEffect } from 'react';
import ClientLayout from '../components/ClientLayout';

const ClientPortalMyProjects = () => {
  const [stats, setStats] = useState({ active: 0, completed: 0, pending: 0 });
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedProject, setSelectedProject] = useState(null); // for View Details modal

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/auth/projects', {
          credentials: 'include',
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to load projects');
        setStats(data.stats);
        setProjects(data.projects);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const statusStyle = (status) => {
    if (status === 'Active') return 'bg-tertiary-fixed text-on-tertiary-fixed-variant border-[#bcc9ca]';
    if (status === 'On Hold') return 'border-secondary text-secondary';
    if (status === 'Completed') return 'bg-surface-container text-on-surface-variant border-outline-variant';
    return 'bg-secondary-fixed text-on-secondary-fixed-variant border-[#fed65b]';
  };

  const progressColor = (status) => {
    if (status === 'On Hold') return 'bg-secondary opacity-50';
    return 'bg-primary-container';
  };

  const statCards = [
    { title: 'Active Projects', value: stats.active, subtitle: 'Currently running', isPrimary: true },
    { title: 'Completed Projects', value: stats.completed, subtitle: 'Total history', isPrimary: false },
    { title: 'Pending Requests', value: stats.pending, subtitle: 'Awaiting review', isSecondary: true },
  ];

  return (
    <>
    <ClientLayout title="My Projects" subtitle="Track your construction projects">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        {statCards.map(stat => (
          <div key={stat.title} className="bg-surface-container-lowest border border-[#E5E0DD] rounded-xl p-6 shadow-sm flex flex-col justify-between" style={{ boxShadow: '0px 4px 20px rgba(44,62,80,0.04)' }}>
            <div className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-2">{stat.title}</div>
            <div className="flex items-end gap-3">
              <div className="font-display-lg text-display-lg text-on-surface">{stat.value}</div>
              <div className={`font-caption text-caption pb-2 flex items-center gap-1 ${stat.isPrimary ? 'text-primary' : stat.isSecondary ? 'text-secondary' : 'text-on-surface-variant'}`}>
                {stat.isPrimary && <span className="icon-mask text-sm" style={{ WebkitMaskImage: 'url(/icons/arrow_upward.svg)', maskImage: 'url(/icons/arrow_upward.svg)' , width: '14px', height: '14px'}}></span>}
                {stat.subtitle}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Error */}
      {error && <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">{error}</div>}

      {/* Loading */}
      {loading && <div className="text-center py-12 text-on-surface-variant">Loading projects...</div>}

      {/* Project Cards List */}
      {!loading && (
        <div className="flex flex-col gap-6 mt-4">
          {projects.length === 0 && !error && (
            <div className="text-center py-12 text-on-surface-variant bg-surface-container-lowest border border-[#E5E0DD] rounded-xl">No projects found.</div>
          )}
          {projects.map(proj => (
            <div key={proj.id || proj.requestId} className="bg-surface-container-lowest border border-[#E5E0DD] rounded-xl p-6 shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center hover:shadow-md transition-shadow">
              <div className="flex-1 flex flex-col gap-4 w-full">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <h3 className="font-headline-md text-headline-md text-on-surface">{proj.title}</h3>
                    <div className="flex items-center gap-2 mt-1 text-on-surface-variant font-caption text-caption">
                      <span className="icon-mask text-sm" style={{ WebkitMaskImage: 'url(/icons/calendar_month.svg)', maskImage: 'url(/icons/calendar_month.svg)' , width: '14px', height: '14px'}}></span>
                      <span>Start: {proj.startDate || 'TBD'} | Est. Completion: {proj.estCompletion || 'TBD'}</span>
                    </div>
                    {proj.location && (
                      <div className="flex items-center gap-2 mt-1 text-on-surface-variant font-caption text-caption">
                        <span className="icon-mask text-sm" style={{ WebkitMaskImage: 'url(/icons/location_on.svg)', maskImage: 'url(/icons/location_on.svg)' , width: '14px', height: '14px'}}></span>
                        <span>{proj.location}</span>
                      </div>
                    )}
                  </div>
                  <span className={`px-3 py-1 rounded-full font-caption text-caption font-medium border ${statusStyle(proj.status)}`}>{proj.status}</span>
                </div>
                <div>
                  <div className="flex justify-between font-caption text-caption mb-1">
                    <span className="text-on-surface-variant">Overall Progress</span>
                    <span className="text-on-surface font-medium">{proj.progress}%</span>
                  </div>
                  <div className="h-2 w-full bg-[#F9F8F7] border border-[#E5E0DD] rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${progressColor(proj.status)}`} style={{ width: `${proj.progress}%` }} />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4 md:items-end w-full md:w-auto mt-4 md:mt-0 flex-shrink-0 md:pl-6 md:border-l border-[#E5E0DD]">
                <div className="flex flex-col md:items-end">
                  <span className="font-caption text-caption text-on-surface-variant mb-1">Assigned Team</span>
                  <div className="flex items-center -space-x-2">
                    {proj.team && proj.team.slice(0, 4).map((member, i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-surface-container border-2 border-surface-container-lowest flex items-center justify-center">
                        <span className="font-caption text-caption text-on-surface font-bold text-[10px]">{member.name.charAt(0)}</span>
                      </div>
                    ))}
                    {(!proj.team || proj.team.length === 0) && (
                      <div className="w-8 h-8 rounded-full bg-surface-container border-2 border-surface-container-lowest flex items-center justify-center">
                        <span className="icon-mask text-sm text-on-surface-variant" style={{ WebkitMaskImage: 'url(/icons/person_outline.svg)', maskImage: 'url(/icons/person_outline.svg)' , width: '14px', height: '14px'}}></span>
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(proj)}
                  className="w-full md:w-auto px-6 py-2 border border-on-surface text-on-surface rounded-lg font-label-md text-label-md hover:bg-surface-container-low transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </ClientLayout>

    {selectedProject && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4" onClick={() => setSelectedProject(null)}>
        <div className="bg-white rounded-xl p-8 max-w-lg w-full border border-outline-variant shadow-2xl flex flex-col gap-6 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
          {/* Header */}
          <div className="flex justify-between items-start border-b border-[#E5E0DD] pb-4">
            <div>
              <h3 className="font-headline-md text-xl font-bold text-on-surface">{selectedProject.title}</h3>
              {selectedProject.location && <p className="text-on-surface-variant text-sm mt-1">{selectedProject.location}</p>}
            </div>
            <button onClick={() => setSelectedProject(null)} className="text-on-surface-variant hover:text-error p-1">
              <span className="icon-mask" style={{ WebkitMaskImage: 'url(/icons/close.svg)', maskImage: 'url(/icons/close.svg)', width:'20px', height:'20px' }}></span>
            </button>
          </div>

          {/* Status & Progress */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-on-surface-variant">Status</span>
              <span className={`px-3 py-1 rounded-full font-caption font-medium border ${statusStyle(selectedProject.status)}`}>{selectedProject.status}</span>
            </div>
            <div>
              <div className="flex justify-between font-caption text-caption mb-2">
                <span className="text-on-surface-variant">Overall Progress</span>
                <span className="font-medium text-on-surface">{selectedProject.progress}%</span>
              </div>
              <div className="h-3 w-full bg-[#F9F8F7] border border-[#E5E0DD] rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${progressColor(selectedProject.status)}`} style={{ width: `${selectedProject.progress}%` }} />
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4 bg-[#F9F8F7] rounded-xl p-4 border border-[#E5E0DD]">
            <div>
              <p className="font-caption text-on-surface-variant mb-1">Start Date</p>
              <p className="font-label-md text-on-surface">{selectedProject.startDate ? new Date(selectedProject.startDate).toLocaleDateString('en-US', { year:'numeric', month:'short', day:'2-digit' }) : 'TBD'}</p>
            </div>
            <div>
              <p className="font-caption text-on-surface-variant mb-1">Est. Completion</p>
              <p className="font-label-md text-on-surface">{selectedProject.estCompletion ? new Date(selectedProject.estCompletion).toLocaleDateString('en-US', { year:'numeric', month:'short', day:'2-digit' }) : 'TBD'}</p>
            </div>
          </div>

          {/* Assigned Team */}
          {selectedProject.team && selectedProject.team.length > 0 && (
            <div>
              <p className="font-label-md text-on-surface-variant mb-3">Assigned Team</p>
              <div className="flex flex-col gap-2">
                {selectedProject.team.map((m, i) => (
                  <div key={i} className="flex items-center gap-3 bg-[#F9F8F7] rounded-lg p-3 border border-[#E5E0DD]">
                    <div className="w-8 h-8 rounded-full bg-primary-container text-primary flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {m.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-label-md text-on-surface">{m.name}</p>
                      <p className="font-caption text-on-surface-variant capitalize">{m.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button onClick={() => setSelectedProject(null)} className="w-full py-3 bg-primary text-on-primary rounded-lg font-label-md hover:bg-[#b55a00] transition-colors">
            Close
          </button>
        </div>
      </div>
    )}
    </>
  );
};

export default ClientPortalMyProjects;
