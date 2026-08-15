import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function RatingDistributionChart({ distribution }) {
  const data = [5, 4, 3, 2, 1].map((star) => ({
    star: `${star} ★`,
    count: distribution[star] || 0,
  }));

  return (
    <div className="bg-surface border border-borderc rounded-2xl p-5">
      <h3 className="font-display font-bold text-textPrimary mb-4">Rating Distribution</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} layout="vertical" margin={{ left: 10, right: 20 }}>
          <XAxis type="number" hide />
          <YAxis type="category" dataKey="star" width={40} tick={{ fill: 'var(--text-secondary)', fontSize: 13 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 13 }}
            labelStyle={{ color: 'var(--text-primary)' }}
          />
          <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={18}>
            {data.map((_, i) => <Cell key={i} fill="var(--accent)" />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}