import { X } from 'lucide-react';

export default function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-surface border border-borderc rounded-2xl p-6 w-full max-w-md card-float animate-fade-up">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display text-lg font-bold text-textPrimary">{title}</h3>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-bg transition"><X size={18} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}