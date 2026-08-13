import React, { useState } from 'react';
import ClientLayout from '../components/ClientLayout';

const paymentHistoryList = [
  { id: 1, date: 'Oct 28, 2023', project: 'The Apex Villa', method: 'Bank Transfer', amount: 140000, status: 'Paid', statusColor: 'bg-success-container text-on-success-container', indicatorColor: 'bg-success' },
  { id: 2, date: 'Sep 15, 2023', project: 'Lumina Arts Center', method: 'Credit Card ending in 4242', amount: 85000, status: 'Paid', statusColor: 'bg-success-container text-on-success-container', indicatorColor: 'bg-success' },
  { id: 3, date: 'Nov 01, 2023', project: 'The Apex Villa', method: 'Bank Transfer Initiated', amount: 140000, status: 'Pending', statusColor: 'bg-warning-container text-on-warning-container', indicatorColor: 'bg-warning', isPending: true }
];

const ClientPortalPayments = () => {
  const [history, setHistory] = useState(paymentHistoryList);

  const handleMakePayment = () => {
    const newPayment = {
      id: Date.now(),
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' }),
      project: 'The Apex Villa',
      method: 'Stripe Secure Credit Card',
      amount: 140000,
      status: 'Paid',
      statusColor: 'bg-success-container text-on-success-container',
      indicatorColor: 'bg-success'
    };
    setHistory([newPayment, ...history]);
  };

  return (
    <ClientLayout title="Payments" subtitle="Track your payment history and outstanding balances.">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-6">
        <div className="bg-surface rounded-xl p-8 border border-[#E5E0DD] hover:shadow-lg transition-shadow duration-300" style={{ boxShadow: '0px 4px 20px rgba(44,62,80,0.04)' }}>
          <div className="flex items-center gap-2 mb-4">
            <span className="icon-mask text-success" style={{ WebkitMaskImage: 'url(/icons/check_circle.svg)', maskImage: 'url(/icons/check_circle.svg)' , width: '20px', height: '20px'}}></span>
            <h3 className="font-label-md text-on-surface-variant uppercase tracking-wider">Total Paid</h3>
          </div>
          <div className="font-headline-md md:font-headline-lg text-success font-bold">$1,840,000.00</div>
        </div>
        <div className="bg-surface rounded-xl p-8 border border-[#E5E0DD] hover:shadow-lg transition-shadow duration-300" style={{ boxShadow: '0px 4px 20px rgba(44,62,80,0.04)' }}>
          <div className="flex items-center gap-2 mb-4">
            <span className="icon-mask text-warning" style={{ WebkitMaskImage: 'url(/icons/pending.svg)', maskImage: 'url(/icons/pending.svg)' , width: '20px', height: '20px'}}></span>
            <h3 className="font-label-md text-on-surface-variant uppercase tracking-wider">Outstanding Balance</h3>
          </div>
          <div className="font-headline-md md:font-headline-lg text-warning font-bold">$425,000.00</div>
        </div>
        <div className="bg-surface rounded-xl p-8 border border-[#E5E0DD] hover:shadow-lg transition-shadow duration-300 relative overflow-hidden" style={{ boxShadow: '0px 4px 20px rgba(44,62,80,0.04)' }}>
          <div className="absolute top-0 right-0 w-24 h-24 bg-surface-variant rounded-bl-full -mr-4 -mt-4 opacity-50 pointer-events-none" />
          <div className="flex items-center gap-2 mb-4 relative z-10">
            <span className="icon-mask text-primary" style={{ WebkitMaskImage: 'url(/icons/calendar_month.svg)', maskImage: 'url(/icons/calendar_month.svg)' , width: '20px', height: '20px'}}></span>
            <h3 className="font-label-md text-on-surface-variant uppercase tracking-wider">Next Payment Due</h3>
          </div>
          <div className="flex flex-col relative z-10">
            <span className="font-headline-md text-on-surface font-semibold mb-1">Nov 15, 2023</span>
            <span className="font-body-lg text-on-surface-variant">$140,000.00</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Payment History */}
        <div className="lg:col-span-8">
          <h2 className="font-headline-md text-on-surface mb-6 border-b border-[#E5E0DD] pb-4">Payment History</h2>
          <div className="flex flex-col gap-4">
            {history.map(p => (
              <div key={p.id} className={`bg-surface rounded-xl p-6 border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:-translate-y-1 transition-transform duration-200 relative overflow-hidden ${p.isPending ? 'border-warning' : 'border-[#E5E0DD]'}`}>
                {p.isPending && <div className="absolute left-0 top-0 bottom-0 w-1 bg-warning" />}
                <div className="flex items-start sm:items-center gap-4 w-full sm:w-auto pl-2">
                  <div className={`hidden sm:flex w-12 h-12 rounded-full items-center justify-center flex-shrink-0 ${p.isPending ? 'bg-warning-container' : 'bg-surface-variant'}`}>
                    <span className={`material-symbols-outlined ${p.isPending ? 'text-warning' : 'text-on-surface-variant'}`}>account_balance</span>
                  </div>
                  <div>
                    <div className="font-label-md text-on-surface-variant mb-1">{p.date}</div>
                    <div className="font-body-lg text-on-surface font-medium">{p.project}</div>
                    <div className="font-caption text-on-surface-variant flex items-center gap-1 mt-1">
                      <span className="icon-mask text-[14px]" style={{ WebkitMaskImage: 'url(/icons/account_balance.svg)', maskImage: 'url(/icons/account_balance.svg)' , width: '14px', height: '14px'}}></span> {p.method}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-[#F0EEED]">
                  <div className="flex flex-col items-start sm:items-end">
                    <span className="font-body-lg text-on-surface font-bold">${p.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    <span className={`px-2 py-1 rounded-full text-on-success-container font-caption font-medium mt-1 inline-flex items-center gap-1 ${p.statusColor}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${p.indicatorColor} ${p.isPending ? 'animate-pulse' : ''}`} /> {p.status}
                    </span>
                  </div>
                  <button
                    disabled={p.isPending}
                    className={`flex items-center justify-center p-2 rounded-lg border hover:bg-surface-variant transition-colors group ${p.isPending ? 'border-[#E5E0DD] text-[#E5E0DD] cursor-not-allowed' : 'border-outline text-on-surface-variant'}`}
                  >
                    <span className="icon-mask group-hover:text-primary transition-colors" style={{ WebkitMaskImage: 'url(/icons/download.svg)', maskImage: 'url(/icons/download.svg)' , width: '20px', height: '20px'}}></span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions Sidebar */}
        <div className="lg:col-span-4 mt-12 lg:mt-0">
          <div className="sticky top-28">
            <div className="bg-surface rounded-xl border border-[#E5E0DD] overflow-hidden" style={{ boxShadow: '0px 4px 20px rgba(44,62,80,0.04)' }}>
              <div className="h-2 bg-primary" />
              <div className="p-8">
                <h2 className="font-headline-sm text-on-surface mb-2 font-medium">Outstanding Balance</h2>
                <div className="font-display-lg text-on-surface mb-4 tracking-tight">$425,000<span className="text-on-surface-variant text-2xl">.00</span></div>
                <p className="font-body-md text-on-surface-variant mb-8 leading-relaxed">
                  Your next scheduled payment for <span className="font-semibold text-on-surface">The Apex Villa</span> is due soon. Maintaining timely payments ensures construction stays on schedule.
                </p>
                <button
                  onClick={handleMakePayment}
                  className="w-full bg-primary hover:bg-primary-container text-on-primary font-label-md py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  Pay Now <span className="icon-mask text-[20px]" style={{ WebkitMaskImage: 'url(/icons/arrow_forward.svg)', maskImage: 'url(/icons/arrow_forward.svg)' , width: '20px', height: '20px'}}></span>
                </button>
                <div className="mt-6 pt-6 border-t border-[#F0EEED]">
                  <div className="flex items-center gap-3 text-on-surface-variant font-caption">
                    <span className="icon-mask text-[18px]" style={{ WebkitMaskImage: 'url(/icons/lock.svg)', maskImage: 'url(/icons/lock.svg)' , width: '18px', height: '18px'}}></span>
                    <span>Secure 256-bit encrypted transaction via Stripe.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
};

export default ClientPortalPayments;
