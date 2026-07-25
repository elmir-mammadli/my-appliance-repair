'use client';

import { useState, useEffect, useRef } from'react';

interface DatePickerProps {
 value: string;
 onChange: (date: string) => void;
 error?: string;
 id?: string;
}

const DAYS = ['Su','Mo','Tu','We','Th','Fr','Sa'];
const MONTHS = [
'January','February','March','April','May','June',
'July','August','September','October','November','December',
];

function toDateParts(date: Date) {
 return { y: date.getFullYear(), m: date.getMonth(), d: date.getDate() };
}

function formatDisplay(iso: string): string {
 if (!iso) return'';
 const [y, m, d] = iso.split('-').map(Number);
 return`${MONTHS[m - 1]} ${d}, ${y}`;
}

function isoDate(y: number, m: number, d: number): string {
 return`${y}-${String(m + 1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
}

export default function DatePicker({ value, onChange, error, id ='datepicker' }: DatePickerProps) {
 const today = new Date();
 today.setHours(0, 0, 0, 0);
 const maxDate = new Date(today);
 maxDate.setDate(today.getDate() + 30);

 const { y: ty, m: tm } = toDateParts(today);

 const [open, setOpen] = useState(false);
 const [viewYear, setViewYear] = useState(ty);
 const [viewMonth, setViewMonth] = useState(tm);
 const ref = useRef<HTMLDivElement>(null);

 useEffect(() => {
 if (!open) return;
 const handler = (e: MouseEvent) => {
 if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
 };
 document.addEventListener('mousedown', handler);
 return () => document.removeEventListener('mousedown', handler);
 }, [open]);

 // Build calendar grid
 const firstDay = new Date(viewYear, viewMonth, 1).getDay();
 const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
 const cells: (number | null)[] = [
 ...Array(firstDay).fill(null),
 ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
 ];
 while (cells.length % 7 !== 0) cells.push(null);

 const prevMonth = () => {
 if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
 else setViewMonth(m => m - 1);
 };
 const nextMonth = () => {
 if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
 else setViewMonth(m => m + 1);
 };

 const canGoPrev = !(viewYear === ty && viewMonth === tm);
 const canGoNext = !(viewYear === maxDate.getFullYear() && viewMonth === maxDate.getMonth());

 const selectDay = (d: number) => {
 const iso = isoDate(viewYear, viewMonth, d);
 onChange(iso);
 setOpen(false);
 };

 const getDayState = (d: number) => {
 const cellDate = new Date(viewYear, viewMonth, d);
 cellDate.setHours(0, 0, 0, 0);
 const iso = isoDate(viewYear, viewMonth, d);
 const isPast = cellDate < today;
 const isFuture = cellDate > maxDate;
 const isDisabled = isPast || isFuture;
 const isToday = cellDate.getTime() === today.getTime();
 const isSelected = iso === value;
 return { isDisabled, isToday, isSelected };
 };

 return (
 <div className="relative" ref={ref}>
 {/* Trigger */}
 <button
 type="button"
 id={id}
 onClick={() => setOpen((o) => !o)}
 className={`w-full flex items-center justify-between px-4 py-3 border bg-white text-left transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer ${
 error
 ?'border-red-400'
 : open
 ?'border-blue-500 ring-2 ring-blue-500'
 :'border-slate-200 hover:border-blue-300'
 }`}
 aria-haspopup="true"
 aria-expanded={open}
 >
 <span className={value ?'text-blue-950 font-medium' :'text-slate-400'}>
 {value ? formatDisplay(value) :'Select a date...'}
 </span>
 <svg className="w-4 h-4 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
 <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
 </svg>
 </button>

 {/* Calendar dropdown */}
 {open && (
 <div className="absolute z-50 mt-2 bg-white border border-slate-200 shadow-xl p-4 w-72">

 {/* Month navigation */}
 <div className="flex items-center justify-between mb-4">
 <button
 type="button"
 onClick={prevMonth}
 disabled={!canGoPrev}
 className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
 aria-label="Previous month"
 >
 <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
 <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
 </svg>
 </button>
 <span className="font-bold text-blue-950 text-sm">
 {MONTHS[viewMonth]} {viewYear}
 </span>
 <button
 type="button"
 onClick={nextMonth}
 disabled={!canGoNext}
 className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
 aria-label="Next month"
 >
 <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
 <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
 </svg>
 </button>
 </div>

 {/* Day headers */}
 <div className="grid grid-cols-7 mb-1">
 {DAYS.map((d) => (
 <div key={d} className="text-center text-xs font-semibold text-slate-400 py-1">{d}</div>
))}
 </div>

 {/* Day cells */}
 <div className="grid grid-cols-7 gap-y-1">
 {cells.map((day, i) => {
 if (!day) return <div key={`empty-${i}`} />;
 const { isDisabled, isToday, isSelected } = getDayState(day);
 return (
 <button
 key={day}
 type="button"
 onClick={() => !isDisabled && selectDay(day)}
 disabled={isDisabled}
 className={`w-8 h-8 mx-auto flex items-center justify-center text-sm font-medium transition-colors duration-150 cursor-pointer
 ${isSelected
 ?'bg-blue-950 text-white'
 : isToday
 ?'bg-[#ffb81c]/20 text-blue-950 font-bold'
 : isDisabled
 ?'text-slate-300 cursor-not-allowed'
 :'text-slate-700 hover:bg-blue-50 hover:text-blue-950'
 }`}
 aria-label={`${MONTHS[viewMonth]} ${day}, ${viewYear}`}
 aria-pressed={isSelected}
 >
 {day}
 </button>
);
 })}
 </div>

 {/* Legend */}
 <div className="flex items-center gap-3 mt-3 pt-3 border-t border-slate-100 text-xs text-slate-400">
 <span className="flex items-center gap-1">
 <span className="w-3 h-3 bg-[#ffb81c]/20 inline-block" /> Today
 </span>
 <span className="flex items-center gap-1">
 <span className="w-3 h-3 bg-blue-950 inline-block" /> Selected
 </span>
 <span className="ml-auto">Next 30 days only</span>
 </div>
 </div>
)}
 </div>
);
}
