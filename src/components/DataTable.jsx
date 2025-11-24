import React, { useState, useMemo } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

/**
 * DataTable Component
 * Reusable table with sorting, filtering, and pagination
 * 
 * Props:
 *   - columns: [{ key, label, render?, sortable?, width? }, ...]
 *   - data: []
 *   - onRowClick?: (row) => void
 *   - rowClassName?: (row) => string
 *   - emptyMessage?: string
 *   - pageSize?: number
 */
export default function DataTable({
  columns,
  data = [],
  onRowClick,
  rowClassName,
  emptyMessage = "No data available",
  pageSize = 10,
}) {
  const [sortConfig, setSortConfig] = useState({ key: null, order: "asc" });
  const [currentPage, setCurrentPage] = useState(0);

  // Sorting logic
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;

    const sorted = [...data].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];

      if (typeof aVal === "string") {
        return sortConfig.order === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      return sortConfig.order === "asc" ? aVal - bVal : bVal - aVal;
    });

    return sorted;
  }, [data, sortConfig]);

  // Pagination
  const paginatedData = useMemo(() => {
    const start = currentPage * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  const handleSort = (columnKey) => {
    setSortConfig((prev) => ({
      key: columnKey,
      order: prev.key === columnKey && prev.order === "asc" ? "desc" : "asc",
    }));
    setCurrentPage(0);
  };

  return (
    <div className="space-y-3">
      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-dark-800 bg-dark-950/50">
        <table className="w-full text-xs border-collapse">
          <thead className="bg-dark-950/80 border-b border-dark-800">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable && handleSort(col.key)}
                  className={`px-4 py-3 text-left font-medium text-dark-300 ${
                    col.sortable ? "cursor-pointer hover:text-dark-100" : ""
                  }`}
                  style={{ width: col.width }}
                >
                  <div className="flex items-center gap-2">
                    {col.label}
                    {col.sortable && sortConfig.key === col.key && (
                      sortConfig.order === "asc" ? (
                        <ChevronUp className="w-3 h-3" />
                      ) : (
                        <ChevronDown className="w-3 h-3" />
                      )
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, idx) => (
                <tr
                  key={row.id || idx}
                  onClick={() => onRowClick?.(row)}
                  className={`border-b border-dark-800 hover:bg-dark-900/50 transition-colors ${
                    onRowClick ? "cursor-pointer" : ""
                  } ${rowClassName?.(row) || ""}`}
                >
                  {columns.map((col) => (
                    <td
                      key={`${row.id}-${col.key}`}
                      className="px-4 py-3 text-dark-200"
                      style={{ width: col.width }}
                    >
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-dark-500">
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-xs">
          <div className="text-dark-400">
            Page {currentPage + 1} of {totalPages} ({sortedData.length} total)
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              className="px-3 py-1.5 rounded-lg bg-dark-900 border border-dark-800 text-dark-300 disabled:opacity-50 hover:bg-dark-800 transition-colors"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
              disabled={currentPage === totalPages - 1}
              className="px-3 py-1.5 rounded-lg bg-dark-900 border border-dark-800 text-dark-300 disabled:opacity-50 hover:bg-dark-800 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
