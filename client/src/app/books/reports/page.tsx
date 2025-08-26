// pages/reports/index.jsx
import Link from "next/link";

export default function ReportsPage() {
  const reports = [
    { name: "Profit and Loss", href: "/books/reports/profit-loss" },
    { name: "Balance Sheet", href: "/books/reports/balancesheet" },
  ];

  return (
    <div className="flex min-h-screen bg-green-50">
      {/* Sidebar */}
      <aside className="w-64 p-4 bg-white border-r border-green-200 shadow-md">
        <h2 className="mb-4 text-lg font-semibold text-green-800">
          Report Categories
        </h2>
        <ul className="space-y-2">
          <li className="font-semibold text-green-700">Business Overview</li>
          <li className="ml-4">
            <ul className="space-y-1">
              {reports.map((report) => (
                <li key={report.name}>
                  <Link
                    href={report.href}
                    className="text-green-700 hover:text-green-900 hover:underline"
                  >
                    {report.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="mb-6 text-2xl font-bold text-green-900">
          Reports Center
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {reports.map((report) => (
            <Link
              key={report.name}
              href={report.href}
              className="p-6 transition bg-white border border-green-200 rounded shadow hover:shadow-lg hover:border-green-400"
            >
              <h2 className="text-xl font-semibold text-green-800">
                {report.name}
              </h2>
              <p className="mt-2 text-green-600">View {report.name} report</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
