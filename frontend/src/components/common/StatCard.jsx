export default function StatCard({ label, value, icon: Icon, accent = false }) {
  return (
    <div className="bg-surface border border-borderc rounded-2xl p-6 flex items-center gap-4 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${accent ? 'bg-accent text-[#12172B]' : 'bg-accent/15 text-accent'}`}>
        <Icon size={22} />
      </div>
      <div>
        <p className="text-2xl font-display font-bold text-textPrimary">{value}</p>
        <p className="text-sm text-textSecondary">{label}</p>
      </div>
    </div>
  );
}