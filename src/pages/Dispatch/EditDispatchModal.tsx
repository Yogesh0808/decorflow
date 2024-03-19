import React, { useState } from "react";

const EditDispatchModal = ({ formData, saveEditedData, closeModal }) => {
  const [editedFormData, setEditedFormData] = useState(formData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedFormData({
      ...editedFormData,
      [name]: value,
    });
  };

  const handleSave = () => {
    saveEditedData(editedFormData);
    closeModal();
  };

  return (
    <div className="fixed inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
        <div className="relative bg-slate-50 dark:bg-slate-900 dark:text-slate-100 rounded-lg overflow-hidden w-[80vw]  max-w-xl mx-auto z-10">
          <div className="p-4 px-2">
            <h2 className="text-xl font-semibold mb-2">
              Edit Dispatch Details
            </h2>
            <div className="border border-blue-900 sm:m-2 lg:m-2 p-4 shadow-xl rounded-xl bg-blue-100 text-blue-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white">
              <div className="flex flex-col">
                <label htmlFor="catalogName" className="text-sm font-medium">
                  Catalog Name:
                </label>
                <input
                  type="text"
                  id="catalogName"
                  name="catalogName"
                  value={editedFormData.catalogName}
                  onChange={handleInputChange}
                  className="rounded-md py-2 px-3 focus:border-red-500 bg-white dark:bg-slate-900 text-black-2 dark:text-white"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="quantity" className="text-sm font-medium">
                  Fabric Code Number:
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={editedFormData.quantity}
                  onChange={handleInputChange}
                  className="rounded-md py-2 px-3 focus:border-red-500 bg-white dark:bg-slate-900 text-black-2 dark:text-white"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="areaOfRoom"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Area of Room
                </label>
                <input
                  type="text"
                  name="areaOfRoom"
                  id="areaOfRoom"
                  value={editedFormData.areaOfRoom}
                  onChange={handleInputChange}
                  className="rounded-md py-2 px-3 focus:border-red-500 bg-white dark:bg-slate-900 text-black-2 dark:text-white"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="quantityOrdered"
                  className="text-sm font-medium"
                >
                  Quantity Ordered:
                </label>
                <input
                  type="text"
                  id="quantityOrdered"
                  name="quantityOrdered"
                  value={editedFormData.quantityOrdered}
                  onChange={handleInputChange}
                  className="rounded-md py-2 px-3 focus:border-red-500 bg-white dark:bg-slate-900 text-black-2 dark:text-white"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="companyName" className="text-sm font-medium">
                  Company Name:
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={editedFormData.companyName}
                  onChange={handleInputChange}
                  className="rounded-md py-2 px-3 focus:border-red-500 bg-white dark:bg-slate-900 text-black-2 dark:text-white"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="orderNum" className="text-sm font-medium">
                  Order Number:
                </label>
                <input
                  type="text"
                  id="orderNum"
                  name="orderNum"
                  value={editedFormData.orderNum}
                  onChange={handleInputChange}
                  className="rounded-md py-2 px-3 focus:border-red-500 bg-white dark:bg-slate-900 text-black-2 dark:text-white"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="docNumber" className="text-sm font-medium">
                  Doc Number:
                </label>
                <input
                  type="text"
                  id="docNumber"
                  name="docNumber"
                  value={editedFormData.docNumber}
                  onChange={handleInputChange}
                  className="rounded-md py-2 px-3 focus:border-red-500 bg-white dark:bg-slate-900 text-black-2 dark:text-white"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="transitInformation"
                  className="text-sm font-medium"
                >
                  Transit Information:
                </label>
                <hr className="divide-red-50"></hr>
                <div className="flex items-center">
                  <label htmlFor="received" className="mr-4">
                    Received
                    <input
                      type="radio"
                      id="received"
                      name="transitInformation"
                      value="Received"
                      checked={editedFormData.transitInformation === "Received"}
                      onChange={handleInputChange}
                      className="ml-1"
                    />
                  </label>
                  <label htmlFor="notReceived">
                    Not Received
                    <input
                      type="radio"
                      id="notReceived"
                      name="transitInformation"
                      value="Not Received"
                      checked={
                        editedFormData.transitInformation === "Not Received"
                      }
                      onChange={handleInputChange}
                      className="ml-1"
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-2">
              <button
                type="button"
                onClick={handleSave}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-2"
              >
                Save
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-slate-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2  focus:ring-red-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDispatchModal;
