import React, { useState } from 'react';
import ClientLayout from '../components/ClientLayout';

const conversations = [
  { id: 1, name: 'Marcus Vance', title: 'Project Manager — Skyline Plaza', msg: 'The revised floorplans have been uploaded...', time: '10:42 AM', unread: true, active: true, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhG5xQX0-RzD6jFiKfh_gbuUeI3GIERl6ArCaAMXTV5FnF81Y5xasEu3wii-B9qoUCkAzKrkxJ05U6-zgkz72Xuk3nW662bQOdqdgRYQepo14ygEIP9cuD_pRiB0eK8VNaBsKztBx2gJByDohXD21cRwkJ66E_86dIqjFy2EF2HbNlELIZ2rXvClf2ao5gjkEGklZT3y7c0W_Zbr-Hu9XQFxWqx-VbQ52lYBtx3pRN2nbAJxgl_w' },
  { id: 2, name: 'ArchTech Support', title: 'Customer Support', msg: 'Your billing inquiry has been resolved.', time: 'Yesterday', unread: false, active: false, icon: 'support_agent' },
  { id: 3, name: 'Elena Rodriguez', title: 'Interior Designer', msg: "Let's discuss the limestone finishes next week.", time: 'Monday', unread: false, active: false, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1i4ZxgCcKARiXSGQsPtM-1kaeWbx7SmKgNqIsP9leq9mqGcuzy9StL2iKiodNNtYzZtlkzwikG_h_I7LWrWW6pOly33FEepqzPK3ip9WOD2nZzw0CSOroIDgMbwA0veOjp-d9UHxl9SwoRsRIkWzrCyIyj1vA2EidjBkLMXLY7a9w76qqkd-UqY9gJVyOHYDn17tsvumRY2MVcCzwvN79Aq6dm2LDS9-OOfe0d20F6SJJKxdpBg' }
];

const initialMessages = [
  { id: 1, sender: 'Marcus Vance', text: 'Good morning! I wanted to let you know that the structural permits for Phase 2 were officially approved this morning. We are on schedule to begin foundation work next Tuesday.', time: '09:15 AM', type: 'text', isSystem: false },
  { id: 2, sender: 'System', text: 'Phase 2 Permits Approved', type: 'system', isSystem: true },
  { id: 3, sender: 'Client', text: 'That\'s excellent news, Marcus. Thank you for the prompt update. Will the noisy work affect the adjacent occupied units during standard hours?', time: '10:05 AM', type: 'text', isSystem: false },
  { id: 4, sender: 'Marcus Vance', text: 'We\'ve scheduled the heavy drilling strictly between 10 AM and 2 PM to minimize disruption. I\'ve also uploaded the revised floorplans with the updated HVAC routing for your review.', time: '10:42 AM', type: 'text', isSystem: false }
];

const ClientPortalMessages = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const newMsg = {
      id: messages.length + 1,
      sender: 'Client',
      text: inputValue,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text',
      isSystem: false
    };
    setMessages([...messages, newMsg]);
    setInputValue('');
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
          <div className="flex-grow overflow-y-auto p-2 space-y-1">
            {conversations.map(c => (
              <div key={c.id} className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer relative ${c.active ? 'bg-surface-container-low border-primary/20' : 'hover:bg-[#F9F8F7] border-transparent'}`}>
                {c.img ? (
                  <img alt={c.name} className="w-12 h-12 rounded-full object-cover border border-[#E5E0DD] flex-shrink-0" src={c.img} />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-surface-variant flex items-center justify-center text-primary flex-shrink-0 border border-[#E5E0DD]">
                    <span className="icon-mask" style={{ WebkitMaskImage: `url(/icons/${c.icon}.svg)`, maskImage: `url(/icons/${c.icon}.svg)` }}></span>
                  </div>
                )}
                <div className="flex-grow min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-body-md text-body-md font-medium text-on-surface truncate">{c.name}</h3>
                    <span className="font-caption text-caption text-on-surface-variant flex-shrink-0">{c.time}</span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant truncate text-sm">{c.msg}</p>
                </div>
                {c.unread && <div className="absolute top-4 right-3 w-2.5 h-2.5 bg-primary rounded-full" />}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Chat Thread */}
        <div className="hidden md:flex flex-col flex-grow bg-surface-container-lowest">
          <div className="px-8 py-5 border-b border-[#E5E0DD] flex justify-between items-center bg-surface-container-lowest">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-[#E5E0DD]">
                <img alt="Marcus Vance" className="w-full h-full object-cover" src={conversations[0].img} />
              </div>
              <div>
                <h2 className="font-headline-md text-headline-md text-on-surface text-lg">Marcus Vance</h2>
                <p className="font-body-md text-body-md text-on-surface-variant text-sm flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] inline-block" />
                  Project Manager — Skyline Plaza
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full hover:bg-surface-container transition-colors flex items-center justify-center text-on-surface-variant">
                <span className="icon-mask" style={{ WebkitMaskImage: 'url(/icons/call.svg)', maskImage: 'url(/icons/call.svg)' , width: '20px', height: '20px'}}></span>
              </button>
              <button className="w-10 h-10 rounded-full hover:bg-surface-container transition-colors flex items-center justify-center text-on-surface-variant">
                <span className="icon-mask" style={{ WebkitMaskImage: 'url(/icons/more_vert.svg)', maskImage: 'url(/icons/more_vert.svg)' , width: '20px', height: '20px'}}></span>
              </button>
            </div>
          </div>

          <div className="flex-grow overflow-y-auto p-8 bg-[#FCFAFA] flex flex-col gap-6">
            <div className="flex justify-center my-4">
              <span className="font-caption text-caption text-on-surface-variant bg-surface-container-lowest border border-[#E5E0DD] px-4 py-1 rounded-full shadow-sm text-[11px] uppercase tracking-wide">
                Today, October 24th
              </span>
            </div>

            {messages.map((m) => {
              if (m.isSystem) {
                return (
                  <div key={m.id} className="flex justify-center my-2">
                    <div className="group flex items-center gap-2 bg-white border border-[#E5E0DD] px-5 py-2 rounded-full shadow-sm hover:border-primary transition-colors cursor-pointer" style={{ boxShadow: '0px 4px 20px rgba(44,62,80,0.04)' }}>
                      <span className="icon-mask text-primary text-sm transition-transform group-hover:scale-110" style={{ WebkitMaskImage: 'url(/icons/article.svg)', maskImage: 'url(/icons/article.svg)' , width: '14px', height: '14px'}}></span>
                      <span className="font-body-md text-body-md text-on-surface text-sm">Project Update: <span className="font-medium">{m.text}</span></span>
                      <span className="icon-mask text-on-surface-variant text-sm ml-2 group-hover:text-primary transition-colors" style={{ WebkitMaskImage: 'url(/icons/arrow_forward.svg)', maskImage: 'url(/icons/arrow_forward.svg)' , width: '14px', height: '14px'}}></span>
                    </div>
                  </div>
                );
              }

              const isClient = m.sender === 'Client';
              return (
                <div key={m.id} className={`flex items-end gap-3 max-w-[80%] ${isClient ? 'self-end' : ''}`}>
                  {!isClient && (
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-[#E5E0DD] mb-6">
                      <img alt="Marcus Vance" className="w-full h-full object-cover" src={conversations[0].img} />
                    </div>
                  )}
                  <div className={`flex flex-col gap-1 ${isClient ? 'items-end' : ''}`}>
                    <div className={`p-4 rounded-2xl border ${isClient ? 'bg-primary/10 border-primary/20 rounded-br-sm' : 'bg-surface-container-lowest border-[#E5E0DD] rounded-bl-sm shadow-sm'}`}>
                      <p className="font-body-md text-body-md text-on-surface">{m.text}</p>
                    </div>
                    <span className="font-caption text-caption text-on-surface-variant text-[11px] px-1">{m.time}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-6 border-t border-[#E5E0DD] bg-surface-container-lowest">
            <div className="flex items-center gap-3 bg-[#F9F8F7] border border-[#E5E0DD] rounded-full p-2 pr-2 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-shadow">
              <button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-colors flex-shrink-0 ml-1">
                <span className="icon-mask" style={{ WebkitMaskImage: 'url(/icons/attach_file.svg)', maskImage: 'url(/icons/attach_file.svg)' , width: '20px', height: '20px'}}></span>
              </button>
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
                <span className="icon-mask text-[20px]" style={{ fontVariationSettings: "'FILL' 1" ,  WebkitMaskImage: 'url(/icons/send.svg)', maskImage: 'url(/icons/send.svg)' , width: '20px', height: '20px'}}></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
};

export default ClientPortalMessages;
