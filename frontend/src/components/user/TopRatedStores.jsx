import { useEffect, useState } from 'react';
import { getTopRated } from '../../api/storeApi';

const medals = ['🥇', '🥈', '🥉'];

export default function TopRatedStores() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    getTopRated().then((res) => setStores(res.data));
  }, []);

  if (stores.length === 0) return null;

  return (
    <div className="bg-surface border border-borderc rounded-2xl p-5 mb-6">
      <h3 className="font-display font-bold text-textPrimary mb-4">Top Rated Stores</h3>
      <div className="space-y-3">
        {stores.map((s, i) => (
          <div key={s.id} className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-lg">{medals[i] || `${i + 1}.`}</span>
              <span className="text-sm text-textPrimary font-medium">{s.name}</span>
            </div>
            <span className="flex items-center gap-1 text-sm font-semibold text-accent">
              ★ {s.rating}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}