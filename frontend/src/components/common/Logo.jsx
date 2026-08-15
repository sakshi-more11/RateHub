

import { Star } from 'lucide-react';

export default function Logo({ size = 'md', light = false }) {
  const sizes = {
    sm: { box: 'w-8 h-8', icon: 16, text: 'text-lg' },
    md: { box: 'w-10 h-10', icon: 20, text: 'text-2xl' },
    lg: { box: 'w-12 h-12', icon: 24, text: 'text-3xl' },
  };
  const s = sizes[size];

  return (
    <div className="flex items-center gap-3">
      <div className={`${s.box} rounded-xl bg-accent flex items-center justify-center logo-star logo-badge cursor-pointer transition`}>
        <Star size={s.icon} className="fill-[#12172B] text-[#12172B]" strokeWidth={2.5} />
      </div>
      <span className={`font-display font-bold ${s.text} ${light ? 'text-panelText' : 'text-textPrimary'}`}>
        RateHub
      </span>
    </div>
  );
}