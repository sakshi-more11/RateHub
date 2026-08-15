import { Star } from 'lucide-react';

export default function RecentActivity({ raters }) {
  const recent = [...raters].slice(-5).reverse();

  if (recent.length === 0) return null;

  return (
    <div className="bg-surface border border-borderc rounded-2xl p-5">
      <h3 className="font-display font-bold text-textPrimary mb-4">Recent Activity</h3>
      <div className="space-y-3">
        {recent.map((r, i) => (
          <div key={i} className="flex items-center justify-between text-sm">
            <span className="text-textPrimary">{r.name.split(' ').slice(0, 2).join(' ')} rated your store</span>
            <span className="flex items-center gap-1 text-accent font-medium shrink-0 ml-3">
              <Star size={13} className="fill-accent text-accent" /> {r.rating}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}