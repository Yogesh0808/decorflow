import React, { useState } from "react";

const DispatchForm = () => {
  const [formData, setFormData] = useState({
    customerName: "",
    areaOfRoom: "",
    catalogName: "",
    quantity: "",
    quantityOrdered: "",
    companyName: "",
    docNumber: "",
    transitInformation: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Add your submission logic here
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-8 space-y-6 bg-sky-200 rounded-xl shadow-md">
      <h1 className="text-3xl font-normal text-sky-800">Dispatch Form</h1>
      <p className="">Please Enter the Details Carefully</p>
      <hr className="divider"></hr>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="customerName" className="text-md font-medium">
            Customer Name:
          </label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={formData.customerName}
            onChange={handleInputChange}
            className="rounded-md py-2 px-3 focus:border-red-500 bg-sky-50"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="areaOfRoom" className="text-sm font-medium">
            Area of Room:
          </label>
          <input
            type="text"
            id="areaOfRoom"
            name="areaOfRoom"
            value={formData.areaOfRoom}
            onChange={handleInputChange}
            className="rounded-md py-2 px-3 focus:border-red-500 bg-sky-50"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="catalogName" className="text-sm font-medium">
            Catalog Name:
          </label>
          <input
            type="text"
            id="catalogName"
            name="catalogName"
            value={formData.catalogName}
            onChange={handleInputChange}
            className="rounded-md py-2 px-3 focus:border-red-500 bg-sky-50"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="quantity" className="text-sm font-medium">
            Quantity:
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            className="rounded-md py-2 px-3 focus:border-red-500 bg-sky-50"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="quantityOrdered" className="text-sm font-medium">
            Quantity Ordered:
          </label>
          <input
            type="text"
            id="quantityOrdered"
            name="quantityOrdered"
            value={formData.quantityOrdered}
            onChange={handleInputChange}
            className="rounded-md py-2 px-3 focus:border-red-500 bg-sky-50"
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
            value={formData.companyName}
            onChange={handleInputChange}
            className="rounded-md py-2 px-3 focus:border-red-500 bg-sky-50"
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
            value={formData.docNumber}
            onChange={handleInputChange}
            className="rounded-md py-2 px-3 focus:border-red-500 bg-sky-50"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="transitInformation" className="text-sm font-medium">
            Transit Information:
          </label>
          <input
            type="text"
            id="transitInformation"
            name="transitInformation"
            value={formData.transitInformation}
            onChange={handleInputChange}
            className="rounded-md py-2 px-3 focus:border-red-500 bg-sky-50"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-sky-700 text-white py-2 px-4 rounded-xl hover:bg-sky-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DispatchForm;
