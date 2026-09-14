import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ClientLayout from '../components/ClientLayout';

const ClientPortalAppointments = () => {
  const navigate = useNavigate();
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [pastAppointments, setPastAppointments] = useState([]);
  const [showPastAll, setShowPastAll] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [rescheduleTarget, setRescheduleTarget] = useState(null);
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleTime, setRescheduleTime] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:3000/api/auth/appointments', {
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to load appointments');
      
      setUpcomingAppointments(data.upcoming || []);
      setPastAppointments(data.past || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleCancel = async (id) => {
    try {
      const res = await fetch('http://localhost:3000/api/auth/appointments', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ id, status: 'cancelled' }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to cancel appointment');
      }
      fetchAppointments();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleRequest = async (e) => {
    e.preventDefault();
    if (!newTitle || !newDate || !newTime) return;
    
    try {
      const res = await fetch('http://localhost:3000/api/auth/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          type: newTitle,
          appointmentDate: newDate,
          appointmentTime: newTime
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to request appointment');
      }
      
      setShowModal(false);
      setNewTitle('');
      setNewDate('');
      setNewTime('');
      fetchAppointments();
    } catch (err) {
      alert(err.message);
    }
  };

  // Reschedule = update the appointment date/time via PATCH
  const handleReschedule = async (e) => {
    e.preventDefault();
    if (!rescheduleDate || !rescheduleTime) return;
    try {
      const res = await fetch('http://localhost:3000/api/auth/appointments', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ id: rescheduleTarget.Id, appointment_date: rescheduleDate, appointment_time: rescheduleTime }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to reschedule');
      }
      setShowRescheduleModal(false);
      setRescheduleTarget(null);
      fetchAppointments();
    } catch (err) {
      alert(err.message);
    }
  };

  const getStatusStyle = (status) => {
    const s = status ? status.toLowerCase() : '';
    if (s === 'confirmed') return 'bg-[#e6f4ea] text-[#137333] border-[#ceead6]';
    if (s === 'requested') return 'bg-[#fef7e0] text-[#b06000] border-[#fce8b2]';
    return 'bg-surface-variant text-on-surface-variant border-outline-variant';
  };

  const formatMonth = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { month: 'short' });
  };

  const formatDay = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.getDate();
  };
  
  const formatFullDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' });
  }

  return (
    <ClientLayout title="Appointments" subtitle="Schedule site visits and meetings with our team.">
      <div className="flex flex-col md:flex-row md:items-end justify-end gap-6 mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="bg-primary-container text-on-secondary font-label-md text-label-md px-6 py-3 rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity whitespace-nowrap shadow-sm h-12 w-fit"
        >
          <span className="icon-mask text-[20px]" style={{ WebkitMaskImage: 'url(/icons/add.svg)', maskImage: 'url(/icons/add.svg)' , width: '20px', height: '20px'}}></span>
          Request Appointment
        </button>
      </div>

      {error && <div className="p-3 mb-6 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">{error}</div>}
      {loading && <div className="text-center py-12 text-on-surface-variant">Loading appointments...</div>}

      {!loading && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Upcoming Appointments */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-outline-variant/50 pb-2">
              <h2 className="font-headline-md text-headline-md text-on-surface">Upcoming Appointments</h2>
            </div>
            {upcomingAppointments.map(a => (
              <div key={a.Id} className="bg-surface-container-lowest rounded-xl border border-outline-variant/60 p-6 flex flex-col sm:flex-row gap-6 hover:shadow-md transition-all duration-300" style={{ boxShadow: '0px 4px 20px rgba(44,62,80,0.04)' }}>
                <div className="flex-shrink-0 w-20 h-20 bg-primary-fixed rounded-lg flex flex-col items-center justify-center border border-primary-fixed-dim/30">
                  <span className="font-label-md text-label-md text-on-primary-fixed uppercase tracking-widest">{formatMonth(a.appointment_date)}</span>
                  <span className="font-headline-md text-headline-md font-bold text-on-primary-fixed leading-none">{formatDay(a.appointment_date)}</span>
                </div>
                <div className="flex-grow flex flex-col gap-2 justify-center">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="font-body-lg text-body-lg font-semibold text-on-surface">{a.type}</h3>
                    <span className={`px-2.5 py-1 font-caption text-caption rounded-full flex items-center gap-1 border capitalize ${getStatusStyle(a.status)}`}>
                      <span className="icon-mask text-[14px]" style={{ WebkitMaskImage: `url(/icons/${a.status === 'confirmed' ? 'check_circle' : 'pending'}.svg)`, maskImage: `url(/icons/${a.status === 'confirmed' ? 'check_circle' : 'pending'}.svg)` }}></span> {a.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-on-surface-variant font-body-md text-body-md">
                    <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[18px]">schedule</span> {a.appointment_time}</span>
                    <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[18px]">location_on</span> {a.project_name || 'Office / Online'}</span>
                  </div>
                </div>
                <div className="flex sm:flex-col items-center justify-center gap-3 sm:border-l sm:border-outline-variant/40 sm:pl-6 mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-outline-variant/40">
                  <button onClick={() => { setRescheduleTarget(a); setRescheduleDate(a.appointment_date ? a.appointment_date.split('T')[0] : ''); setRescheduleTime(a.appointment_time || ''); setShowRescheduleModal(true); }} className="px-4 py-2 border border-on-surface text-on-surface rounded-lg font-label-md text-label-md hover:bg-surface-container-low transition-colors w-full whitespace-nowrap">Reschedule</button>
                  <button onClick={() => handleCancel(a.Id)} className="text-on-surface-variant font-label-md text-label-md hover:text-error transition-colors px-2">Cancel</button>
                </div>
              </div>
            ))}
            {upcomingAppointments.length === 0 && (
              <div className="text-center text-on-surface-variant py-12 bg-surface-container-lowest border border-outline-variant/60 rounded-xl">No upcoming appointments scheduled.</div>
            )}
          </div>

          {/* Past Appointments Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-6 mt-10 lg:mt-0">
            <div className="flex items-center justify-between border-b border-outline-variant/50 pb-2">
              <h2 className="font-body-lg text-body-lg font-medium text-on-surface-variant">Past Appointments</h2>
              <button onClick={() => setShowPastAll(v => !v)} className="text-primary font-label-md text-label-md hover:underline">{showPastAll ? 'Show Less' : 'View All'}</button>
            </div>
            <div className="flex flex-col gap-3">
              {(showPastAll ? pastAppointments : pastAppointments.slice(0, 3)).map(a => (
                <div key={a.Id} className="bg-surface-container-lowest/60 rounded-lg border border-outline-variant/40 p-4 flex gap-4 opacity-80 hover:opacity-100 transition-opacity">
                  <div className="flex-shrink-0 w-14 h-14 bg-surface-container rounded flex flex-col items-center justify-center">
                    <span className="font-caption text-caption text-on-surface-variant uppercase">{formatMonth(a.appointment_date)}</span>
                    <span className="font-body-lg text-body-lg font-bold text-on-surface-variant leading-none">{formatDay(a.appointment_date)}</span>
                  </div>
                  <div className="flex flex-col justify-center gap-1">
                    <h4 className="font-label-md text-label-md font-semibold text-on-surface">{a.type}</h4>
                    <div className="flex items-center gap-2">
                      <span className="font-caption text-caption text-on-surface-variant flex items-center gap-1 capitalize"><span className="material-symbols-outlined text-[14px]">done_all</span> {a.status}</span>
                    </div>
                  </div>
                </div>
              ))}
              {pastAppointments.length === 0 && (
                <div className="text-center text-on-surface-variant text-sm py-4">No past appointments.</div>
              )}
            </div>

            <div className="mt-4 p-6 bg-surface-container-low rounded-xl border border-outline-variant/30 text-center">
              <span className="icon-mask text-4xl text-tertiary-container mb-2" style={{ WebkitMaskImage: 'url(/icons/support_agent.svg)', maskImage: 'url(/icons/support_agent.svg)' , width: '36px', height: '36px'}}></span>
              <h4 className="font-label-md text-label-md text-on-surface mb-1">Need immediate assistance?</h4>
              <p className="font-caption text-caption text-on-surface-variant mb-4">Contact your dedicated project manager directly.</p>
              <button onClick={() => navigate('/client/messages')} className="text-primary font-label-md text-label-md underline hover:opacity-80">Message Manager</button>
            </div>
          </div>
        </div>
      )}

      {/* Appointment Request Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-md w-full border border-outline-variant shadow-2xl flex flex-col gap-6">
            <h3 className="font-headline-md text-xl font-bold text-on-surface">Request Appointment</h3>
            <form onSubmit={handleRequest} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-on-surface-variant">Meeting / Visit Title</label>
                <input required className="border border-outline-variant rounded-lg p-2.5 focus:outline-none" value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="e.g. Design Review Meeting" type="text" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-on-surface-variant">Date</label>
                <input required className="border border-outline-variant rounded-lg p-2.5 focus:outline-none" value={newDate} onChange={e => setNewDate(e.target.value)} type="date" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-on-surface-variant">Time range</label>
                <input required className="border border-outline-variant rounded-lg p-2.5 focus:outline-none" value={newTime} onChange={e => setNewTime(e.target.value)} placeholder="e.g. 10:00 AM - 11:30 AM" type="text" />
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-lg hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-primary text-on-primary rounded-lg hover:bg-surface-tint">Submit Request</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {showRescheduleModal && rescheduleTarget && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-md w-full border border-outline-variant shadow-2xl flex flex-col gap-6">
            <h3 className="font-headline-md text-xl font-bold text-on-surface">Reschedule Appointment</h3>
            <p className="text-on-surface-variant text-sm">Current: <strong>{rescheduleTarget.type}</strong> on {rescheduleTarget.appointment_date ? rescheduleTarget.appointment_date.split('T')[0] : ''}</p>
            <form onSubmit={handleReschedule} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-on-surface-variant">New Date</label>
                <input required className="border border-outline-variant rounded-lg p-2.5 focus:outline-none focus:border-primary" value={rescheduleDate} onChange={e => setRescheduleDate(e.target.value)} type="date" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-on-surface-variant">New Time</label>
                <input required className="border border-outline-variant rounded-lg p-2.5 focus:outline-none focus:border-primary" value={rescheduleTime} onChange={e => setRescheduleTime(e.target.value)} type="time" />
              </div>
              <div className="flex justify-end gap-3 mt-2">
                <button type="button" onClick={() => setShowRescheduleModal(false)} className="px-4 py-2 border rounded-lg hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-primary text-on-primary rounded-lg hover:bg-surface-tint">Confirm</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </ClientLayout>
  );
};

export default ClientPortalAppointments;
