import React, { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.baseURL = "https://cors-h05i.onrender.com";

const DispatchForm = () => {
  const [formData, setFormData] = useState({
    customerName: "",
    areaOfRoom: "",
    catalogName: "",
    quantity: "",
    quantityOrdered: "",
    companyName: "",
    orderNum: "",
    docNumber: "",
    transitInformation: "",
  });

  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("/api/customer/names", getHeaders());
      setCustomers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error.message);
    }
  };

  const getHeaders = () => {
    const username = "abinesh";
    const password = "abi";
    const basicAuth = "Basic " + btoa(username + ":" + password);
    return {
      headers: {
        Authorization: basicAuth,
      },
    };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCustomerChange = (e) => {
    setSelectedCustomer(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Find the selected customer object
      const selectedCustomerObject = customers.find(
        (customer) => customer.id === selectedCustomer
      );

      // If a customer object is found, update formData
      if (selectedCustomerObject) {
        const dataWithCustomerId = {
          ...formData,
          customerId: selectedCustomer,
          customerName: selectedCustomerObject.clientName,
        };

        const response = await axios.post(
          `/api/dispatch/${selectedCustomer}`,
          dataWithCustomerId,
          getHeaders()
        );
        console.log("Form submitted successfully:", response.data);
      } else {
        console.error("Selected customer not found");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 space-y-6 text-neutral-700 dark:text-neutral-100">
      <h1 className="text-3xl font-normal mb-4">Dispatch Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex space-x-4">
          <div className="flex flex-col w-1/2">
            <label htmlFor="customerName" className="text-sm font-medium">
              Customer Name
            </label>
            <select
              name="customerName"
              id="customerName"
              className="rounded-md py-2 px-3 focus:border-red-500 dark:border-neutral-500 dark:bg-slate-700"
              onChange={handleCustomerChange}
              value={selectedCustomer}
              required
            >
              <option value="">Select Customer</option>
              {customers.map((customer, index) => (
                <option key={index} value={customer.id}>
                  {customer.clientName} - {customer.cid}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col w-1/2">
            <label htmlFor="areaOfRoom" className="text-sm font-medium">
              Area of Room
            </label>
            <input
              type="text"
              name="areaOfRoom"
              id="areaOfRoom"
              className="rounded-md py-2 px-3 focus:border-red-500 dark:border-neutral-500 dark:bg-slate-700"
              onChange={handleInputChange}
              value={formData.areaOfRoom}
              required
            />
          </div>
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
          <label htmlFor="orderNum" className="text-sm font-medium">
            Order Number:
          </label>
          <input
            type="text"
            id="orderNum"
            name="orderNum"
            value={formData.orderNum}
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
          className="bg-red-700 text-white py-2 px-4 rounded-md hover:bg-red-800"
        >
          Submit Dispatch
        </button>
      </form>
    </div>
  );
};

export default DispatchForm;
