import { useState, useEffect } from 'react';
import { Star, Users, TrendingUp, MapPin } from 'lucide-react';
import Navbar from '../../components/common/Navbar';
import RatingDistributionChart from '../../components/storeOwner/RatingDistributionChart';
import RatingTrendChart from '../../components/storeOwner/RatingTrendChart';
import RatingGauge from '../../components/storeOwner/RatingGauge';
import RaterTable from '../../components/storeOwner/RaterTable';
import { getMyStoreDashboard } from '../../api/analyticsApi';
import RecentActivity from '../../components/storeOwner/RecentActivity';

function monthLabel(m) {
  return new Date(`${m}-01`).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export default function OwnerDashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getMyStoreDashboard()
      .then((res) => setData(res.data))
      .catch((err) => setError(err.response?.data?.message || 'Failed to load dashboard'));
  }, []);

  const topRatedEntry = data?.distribution
    ? Object.entries(data.distribution).filter(([, c]) => c > 0).sort((a, b) => b[1] - a[1])[0]
    : null;

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
            <div className="bg-surface border border-borderc rounded-2xl p-6 mb-6 flex flex-col sm:flex-row items-center gap-8">
              <div className="flex flex-col items-center shrink-0">
                <RatingGauge value={data.avgRating} />
                <p className="text-textSecondary text-sm mt-3">Average Rating</p>
              </div>

              <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex items-center gap-3 bg-bg/50 border border-borderc rounded-xl p-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center shrink-0">
                    <Users size={18} className="text-accent" />
                  </div>
                  <div>
                    <p className="font-display text-xl font-bold text-textPrimary leading-none">{data.totalRatings}</p>
                    <p className="text-textSecondary text-xs mt-1">Ratings submitted</p>
                  </div>
                </div>

                {data.trend?.length >= 2 && (() => {
                  const delta = Math.round((data.trend.at(-1).avgRating - data.trend[0].avgRating) * 10) / 10;
                  const up = delta > 0, flat = delta === 0;
                  return (
                    <div className="flex items-center gap-3 bg-bg/50 border border-borderc rounded-xl p-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${flat ? 'bg-textSecondary/10' : up ? 'bg-accent/15' : 'bg-danger/15'}`}>
                        <TrendingUp size={18} className={flat ? 'text-textSecondary' : up ? 'text-accent' : 'text-danger rotate-180'} />
                      </div>
                      <div>
                        <p className={`font-display text-xl font-bold leading-none ${flat ? 'text-textPrimary' : up ? 'text-accent' : 'text-danger'}`}>
                          {flat ? 'Flat' : `${up ? '+' : ''}${delta}`}
                        </p>
                        <p className="text-textSecondary text-xs mt-1">Since {monthLabel(data.trend[0].month)}</p>
                      </div>
                    </div>
                  );
                })()}

                {topRatedEntry && (
                  <div className="flex items-center gap-3 bg-bg/50 border border-borderc rounded-xl p-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center shrink-0">
                      <Star size={18} className="text-accent fill-accent" />
                    </div>
                    <div>
                      <p className="font-display text-xl font-bold text-textPrimary leading-none">{topRatedEntry[0]}★</p>
                      <p className="text-textSecondary text-xs mt-1">Most common rating</p>
                    </div>
                  </div>
                )}
              </div>
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