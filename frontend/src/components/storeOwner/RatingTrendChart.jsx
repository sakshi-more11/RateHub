import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

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
        <LineChart data={trend} margin={{ left: -20, right: 20, top: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="month" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis domain={[0, 5]} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 13 }}
            labelStyle={{ color: 'var(--text-primary)' }}
          />
          <Line type="monotone" dataKey="avgRating" stroke="var(--accent)" strokeWidth={2.5} dot={{ fill: 'var(--accent)', r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}