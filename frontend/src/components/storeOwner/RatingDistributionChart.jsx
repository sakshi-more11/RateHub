import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';

export default function RatingDistributionChart({ distribution }) {
  const total = Object.values(distribution).reduce((a, b) => a + b, 0);
  const data = [5, 4, 3, 2, 1].map((star) => ({
    star: `${star} ★`,
    count: distribution[star] || 0,
  }));
  const maxCount = Math.max(...data.map(d => d.count), 1);

  return (
    <div className="bg-surface border border-borderc rounded-2xl p-5">
      <div className="flex items-baseline justify-between mb-4">
        <h3 className="font-display font-bold text-textPrimary">Rating Distribution</h3>
        <span className="text-textSecondary text-xs">{total} total</span>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} layout="vertical" margin={{ left: 10, right: 36 }}>
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.55" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="1" />
            </linearGradient>
          </defs>
          <XAxis type="number" hide domain={[0, maxCount * 1.4]} />
          <YAxis type="category" dataKey="star" width={40} tick={{ fill: 'var(--text-secondary)', fontSize: 13 }} axisLine={false} tickLine={false} />
          <Tooltip
            cursor={{ fill: 'var(--border)', opacity: 0.3 }}
            contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 13 }}
            labelStyle={{ color: 'var(--text-primary)' }}
            formatter={(value) => [`${value} rating${value === 1 ? '' : 's'}`, '']}
          />
          <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={18}>
            {data.map((_, i) => <Cell key={i} fill="url(#barGradient)" />)}
            <LabelList
              dataKey="count"
              position="right"
              content={({ x, y, width, height, value }) =>
                value > 0 ? (
                  <text x={x + width + 8} y={y + height / 2} dy={4} fill="var(--text-secondary)" fontSize={12}>
                    {value} · {total ? Math.round((value / total) * 100) : 0}%
                  </text>
                ) : null
              }
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}