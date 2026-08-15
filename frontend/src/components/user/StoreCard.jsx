import { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import StarRating from '../common/StarRating';
import { submitRating, deleteRating } from '../../api/ratingApi';

export default function StoreCard({ store, onRated, onOpenDetail }) {
  const [submitting, setSubmitting] = useState(false);
  const [localRating, setLocalRating] = useState(store.userRating || 0);

  useEffect(() => {
    setLocalRating(store.userRating || 0);
  }, [store.userRating]);

  const handleRate = async (value) => {
    setSubmitting(true);
    try {
      let newValue = value;
      if (value === localRating) newValue = value - 1;
      if (newValue <= 0) {
        await deleteRating(store.id);
        newValue = 0;
      } else {
        await submitRating({ storeId: store.id, value: newValue });
      }
      setLocalRating(newValue);
      onRated?.();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-surface border border-borderc rounded-2xl p-5 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
      <div onClick={() => onOpenDetail(store)} className="cursor-pointer">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-display font-bold text-textPrimary text-lg leading-tight">{store.name}</h3>
          <div className="flex items-center gap-1 bg-accent/15 text-accent px-2 py-1 rounded-lg text-sm font-semibold shrink-0 ml-2">
            <span>★</span>{store.overallRating || '—'}
          </div>
        </div>
        <p className="flex items-center gap-1.5 text-sm text-textSecondary mb-4">
          <MapPin size={14} /> {store.address}
        </p>
      </div>

      <div className="border-t border-borderc pt-4" onClick={(e) => e.stopPropagation()}>
        <p className="text-xs text-textSecondary mb-2">
          {localRating ? 'Your rating (click same star to remove)' : 'Rate this store'}
        </p>
        <StarRating value={localRating} onChange={handleRate} size={22} />
        {submitting && <p className="text-xs text-accent mt-1.5">Saving...</p>}
      </div>
    </div>
  );
}