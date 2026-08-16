import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

function formatMonth(month) {
  return new Date(`${month}-01`).toLocaleDateString('en-US', { month: 'short' });
}

export default function RatingTrendChart({ trend }) {
  if (!trend || trend.length === 0) {
    return (
      <div className="bg-surface border border-borderc rounded-2xl p-5">
        <h3 className="font-display font-bold text-textPrimary mb-4">Rating Trend</h3>
        <p className="text-textSecondary text-sm">Not enough data yet to show a trend.</p>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-borderc rounded-2xl p-5">
      <h3 className="font-display font-bold text-textPrimary mb-4">Rating Trend</h3>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={trend} margin={{ left: -20, right: 20, top: 10 }}>
          <defs>
            <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis dataKey="month" tickFormatter={formatMonth} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis domain={[0, 5]} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip
            labelFormatter={formatMonth}
            contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 13 }}
            labelStyle={{ color: 'var(--text-primary)' }}
          />
          <Area
            type="monotone" dataKey="avgRating"
            stroke="var(--accent)" strokeWidth={2.5}
            fill="url(#trendFill)"
            dot={{ fill: 'var(--accent)', r: 4, strokeWidth: 2, stroke: 'var(--surface)' }}
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}