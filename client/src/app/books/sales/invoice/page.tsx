"use client";

import { useState } from "react";
import { Plus, ChevronDown, MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function InvoiceListPage() {
  const [statusFilter, setStatusFilter] = useState("Invoices");
  const [filterOpen, setFilterOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [page, setPage] = useState(1);

  const invoices = [
    { number: "INV-000001", customer: "John Doe", date: "2025-08-01", due: "2025-08-15", total: 5000, status: "Draft" },
    { number: "INV-000002", customer: "Acme Corp", date: "2025-08-05", due: "2025-08-20", total: 12500, status: "Sent" },
    { number: "INV-000003", customer: "Jane Smith", date: "2025-08-10", due: "2025-08-25", total: 8000, status: "Paid" },
  ];

  const filteredInvoices =
    statusFilter === "Invoices"
      ? invoices
      : invoices.filter((inv) => inv.status === statusFilter);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Draft":
        return "bg-yellow-100 text-yellow-700 border border-yellow-300";
      case "Sent":
        return "bg-blue-100 text-blue-700 border border-blue-300";
      case "Paid":
        return "bg-green-100 text-green-700 border border-green-300";
      case "Overdue":
        return "bg-red-100 text-red-700 border border-red-300";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen p-6 bg-[#f3fdf5]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-green-900">All Invoices</h1>
        <Link
          href="/books/sales/invoice/new"
          className="flex items-center gap-2 px-5 py-2 font-medium text-white bg-green-600 rounded-lg shadow-sm hover:bg-green-700"
        >
          <Plus size={16} /> New
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-hidden bg-white border border-green-100 shadow-sm rounded-xl">
        <table className="w-full text-sm">
          <thead className="bg-green-200 text-green-900">
            <tr>
              <th className="px-4 py-3 font-semibold text-left">Date</th>
              <th className="px-4 py-3 font-semibold text-left">Invoice Number</th>
              <th className="px-4 py-3 font-semibold text-left">Customer</th>
              <th className="px-4 py-3 font-semibold text-left">Due Date</th>
              <th className="px-4 py-3 font-semibold text-right">Amount</th>
              <th className="px-4 py-3 font-semibold text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.map((inv) => (
              <tr key={inv.number} className="transition border-b hover:bg-green-50">
                <td className="px-4 py-3">{inv.date}</td>
                <td className="px-4 py-3 font-medium text-green-700">{inv.number}</td>
                <td className="px-4 py-3">{inv.customer}</td>
                <td className="px-4 py-3">{inv.due}</td>
                <td className="px-4 py-3 font-medium text-right">₹{inv.total.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                      inv.status
                    )}`}
                  >
                    {inv.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6 text-sm text-gray-600">
        <span>
          Showing {filteredInvoices.length} of {invoices.length}
        </span>
        <div className="flex gap-1">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className={`flex items-center gap-1 border px-3 py-1.5 rounded-lg hover:bg-green-50 transition ${
              page === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <ChevronLeft size={14} /> Prev
          </button>
          <button className="border px-3 py-1.5 rounded-lg bg-green-600 text-white shadow-sm">
            {page}
          </button>
          <button
            onClick={() => setPage((p) => p + 1)}
            className="flex items-center gap-1 border px-3 py-1.5 rounded-lg hover:bg-green-50 transition"
          >
            Next <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
