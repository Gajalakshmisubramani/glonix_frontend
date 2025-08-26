"use client";
import { useState } from "react";
import {
  ChevronDownIcon,
  FunnelIcon,
  ArrowUpTrayIcon,
  ArrowsRightLeftIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function ProfitLossPage() {
  const [dateRange, setDateRange] = useState("This Month");
  const [reportBasis, setReportBasis] = useState("Accrual");
  const [compareWith, setCompareWith] = useState("None");
  const [showZeroBalance, setShowZeroBalance] = useState(true);

  const reportItems = [
    { account: "Operating Income", total: 0 },
    { account: "Cost of Goods Sold", total: 0 },
    { account: "Gross Profit", total: 0 },
    { account: "Operating Expense", total: 0 },
    { account: "Operating Profit", total: 0 },
    { account: "Non Operating Income", total: 0 },
    { account: "Non Operating Expense", total: 0 },
    { account: "Net Profit/Loss", total: 0 },
  ];

  const handleRunReport = () => {
    alert(`Running report for: ${dateRange}, Basis: ${reportBasis}, Compare With: ${compareWith}`);
  };

  const handleReset = () => {
    setDateRange("This Month");
    setReportBasis("Accrual");
    setCompareWith("None");
    setShowZeroBalance(true);
  };

  const handleExport = () => {
    alert("Exporting report...");
  };

  const handleShare = () => {
    alert("Sharing report...");
  };

  return (
    <div className="min-h-screen p-6 bg-green-50">
      {/* Breadcrumb / Title */}
      <div className="mb-6">
        <span className="font-medium text-green-700">
          Business Overview &gt; Profit and Loss
        </span>
        <span className="ml-2 text-green-600">
          • From 01/08/2025 To 31/08/2025
        </span>
        <h1 className="mt-2 text-3xl font-bold text-green-800">
          Profit and Loss
        </h1>
        <div className="text-green-700">Basis: {reportBasis}</div>
      </div>

      {/* Filters and Actions */}
      <div className="flex flex-col gap-4 mb-4 md:flex-row md:justify-between">
        <div className="flex flex-wrap gap-2">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-1 text-green-800 bg-white border border-green-300 rounded"
          >
            <option>This Month</option>
            <option>Last Month</option>
            <option>This Year</option>
          </select>
          <select
            value={reportBasis}
            onChange={(e) => setReportBasis(e.target.value)}
            className="px-3 py-1 text-green-800 bg-white border border-green-300 rounded"
          >
            <option>Accrual</option>
            <option>Cash</option>
          </select>
          <select
            value={compareWith}
            onChange={(e) => setCompareWith(e.target.value)}
            className="px-3 py-1 text-green-800 bg-white border border-green-300 rounded"
          >
            <option>None</option>
            <option>Last Month</option>
            <option>Last Year</option>
          </select>
          <button
            onClick={() => setShowZeroBalance(!showZeroBalance)}
            className="flex items-center gap-1 px-3 py-1 text-green-700 border border-green-400 rounded hover:bg-green-100"
          >
            {showZeroBalance ? "Hide" : "Show"} Zero Balance
            <FunnelIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleRunReport}
            className="flex items-center gap-1 px-3 py-1 text-white bg-green-600 rounded hover:bg-green-700"
          >
            Run Report <ChevronDownIcon className="w-4 h-4" />
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-1 px-3 py-1 text-green-800 bg-green-100 border border-green-400 rounded hover:bg-green-200"
          >
            Export <ArrowUpTrayIcon className="w-4 h-4" />
          </button>
          <button
            onClick={handleShare}
            className="flex items-center gap-1 px-3 py-1 text-green-800 border border-green-400 rounded hover:bg-green-100"
          >
            Share <ArrowUpTrayIcon className="w-4 h-4" />
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-3 py-1 text-red-600 border border-red-400 rounded hover:bg-red-100"
          >
            Reset <XMarkIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Report Table */}
      <div className="overflow-auto bg-white border border-green-200 rounded-lg shadow">
        <div className="flex justify-end gap-2 p-2 text-sm border-b border-green-200 bg-green-50">
          <select className="px-2 py-1 text-green-800 bg-white border border-green-300 rounded">
            <option>Accounts Without Zero Balance</option>
          </select>
          <select className="px-2 py-1 text-green-800 bg-white border border-green-300 rounded">
            <option>Compare With: {compareWith}</option>
          </select>
          <button className="px-2 py-1 text-green-800 border border-green-300 rounded hover:bg-green-100">
            Customize Report Columns
          </button>
        </div>

        <table className="min-w-full border-collapse">
          <thead className="sticky top-0 bg-green-100">
            <tr>
              <th className="px-4 py-2 text-left text-green-900 border-b border-green-200">
                ACCOUNT
              </th>
              <th className="px-4 py-2 text-right text-green-900 border-b border-green-200">
                TOTAL
              </th>
            </tr>
          </thead>
          <tbody>
            {reportItems
              .filter((item) => showZeroBalance || item.total !== 0)
              .map((item) => (
                <tr
                  key={item.account}
                  className="text-green-800 hover:bg-green-50"
                >
                  <td className="px-4 py-2">{item.account}</td>
                  <td className="px-4 py-2 text-right">
                    {item.total.toFixed(2)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* Footer */}
        <div className="flex items-center justify-between p-2 text-sm text-green-700 border-t border-green-200 bg-green-50">
          <div>
            Amount is displayed in your base currency{" "}
            <span className="px-1 bg-green-200 rounded">INR</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleRunReport}
              className="p-1 border border-green-300 rounded hover:bg-green-100"
            >
              <FunnelIcon className="w-4 h-4 text-green-700" />
            </button>
            <button
              onClick={handleShare}
              className="p-1 border border-green-300 rounded hover:bg-green-100"
            >
              <ArrowsRightLeftIcon className="w-4 h-4 text-green-700" />
            </button>
            <button
              onClick={handleExport}
              className="p-1 border border-green-300 rounded hover:bg-green-100"
            >
              <ArrowUpTrayIcon className="w-4 h-4 text-green-700" />
            </button>
            <button
              onClick={handleReset}
              className="p-1 text-red-600 border border-red-400 rounded hover:bg-red-100"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
