"use client";

import { useState } from "react";
import {
  FunnelIcon,
  ArrowUpTrayIcon,
  ArrowsRightLeftIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function BalanceSheetPage() {
  const [asOfDate, setAsOfDate] = useState("Today");
  const [reportBasis, setReportBasis] = useState("Accrual");
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);

  const reportItems = [
    {
      account: "Assets",
      total: 0,
      children: [
        {
          account: "Current Assets",
          total: 0,
          children: [
            { account: "Cash", total: 0 },
            { account: "Bank", total: 0 },
            { account: "Accounts Receivable", total: 0 },
            { account: "Other current assets", total: 0 },
            { account: "Total Current Assets", total: 0 },
          ],
        },
        { account: "Other Assets", total: 0 },
        { account: "Fixed Assets", total: 0 },
        { account: "Total Assets", total: 0 },
      ],
    },
    {
      account: "Liabilities & Equities",
      total: 0,
      children: [
        {
          account: "Liabilities",
          total: 0,
          children: [
            { account: "Current Liabilities", total: 0 },
            { account: "Long Term Liabilities", total: 0 },
            { account: "Other Liabilities", total: 0 },
            { account: "Total Liabilities", total: 0 },
          ],
        },
        { account: "Equities", total: 0 },
        { account: "Total Liabilities & Equities", total: 0 },
      ],
    },
  ];

  const handleReset = () => {
    setAsOfDate("Today");
    setReportBasis("Accrual");
    alert("Filters reset!");
  };

  const handleApplyFilter = () => {
    alert(
      `Applying filter:\nDate Range: ${asOfDate}\nReport Basis: ${reportBasis}`
    );
  };

  const handleExport = () => {
    const flattenItems = (items, parent = "") =>
      items.flatMap((item) => [
        [
          parent ? parent + " > " + item.account : item.account,
          item.total.toFixed(2),
        ],
        ...(item.children ? flattenItems(item.children, item.account) : []),
      ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [["ACCOUNT", "TOTAL"], ...flattenItems(reportItems)]
        .map((e) => e.join(","))
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.href = encodedUri;
    link.download = "balance_sheet.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderRows = (items, level = 0) =>
    items.flatMap((item) => {
      const rows = [
        <tr key={item.account} className="hover:bg-green-50">
          <td
            className="px-4 py-2 font-semibold text-green-900"
            style={{ paddingLeft: `${level * 20}px` }}
          >
            {item.account}
          </td>
          <td className="px-4 py-2 text-right text-green-700">
            {item.total !== undefined ? item.total.toFixed(2) : ""}
          </td>
        </tr>,
      ];
      if (item.children) {
        rows.push(...renderRows(item.children, level + 1));
      }
      return rows;
    });

  return (
    <div className="flex flex-col h-screen bg-green-50">
      {/* Breadcrumb & Page Title */}
      <div className="flex items-center justify-between p-4 bg-green-100 border-b border-green-200">
        <div>
          <span className="font-medium text-green-800">
            Business Overview &gt; Balance Sheet
          </span>
          <span className="ml-2 text-green-600">• As of 24/08/2025</span>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex items-center justify-between p-4 bg-white border-b border-green-200 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-green-800">Filters</span>
          <select
            value={asOfDate}
            onChange={(e) => setAsOfDate(e.target.value)}
            className="px-2 py-1 text-green-800 border border-green-300 rounded bg-green-50"
          >
            <option>Today</option>
            <option>Yesterday</option>
            <option>This Month</option>
          </select>
          <select
            value={reportBasis}
            onChange={(e) => setReportBasis(e.target.value)}
            className="px-2 py-1 text-green-800 border border-green-300 rounded bg-green-50"
          >
            <option>Accrual</option>
            <option>Cash</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <FunnelIcon
            onClick={handleApplyFilter}
            className="w-5 h-5 text-green-700 cursor-pointer hover:text-green-900"
          />
          <button
            className="p-2 border border-green-300 rounded hover:bg-green-100"
            onClick={() => alert("Report refreshed")}
          >
            <ArrowsRightLeftIcon className="w-4 h-4 text-green-700" />
          </button>
          <button
            className="p-2 border border-green-300 rounded hover:bg-green-100"
            onClick={handleExport}
          >
            <ArrowUpTrayIcon className="w-4 h-4 text-green-700" />
          </button>
          <button
            className="p-2 text-red-500 border border-green-300 rounded hover:bg-green-100"
            onClick={handleReset}
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
          <button
            className="px-3 py-1 text-white bg-green-600 border rounded hover:bg-green-700"
            onClick={() => setShowCustomizeModal(true)}
          >
            Customize Columns
          </button>
        </div>
      </div>

      {/* Main Report Table */}
      <main className="flex-1 p-4 overflow-auto">
        <div className="mb-4 text-center">
          <div className="text-lg font-semibold text-green-800">Test</div>
          <div className="text-2xl font-bold text-green-900">Balance Sheet</div>
          <div className="text-green-700">Basis: {reportBasis}</div>
          <div className="text-green-600">As of 24/08/2025</div>
        </div>

        <div className="relative p-4 bg-white border border-green-200 rounded-lg shadow">
          <table className="min-w-full border border-green-200">
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
            <tbody>{renderRows(reportItems)}</tbody>
          </table>

          <div className="flex items-center justify-between mt-2 text-sm text-green-700">
            <div>
              Amount is displayed in your base currency{" "}
              <span className="bg-green-100 px-2 py-0.5 rounded text-green-800">
                INR
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Customize Modal */}
      {showCustomizeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="p-6 bg-white border border-green-200 shadow-lg rounded-xl w-96">
            <h2 className="mb-2 text-lg font-bold text-green-900">
              Customize Columns
            </h2>
            <p className="text-green-700">
              Here you can select which columns to show/hide.
            </p>
            <button
              className="px-4 py-2 mt-4 text-white bg-green-600 rounded hover:bg-green-700"
              onClick={() => setShowCustomizeModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
