"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { jsPDF } from "jspdf";

type Item = {
  id: number;
  name: string;
  qty: number;
  rate: number;
};

export default function NewChallanPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    customerName: "",
    challanNo: "DC-" + String(Date.now()).slice(-5), // unique challan #
    referenceNo: "",
    date: new Date().toISOString().split("T")[0],
    challanType: "",
    discount: 0,
    adjustment: 0,
    notes: "",
    terms: "",
    status: "DRAFT",
    invoiceStatus: "PENDING",
  });

  const [items, setItems] = useState<Item[]>([
    { id: Date.now(), name: "", qty: 1, rate: 0 },
  ]);

  // --- helpers ---
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      // cast numbers for numeric fields
      [name]:
        name === "discount" || name === "adjustment"
          ? Number(value || 0)
          : value,
    }));
  };

  const handleItemChange = (id: number, field: keyof Item, value: string | number) => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === id
          ? {
              ...i,
              [field]:
                field === "qty" || field === "rate"
                  ? Number(value || 0)
                  : (value as string),
            }
          : i
      )
    );
  };

  const addRow = () =>
    setItems((prev) => [
      ...prev,
      { id: Date.now(), name: "", qty: 1, rate: 0 },
    ]);

  const removeRow = (id: number) =>
    setItems((prev) => (prev.length > 1 ? prev.filter((i) => i.id !== id) : prev));

  // --- totals ---
  const subtotal = items.reduce((sum, i) => sum + i.qty * i.rate, 0);
  const discountAmt = (subtotal * Number(form.discount || 0)) / 100;
  const total = subtotal - discountAmt + Number(form.adjustment || 0);

  const handleSaveDraft = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const newChallan = { ...form, items, subtotal, discountAmt, total };
    const existing = JSON.parse(localStorage.getItem("challans") || "[]");
    localStorage.setItem("challans", JSON.stringify([...existing, newChallan]));
    router.push("/books/sales/challans");
  };

  // --- PDF Generation ---
  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Delivery Challan", 105, 15, { align: "center" });

    doc.setFontSize(12);
    doc.text(`Challan No: ${form.challanNo}`, 20, 35);
    doc.text(`Date: ${form.date}`, 150, 35);
    doc.text(`Reference No: ${form.referenceNo}`, 20, 45);
    doc.text(`Customer: ${form.customerName}`, 20, 55);
    doc.text(`Challan Type: ${form.challanType}`, 20, 65);

    // Table headers
    doc.text("Item", 20, 80);
    doc.text("Qty", 100, 80);
    doc.text("Rate", 130, 80);
    doc.text("Amount", 160, 80);

    // Table rows
    let y = 90;
    items.forEach((item) => {
      doc.text(item.name || "-", 20, y);
      doc.text(String(item.qty || 0), 100, y);
      doc.text((item.rate || 0).toFixed(2), 130, y);
      doc.text(((item.qty || 0) * (item.rate || 0)).toFixed(2), 160, y);
      y += 10;
    });

    // Totals
    doc.text(`Sub Total: ₹${subtotal.toFixed(2)}`, 20, y + 10);
    doc.text(`Discount: ₹${discountAmt.toFixed(2)} (${form.discount}%)`, 20, y + 20);
    doc.text(`Adjustment: ₹${Number(form.adjustment || 0).toFixed(2)}`, 20, y + 30);
    doc.text(`Total: ₹${total.toFixed(2)}`, 20, y + 40);

    // Notes / Terms
    if (form.notes) doc.text(`Notes: ${form.notes}`, 20, y + 55);
    if (form.terms) doc.text(`Terms: ${form.terms}`, 20, y + 65);

    doc.save(`${form.challanNo}.pdf`);
  };

  return (
    <div className="min-h-screen p-6 bg-green-50">
      <h1 className="mb-4 text-2xl font-bold text-green-800">New Delivery Challan</h1>

      <form onSubmit={handleSaveDraft} className="p-6 space-y-6 bg-white shadow-lg rounded-xl">
        {/* Customer */}
        <div>
          <label className="block mb-1 font-medium text-green-800">Customer Name*</label>
          <input
            type="text"
            name="customerName"
            value={form.customerName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-green-300 rounded-lg"
            required
          />
        </div>

        {/* Challan Info */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="block mb-1 font-medium text-green-800">Delivery Challan#</label>
            <input
              type="text"
              value={form.challanNo}
              className="w-full px-3 py-2 border border-green-300 rounded-lg"
              readOnly
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-green-800">Reference#</label>
            <input
              type="text"
              name="referenceNo"
              value={form.referenceNo}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-green-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-green-800">Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-green-300 rounded-lg"
            />
          </div>
        </div>

        {/* Challan Type */}
        <div>
          <label className="block mb-1 font-medium text-green-800">Challan Type*</label>
          <select
            name="challanType"
            value={form.challanType}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-green-300 rounded-lg"
            required
          >
            <option value="">Choose</option>
            <option>Supply of Liquid Gas</option>
            <option>Job Work</option>
            <option>Supply on Approval</option>
            <option>Others</option>
          </select>
        </div>

        {/* Items */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-green-700">Item Table</h2>
            <span className="text-sm text-green-700/80">Bulk Actions</span>
          </div>

          <div className="overflow-hidden border rounded-xl">
            <table className="w-full">
              <thead className="text-green-900 bg-green-200">
                <tr>
                  <th className="p-2 text-left">Item Details</th>
                  <th className="p-2 text-left">Quantity</th>
                  <th className="p-2 text-left">Rate</th>
                  <th className="p-2 text-left">Amount</th>
                  <th className="p-2"></th>
                </tr>
              </thead>
              <tbody>
                {items.map((row) => (
                  <tr key={row.id} className="border-b bg-green-50">
                    <td className="p-2">
                      <input
                        value={row.name}
                        onChange={(e) => handleItemChange(row.id, "name", e.target.value)}
                        placeholder="Type or click to select an item"
                        className="w-full px-2 py-1 border rounded"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        min={0}
                        value={row.qty}
                        onChange={(e) => handleItemChange(row.id, "qty", Number(e.target.value))}
                        className="w-24 px-2 py-1 border rounded"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        min={0}
                        value={row.rate}
                        onChange={(e) => handleItemChange(row.id, "rate", Number(e.target.value))}
                        className="px-2 py-1 border rounded w-28"
                      />
                    </td>
                    <td className="p-2 font-medium">₹{(row.qty * row.rate).toFixed(2)}</td>
                    <td className="p-2">
                      <button
                        type="button"
                        onClick={() => removeRow(row.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Remove row"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap gap-3 mt-3">
            <button
              type="button"
              onClick={addRow}
              className="px-4 py-2 text-white bg-green-600 rounded-lg shadow hover:bg-green-700"
            >
              + Add New Row
            </button>
            <button type="button" className="px-4 py-2 border rounded-lg hover:bg-green-100">
              + Add Items in Bulk
            </button>
          </div>
        </div>

        {/* Totals card */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-green-800">Customer Notes</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div className="p-4 space-y-3 border bg-green-50 rounded-2xl">
            <div className="flex justify-between">
              <span className="text-green-900">Sub Total</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <label className="text-green-900">Discount</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={0}
                  max={100}
                  name="discount"
                  value={form.discount}
                  onChange={handleChange}
                  className="w-24 px-2 py-1 border rounded"
                />
                <span>%</span>
                <span className="text-sm text-gray-600">₹{discountAmt.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <label className="text-green-900">Adjustment</label>
              <input
                type="number"
                name="adjustment"
                value={form.adjustment}
                onChange={handleChange}
                className="px-2 py-1 border rounded w-28"
              />
            </div>

            <div className="flex justify-between pt-2 text-lg font-semibold text-green-800 border-t">
              <span>Total (₹)</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-green-800">Terms & Conditions</label>
          <textarea
            name="terms"
            value={form.terms}
            onChange={handleChange}
            className="w-full px-3 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.push("/books/sales/challans")}
            className="px-6 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSaveDraft}
            className="px-6 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
          >
            Save as Draft
          </button>
          <button
            type="button"
            onClick={generatePDF}
            className="px-6 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
          >
            Download PDF
          </button>
        </div>
      </form>
    </div>
  );
}
