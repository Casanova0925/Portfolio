import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Timezone options ──────────────────────────────────────────────────────────
const TIMEZONES = [
  { label: 'IST — India (UTC+5:30)',       tz: 'Asia/Kolkata' },
  { label: 'GST — Dubai / UAE (UTC+4)',    tz: 'Asia/Dubai' },
  { label: 'GMT — London (UTC+0)',         tz: 'Europe/London' },
  { label: 'CET — Central Europe (UTC+1)', tz: 'Europe/Paris' },
  { label: 'MSK — Moscow (UTC+3)',         tz: 'Europe/Moscow' },
  { label: 'SGT — Singapore (UTC+8)',      tz: 'Asia/Singapore' },
  { label: 'JST — Tokyo (UTC+9)',          tz: 'Asia/Tokyo' },
  { label: 'AEST — Sydney (UTC+10)',       tz: 'Australia/Sydney' },
  { label: 'EST — New York (UTC-5)',       tz: 'America/New_York' },
  { label: 'CST — Chicago (UTC-6)',        tz: 'America/Chicago' },
  { label: 'PST — Los Angeles (UTC-8)',    tz: 'America/Los_Angeles' },
];

// ── Pre-booked slots (IST, 24h) ───────────────────────────────────────────────
// Format: { 'YYYY-MM-DD': ['HH:MM', ...] }
// All 8 slots on a day = fully booked (day grayed out + strikethrough)
const BOOKED = {
  '2026-06-07': ['10:00', '14:00'],
  '2026-06-09': ['09:00', '11:00', '15:00'],
  '2026-06-11': ['10:00', '16:00'],
  '2026-06-14': ['09:00', '14:00', '17:00'],
  '2026-06-16': ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'],
  '2026-06-19': ['10:00', '11:00'],
  '2026-06-23': ['09:00', '10:00', '14:00'],
  '2026-06-26': ['11:00', '15:00', '17:00'],
};

// All available slot times (in IST, 24h)
const ALL_SLOTS = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];

const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];
const DAY_ABBR = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

// ── Helpers ───────────────────────────────────────────────────────────────────
function toDateStr(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

// Convert a slot time (IST) on a given date to any IANA timezone for display
function istToTz(dateStr, istTime, targetTz) {
  const [y, mo, dy] = dateStr.split('-').map(Number);
  const [h, m] = istTime.split(':').map(Number);
  // IST = UTC+5:30 → subtract 5h 30m to get UTC
  const utc = new Date(Date.UTC(y, mo - 1, dy, h - 5, m - 30));
  return new Intl.DateTimeFormat('en-US', {
    timeZone: targetTz,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(utc);
}

// Human-readable date avoiding UTC midnight shift
function formatDate(dateStr, opts = {}) {
  const [y, mo, d] = dateStr.split('-').map(Number);
  return new Date(y, mo - 1, d).toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', ...opts,
  });
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function BookingCalendar({ onConfirm }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const minDate = new Date(today);
  minDate.setDate(today.getDate() + 2); // 2-day gap

  const [tz,          setTz]          = useState('Asia/Kolkata');
  const [viewYear,    setViewYear]    = useState(today.getFullYear());
  const [viewMonth,   setViewMonth]   = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [duration,    setDuration]    = useState(30);

  // ── Calendar grid ──────────────────────────────────────────────────────────
  const calendarDays = useMemo(() => {
    const first = new Date(viewYear, viewMonth, 1);
    const last  = new Date(viewYear, viewMonth + 1, 0);
    const cells = [];
    for (let i = 0; i < first.getDay(); i++) cells.push(null); // leading blanks
    for (let d = 1; d <= last.getDate(); d++) {
      const date     = new Date(viewYear, viewMonth, d);
      const dStr     = toDateStr(date);
      const weekend  = date.getDay() === 0 || date.getDay() === 6;
      const tooSoon  = date < minDate;
      const booked   = BOOKED[dStr] || [];
      const fullBook = booked.length >= ALL_SLOTS.length;
      const partial  = booked.length > 0 && !fullBook;
      const disabled = weekend || tooSoon || fullBook;
      cells.push({ date, dStr, weekend, tooSoon, fullBook, partial, disabled });
    }
    return cells;
  }, [viewYear, viewMonth]);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  };

  // ── Slots for selected date ───────────────────────────────────────────────
  const slots = useMemo(() => {
    if (!selectedDate) return [];
    const bookedForDay = BOOKED[selectedDate] || [];
    return ALL_SLOTS.map(t => ({
      ist:     t,
      display: istToTz(selectedDate, t, tz),
      booked:  bookedForDay.includes(t),
    }));
  }, [selectedDate, tz]);

  const canConfirm = selectedDate && selectedTime;

  const handleConfirm = () => {
    if (!canConfirm) return;
    const tzObj = TIMEZONES.find(t => t.tz === tz);
    onConfirm({
      date:        selectedDate,
      dateLabel:   formatDate(selectedDate, { weekday: 'short', month: 'short', day: 'numeric' }),
      timeIST:     selectedTime,
      displayTime: istToTz(selectedDate, selectedTime, tz),
      timezone:    tz,
      tzLabel:     tzObj?.label || tz,
      duration,
    });
  };

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      {/* ── Page header ── */}
      <div className="mb-8 md:mb-12">
        <p className="text-xs sm:text-sm text-cyanAccent uppercase tracking-[0.4em] font-black mb-4">
          Step 1 of 2 · Schedule a Call
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight">
          Pick a Time That<br/>
          <span className="glow-text text-cyanAccent">Works for You.</span>
        </h1>
        <p className="text-gray-300 text-base md:text-lg max-w-xl leading-relaxed">
          Select your timezone, choose a day and a 30 or 60 minute slot. We'll confirm within 2 hours.
        </p>
      </div>

      <div className="glass p-6 md:p-8 lg:p-10">

        {/* ── Top controls: duration + timezone ── */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 pb-6 border-b border-white/5">
          {/* Duration chips */}
          <div className="flex gap-2 shrink-0">
            {[30, 60].map(d => (
              <button key={d} onClick={() => setDuration(d)}
                className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest border transition-all
                  ${duration === d
                    ? 'bg-cyanAccent text-[#0A0F1E] border-cyanAccent shadow-[0_0_15px_rgba(0,242,255,0.3)]'
                    : 'bg-white/5 text-gray-400 border-white/10 hover:border-cyanAccent/40'}`}>
                {d} min
              </button>
            ))}
          </div>

          {/* Timezone dropdown */}
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-cyanAccent text-sm pointer-events-none">🌐</span>
            <select value={tz} onChange={e => { setTz(e.target.value); setSelectedTime(null); }}
              className="w-full bg-[#0A0F1E] border border-white/10 rounded-xl pl-8 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyanAccent transition-colors appearance-none cursor-pointer">
              {TIMEZONES.map(t => (
                <option key={t.tz} value={t.tz}>{t.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* ── Main grid: calendar + slots ── */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

          {/* ── Calendar ── */}
          <div className="lg:w-1/2">
            {/* Month nav */}
            <div className="flex items-center justify-between mb-5">
              <button onClick={prevMonth}
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-cyanAccent/15 border border-white/10 hover:border-cyanAccent/40 flex items-center justify-center text-xl text-gray-300 hover:text-cyanAccent transition-all">
                ‹
              </button>
              <p className="font-black text-white text-base md:text-lg tracking-wide">
                {MONTH_NAMES[viewMonth]} {viewYear}
              </p>
              <button onClick={nextMonth}
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-cyanAccent/15 border border-white/10 hover:border-cyanAccent/40 flex items-center justify-center text-xl text-gray-300 hover:text-cyanAccent transition-all">
                ›
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 mb-1">
              {DAY_ABBR.map(d => (
                <div key={d} className={`text-center text-[10px] font-black uppercase tracking-wider py-1
                  ${d === 'Sun' || d === 'Sat' ? 'text-red-500/50' : 'text-gray-600'}`}>
                  {d}
                </div>
              ))}
            </div>

            {/* Day cells */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, i) => {
                if (!day) return <div key={i} />;
                const sel = selectedDate === day.dStr;
                return (
                  <button
                    key={i}
                    disabled={day.disabled}
                    onClick={() => { setSelectedDate(day.dStr); setSelectedTime(null); }}
                    title={day.weekend ? 'Weekend — unavailable' : day.tooSoon ? 'Too soon — 2-day lead required' : day.fullBook ? 'Fully booked' : ''}
                    className={`
                      relative aspect-square rounded-xl flex flex-col items-center justify-center
                      text-sm font-bold transition-all duration-150
                      ${sel ? 'bg-cyanAccent text-[#0A0F1E] shadow-[0_0_16px_rgba(0,242,255,0.45)]' : ''}
                      ${!sel && !day.disabled ? 'hover:bg-cyanAccent/15 hover:text-cyanAccent text-gray-200 cursor-pointer' : ''}
                      ${day.disabled && !sel ? 'text-gray-700 cursor-not-allowed' : ''}
                      ${day.fullBook ? 'line-through' : ''}
                    `}
                  >
                    {day.date.getDate()}
                    {/* Yellow dot = partial bookings */}
                    {day.partial && !sel && (
                      <span className="absolute bottom-[5px] w-1 h-1 rounded-full bg-amber-400" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-x-5 gap-y-2 mt-5 text-[11px] text-gray-500">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-cyanAccent" /> Selected
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" /> Partially booked
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-gray-700 line-through">15</span>&nbsp;Fully booked / Weekend
              </span>
            </div>
          </div>

          {/* ── Time slots ── */}
          <div className="lg:w-1/2">
            <AnimatePresence mode="wait">
              {!selectedDate ? (
                <motion.div key="empty"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="h-full min-h-52 flex flex-col items-center justify-center gap-3 border border-dashed border-white/10 rounded-2xl text-gray-600">
                  <span className="text-4xl">📅</span>
                  <p className="text-xs font-black uppercase tracking-widest">Select a date first</p>
                </motion.div>
              ) : (
                <motion.div key={selectedDate}
                  initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.3 }}>
                  <p className="text-xs uppercase tracking-widest font-black text-gray-400 mb-4">
                    {formatDate(selectedDate, { weekday: 'long', month: 'long', day: 'numeric' })}
                  </p>
                  <div className="grid grid-cols-2 gap-2 mb-5">
                    {slots.map(slot => {
                      const sel = selectedTime === slot.ist;
                      return (
                        <button key={slot.ist} disabled={slot.booked}
                          onClick={() => setSelectedTime(slot.ist)}
                          className={`
                            group p-3 rounded-xl border text-center transition-all duration-150
                            ${sel ? 'bg-cyanAccent border-cyanAccent shadow-[0_0_14px_rgba(0,242,255,0.4)]' : ''}
                            ${!sel && !slot.booked ? 'bg-white/5 border-white/10 hover:border-cyanAccent/60 hover:bg-cyanAccent/10 cursor-pointer' : ''}
                            ${slot.booked ? 'border-white/5 cursor-not-allowed opacity-40' : ''}
                          `}
                        >
                          <p className={`text-sm font-black ${sel ? 'text-[#0A0F1E]' : slot.booked ? 'text-gray-600 line-through' : 'text-white'}`}>
                            {slot.display}
                          </p>
                          <p className={`text-[10px] mt-0.5 font-bold uppercase tracking-wider
                            ${sel ? 'text-[#0A0F1E]/70' : slot.booked ? 'text-gray-700' : 'text-gray-600'}`}>
                            {slot.booked ? 'Booked' : `${duration} min`}
                          </p>
                        </button>
                      );
                    })}
                  </div>

                  {/* Booking summary chip */}
                  <AnimatePresence>
                    {selectedTime && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="p-4 bg-cyanAccent/10 border border-cyanAccent/25 rounded-xl"
                      >
                        <p className="text-[10px] uppercase tracking-[0.2em] font-black text-cyanAccent mb-1.5">
                          ✓ Your Selected Slot
                        </p>
                        <p className="text-white font-black text-sm">
                          {formatDate(selectedDate, { weekday: 'short', month: 'short', day: 'numeric' })}
                          &nbsp;·&nbsp;
                          {istToTz(selectedDate, selectedTime, tz)}
                          &nbsp;·&nbsp;{duration} min
                        </p>
                        <p className="text-gray-500 text-xs mt-1">
                          {TIMEZONES.find(t => t.tz === tz)?.label}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Footer CTA ── */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-xs text-gray-600 max-w-xs leading-relaxed">
            All times shown in <span className="text-gray-400 font-bold">{TIMEZONES.find(t => t.tz === tz)?.label.split('—')[0].trim()}</span>.
            Studio operates Mon–Fri, 9 AM – 5 PM IST.
          </p>
          <button
            disabled={!canConfirm}
            onClick={handleConfirm}
            className="shrink-0 px-8 py-4 bg-cyanAccent text-[#0A0F1E] font-black uppercase tracking-widest rounded-xl hover:bg-white transition-colors disabled:opacity-25 disabled:cursor-not-allowed text-sm shadow-[0_0_20px_rgba(0,242,255,0.2)] hover:shadow-none"
          >
            Continue to Details →
          </button>
        </div>
      </div>
    </motion.div>
  );
}
