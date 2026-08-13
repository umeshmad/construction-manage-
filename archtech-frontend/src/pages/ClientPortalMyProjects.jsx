import React from 'react';
import ClientLayout from '../components/ClientLayout';

const ClientPortalMyProjects = () => {
  const stats = [
    { title: 'Active Projects', value: 3, subtitle: '+1 this month', isPrimary: true },
    { title: 'Completed Projects', value: 12, subtitle: 'Total history', isPrimary: false },
    { title: 'Pending Requests', value: 1, subtitle: 'Awaiting review', isSecondary: true },
  ];

  const projects = [
    {
      title: 'The Apex Villa',
      startDate: 'Oct 2023',
      estCompletion: 'Dec 2024',
      status: 'Active',
      statusBg: 'bg-tertiary-fixed text-on-tertiary-fixed-variant border-[#bcc9ca]',
      progress: 65,
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxQq21L7SJ2yYcYxkz-b5Pi_PRTQVOFaRFofds6i_sFkAecZQ-dkXyHEkDnDPkCabVMYgUvMVcSrNnpLmqpb2xHDWRAISQp9qQ9Qu_QYTyrZHmPVCjwUJbd9jhjFF-4o7iPbg7A2hNibSiUfZlOrKm75QQKo_rJaZH1_F6TbbZfAxQnnuOXTw4_H3Gfz0UOUP9EAFFjNXgAPobEJC7zisCEby3aibbHByIOBMUVAA7VPxlNEdC3A',
      team: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDQ6ppl1r9FbPMttCxyr01y7wegrjmfC9E42PkbqR2Rv2nKjlgeDFyI6aersFHX6iw0QUJZWWGNBB-AYp8E6t9cvwAWPpUCOy5IiNAA_sw9ABgWxshQ6HO-6bOg2T_I-OtL5K6TAo44MYauDJXI9-bA8qUhR8Zn6lx-3KXQ-4-JNhjjSxbXSxudDEarB6m4AzVtZGrgnwnx_iMz-80u-jksA3ABzutio36_8MI4-qTmWZvbQtp-ng',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAF5rRXc3rgf_zw96_oIeN1fwF6_GLVJasezl9piiVGdANmHMXw1f5sKQ3chBHmCf1EAJ_3w-M5Kmu6WPzAy_HRPSgsXoZ10Md2EhX1OKTAOCQ_U2t90VdVPpHaMGzQCEFe8CmLS_opCZ7664f8NnSmUautiWUWBw2uA20_1RwDW1-KcgwglXsAG7NUb8Wl5_h7e0j8zVeOuUFpMv4pQbetZk7s4mLBpcrzXhjdf9gwysXhJHwC6Q',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBHA73KSBYSykTOL0i5soPdW2mXJ5HP2u1c2cYXNkp1esfk_OTgFWKI5D5Q7TqxD-_pMTCCnFoDU7slpCh5Y-1astDjI94ncYrhIsFCPUHF99N7OGLsif7IeLQ7sUhlx42Ly6zmyEw5vpntkwxlCNQx5OD73Q1YuR4YPcn6kN-hmNALFsuufGwA0PFoI43APLNQ1q9XxwTnUYJ-4MDv9PpwfhgdxoeuyQnVqQdSk6ByjnSaYE0TEQ'
      ]
    },
    {
      title: 'Lumina Arts Center',
      startDate: 'TBD',
      estCompletion: 'TBD',
      status: 'Pending Approval',
      statusBg: 'bg-secondary-fixed text-on-secondary-fixed-variant border-[#fed65b]',
      progress: 0,
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDM9oCnrLIaamkosMOgf08Co7YRsno8sT5aoGYSytEf4Zld3LQvKaRxYRSA-JWHkDkGzt131TDAA5taeCGedUwmewmqXQWEg5M5HDqWkm2MmUG3TVHWWYjc9-ll5MmcQ71a5U_ZqPWhppFeK2CtMHFJFLxSak48LMALOiHr06Su7Og2OuNCJF_E4FrpKdcmy4MPuG4ROQiXj7Zfu8v5YGhxYaH8uxF0FRePKzuZvlScrij41_RARA',
      team: []
    },
    {
      title: 'Riverside Corporate',
      startDate: 'Jan 2023',
      estCompletion: 'Paused',
      status: 'On Hold',
      statusBg: 'border-secondary text-secondary',
      progress: 40,
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQAJUcn1Yfn1kkJaHxRGDC_uu1K-vw85PnF0CIJHjjh29asSOIG5_3E0VUVunsYMw4RSe62v6hvzRzcYT3lAS7pVQs_1MDeCdVGnFNy4pHfpavMr45bxx42pIaZrhMklUIusjIEK8eABmpnIxCLhkXZQARC7kn3uIwkuOCqjwlt80_uMwijEagM7QMh3j9huCoKZ2q98cPYlpNZY50G6huPwMiXtbJuWZ_q6k36Oknyjv-olRagw',
      team: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDNzHDkV7cEkB1k53WXz_O8-1681YO4NmeFmt94LcuizbkT-wwzikEQmCKHffAwRutVbjvB9iykDJm6c2kWWmgMPA7J7h2E2CkuDghbNrdIsFG9iHulrAGp0JaL-_b4hcAlH7m1B9ZqO5-cmiiihn_YJcscgFPJUzd9LykVthwfnsserqonj5lyGG6EFffewWpLDV1DOR8IBddDywB1QfM_ig6QWhLMcgxhWdzvRZj5eoDXgY8BhQ',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBmIO0lMxaFXl-s4NOC3vL8xBYQFGXQJZDQFnb5VzTJ-l1fw3LkO3KwjqE4Ya6fj6xUAltvUR6Wx7iLTjFafYSFCoZwnPzHsahLC453aAzM-_jLWCpW1HxXfs1kVTSnZJCm5RX-LHii_YklHOqnxveCXtUyXEwW7qMk_T7HEOm4WxsQ8x6E7i1hY-nZFZxvF7CpomRYaeiah_9h-TAGKBScgEi4ordXI1ra6fgOFG-DOdEmsv9vqA'
      ]
    },
    {
      title: 'Heritage Loft',
      startDate: 'Completed',
      estCompletion: 'Aug 2023',
      status: 'Completed',
      statusBg: 'bg-surface-container text-on-surface-variant border-outline-variant',
      progress: 100,
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFQ1nT0wjDjLjlCONvauvkq3WvZMIwBAex2x2MNzH9gQb-tgPkHfduqCob4_qND4wcXJ0Qr5RoqO8-h4MCYxZc-93ojccDeNU27MziYJ_jSZX-rgfzbAKN7r-4RRd-moQvb8eCK2IpWYYfwNnlYCfzl7JUbR1juC80lQzyBllCNGGrdNcFv2PG2X288p_OaAEZ2jmfvPKXOzxU9D1ULSkmOLNsuRrp9rwoV-IaiGHB-gHXf3Ierw',
      team: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAaW_whrnHThFtCekz_Au1Atc4Y3NSX2IZAwzxFMDL1K40lT-avQDVgDrSw_sUcHsCbrvwB-PyiDQN-JQkKqRzPuHxuSFGyhFObws9Q_PZLNhlz5l_Ew1biN_s6Hut4XTZ68zsnkHPufVQhluHxrvYOdrbYHUlkSzVjDvWCkWh57M4GOP0--BZPMLxqY6Gb_quqLAvdpLEF3j08v6p4nTMHkVVtIwW7MkvGymfWFYuw1e_veMHJ-g'
      ]
    }
  ];

  return (
    <ClientLayout title="My Projects" subtitle="Welcome back, Robert Vance">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        {stats.map(stat => (
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

      {/* Project Cards List */}
      <div className="flex flex-col gap-6 mt-4">
        {projects.map(proj => (
          <div key={proj.title} className="bg-surface-container-lowest border border-[#E5E0DD] rounded-xl p-6 shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center hover:shadow-md transition-shadow">
            <img className="w-full md:w-48 h-32 object-cover rounded-lg flex-shrink-0 border border-[#E5E0DD]" src={proj.img} alt={proj.title} />
            <div className="flex-1 flex flex-col gap-4 w-full">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-surface">{proj.title}</h3>
                  <div className="flex items-center gap-2 mt-1 text-on-surface-variant font-caption text-caption">
                    <span className="icon-mask text-sm" style={{ WebkitMaskImage: 'url(/icons/calendar_month.svg)', maskImage: 'url(/icons/calendar_month.svg)' , width: '14px', height: '14px'}}></span>
                    <span>Start Date: {proj.startDate} | Est. Completion: {proj.estCompletion}</span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full font-caption text-caption font-medium border ${proj.statusBg}`}>{proj.status}</span>
              </div>
              <div>
                <div className="flex justify-between font-caption text-caption mb-1">
                  <span className="text-on-surface-variant">Overall Progress</span>
                  <span className="text-on-surface font-medium">{proj.progress}%</span>
                </div>
                <div className="h-2 w-full bg-[#F9F8F7] border border-[#E5E0DD] rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${proj.status === 'On Hold' ? 'bg-secondary opacity-50' : 'bg-primary-container'}`} style={{ width: `${proj.progress}%` }} />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 md:items-end w-full md:w-auto mt-4 md:mt-0 flex-shrink-0 md:pl-6 md:border-l border-[#E5E0DD]">
              <div className="flex flex-col md:items-end">
                <span className="font-caption text-caption text-on-surface-variant mb-1">Assigned Team</span>
                <div className="flex items-center -space-x-2">
                  {proj.team.map((img, i) => (
                    <img key={i} className="w-8 h-8 rounded-full border-2 border-surface-container-lowest object-cover" src={img} alt="team" />
                  ))}
                  {proj.team.length === 0 && (
                    <div className="w-8 h-8 rounded-full bg-surface-container border-2 border-surface-container-lowest flex items-center justify-center">
                      <span className="icon-mask text-sm text-on-surface-variant" style={{ WebkitMaskImage: 'url(/icons/person_outline.svg)', maskImage: 'url(/icons/person_outline.svg)' , width: '14px', height: '14px'}}></span>
                    </div>
                  )}
                </div>
              </div>
              <button className="w-full md:w-auto px-6 py-2 border border-on-surface text-on-surface rounded-lg font-label-md text-label-md hover:bg-surface-container-low transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </ClientLayout>
  );
};

export default ClientPortalMyProjects;
