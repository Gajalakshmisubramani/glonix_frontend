"use client";

import { useEffect, useState } from "react";
import { storage } from "./components/storage";
import { Bill } from "./components/types";
import BillTable from "./components/BillTable";
import NewBillDrawer from "./components/NewBillDrawer";

export default function BillsPage() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setBills(storage.getBills());
  }, []);

  return (
    <div className="p-4 md:p-6 space-y-4">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-emerald-700">All Bills</h1>
        <div className="flex items-center gap-2">
          <button
            className="rounded-xl bg-emerald-600 text-white px-4 py-2 hover:bg-emerald-700"
            onClick={() => setOpen(true)}
          >
            + New
          </button>
        </div>
      </div>

      {/* Table */}
      <BillTable bills={bills} />

      {/* Drawer for creating a bill */}
      <NewBillDrawer
        open={open}
        onClose={() => setOpen(false)}
        onSaved={(b) => {
          const next = [b, ...storage.getBills().filter((x) => x.id !== b.id)];
          storage.setBills(next);
          setBills(next);
        }}
      />
    </div>
  );
}
