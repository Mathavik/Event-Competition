import React from 'react';
import { UserPlus, LogIn, CalendarCheck, CreditCard, ArrowRight, Trophy } from 'lucide-react';

const ProcessSteps = () => {
  const steps = [
    { title: "Register", icon: <UserPlus size={40} />, desc: "Create student profile", border: "border-blue-500", text: "text-blue-500" },
    { title: "Login", icon: <LogIn size={40} />, desc: "Access dashboard", border: "border-purple-500", text: "text-purple-500" },
    { title: "Book", icon: <CalendarCheck size={40} />, desc: "Select your games", border: "border-orange-500", text: "text-orange-500" },
    { title: "Pay", icon: <CreditCard size={40} />, desc: "Secure your spot", border: "border-emerald-500", text: "text-emerald-500" },
  ];

  return (
    <section className="bg-white py-24 px-6 relative font-sans overflow-hidden">
      {/* Background Subtle Grid - No Inline Styles to avoid Errors */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* BIG BOLD TITLE */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-1 rounded-full text-xs font-black uppercase italic tracking-widest mb-6">
            <Trophy size={14} /> The Championship Path
          </div>
          <h2 className="text-7xl md:text-9xl font-[1000] text-black tracking-tighter uppercase italic leading-none">
            How to <span className="text-orange-500 drop-shadow-[6px_6px_0px_#000]">Win</span>
          </h2>
        </div>

        {/* STEPS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {steps.map((step, i) => (
            <div key={i} className="group relative">
              {/* LARGE GHOST NUMBER */}
              <div className="absolute -top-12 left-6 text-9xl font-[1000] text-slate-100 group-hover:text-slate-200 transition-colors italic z-0 select-none">
                {i + 1}
              </div>

              {/* CARD CONTAINER */}
              <div className="relative z-10 bg-white border-[4px] border-black p-8 h-full shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[12px_12px_0px_0px_#f97316] group-hover:-translate-x-2 group-hover:-translate-y-2 transition-all duration-300">
                
                {/* ICON BOX */}
                <div className={`mb-12 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-12 ${step.text}`}>
                  {step.icon}
                </div>

                {/* CONTENT */}
                <div className="mt-auto">
                  <h4 className="text-3xl font-[1000] text-black uppercase italic tracking-tighter mb-2 leading-none">
                    {step.title}
                  </h4>
                  <p className="text-slate-500 font-black text-xs uppercase tracking-widest leading-tight">
                    {step.desc}
                  </p>
                </div>

                {/* DECORATIVE CORNER BORDER */}
                <div className={`absolute bottom-0 right-0 w-12 h-12 border-r-[6px] border-b-[6px] transition-all group-hover:w-full group-hover:h-full ${step.border} opacity-30`}></div>
              </div>

              {/* ARROW BETWEEN CARDS */}
              {i !== 3 && (
                <div className="hidden lg:block absolute -right-6 top-1/2 -translate-y-1/2 z-20">
                  <ArrowRight size={40} className="text-black group-hover:translate-x-2 transition-transform" strokeWidth={3} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* HUGE ACTION BUTTON */}
        <div className="mt-24 text-center">
          <button className="group relative bg-orange-500 border-[4px] border-black px-16 py-6 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all active:scale-95">
            <span className="text-3xl font-[1000] text-black uppercase italic tracking-tighter flex items-center gap-4">
              Join the Battle <ArrowRight size={32} strokeWidth={4} />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;