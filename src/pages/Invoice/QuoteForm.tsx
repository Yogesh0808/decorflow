import React, { useState, useEffect } from "react";
import axios from "axios";

const QuoteForm = () => {
  const [area, setArea] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [rate, setRate] = useState("");
  const [gstPercentage, setGstPercentage] = useState("");
  const [amount, setAmount] = useState(0);
  const [gstAmount, setGstAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [notification, setNotification] = useState("");

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("/api/customer/names", getHeaders());
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error.message);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

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

  const handleQuantityChange = (e) => {
    const newQuantity = e.target.value;
    setQuantity(newQuantity);
    calculateAmount(newQuantity, rate);
  };

  const handleRateChange = (e) => {
    const newRate = e.target.value;
    setRate(newRate);
    calculateAmount(quantity, newRate);
  };

  const handleGstPercentageChange = (e) => {
    const newGstPercentage = e.target.value;
    setGstPercentage(newGstPercentage);
    calculateGstAmount(newGstPercentage);
  };

  const calculateAmount = (qty, rt) => {
    const calculatedAmount = parseFloat(qty) * parseFloat(rt);
    setAmount(calculatedAmount || 0);
    calculateTotal(calculatedAmount, gstAmount);
  };

  const calculateGstAmount = (percentage) => {
    const calculatedGstAmount =
      (parseFloat(amount) * parseFloat(percentage)) / 100;
    setGstAmount(calculatedGstAmount || 0);
    calculateTotal(amount, calculatedGstAmount);
  };

  const calculateTotal = (amt, gstAmt) => {
    const calculatedTotal = parseFloat(amt) + parseFloat(gstAmt);
    setTotal(calculatedTotal || 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/quote", {
        area,
        quantity,
        unit,
        rate,
        amount,
        gstPercentage,
        gstAmount,
        total,
      });
      console.log("Quote submitted successfully:", response.data);

      setNotification("Quote submitted successfully");
      setTimeout(() => {
        setNotification("");
      }, 3000);

      setArea("");
      setQuantity("");
      setUnit("");
      setRate("");
      setAmount(0);
      setGstPercentage("");
      setGstAmount(0);
      setTotal(0);
    } catch (error) {
      console.error("Error submitting quote:", error);
    }
  };

  return (
    <div>
      {!selectedCustomer && (
        <select
          value={selectedCustomer ? selectedCustomer.id : ""}
          onChange={(e) => {
            const selectedId = e.target.value;
            const selectedCustomer = customers.find(
              (customer) => customer.id === selectedId
            );
            setSelectedCustomer(selectedCustomer);
          }}
          className="block w-full mt-4 p-3 border border-slate-400 shadow-lg rounded-xl dark:bg-slate-950 focus:outline-none focus:border-strokedark"
        >
          <option value="">Select Customer</option>
          {customers.map((customer, index) => (
            <option key={index} value={customer.id}>
              {customer.clientName} - {customer.cid}
            </option>
          ))}
        </select>
      )}
      {selectedCustomer && (
        <>
          <button
            onClick={() => setSelectedCustomer(null)}
            className="top-4 right-4"
          >
            Back
          </button>
          <p className="text-center text-slate-700 dark:text-slate-50 text-2xl">
            Quote Entry for {selectedCustomer.clientName}
          </p>
          <div className="max-w-lg mx-auto mt-10 p-6 space-y-6 text-neutral-700 dark:text-neutral-100 dark:bg- dark:bg-slate-950 rounded-xl relative">
            <h1 className="text-3xl font-normal text-center uppercase mb-4">
              Quote Form
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="area" className="text-sm font-medium">
                  Area
                </label>
                <input
                  type="text"
                  id="area"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="rounded-md py-2 px-3 focus:border-red-500 dark:border-neutral-800 dark:bg-slate-900"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="quantity" className="text-sm font-medium">
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="rounded-md py-2 px-3 focus:border-red-500 dark:border-neutral-800 dark:bg-slate-900"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="rate" className="text-sm font-medium">
                  Rate
                </label>
                <input
                  type="number"
                  id="rate"
                  value={rate}
                  onChange={handleRateChange}
                  className="rounded-md py-2 px-3 focus:border-red-500 dark:border-neutral-800 dark:bg-slate-900"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="gstPercentage" className="text-sm font-medium">
                  GST%
                </label>
                <select
                  id="gstPercentage"
                  value={gstPercentage}
                  onChange={handleGstPercentageChange}
                  className="rounded-md py-2 px-3 focus:border-red-500 dark:border-neutral-800 dark:bg-slate-900"
                  required
                >
                  <option value="">Select GST%</option>
                  <option value="5">5%</option>
                  <option value="12">12%</option>
                  <option value="18">18%</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="amount" className="text-sm font-medium">
                  Amount
                </label>
                <input
                  type="text"
                  id="amount"
                  value={amount}
                  readOnly
                  className="rounded-md py-2 px-3 bg-white dark:bg-slate-900 text-black-2 dark:text-white"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="gstAmount" className="text-sm font-medium">
                  GST Amount
                </label>
                <input
                  type="text"
                  id="gstAmount"
                  value={gstAmount}
                  readOnly
                  className="rounded-md py-2 px-3 bg-white dark:bg-slate-900 text-black-2 dark:text-white"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="total" className="text-sm font-medium">
                  Total
                </label>
                <input
                  type="text"
                  id="total"
                  value={total}
                  readOnly
                  className="rounded-md py-2 px-3 bg-white dark:bg-slate-900 text-black-2 dark:text-white"
                />
              </div>
              <button
                type="submit"
                className="bg-red-700 text-white py-2 px-4 rounded-md hover:bg-red-800"
              >
                Submit
              </button>
            </form>
          </div>
        </>
      )}
      {notification && (
        <div className="absolute bottom-0 right-2 text-xl text-lime-600 bg-slate-100 p-4 rounded-xl">
          {notification}
        </div>
      )}
    </div>
  );
};

export default QuoteForm;
