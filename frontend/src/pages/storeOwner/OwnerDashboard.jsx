import { useState, useEffect } from 'react';
import { Star, Users } from 'lucide-react';
import Navbar from '../../components/common/Navbar';
import StatCard from '../../components/common/StatCard';
import RatingDistributionChart from '../../components/storeOwner/RatingDistributionChart';
import RatingTrendChart from '../../components/storeOwner/RatingTrendChart';
import RaterTable from '../../components/storeOwner/RaterTable';
import { getMyStoreDashboard } from '../../api/analyticsApi';
import RecentActivity from '../../components/storeOwner/RecentActivity';
import { MapPin } from 'lucide-react';

export default function OwnerDashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getMyStoreDashboard()
      .then((res) => setData(res.data))
      .catch((err) => setError(err.response?.data?.message || 'Failed to load dashboard'));
  }, []);

  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="font-display text-2xl font-bold text-textPrimary mb-1">
          {data ? data.storeName : 'My Store'}
        </h1>
        <p className="text-textSecondary mb-6 flex items-center gap-1.5">
          {data?.storeAddress && <><MapPin size={14} /> {data.storeAddress}</>}
        </p>

        {error && <div className="text-sm text-danger bg-danger/10 border border-danger/30 rounded-lg px-4 py-3">{error}</div>}

        {data && (
          <>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <StatCard label="Average Rating" value={data.avgRating || '—'} icon={Star} accent />
              <StatCard label="Total Ratings" value={data.totalRatings} icon={Users} />
            </div>

            <div className="grid lg:grid-cols-2 gap-5 mb-6">
              <RatingDistributionChart distribution={data.distribution} />
              <RatingTrendChart trend={data.trend} />
            </div>
            <div className="mb-6">
                 <RecentActivity raters={data.raters} />
            </div>

            <RaterTable raters={data.raters} />
          </>
        )}
      </div>
    </div>
  );
}