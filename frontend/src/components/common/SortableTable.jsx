import { ChevronUp, ChevronDown } from 'lucide-react';

export default function SortableTable({ columns, data, sortBy, sortOrder, onSort, renderRow }) {
  return (
    <div className="bg-surface border border-borderc rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-borderc bg-bg">
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable !== false && onSort(col.key)}
                  className={`text-left px-5 py-3.5 font-semibold text-textSecondary ${col.sortable !== false ? 'cursor-pointer hover:text-textPrimary select-none' : ''}`}
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    {col.sortable !== false && sortBy === col.key && (
                      sortOrder === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr><td colSpan={columns.length} className="text-center py-10 text-textSecondary">No results found</td></tr>
            ) : (
              data.map((row, i) => (
                <tr key={row.id ?? i} className="border-b border-borderc last:border-0 hover:bg-bg/60 transition">
                  {renderRow(row)}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}