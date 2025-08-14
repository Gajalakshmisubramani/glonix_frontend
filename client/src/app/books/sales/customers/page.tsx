export default function NewCustomerPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="mb-6 border-b pb-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">New Customer</h1>
        <div className="space-x-2">
          <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Save
          </button>
          <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">
            Cancel
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white shadow rounded-lg p-6">
        <form className="space-y-6">
          {/* Customer Type */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Customer Type</label>
            <select className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500">
              <option>Business</option>
              <option>Individual</option>
            </select>
          </div>

          {/* Primary Contact Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Salutation</label>
              <select className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-500">
                <option>Mr.</option>
                <option>Mrs.</option>
                <option>Ms.</option>
                <option>Dr.</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">First Name</label>
              <input
                type="text"
                placeholder="Enter first name"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Last Name</label>
              <input
                type="text"
                placeholder="Enter last name"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Company Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Company Name</label>
            <input
              type="text"
              placeholder="Enter company name"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Display Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Display Name</label>
            <input
              type="text"
              placeholder="Enter display name"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Phone</label>
            <input
              type="text"
              placeholder="Enter phone number"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-500"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
