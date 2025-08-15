"use client";

import { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaUpload,
  FaInfoCircle,
} from "react-icons/fa";

type TabKey =
  | "Other Details"
  | "Address"
  | "Contact Persons"
  | "Custom Fields"
  | "Reporting Tags"
  | "Remarks";

type ContactPerson = {
  salutation: string;
  firstName: string;
  lastName: string;
  email: string;
  workPhone: string;
  mobile: string;
};

export default function NewCustomerPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("Other Details");
  const [customerType, setCustomerType] = useState<"Business" | "Individual">(
    "Business"
  );

  const [contactPersons, setContactPersons] = useState<ContactPerson[]>([
    { salutation: "", firstName: "", lastName: "", email: "", workPhone: "", mobile: "" },
  ]);

  const inputBase =
    "w-full rounded-md border border-green-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500";
  const withIcon =
    "flex items-center rounded-md border border-green-300 px-3 focus-within:ring-2 focus-within:ring-green-500";

  return (
    <div className="min-h-screen bg-green-50 p-6 sm:p-8">
      <div className="mx-auto max-w-6xl rounded-lg border border-green-200 bg-white p-6 shadow">
        {/* Header */}
        <h1 className="mb-6 text-2xl font-semibold text-green-700">New Customer</h1>

        {/* Customer Type */}
        <div className="mb-5">
          <label className="mb-2 block font-medium text-green-800">Customer Type</label>
          <div className="flex gap-8">
            <label className="flex items-center gap-2 text-green-800">
              <input
                type="radio"
                className="text-green-600 focus:ring-green-600"
                checked={customerType === "Business"}
                onChange={() => setCustomerType("Business")}
              />
              Business
            </label>
            <label className="flex items-center gap-2 text-green-800">
              <input
                type="radio"
                className="text-green-600 focus:ring-green-600"
                checked={customerType === "Individual"}
                onChange={() => setCustomerType("Individual")}
              />
              Individual
            </label>
          </div>
        </div>

        {/* Primary Contact */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="mb-1 block font-medium text-green-800">Salutation</label>
            <select className={inputBase}>
              <option>Select</option>
              <option>Dr</option>
              <option>Mr</option>
              <option>Ms</option>
              <option>Mrs</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block font-medium text-green-800">First Name</label>
            <div className={withIcon}>
              <FaUser className="mr-2 text-green-500" />
              <input type="text" className="w-full py-2 outline-none" placeholder="First Name" />
            </div>
          </div>
          <div>
            <label className="mb-1 block font-medium text-green-800">Last Name</label>
            <input type="text" className={inputBase} placeholder="Last Name" />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block font-medium text-green-800">Company Name</label>
            <input type="text" className={inputBase} />
          </div>
          <div>
            <label className="mb-1 block font-medium text-green-800">
              Display Name <span className="text-red-500">*</span>
            </label>
            <select className={inputBase}>
              <option>Select or type to add</option>
            </select>
            <p className="mt-1 text-sm text-red-500">Enter the Display Name of your customer.</p>
          </div>
        </div>

        <div className="mt-4">
          <label className="mb-1 block font-medium text-green-800">Email Address</label>
          <div className={withIcon}>
            <FaEnvelope className="mr-2 text-green-500" />
            <input type="email" className="w-full py-2 outline-none" placeholder="Email Address" />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block font-medium text-green-800">Work Phone</label>
            <div className={withIcon}>
              <FaPhone className="mr-2 text-green-500" />
              <input type="tel" className="w-full py-2 outline-none" placeholder="Work Phone" />
            </div>
          </div>
          <div>
            <label className="mb-1 block font-medium text-green-800">Mobile</label>
            <div className={withIcon}>
              <FaPhone className="mr-2 text-green-500" />
              <input type="tel" className="w-full py-2 outline-none" placeholder="Mobile" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6 border-b border-green-200">
          {[
            "Other Details",
            "Address",
            "Contact Persons",
            "Custom Fields",
            "Reporting Tags",
            "Remarks",
          ].map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t as TabKey)}
              className={`mr-6 border-b-2 py-2 text-sm ${
                activeTab === t
                  ? "border-green-600 text-green-700"
                  : "border-transparent text-green-600 hover:text-green-700"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* =========== OTHER DETAILS TAB =========== */}
        {activeTab === "Other Details" && (
          <div className="mt-5 space-y-4">
            {/* PAN */}
            <div>
              <label className="mb-1 block font-medium text-green-800">PAN</label>
              <input type="text" className={inputBase} />
            </div>

            {/* Currency */}
            <div>
              <label className="mb-1 block font-medium text-green-800">Currency</label>
              <select className={inputBase} defaultValue="INR - Indian Rupee">
                <option>ED - UAE Dirham</option>
                <option>AUD - Australian Dollar</option>
                <option>BND - Brunei Dollar</option>
                <option>CAD - Canadian Dollar</option>
                <option>CNY - Yuan Renminbi</option>
                <option>EUR - Euro</option>
                <option>GBP - Pound Sterling</option>
                <option>INR - Indian Rupee</option>
                <option>JPY - Japanese Yen</option>
                <option>SAR - Saudi Riyal</option>
                <option>USD - United States Dollar</option>
                <option>ZAR - South African Rand</option>
              </select>
              <button className="mt-2 text-sm font-medium text-green-600 hover:underline">
                Add new currency
              </button>
            </div>

            {/* Opening Balance */}
            <div>
              <label className="mb-1 block font-medium text-green-800">Opening Balance</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="w-20 rounded-md border border-green-300 bg-green-50 px-2 py-2 text-center text-green-700"
                  value="INR"
                  readOnly
                />
                <input type="number" className={inputBase} placeholder="0.00" />
              </div>
            </div>

            {/* Payment Terms */}
            <div>
              <label className="mb-1 block font-medium text-green-800">Payment Terms</label>
              <select className={inputBase} defaultValue="Due on Receipt">
                <option>Due on Receipt</option>
                <option>Net 7</option>
                <option>Net 15</option>
                <option>Net 30</option>
                <option>Net 45</option>
              </select>
            </div>

            {/* Enable Portal */}
            <div>
              <label className="mb-1 flex items-center gap-2 font-medium text-green-800">
                Enable Portal? <FaInfoCircle className="text-green-500" />
              </label>
              <label className="flex items-center gap-2 text-green-900">
                <input type="checkbox" className="text-green-600 focus:ring-green-600" />
                Allow portal access for this customer
              </label>
            </div>

            {/* Portal Language */}
            <div>
              <label className="mb-1 block font-medium text-green-800">Portal Language</label>
              <select className={inputBase} defaultValue="English">
                <option>English</option>
                <option>Hindi</option>
                <option>Tamil</option>
                <option>French</option>
              </select>
            </div>

            {/* Documents */}
            <div>
              <label className="mb-1 block font-medium text-green-800">Documents</label>
              <div className="flex items-center gap-2">
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-green-300 px-3 py-2 text-green-700 hover:bg-green-50">
                  <FaUpload />
                  <span>Upload File</span>
                  <input type="file" multiple className="hidden" />
                </label>
                <button
                  type="button"
                  className="rounded-md border border-green-300 px-2 py-2 text-green-700"
                  title="More"
                >
                  ▾
                </button>
              </div>
              <p className="mt-1 text-sm text-green-600">
                You can upload a maximum of 10 files, 10MB each
              </p>
            </div>

            {/* Add more details */}
            <button className="text-sm font-medium text-green-700 hover:underline">
              Add more details
            </button>

            {/* Customer Owner note */}
            <p className="pt-2 text-sm text-green-800">
              <span className="font-medium">Customer Owner:</span> Assign a user as the customer
              owner to provide access only to the data of this customer.{" "}
              <a className="text-green-700 underline" href="#">
                Learn More
              </a>
            </p>
          </div>
        )}

        {/* =========== ADDRESS TAB =========== */}
        {activeTab === "Address" && (
          <div className="mt-6 grid grid-cols-1 gap-10 md:grid-cols-2">
            {/* Billing Address */}
            <div>
              <h3 className="mb-4 text-lg font-semibold text-green-700">Billing Address</h3>
              {[
                "Attention",
                "Country/Region",
                "Street 1",
                "Street 2",
                "City",
                "State",
                "Pin Code",
                "Phone",
                "Fax Number",
              ].map((label, i) => (
                <div className="mb-3" key={`bill-${i}`}>
                  <label className="mb-1 block font-medium text-green-800">{label}</label>
                  {label === "Country/Region" || label === "State" ? (
                    <select className={inputBase}>
                      <option>Select</option>
                    </select>
                  ) : (
                    <input type="text" className={inputBase} placeholder={label} />
                  )}
                </div>
              ))}
            </div>

            {/* Shipping Address */}
            <div>
              <h3 className="mb-4 text-lg font-semibold text-green-700">
                Shipping Address{" "}
                <button type="button" className="text-sm font-medium text-green-600 hover:underline">
                  ( Copy billing address )
                </button>
              </h3>
              {[
                "Attention",
                "Country/Region",
                "Street 1",
                "Street 2",
                "City",
                "State",
                "Pin Code",
                "Phone",
                "Fax Number",
              ].map((label, i) => (
                <div className="mb-3" key={`ship-${i}`}>
                  <label className="mb-1 block font-medium text-green-800">{label}</label>
                  {label === "Country/Region" || label === "State" ? (
                    <select className={inputBase}>
                      <option>Select</option>
                    </select>
                  ) : (
                    <input type="text" className={inputBase} placeholder={label} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========== CONTACT PERSONS TAB =========== */}
        {activeTab === "Contact Persons" && (
          <div className="mt-6">
            <div className="overflow-x-auto rounded-md border border-green-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-green-50 text-green-800">
                  <tr>
                    <th className="px-3 py-2 font-medium">SALUTATION</th>
                    <th className="px-3 py-2 font-medium">FIRST NAME</th>
                    <th className="px-3 py-2 font-medium">LAST NAME</th>
                    <th className="px-3 py-2 font-medium">EMAIL ADDRESS</th>
                    <th className="px-3 py-2 font-medium">WORK PHONE</th>
                    <th className="px-3 py-2 font-medium">MOBILE</th>
                    <th className="px-3 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {contactPersons.map((cp, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="px-3 py-2">
                        <select
                          className="w-full rounded border border-green-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                          value={cp.salutation}
                          onChange={(e) =>
                            updateCP(idx, { salutation: e.target.value })
                          }
                        >
                          <option value=""></option>
                          <option>Dr</option>
                          <option>Mr</option>
                          <option>Ms</option>
                          <option>Mrs</option>
                        </select>
                      </td>
                      <td className="px-3 py-2">
                        <input
                          className="w-full rounded border border-green-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                          value={cp.firstName}
                          onChange={(e) =>
                            updateCP(idx, { firstName: e.target.value })
                          }
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          className="w-full rounded border border-green-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
                          value={cp.lastName}
                          onChange={(e) =>
                            updateCP(idx, { lastName: e.target.value })
                          }
                        />
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex items-center rounded border border-green-300 px-2 focus-within:ring-2 focus-within:ring-green-500">
                          <FaEnvelope className="mr-2 text-green-500" />
                          <input
                            type="email"
                            className="w-full py-1 outline-none"
                            value={cp.email}
                            onChange={(e) => updateCP(idx, { email: e.target.value })}
                          />
                        </div>
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex items-center rounded border border-green-300 px-2 focus-within:ring-2 focus-within:ring-green-500">
                          <FaPhone className="mr-2 text-green-500" />
                          <input
                            className="w-full py-1 outline-none"
                            value={cp.workPhone}
                            onChange={(e) =>
                              updateCP(idx, { workPhone: e.target.value })
                            }
                          />
                        </div>
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex items-center rounded border border-green-300 px-2 focus-within:ring-2 focus-within:ring-green-500">
                          <FaPhone className="mr-2 text-green-500" />
                          <input
                            className="w-full py-1 outline-none"
                            value={cp.mobile}
                            onChange={(e) => updateCP(idx, { mobile: e.target.value })}
                          />
                        </div>
                      </td>
                      <td className="px-3 py-2 text-right">
                        <button
                          type="button"
                          onClick={() => removeCP(idx)}
                          className="text-red-600 hover:underline"
                          title="Remove"
                        >
                          ×
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              type="button"
              onClick={addCP}
              className="mt-3 inline-flex items-center gap-2 rounded-md border border-green-300 px-3 py-2 text-green-700 hover:bg-green-50"
            >
              <span className="rounded-full bg-green-600 px-2 py-0.5 text-white">+</span>
              Add Contact Person
            </button>
          </div>
        )}

        {/* =========== CUSTOM FIELDS TAB (placeholder) =========== */}
        {activeTab === "Custom Fields" && (
          <div className="mt-6 text-green-700">Custom Fields form goes here.</div>
        )}

        {/* =========== REPORTING TAGS TAB (placeholder) =========== */}
        {activeTab === "Reporting Tags" && (
          <div className="mt-6 text-green-700">Reporting Tags form goes here.</div>
        )}

        {/* =========== REMARKS TAB =========== */}
        {activeTab === "Remarks" && (
          <div className="mt-6">
            <label className="mb-1 block font-medium text-green-800">
              Remarks (For Internal Use)
            </label>
            <textarea rows={4} className={inputBase} placeholder="Type here..." />
          </div>
        )}

        {/* Footer buttons */}
        <div className="sticky bottom-0 mt-8 flex justify-end gap-3 border-t border-green-100 pt-4">
          <button className="rounded-md bg-green-600 px-6 py-2 font-medium text-white hover:bg-green-700">
            Save
          </button>
          <button className="rounded-md border border-green-300 px-6 py-2 font-medium text-green-700 hover:bg-green-50">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  function addCP() {
    setContactPersons((arr) => [
      ...arr,
      { salutation: "", firstName: "", lastName: "", email: "", workPhone: "", mobile: "" },
    ]);
  }

  function removeCP(index: number) {
    setContactPersons((arr) => arr.filter((_, i) => i !== index));
  }

  function updateCP(index: number, patch: Partial<ContactPerson>) {
    setContactPersons((arr) =>
      arr.map((row, i) => (i === index ? { ...row, ...patch } : row))
    );
  }
}
