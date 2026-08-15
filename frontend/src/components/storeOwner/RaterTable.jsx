export default function RaterTable({ raters }) {
  return (
    <div className="bg-surface border border-borderc rounded-2xl overflow-hidden">
      <div className="px-5 py-4 border-b border-borderc">
        <h3 className="font-display font-bold text-textPrimary">Users Who Rated Your Store</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-bg border-b border-borderc">
              <th className="text-left px-5 py-3 font-semibold text-textSecondary">Name</th>
              <th className="text-left px-5 py-3 font-semibold text-textSecondary">Email</th>
              <th className="text-left px-5 py-3 font-semibold text-textSecondary">Rating</th>
            </tr>
          </thead>
          <tbody>
            {raters.length === 0 ? (
              <tr><td colSpan={3} className="text-center py-10 text-textSecondary">No ratings submitted yet</td></tr>
            ) : (
              raters.map((r) => (
                <tr key={r.userId} className="border-b border-borderc last:border-0 hover:bg-bg/60 transition">
                  <td className="px-5 py-3 text-textPrimary font-medium">{r.name}</td>
                  <td className="px-5 py-3 text-textSecondary">{r.email}</td>
                  <td className="px-5 py-3">
                    <span className="flex items-center gap-1 text-accent font-medium">★ {r.rating}</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}