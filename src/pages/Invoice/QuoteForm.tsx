import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const QuoteForm = ({
  selectedCustomer,
  selectedCategory,
  setSelectedCustomer,
  customers,
}) => {
  const [formData, setFormData] = useState({
    area: "",
    quantity: "",
    rate: "",
    gstPercentage: "",
    discountPercentage: "",
    amount: 0,
    gstAmount: 0,
    discountAmount: 0,
    total: 0,
  });

  useEffect(() => {
    calculateValues();
  }, [
    formData.quantity,
    formData.rate,
    formData.gstPercentage,
    formData.discountPercentage,
  ]);

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

  const calculateValues = () => {
    const { quantity, rate, gstPercentage, discountPercentage } = formData;
    const parsedQuantity = parseFloat(quantity) || 0;
    const parsedRate = parseFloat(rate) || 0;
    const parsedGstPercentage = parseFloat(gstPercentage) || 0;
    const parsedDiscountPercentage = parseFloat(discountPercentage) || 0;

    const calculatedAmount = parsedQuantity * parsedRate;
    const calculatedGstAmount = (calculatedAmount * parsedGstPercentage) / 100;
    const calculatedDiscountAmount =
      (calculatedAmount * parsedDiscountPercentage) / 100;
    const total =
      calculatedAmount + calculatedGstAmount - calculatedDiscountAmount;

    setFormData((prevFormData) => ({
      ...prevFormData,
      amount: calculatedAmount.toFixed(2),
      gstAmount: calculatedGstAmount.toFixed(2),
      discountAmount: calculatedDiscountAmount.toFixed(2),
      total: total.toFixed(2),
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let parsedValue = value;

    if (name === "gstPercentage") {
      parsedValue = value === "" ? null : parseFloat(value);
    } else if (name === "discountPercentage") {
      parsedValue = value === "" ? "" : parseFloat(value);
      if (isNaN(parsedValue) || parsedValue < 0) {
        parsedValue = 0;
      } else if (parsedValue > 100) {
        parsedValue = 100;
      }
    } else if (name === "area") {
      parsedValue = value;
    } else {
      parsedValue = value === "" ? "" : parseFloat(value);
      if (isNaN(parsedValue)) {
        parsedValue = "";
      }
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: parsedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedCustomer) {
        const {
          area,
          quantity,
          rate,
          gstPercentage,
          amount,
          gstAmount,
          discountPercentage,
          discountAmount,
          total,
        } = formData;

        const url = `/api/invoice/${selectedCustomer.id}/${selectedCategory}?area=${area}&quantity=${quantity}&rate=${rate}&gstPercentage=${gstPercentage}&amount=${amount}&gstAmount=${gstAmount}&discountPercentage=${discountPercentage}&discountAmount=${discountAmount}&total=${total}`;
        const response = await axios.post(url, {}, getHeaders());

        console.log("Form submitted successfully:", response.data);
        toast.success(`${selectedCategory} Quote has been submitted.`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        clearForm();
      } else {
        console.error("No customer selected");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const clearForm = () => {
    setFormData({
      area: "",
      quantity: "",
      rate: "",
      gstPercentage: "",
      discountPercentage: "",
      amount: 0,
      gstAmount: 0,
      discountAmount: 0,
      total: 0,
    });
  };

  const recalculateTotal = () => {
    calculateValues();
  };

  return (
    <div className="relative">
      <div>
        {!selectedCustomer && (
          <select
            value={selectedCustomer ? selectedCustomer.id : ""}
            onChange={(e) =>
              setSelectedCustomer(
                customers.find((customer) => customer.id === e.target.value)
              )
            }
            className="block w-full mt-4 p-3 border border-slate-400 shadow-lg rounded-xl dark:bg-slate-950 focus:outline-none focus:border-strokedark"
            aria-label="Select Customer"
          >
            <option value="">Select Customer</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.clientName} - {customer.cid}
              </option>
            ))}
          </select>
        )}
        {selectedCustomer && (
          <>
            <p className="text-slate-700 dark:text-slate-50 text-lg font-thin text-start">
              Quote Entry for {selectedCustomer.clientName}
            </p>
            <div className="max-w-lg mx-auto mt-10 p-6 space-y-6 text-neutral-700 dark:text-neutral-100 dark:bg- dark:bg-slate-950 rounded-xl relative">
              <h1 className="text-3xl font-normal text-center uppercase mb-4">
                {selectedCategory} Quote Form
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col">
                  <label htmlFor="area" className="text-sm font-medium">
                    Particulars
                  </label>
                  <input
                    type="text"
                    id="area"
                    name="area"
                    value={formData.area}
                    onChange={handleInputChange}
                    className="rounded-md py-2 px-3 focus:border-red-500 dark:border-neutral-800 dark:bg-slate-900"
                    placeholder="Enter particulars"
                    required
                    aria-label="Particulars"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="quantity" className="text-sm font-medium">
                    Quantity
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    className="rounded-md py-2 px-3 focus:border-red-500 dark:border-neutral-800 dark:bg-slate-900"
                    placeholder="Enter quantity"
                    required
                    aria-label="Quantity"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="rate" className="text-sm font-medium">
                    Rate
                  </label>
                  <input
                    type="number"
                    id="rate"
                    name="rate"
                    value={formData.rate}
                    onChange={handleInputChange}
                    className="rounded-md py-2 px-3 focus:border-red-500 dark:border-neutral-800 dark:bg-slate-900"
                    placeholder="Enter rate"
                    required
                    aria-label="Rate"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="gstPercentage"
                    className="text-sm font-medium"
                  >
                    GST%
                  </label>
                  <select
                    id="gstPercentage"
                    name="gstPercentage"
                    value={formData.gstPercentage}
                    onChange={handleInputChange}
                    className="rounded-md py-2 px-3 focus:border-red-500 dark:border-neutral-800 dark:bg-slate-900"
                    required
                    aria-label="GST Percentage"
                  >
                    <option value="">Select GST%</option>
                    <option value="0">0%</option>
                    <option value="5">5%</option>
                    <option value="12">12%</option>
                    <option value="18">18%</option>
                  </select>
                </div>
                {/* Discount Percentage input */}
                <div className="flex flex-col">
                  <label
                    htmlFor="discountPercentage"
                    className="text-sm font-medium"
                  >
                    Discount %
                  </label>
                  <input
                    type="number"
                    id="discountPercentage"
                    name="discountPercentage"
                    value={formData.discountPercentage}
                    onChange={handleInputChange}
                    className="rounded-md py-2 px-3 focus:border-red-500 dark:border-neutral-800 dark:bg-slate-900"
                    placeholder="Enter discount percentage"
                    required
                    aria-label="Discount Percentage"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="amount" className="text-sm font-medium">
                    Amount
                  </label>
                  <input
                    type="text"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    readOnly
                    className="rounded-md py-2 px-3 bg-white dark:bg-slate-900 text-black-2 dark:text-white"
                    aria-label="Amount"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="gstAmount" className="text-sm font-medium">
                    GST Amount
                  </label>
                  <input
                    type="text"
                    id="gstAmount"
                    name="gstAmount"
                    value={formData.gstAmount}
                    readOnly
                    className="rounded-md py-2 px-3 bg-white dark:bg-slate-900 text-black-2 dark:text-white"
                    aria-label="GST Amount"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="discountAmount"
                    className="text-sm font-medium"
                  >
                    Discount Amount
                  </label>
                  <input
                    type="text"
                    id="discountAmount"
                    name="discountAmount"
                    value={formData.discountAmount}
                    readOnly
                    className="rounded-md py-2 px-3 bg-white dark:bg-slate-900 text-black-2 dark:text-white"
                    aria-label="Discount Amount"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="total" className="text-sm font-medium">
                    Total
                  </label>
                  <input
                    type="text"
                    id="total"
                    name="total"
                    value={formData.total}
                    onClick={recalculateTotal}
                    readOnly
                    className="rounded-md py-2 px-3 bg-white dark:bg-slate-900 text-black-2 dark:text-white"
                    aria-label="Total"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-red-700 text-white py-2 px-4 rounded-md hover:bg-red-800 transition-colors duration-300"
                  aria-label="Submit Quote"
                >
                  Submit
                </button>
              </form>
            </div>
          </>
        )}
        <ToastContainer />
      </div>
    </div>
  );
};

export default QuoteForm;
