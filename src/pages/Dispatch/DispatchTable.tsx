import React, { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.baseURL = "https://cors-h05i.onrender.com";

const DispatchView = () => {
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [formData, setFormData] = useState(null);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("/api/customer/names", getHeaders());
      setCustomers(response.data);
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

  const handleCustomerChange = (e) => {
    setSelectedCustomer(e.target.value);
    fetchFormData(e.target.value);
  };

  const fetchFormData = async (customerId) => {
    try {
      const response = await axios.get(
        `/api/dispatch/${customerId}`,
        getHeaders()
      );
      setFormData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching form data:", error.message);
    }
  };

  return (
    <div className="max-w-screen mx-auto p-6 space-y-6 text-neutral-700 dark:text-neutral-100">
      <h1 className="text-3xl font-normal mb-4">Dispatch View</h1>
      <div className="flex space-x-4">
        <div className="flex flex-col w-1/2">
          <label htmlFor="customerName" className="text-sm font-medium">
            Select Customer
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
      </div>

      {formData &&
        Array.isArray(formData) &&
        formData.map((item, index) => (
          <div key={index} className="mt-8">
            <div className="bg-sky-100 text-blue-900 dark:bg-slate-900 dark:text-slate-100 p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">
                Dispatch Details for {item.customerName}
              </h2>
              <p>
                <span className="font-semibold">Area of Room:</span>{" "}
                {item.areaOfRoom}
              </p>
              <p>
                <span className="font-semibold">Catalog Name:</span>{" "}
                {item.catalogName}
              </p>
              <p>
                <span className="font-semibold">Quantity:</span> {item.quantity}
              </p>
              <p>
                <span className="font-semibold">Quantity Ordered:</span>{" "}
                {item.quantityOrdered}
              </p>
              <p>
                <span className="font-semibold">Company Name:</span>{" "}
                {item.companyName}
              </p>
              <p>
                <span className="font-semibold">Order Number:</span>{" "}
                {item.orderNum}
              </p>
              <p>
                <span className="font-semibold">Doc Number:</span>{" "}
                {item.docNumber}
              </p>
              <p>
                <span className="font-semibold">Transit Information:</span>{" "}
                {item.transitInformation}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default DispatchView;
