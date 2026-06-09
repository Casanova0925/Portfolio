import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import BookingCalendar from '../components/BookingCalendar';

const sectors  = ['Healthcare & MedTech','Architecture & Real Estate','EdTech & Training','Legal & Compliance','Other'];
const services = ['Web Application','Mobile App','Desktop App','3D / WebGL Interface','Full Product Build'];

const toastStyle = {
  background: '#0A0F1E', color: '#fff',
  border: '1px solid rgba(0,242,255,0.2)',
  borderRadius: '12px', fontSize: '14px',
};

export default function Contact() {
  const [step,    setStep]    = useState('calendar'); // 'calendar' | 'form'
  const [booking, setBooking] = useState(null);
  const [form,    setForm]    = useState({ name:'', email:'', company:'', sector:'', service:'', message:'' });
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleBookingConfirm = (b) => {
    setBooking(b);
    setStep('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in Name, Email and Message.', { style: toastStyle });
      return;
    }

    const htmlEmail = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#0d1117;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d1117;padding:40px 20px;">
    <tr><td>
      <table width="600" align="center" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;margin:0 auto;">

        <tr>
          <td style="background:linear-gradient(135deg,#00F2FF 0%,#a78bfa 100%);border-radius:16px 16px 0 0;padding:32px 40px;text-align:center;">
            <div style="display:inline-block;width:52px;height:52px;background:rgba(10,15,30,0.5);border-radius:14px;border:2px solid rgba(255,255,255,0.3);line-height:52px;font-size:26px;font-weight:900;color:#fff;margin-bottom:16px;">N</div>
            <h1 style="margin:0;color:#fff;font-size:22px;font-weight:900;letter-spacing:3px;text-transform:uppercase;">NEURO-LINK</h1>
            <p style="margin:6px 0 0;color:rgba(255,255,255,0.8);font-size:11px;letter-spacing:2px;text-transform:uppercase;">New Booking · Software Studio</p>
          </td>
        </tr>

        <tr>
          <td style="background:#0f1521;border-left:1px solid rgba(0,242,255,0.15);border-right:1px solid rgba(0,242,255,0.15);padding:36px 40px;">

            <p style="margin:0 0 24px;color:#94a3b8;font-size:14px;line-height:1.7;">
              A new discovery call has been booked through your portfolio. Details below.
            </p>

            <!-- Booking highlight -->
            <div style="background:linear-gradient(135deg,rgba(0,242,255,0.08),rgba(167,139,250,0.08));border:1px solid rgba(0,242,255,0.2);border-radius:12px;padding:20px 24px;margin-bottom:28px;">
              <p style="margin:0 0 8px;color:#00F2FF;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;">📅 Booked Slot</p>
              <p style="margin:0;color:#fff;font-size:18px;font-weight:900;">
                ${booking?.dateLabel || ''} &nbsp;·&nbsp; ${booking?.displayTime || ''}
              </p>
              <p style="margin:6px 0 0;color:#94a3b8;font-size:13px;">
                ${booking?.duration || 30} min &nbsp;·&nbsp; ${booking?.tzLabel || ''}
              </p>
            </div>

            <!-- Contact details -->
            <table width="100%" cellpadding="0" cellspacing="0">
              ${[
                { icon:'👤', label:'Name',     value: form.name },
                { icon:'📧', label:'Email',    value: form.email },
                { icon:'🏢', label:'Company',  value: form.company  || 'Not provided' },
                { icon:'🌐', label:'Industry', value: form.sector   || 'Not specified' },
                { icon:'⚙️', label:'Service',  value: form.service  || 'Not specified' },
              ].map(r => `
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
                  <table width="100%" cellpadding="0" cellspacing="0"><tr>
                    <td width="36" style="font-size:18px;vertical-align:middle;padding-right:12px;">${r.icon}</td>
                    <td width="90" style="color:#4b5563;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;vertical-align:middle;">${r.label}</td>
                    <td style="color:#e2e8f0;font-size:14px;font-weight:600;vertical-align:middle;">${r.value}</td>
                  </tr></table>
                </td>
              </tr>`).join('')}
            </table>

            <!-- Message -->
            <div style="margin-top:28px;background:rgba(0,242,255,0.05);border:1px solid rgba(0,242,255,0.15);border-left:3px solid #00F2FF;border-radius:0 12px 12px 0;padding:20px 24px;">
              <p style="margin:0 0 10px;color:#00F2FF;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;">💬 Their Message</p>
              <p style="margin:0;color:#cbd5e1;font-size:14px;line-height:1.8;white-space:pre-wrap;">${form.message}</p>
            </div>

            <!-- Reply CTA -->
            <div style="margin-top:32px;text-align:center;">
              <a href="mailto:${form.email}?subject=Re: Discovery Call Confirmation — Neuro-Link&body=Hi ${form.name.split(' ')[0]},%0A%0AThanks for booking a call..."
                style="display:inline-block;background:linear-gradient(135deg,#00F2FF,#a78bfa);color:#0a0f1e;font-size:13px;font-weight:900;text-transform:uppercase;letter-spacing:2px;padding:14px 36px;border-radius:10px;text-decoration:none;">
                ✉ Reply to ${form.name.split(' ')[0]}
              </a>
            </div>
          </td>
        </tr>

        <tr>
          <td style="background:#080c14;border:1px solid rgba(0,242,255,0.1);border-top:none;border-radius:0 0 16px 16px;padding:20px 40px;text-align:center;">
            <p style="margin:0;color:#374151;font-size:11px;letter-spacing:1px;">
              NEURO-LINK STUDIO &nbsp;·&nbsp; samraj0704@gmail.com
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

    setLoading(true);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          subject: `🚀 New Booking — ${form.name} · ${booking?.dateLabel} ${booking?.displayTime} · Neuro-Link`,
          from_name: 'Neuro-Link Portfolio',
          html: htmlEmail,
          botcheck: '',
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Booked! We'll confirm your slot within 2 hours. 🚀", { style: toastStyle, duration: 5000 });
        setForm({ name:'', email:'', company:'', sector:'', service:'', message:'' });
        setBooking(null);
        setStep('calendar');
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch {
      toast.error('Failed to send. Please email samraj0704@gmail.com directly.', { style: toastStyle, duration: 6000 });
    } finally {
      setLoading(false);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="max-w-[90rem] mx-auto px-4 sm:px-8 md:px-10 pt-8 md:pt-10 pb-20"
    >
      <Toaster position="top-right" />

      <AnimatePresence mode="wait">

        {/* ── STEP 1: Calendar ── */}
        {step === 'calendar' && (
          <motion.div key="calendar"
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }}>
            <BookingCalendar onConfirm={handleBookingConfirm} />
          </motion.div>
        )}

        {/* ── STEP 2: Contact form ── */}
        {step === 'form' && (
          <motion.div key="form"
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }}>

            {/* Step header */}
            <div className="mb-8 md:mb-12">
              <div className="flex items-center gap-3 mb-4">
                <button onClick={() => setStep('calendar')}
                  className="text-xs font-black uppercase tracking-widest text-gray-500 hover:text-cyanAccent transition-colors flex items-center gap-1.5">
                  ← Back
                </button>
                <span className="text-gray-700">|</span>
                <p className="text-xs sm:text-sm text-cyanAccent uppercase tracking-[0.4em] font-black">
                  Step 2 of 2 · Your Details
                </p>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight">
                Almost There —<br/>
                <span className="glow-text text-cyanAccent">Tell Us About You.</span>
              </h1>
              <p className="text-gray-300 text-base md:text-lg max-w-xl leading-relaxed">
                Fill in the details below. We'll confirm your slot and send a calendar invite.
              </p>
            </div>

            {/* Booking summary banner */}
            {booking && (
              <motion.div
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                className="mb-8 p-4 md:p-5 rounded-2xl border border-cyanAccent/25 bg-cyanAccent/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyanAccent/15 border border-cyanAccent/30 flex items-center justify-center text-xl shrink-0">
                    📅
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] font-black text-cyanAccent mb-0.5">Your Booked Slot</p>
                    <p className="text-white font-black text-sm md:text-base">
                      {booking.dateLabel} &nbsp;·&nbsp; {booking.displayTime} &nbsp;·&nbsp; {booking.duration} min
                    </p>
                    <p className="text-gray-500 text-xs mt-0.5">{booking.tzLabel}</p>
                  </div>
                </div>
                <button onClick={() => setStep('calendar')}
                  className="shrink-0 text-xs font-black uppercase tracking-widest text-gray-500 hover:text-cyanAccent transition-colors border border-white/10 hover:border-cyanAccent/30 px-4 py-2 rounded-xl">
                  Change Slot
                </button>
              </motion.div>
            )}

            {/* Form + sidebar */}
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">

              {/* Form */}
              <form onSubmit={handleSubmit} className="lg:w-7/12 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-widest font-black text-gray-400 mb-2">Name *</label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyanAccent transition-colors placeholder-gray-600" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest font-black text-gray-400 mb-2">Email *</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@company.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyanAccent transition-colors placeholder-gray-600" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-widest font-black text-gray-400 mb-2">Company</label>
                    <input name="company" value={form.company} onChange={handleChange} placeholder="Company or startup name"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyanAccent transition-colors placeholder-gray-600" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest font-black text-gray-400 mb-2">Industry</label>
                    <select name="sector" value={form.sector} onChange={handleChange}
                      className="w-full bg-[#0A0F1E] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyanAccent transition-colors appearance-none cursor-pointer">
                      <option value="">Select sector</option>
                      {sectors.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest font-black text-gray-400 mb-2">What Do You Need?</label>
                  <div className="flex flex-wrap gap-2">
                    {services.map(s => (
                      <button type="button" key={s} onClick={() => setForm(f => ({ ...f, service: s }))}
                        className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest border transition-all
                          ${form.service === s
                            ? 'bg-cyanAccent text-[#0A0F1E] border-cyanAccent'
                            : 'bg-white/5 text-gray-400 border-white/10 hover:border-cyanAccent/50'}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest font-black text-gray-400 mb-2">Tell Us About the Problem *</label>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={5}
                    placeholder="Describe the gap in your current workflow, the users affected, and any technical context you have..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyanAccent transition-colors placeholder-gray-600 resize-none" />
                </div>

                <button type="submit" disabled={loading}
                  className="w-full sm:w-auto px-10 py-4 bg-cyanAccent text-[#0A0F1E] font-black uppercase tracking-widest rounded-xl hover:bg-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm flex items-center gap-3 shadow-[0_0_20px_rgba(0,242,255,0.25)]">
                  {loading
                    ? <><span className="w-4 h-4 border-2 border-[#0A0F1E]/30 border-t-[#0A0F1E] rounded-full animate-spin" /> Confirming…</>
                    : 'Confirm Booking →'}
                </button>
              </form>

              {/* Sidebar info */}
              <div className="lg:w-5/12 space-y-4">
                {[
                  { icon:'⚡', label:'Confirmation',  value:'Within 2 hours of booking' },
                  { icon:'📎', label:'Calendar Invite', value:"Sent to your email after confirm" },
                  { icon:'🌍', label:'We Work With',   value:'Teams across India' },
                  { icon:'🔒', label:'NDA Available',  value:'Happy to sign before you share details' },
                ].map((item, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                    className="glass p-5 flex items-start gap-4">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <p className="text-xs uppercase tracking-widest font-black text-gray-500 mb-1">{item.label}</p>
                      <p className="text-white font-bold text-sm">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
                <div className="glass p-5 border border-cyanAccent/20">
                  <p className="text-xs uppercase tracking-widest font-black text-cyanAccent mb-2">Direct Email</p>
                  <p className="text-white font-bold text-sm break-all">samraj0704@gmail.com</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
