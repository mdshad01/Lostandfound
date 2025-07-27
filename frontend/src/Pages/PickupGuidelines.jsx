import React from "react";

const PickupGuidelines = () => {
  return (
    <div className="min-h-screen px-6 md:px-20 py-12 bg-gray-50 text-gray-800">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center text-black">Lost Item Pickup Guidelines</h1>

        <p className="mb-6 text-lg text-gray-700 text-center">
          Please follow these steps carefully when coming to collect a lost item.
        </p>

        <div className="space-y-6">
          <div className="bg-white shadow-md p-5 rounded-xl">
            <h2 className="text-xl font-semibold mb-2">1. Bring Valid Identification</h2>
            <p className="text-gray-700">
              Make sure to bring your college ID card or any government-issued ID to verify your identity.
            </p>
          </div>

          <div className="bg-white shadow-md p-5 rounded-xl">
            <h2 className="text-xl font-semibold mb-2">2. Describe the Item</h2>
            <p className="text-gray-700">
              You will be asked to describe the item you lost. Mention unique identifiers (color, brand, contents,
              etc.).
            </p>
          </div>

          <div className="bg-white shadow-md p-5 rounded-xl">
            <h2 className="text-xl font-semibold mb-2">3. Provide Proof of Ownership (if possible)</h2>
            <p className="text-gray-700">
              If you have a receipt, photo, or any other proof that the item belongs to you, please present it.
            </p>
          </div>

          <div className="bg-white shadow-md p-5 rounded-xl">
            <h2 className="text-xl font-semibold mb-2">4. Visit During Working Hours</h2>
            <p className="text-gray-700">
              Lost items can only be picked up during office hours (e.g., 10:00 AM - 5:00 PM on working days).
            </p>
          </div>

          <div className="bg-white shadow-md p-5 rounded-xl">
            <h2 className="text-xl font-semibold mb-2">5. Sign the Pickup Log</h2>
            <p className="text-gray-700">
              You’ll be required to sign a logbook or digital form confirming that you have collected the item.
            </p>
          </div>
        </div>

        <div className="mt-10 text-center text-sm text-gray-500">
          If you have questions, please contact the Lost & Found desk or email us at{" "}
          <span className="text-blue-600">support@lostlink.com</span>
        </div>
      </div>
    </div>
  );
};

export default PickupGuidelines;
