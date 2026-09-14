import React, { useState } from 'react';
import ClientLayout from '../components/ClientLayout';

const ClientPortalRequestAProject = () => {
  const [serviceType, setServiceType] = useState('residential');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [startDate, setStartDate] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([
    { name: 'Site_Map.pdf', size: '2.4MB', type: 'description' },
    { name: 'Reference_Image.jpg', size: '1.1MB', type: 'image' }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false); // controls the popup modal

  const handleRemoveFile = (index) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  // Handle files selected from browser window
  const handleFilesSelected = (selectedFiles) => {
    const newFiles = Array.from(selectedFiles).map(f => ({
      name: f.name,
      size: f.size > 1024 * 1024
        ? (f.size / (1024 * 1024)).toFixed(1) + 'MB'
        : (f.size / 1024).toFixed(0) + 'KB',
      type: f.name.toLowerCase().endsWith('.pdf') ? 'description' : 'image'
    }));
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  // Open file browser and handle selection
  const openFilePicker = () => {
    const el = document.createElement('input');
    el.type = 'file';
    el.multiple = true;
    el.accept = '.pdf,.jpg,.jpeg,.png,.dwg';
    el.onchange = (e) => handleFilesSelected(e.target.files);
    el.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !location || !description) {
      setError('Please fill out all required fields.');
      return;
    }
    
    setError('');
    setLoading(true);
    setSuccess(false);

    try {
      const res = await fetch('http://localhost:3000/api/auth/project-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          category: serviceType,
          title,
          location,
          description,
          estimatedBudget: budget,
          preferredStartDate: startDate
        })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit request');
      
      setSuccess(true); // show the popup
      setTitle('');
      setLocation('');
      setDescription('');
      setBudget('');
      setStartDate('');
      setUploadedFiles([]);
      // Keep files mock logic as requested
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <ClientLayout title="Request a New Project" subtitle="Tell us about your construction needs and we'll get back to you within 48 hours.">
      <div className="glass-card rounded-xl p-6 md:p-8 soft-shadow flex flex-col gap-10 bg-white/95" style={{ border: '1px solid rgba(220,193,177,0.5)', boxShadow: '0px 4px 20px rgba(44,62,80,0.04)' }}>
        
        {/* Stepper */}
        <div className="flex items-center justify-between relative max-w-2xl mx-auto w-full mb-4">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-surface-container-high -z-10" />
          <div className="flex flex-col items-center gap-2 bg-white px-2">
            <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-md text-label-md shadow-sm">1</div>
            <span className="font-label-md text-label-md text-primary font-bold">Details</span>
          </div>
          <div className="flex flex-col items-center gap-2 bg-white px-2">
            <div className="w-8 h-8 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center font-label-md text-label-md border border-outline-variant">2</div>
            <span className="font-label-md text-label-md text-on-surface-variant">Upload</span>
          </div>
          <div className="flex flex-col items-center gap-2 bg-white px-2">
            <div className="w-8 h-8 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center font-label-md text-label-md border border-outline-variant">3</div>
            <span className="font-label-md text-label-md text-on-surface-variant">Review</span>
          </div>
        </div>

        {error && <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{error}</div>}

        {/* Section 1: Service Type */}
        <section className="flex flex-col gap-4">
          <h2 className="font-headline-md text-headline-md text-on-surface border-b border-outline-variant pb-2">Service Type</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
            {[
              { id: 'residential', label: 'Residential', icon: 'home' },
              { id: 'commercial', label: 'Commercial', icon: 'storefront' },
              { id: 'renovation', label: 'Renovation', icon: 'handyman' },
              { id: 'infrastructure', label: 'Infrastructure', icon: 'architecture' },
            ].map(type => (
              <label key={type.id} className="relative cursor-pointer group">
                <input
                  type="radio"
                  name="service_type"
                  value={type.id}
                  checked={serviceType === type.id}
                  onChange={() => setServiceType(type.id)}
                  className="peer sr-only"
                />
                <div className={`p-4 rounded-lg border flex flex-col items-center gap-3 transition-all duration-200 hover:shadow-sm ${
                  serviceType === type.id
                    ? 'border-primary bg-primary-fixed text-primary font-semibold'
                    : 'border-outline-variant bg-surface-container-lowest text-on-surface-variant hover:text-primary'
                }`}>
                  <span className="icon-mask text-3xl" style={{ WebkitMaskImage: `url(/icons/${type.icon}.svg)`, maskImage: `url(/icons/${type.icon}.svg)` }}></span>
                  <span className="font-label-md text-label-md text-center">{type.label}</span>
                </div>
              </label>
            ))}
          </div>
        </section>

        {/* Section 2: Project Details */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <section className="flex flex-col gap-6">
            <h2 className="font-headline-md text-headline-md text-on-surface border-b border-outline-variant pb-2">Project Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-label-md text-label-md text-on-surface" htmlFor="project_title">Project Title <span className="text-error">*</span></label>
                <input
                  required
                  className="w-full bg-[#F9F8F7] border border-outline-variant rounded-lg p-3 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  id="project_title"
                  placeholder="e.g. Smith Residence Extension"
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label-md text-label-md text-on-surface" htmlFor="project_location">Location <span className="text-error">*</span></label>
                <div className="relative">
                  <span className="icon-mask absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" style={{ WebkitMaskImage: 'url(/icons/location_on.svg)', maskImage: 'url(/icons/location_on.svg)' , width: '20px', height: '20px'}}></span>
                  <input
                    required
                    className="w-full bg-[#F9F8F7] border border-outline-variant rounded-lg py-3 pl-10 pr-3 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    id="project_location"
                    placeholder="City, State or Zip"
                    type="text"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-label-md text-label-md text-on-surface" htmlFor="project_description">Description <span className="text-error">*</span></label>
              <textarea
                required
                className="w-full bg-[#F9F8F7] border border-outline-variant rounded-lg p-3 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-y"
                id="project_description"
                placeholder="Describe your project goals, scope, and any specific requirements..."
                rows="4"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-label-md text-label-md text-on-surface" htmlFor="budget">Estimated Budget</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant font-body-md text-body-md">$</span>
                  <input
                    className="w-full bg-[#F9F8F7] border border-outline-variant rounded-lg py-3 pl-8 pr-3 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    id="budget"
                    placeholder="0.00"
                    type="number"
                    value={budget}
                    onChange={e => setBudget(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label-md text-label-md text-on-surface" htmlFor="start_date">Preferred Start Date</label>
                <div className="relative">
                  <input
                    className="w-full bg-[#F9F8F7] border border-outline-variant rounded-lg p-3 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    id="start_date"
                    type="date"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Upload Plans/Images */}
          <section className="flex flex-col gap-4">
            <h2 className="font-headline-md text-headline-md text-on-surface border-b border-outline-variant pb-2">Upload Plans &amp; Images</h2>
            <div 
              className="border-2 border-dashed border-outline-variant bg-[#F9F8F7] rounded-xl p-8 flex flex-col items-center justify-center gap-4 text-center cursor-pointer hover:bg-surface-container-low hover:border-outline transition-all duration-200 group"
              onClick={openFilePicker}
              onDragOver={e => e.preventDefault()}
              onDrop={e => { e.preventDefault(); handleFilesSelected(e.dataTransfer.files); }}
            >
              <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center group-hover:bg-primary-fixed transition-colors">
                <span className="icon-mask text-4xl text-on-surface-variant group-hover:text-primary" style={{ WebkitMaskImage: 'url(/icons/cloud_upload.svg)', maskImage: 'url(/icons/cloud_upload.svg)' , width: '36px', height: '36px'}}></span>
              </div>
              <div>
                <p className="font-label-md text-label-md text-on-surface font-semibold mb-1">Drag files here or click to browse</p>
                <p className="font-caption text-caption text-on-surface-variant">Support formats: PDF, JPG, PNG, DWG (Max 25MB)</p>
              </div>
            </div>

            {/* File Chips Preview */}
            <div className="flex flex-wrap gap-3 mt-2">
              {uploadedFiles.map((file, idx) => (
                <div key={file.name} className="flex items-center gap-2 bg-surface-container-high border border-outline-variant rounded-full py-1.5 pl-3 pr-2 shadow-sm">
                  <span className="icon-mask text-on-surface-variant text-[18px]" style={{ WebkitMaskImage: `url(/icons/${file.type}.svg)`, maskImage: `url(/icons/${file.type}.svg)` }}></span>
                  <span className="font-caption text-caption text-on-surface truncate max-w-[150px]">{file.name}</span>
                  <span className="font-caption text-caption text-on-surface-variant/70">- {file.size}</span>
                  <button type="button" onClick={() => handleRemoveFile(idx)} className="text-on-surface-variant hover:text-error transition-colors p-0.5 rounded-full hover:bg-error-container ml-1">
                    <span className="icon-mask text-[16px]" style={{ WebkitMaskImage: 'url(/icons/close.svg)', maskImage: 'url(/icons/close.svg)' , width: '16px', height: '16px'}}></span>
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Actions */}
          <div className="flex flex-col-reverse md:flex-row justify-end items-center gap-4 mt-4 pt-6 border-t border-outline-variant">
            <button className="w-full md:w-auto px-6 py-3 rounded-lg border border-outline text-on-surface font-label-md text-label-md font-semibold hover:bg-surface-container-low transition-colors duration-200" type="button">
              Save as Draft
            </button>
            <button disabled={loading} className="w-full md:w-auto px-8 py-3 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-semibold hover:bg-surface-tint shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50" type="submit">
              {loading ? 'Submitting...' : 'Submit Request'}
              <span className="icon-mask text-[18px]" style={{ WebkitMaskImage: 'url(/icons/arrow_forward.svg)', maskImage: 'url(/icons/arrow_forward.svg)' , width: '18px', height: '18px'}}></span>
            </button>
          </div>
        </form>
      </div>
    </ClientLayout>

    {success && (
      <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4">
        <div className="bg-white rounded-2xl p-10 max-w-md w-full shadow-2xl flex flex-col items-center gap-6 text-center border border-outline-variant">
          <div className="w-20 h-20 rounded-full bg-[#e6f4ea] flex items-center justify-center">
            <span className="text-[#137333] text-5xl">&#10003;</span>
          </div>
          <div>
            <h3 className="font-headline-md text-2xl font-bold text-on-surface mb-2">Request Submitted!</h3>
            <p className="text-on-surface-variant font-body-md">Your project request has been received. Our team will review it and get back to you within <strong>48 hours</strong>.</p>
          </div>
          <div className="w-full flex flex-col gap-3">
            <button
              onClick={() => setSuccess(false)}
              className="w-full py-3 bg-primary text-on-primary rounded-lg font-label-md font-semibold hover:bg-[#b55a00] transition-colors"
            >
              OK, Got It
            </button>
            <button
              onClick={() => { setSuccess(false); window.location.href = '/client/my-projects'; }}
              className="w-full py-3 border border-outline text-on-surface rounded-lg font-label-md hover:bg-surface-container-low transition-colors"
            >
              View My Projects
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default ClientPortalRequestAProject;
