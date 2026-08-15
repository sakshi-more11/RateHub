import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import Modal from '../common/Modal';
import { getUserDetail } from '../../api/adminApi';

export default function UserDetailModal({ userId, open, onClose }) {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && userId) {
      setLoading(true);
      getUserDetail(userId)
        .then((res) => setDetail(res.data))
        .finally(() => setLoading(false));
    } else {
      setDetail(null);
    }
  }, [open, userId]);

  return (
    <Modal open={open} onClose={onClose} title="User Details">
      {loading && <p className="text-textSecondary text-sm">Loading...</p>}
      {!loading && detail && (
        <div className="space-y-4">
          <div>
            <p className="text-xs text-textSecondary">Name</p>
            <p className="text-textPrimary font-medium">{detail.name}</p>
          </div>
          <div>
            <p className="text-xs text-textSecondary">Email</p>
            <p className="text-textPrimary font-medium">{detail.email}</p>
          </div>
          <div>
            <p className="text-xs text-textSecondary">Address</p>
            <p className="text-textPrimary font-medium">{detail.address}</p>
          </div>
          <div>
            <p className="text-xs text-textSecondary">Role</p>
            <span className="inline-block text-xs font-medium px-2.5 py-1 rounded-full bg-accent/15 text-accent capitalize mt-1">
              {detail.role.replace('_', ' ').toLowerCase()}
            </span>
          </div>
          {detail.role === 'STORE_OWNER' && (
            <div>
              <p className="text-xs text-textSecondary">Store Rating</p>
              <div className="flex items-center gap-1.5 mt-1">
                <Star size={18} className="fill-accent text-accent" />
                <span className="text-textPrimary font-semibold">
                  {detail.storeRating ? detail.storeRating : 'No ratings yet'}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
}