import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../layout/DefaultLayout";
import axios from "axios";
import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import mailsvg from "../../images/icon/mail.svg";
import mappin from "../../images/icon/map-pin.svg";

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

const AddCustomer = () => {
  const [formData, setFormData] = useState({
    salutation: "Mr",
    clientName: "",
    clientType: "individual",
    purpose: "",
    phone: "",
    emailAddress: "",
    address: "",
    isCompanyOrder: false,
    companyName: "",
    gstNumber: "",
  });

  const [showToast, setShowToast] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [valid, setValid] = useState(true);

  const saveClient = () => {
    setIsDisabled(true);
    axios
      .post("/api/customer", formData, getHeaders())
      .then((response) => {
        console.log("Client saved:", response.data);
        setShowToast(true);
        clearForm();
      })
      .catch((error) => {
        console.error("Error saving client:", error);
      })
      .finally(() => setIsDisabled(false));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    e.target.type === "checkbox"
      ? setFormData({ ...formData, [name]: e.target.checked })
      : setFormData({ ...formData, [name]: value });
  };

  const handleChange = (value) => {
    setFormData({ ...formData, phone: value });
    setValid(validatePhoneNumber(value));
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;
    return phoneNumberPattern.test(phoneNumber);
  };

  useEffect(() => {
    let timer;
    if (showToast) {
      timer = setTimeout(() => {
        setShowToast(false);
      }, 3500);
    }
    return () => clearTimeout(timer);
  }, [showToast]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    saveClient();
  };

  const clearForm = () => {
    setFormData({
      salutation: "Mr",
      clientName: "",
      clientType: "individual",
      purpose: "",
      phone: "",
      emailAddress: "",
      address: "",
    });
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="NewCustomer" />

      <div className="max-w-lg mx-auto p-6 space-y-6 text-neutral-700 dark:text-neutral-100 relative">
        <h1 className="text-3xl font-normal mb-4">New Customer Form</h1>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="flex space-x-4">
            <div className="flex flex-col w-1/3">
              <label htmlFor="salutation" className="text-sm font-medium mb-1">
                Salutation
              </label>
              <select
                id="salutation"
                name="salutation"
                className="rounded-md py-2 px-3 border border-slate-300 dark:border-slate-700 dark:bg-slate-900 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                onChange={handleInputChange}
                value={formData.salutation}
                required
              >
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
              </select>
            </div>
            <div className="flex flex-col w-2/3">
              <label htmlFor="client-name" className="text-sm font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                name="clientName"
                id="client-name"
                className="rounded-md py-2 px-3 border border-slate-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 dark:border-slate-700 dark:bg-slate-900"
                onChange={handleInputChange}
                value={formData.clientName}
                required
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="purpose-of-order"
              className="text-sm font-medium mb-1"
            >
              Purpose of the Order
            </label>
            <input
              type="text"
              name="purpose"
              id="purpose-of-order"
              className="rounded-md py-2 px-3 border border-slate-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 dark:border-slate-700 dark:bg-slate-900"
              onChange={handleInputChange}
              value={formData.purpose}
              required
            />
          </div>
          <div className="flex-col items-center space-y-3">
            <label className="text-sm font-medium mb-1">Client Type</label>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="business"
                  name="clientType"
                  value="Interior Designer"
                  onChange={handleInputChange}
                  checked={formData.clientType === "Interior Designer"}
                  required
                  className="form-radio h-5 w-5 text-red-600 focus:ring-red-500"
                />
                <label
                  htmlFor="business"
                  className="ml-2 text-sm text-slate-700 dark:text-slate-300"
                >
                  Interior Designer
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="individual"
                  name="clientType"
                  value="Architect"
                  onChange={handleInputChange}
                  checked={formData.clientType === "Architect"}
                  required
                  className="form-radio h-5 w-5 text-red-600 focus:ring-red-500"
                />
                <label
                  htmlFor="individual"
                  className="ml-2 text-sm text-slate-700 dark:text-slate-300"
                >
                  Architect
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="client"
                  name="clientType"
                  value="Client"
                  onChange={handleInputChange}
                  checked={formData.clientType === "Client"}
                  required
                  className="form-radio h-5 w-5 text-red-600 focus:ring-red-500"
                />
                <label
                  htmlFor="client"
                  className="ml-2 text-sm text-slate-700 dark:text-slate-300"
                >
                  Client
                </label>
              </div>
            </div>
          </div>

          <hr className="border-slate-300 dark:border-neutral-700" />
          <h4 className="text-base from-black to-slate-100">Contact Details</h4>
          <div className="flex flex-col">
            <label htmlFor="phone" className="text-sm font-medium mb-1">
              Phone
            </label>
            <PhoneInput
              country={"in"}
              value={formData.phone}
              onChange={handleChange}
              inputStyle={{
                width: "100%",
                height: "40px",
                fontSize: "15px",
                fontWeight: "300",
                color: "#000",
                borderRadius: "0.375rem",
                border: "1px solid #D1D5DB",
                backgroundColor: "#fff",
                boxShadow: "none",
                outline: "none",
                focus: "border-red-500 ring-1 ring-red-500",
              }}
              buttonStyle={{
                backgroundColor: "#F3F4F6",
                color: "#000",
                borderRadius: "0.375rem",
              }}
              dropdownStyle={{
                borderRadius: "0.375rem",
                border: "1px solid #D1D5DB",
                backgroundColor: "#fff",
              }}
            />

            {!valid && (
              <p className="mt-1 text-sm text-red-500">
                Please enter a valid phone number.
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium mb-1">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                name="emailAddress"
                id="email"
                className="w-full rounded-md py-2 px-3 border border-slate-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 dark:border-slate-700 dark:bg-slate-900"
                onChange={handleInputChange}
                value={formData.emailAddress}
                style={{ paddingLeft: "2.5rem" }}
              />
              <img
                src={mailsvg}
                alt="Mail Icon"
                className="absolute left-3 top-2.5 h-5 w-5 pointer-events-none"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="address" className="text-sm font-medium mb-1">
              Address
            </label>
            <div className="relative">
              <textarea
                name="address"
                id="address"
                rows={3}
                className="w-full rounded-md py-2 px-3 border border-slate-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 dark:border-slate-700 dark:bg-slate-900"
                onChange={handleInputChange}
                value={formData.address}
                style={{ paddingLeft: "2.5rem" }}
                required
              ></textarea>
              <img
                src={mappin}
                alt="Mail Icon"
                className="absolute left-3 top-2.5 h-5 w-5 pointer-events-none"
              />
            </div>
          </div>

          <div className="flex flex-col">
            {formData.isCompanyOrder && (
              <>
                <label
                  htmlFor="company-name"
                  className="text-sm font-medium mb-1"
                >
                  Company Name
                </label>

                <input
                  type="text"
                  name="companyName"
                  id="company-name"
                  className="rounded-md py-2 px-3 border border-slate-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 dark:border-slate-700 dark:bg-slate-900"
                  onChange={handleInputChange}
                  value={formData.companyName}
                />
              </>
            )}
          </div>

          <div className="flex flex-col">
            {formData.isCompanyOrder && (
              <>
                <label
                  htmlFor="gst-number"
                  className="text-sm font-medium mb-1"
                >
                  GST Number
                </label>
                <input
                  type="text"
                  name="gstNumber"
                  id="gst-number"
                  className="rounded-md py-2 px-3 border border-slate-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 dark:border-slate-700 dark:bg-slate-900"
                  onChange={handleInputChange}
                  value={formData.gstNumber}
                />
              </>
            )}
          </div>
          <div className="flex items-center mb-5">
            <input
              type="checkbox"
              id="company-order"
              name="isCompanyOrder"
              className="rounded border-slate-300 text-red-600 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:focus:ring-neutral-400"
              onChange={handleInputChange}
              checked={formData.isCompanyOrder}
            />
            <label
              htmlFor="company-order"
              className="ml-2 text-sm text-slate-700 dark:text-slate-300"
            >
              GST Order
            </label>
          </div>
          <button
            type="submit"
            disabled={isDisabled}
            className={`bg-red-700 text-white py-2.5 px-6 rounded-md hover:bg-red-800 transition-colors duration-300 ${
              isDisabled ? "bg-red-900 cursor-not-allowed" : "bg-red-700"
            }`}
          >
            Add Customer
          </button>
        </form>
        {showToast && (
          <div
            id="toast-success"
            className="lg:top-28 lg:right-10 top-10  flex items-center w-full max-w-xs p-2 mb-4 text-gray-500 rounded-lg shadow
              fixed right-2 z-99999 translate-y-10 text-gray-500 bg-white"
            role="alert"
          >
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-700 bg-green-200 rounded-lg">
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  fill="#34D399"
                  d="M10 0C4.477 0 0 4.477 0 10c0 5.523 4.477 10 10 10 5.523 0 10-4.477 10-10C20 4.477 15.523 0 10 0zm3.707 8.207l-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414z"
                />
              </svg>
            </div>
            <div className="ms-2 text-sm text-slate-800 font-normal capitalize">
              Customer added successfully.
            </div>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default AddCustomer;
