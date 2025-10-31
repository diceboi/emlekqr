'use client'

import { motion } from 'framer-motion'

export default function ToggleSwitch({
  legend,
  leftLabel = 'Privát',
  rightLabel = 'Publikus',
  checked = false,
  onChange,
  disabled = false,
  size = 'md', // 'sm' | 'md'
  classname = '',
  ariaLabel = 'Láthatóság kapcsoló'
}) {
  const sizes = {
    sm: { trackW: 40, trackH: 18, dot: 14, pad: 2 },
    md: { trackW: 48, trackH: 22, dot: 18, pad: 2.5 },
  };
  const s = sizes[size] || sizes.md;

  const trackClasses = checked ? 'bg-[#99fe3480]' : 'bg-[#3499fe81]';
  const dotColor = checked ? '#9ec775' : '#3499fe';
  const dotX = checked ? s.trackW - s.dot - s.pad : s.pad;

  const handleToggle = () => {
    if (disabled) return;
    onChange?.(!checked);
  };

  const handleKey = (e) => {
    if (disabled) return;
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      onChange?.(!checked);
    }
  };

  return (
    <fieldset className={`flex flex-col h-fit ${classname}`}>
      {legend && (
        <legend className="px-2 py-0.5 mb-[1px] text-xs font-bold border-b border-[var(--border)] bg-white rounded-t-lg">
          {legend}
        </legend>
      )}

      <div className="flex items-center justify-between rounded-lg p-1 text-sm font-semibold gap-2 select-none">
        <p className="text-xs">{leftLabel}</p>

        <div
          role="switch"
          aria-checked={checked}
          aria-label={ariaLabel}
          tabIndex={disabled ? -1 : 0}
          onKeyDown={handleKey}
          className={`relative cursor-pointer rounded-full shadow-inner outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[--blue] transition-opacity ${
            disabled ? 'opacity-60 cursor-not-allowed' : ''
          }`}
          style={{ width: s.trackW, height: s.trackH }}
          onClick={handleToggle}
        >
          <div className={`absolute inset-0 ${trackClasses} rounded-full`} />

          <motion.div
            layout
            className="rounded-full shadow-md absolute top-1/2 -translate-y-1/2"
            style={{
              width: s.dot,
              height: s.dot,
              left: dotX,
            }}
            animate={{ backgroundColor: dotColor }}
            transition={{ type: 'spring', stiffness: 700, damping: 30 }}
          />
        </div>

        <p className="text-xs">{rightLabel}</p>
      </div>
    </fieldset>
  );
}
