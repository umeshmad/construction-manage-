import React, { useState, useEffect } from 'react';
import ClientLayout from '../components/ClientLayout';

const ClientPortalMessages = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchMessages = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/auth/messages', {
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to load messages');
      setMessages(data.messages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    try {
      const res = await fetch('http://localhost:3000/api/auth/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ content: inputValue }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send');
      setInputValue('');
      fetchMessages();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <ClientLayout title="Messages">
      <div className="flex-grow bg-surface-container-lowest border border-[#E5E0DD] rounded-xl flex overflow-hidden shadow-sm min-h-[500px]" style={{ height: 'calc(100vh - 160px)' }}>
        {/* Left Column: Conversation List */}
        <div className="w-full md:w-1/3 lg:w-[35%] border-r border-[#E5E0DD] flex flex-col bg-[#FCFAFA]">
          <div className="p-6 border-b border-[#E5E0DD] flex justify-between items-center bg-surface-container-lowest">
            <h2 className="font-headline-md text-headline-md text-on-surface">Conversations</h2>
            <button className="w-8 h-8 rounded-full border border-[#E5E0DD] flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-colors">
              <span className="icon-mask text-sm" style={{ WebkitMaskImage: 'url(/icons/edit_square.svg)', maskImage: 'url(/icons/edit_square.svg)' , width: '14px', height: '14px'}}></span>
            </button>
          </div>
          <div className="p-4 border-b border-[#E5E0DD]">
            <div className="relative">
              <span className="icon-mask absolute left-3 top-1/2 transform -translate-y-1/2 text-on-surface-variant text-sm" style={{ WebkitMaskImage: 'url(/icons/search.svg)', maskImage: 'url(/icons/search.svg)' , width: '14px', height: '14px'}}></span>
              <input
                className="w-full pl-10 pr-4 py-2 bg-[#F9F8F7] border border-[#E5E0DD] rounded-lg focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-shadow font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/60"
                placeholder="Search messages..." type="text"
              />
            </div>
          </div>
          <div className="flex-grow overflow-y-auto p-2">
            <div className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer relative bg-surface-container-low border-primary/20`}>
              <div className="w-12 h-12 rounded-full bg-surface-variant flex items-center justify-center text-primary flex-shrink-0 border border-[#E5E0DD]">
                <span className="icon-mask" style={{ WebkitMaskImage: 'url(/icons/support_agent.svg)', maskImage: 'url(/icons/support_agent.svg)' }}></span>
              </div>
              <div className="flex-grow min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-body-md text-body-md font-medium text-on-surface truncate">ArchTech Pro Team</h3>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant truncate text-sm">Your project messages</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Chat Thread */}
        <div className="hidden md:flex flex-col flex-grow bg-surface-container-lowest">
          <div className="px-8 py-5 border-b border-[#E5E0DD] flex justify-between items-center bg-surface-container-lowest">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-surface-variant flex items-center justify-center text-primary border border-[#E5E0DD]">
                <span className="icon-mask" style={{ WebkitMaskImage: 'url(/icons/support_agent.svg)', maskImage: 'url(/icons/support_agent.svg)' }}></span>
              </div>
              <div>
                <h2 className="font-headline-md text-headline-md text-on-surface text-lg">ArchTech Pro Team</h2>
                <p className="font-body-md text-body-md text-on-surface-variant text-sm flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] inline-block" />
                  Project Support
                </p>
              </div>
            </div>
          </div>

          <div className="flex-grow overflow-y-auto p-8 bg-[#FCFAFA] flex flex-col gap-6">
            <div className="flex justify-center my-4">
              <span className="font-caption text-caption text-on-surface-variant bg-surface-container-lowest border border-[#E5E0DD] px-4 py-1 rounded-full shadow-sm text-[11px] uppercase tracking-wide">
                Messages
              </span>
            </div>

            {loading && <div className="text-center text-on-surface-variant">Loading messages...</div>}
            {error && <div className="text-center text-red-500 text-sm">{error}</div>}

            {messages.map((m) => {
              const isCustomer = m.sent_by === 'customer';
              return (
                <div key={m.Id} className={`flex items-end gap-3 max-w-[80%] ${isCustomer ? 'self-end' : ''}`}>
                  {!isCustomer && (
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-[#E5E0DD] mb-6 bg-surface-variant flex items-center justify-center text-primary">
                      <span className="icon-mask text-sm" style={{ WebkitMaskImage: 'url(/icons/support_agent.svg)', maskImage: 'url(/icons/support_agent.svg)', width: '14px', height: '14px' }}></span>
                    </div>
                  )}
                  <div className={`flex flex-col gap-1 ${isCustomer ? 'items-end' : ''}`}>
                    <div className={`p-4 rounded-2xl border ${isCustomer ? 'bg-primary/10 border-primary/20 rounded-br-sm' : 'bg-surface-container-lowest border-[#E5E0DD] rounded-bl-sm shadow-sm'}`}>
                      <p className="font-body-md text-body-md text-on-surface">{m.content}</p>
                    </div>
                    <span className="font-caption text-caption text-on-surface-variant text-[11px] px-1">
                      {m.staff_name && !isCustomer ? m.staff_name + ' • ' : ''}
                      {new Date(m.sent_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-6 border-t border-[#E5E0DD] bg-surface-container-lowest">
            <div className="flex items-center gap-3 bg-[#F9F8F7] border border-[#E5E0DD] rounded-full p-2 pr-2 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-shadow">
              <input
                className="flex-grow bg-transparent border-none focus:ring-0 font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/60 py-2 px-1 focus:outline-none"
                placeholder="Type your message..."
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
              />
              <button
                onClick={handleSend}
                className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center hover:bg-surface-tint transition-colors cursor-pointer active:scale-95 shadow-sm flex-shrink-0"
              >
                <span className="icon-mask text-[20px]" style={{ WebkitMaskImage: 'url(/icons/send.svg)', maskImage: 'url(/icons/send.svg)' , width: '20px', height: '20px'}}></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
};

export default ClientPortalMessages;
