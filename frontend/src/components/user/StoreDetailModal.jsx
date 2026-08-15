import { MapPin } from 'lucide-react';
import Modal from '../common/Modal';
import StarRating from '../common/StarRating';

export default function StoreDetailModal({ store, open, onClose, onRate }) {
  if (!store) return null;

  return (
    <Modal open={open} onClose={onClose} title="Store Details">
      <div className="space-y-4">
        <div>
          <p className="text-xs text-textSecondary">Store Name</p>
          <p className="text-textPrimary font-semibold text-lg">{store.name}</p>
        </div>
        <div>
          <p className="text-xs text-textSecondary flex items-center gap-1"><MapPin size={12} /> Address</p>
          <p className="text-textPrimary">{store.address}</p>
        </div>
        <div>
          <p className="text-xs text-textSecondary">Overall Rating</p>
          <p className="text-textPrimary font-semibold flex items-center gap-1">★ {store.overallRating || 'No ratings yet'}</p>
        </div>
        <div className="border-t border-borderc pt-4">
          <p className="text-xs text-textSecondary mb-2">
            {store.userRating ? 'Your submitted rating (click same star to remove)' : 'Submit your rating'}
          </p>
          <StarRating value={store.userRating || 0} onChange={(v) => onRate(store, v)} size={26} />
        </div>
      </div>
    </Modal>
  );
}