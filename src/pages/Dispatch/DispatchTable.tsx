import React, { useState, useEffect } from "react";
import axios from "axios";
import EditDispatchModal from "./EditDispatchModal";
import trash from "../../images/icon/trash.svg";
import edit from "../../images/icon/edit.svg";

axios.defaults.baseURL = "https://cors-h05i.onrender.com";

const DispatchView = () => {
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [formData, setFormData] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showEditModal, setShowEditModal] = useState(false); // State variable to manage the visibility of the edit modal
  const [editedFormData, setEditedFormData] = useState(null);

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

  const editFormData = (formData) => {
    setEditedFormData(formData);
    setShowEditModal(true);
  };

  const closeModal = () => {
    setShowEditModal(false);
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
  useEffect(() => {
    let timer;
    if (showToast) {
      timer = setTimeout(() => {
        setShowToast(false);
        setToastMessage("");
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [showToast]);

  const saveEditedData = (editedData, customerId) => {
    console.log("Saving edited data:", editedData);
    axios
      .put(`/api/dispatch/${editedData.id}`, editedData, getHeaders())
      .then((response) => {
        console.log("Data saved successfully:", response.data);
        setShowEditModal(false);
        setFormData((prevFormData) =>
          prevFormData.map((item) =>
            item.id === editedData.id ? { ...item, ...editedData } : item
          )
        );
        setToastMessage("Dispatch updated successfully.");
        setShowToast(true);
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
  };

  const deleteFormData = (formDataId) => {
    if (window.confirm("Are you Sure you want to Delete this Entry?")) {
      axios
        .delete(`/api/dispatch/${formDataId}`, getHeaders())
        .then(() => {
          const updatedFormData = formData.filter(
            (item) => item.id !== formDataId
          );
          setFormData(updatedFormData);
          if (updatedFormData.length === 0) {
            setSelectedCustomer("");
          }
          setToastMessage("Dispatch deleted successfully.");
          setShowToast(true);
        })
        .catch((error) => {
          console.error("Error deleting data:", error);
        });
      console.log("Delete data with ID:", formDataId);
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
              <div className="flex justify-between items-center mt-5">
                <button
                  onClick={() => editFormData(item)}
                  className="hover:bg-blue-800 hover:text-white flex text-blue-600 px-3 p-2 border rounded-xl items-center mx-2"
                >
                  Edit <img src={edit}></img>
                </button>
                <button
                  onClick={() => deleteFormData(item.id)}
                  className="hover:bg-red-700 hover:text-white flex text-red-600 p-2 border rounded-xl items-center mx-2"
                >
                  Delete <img src={trash} className=""></img>
                </button>
              </div>
            </div>
          </div>
        ))}
      {showEditModal && (
        <EditDispatchModal
          formData={editedFormData}
          saveEditedData={saveEditedData}
          closeModal={closeModal}
        />
      )}
      {showToast && (
        <div
          id="toast-success"
          className="absolute top-0 right-0 flex items-center w-xl max-w-xs p-2 px-4 mr-4 mb-4 text-gray-500 bg-emerald-100 rounded-lg shadow"
          role="alert"
        >
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-900 bg-emerald-300 rounded-lg">
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 0a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM8 14a2 2 0 1 1 4 0H8zm1-6a1 1 0 0 1 2 0v4a1 1 0 1 1-2 0V8z"
              />
            </svg>
          </div>
          <p className="ml-2 text-slate-800 font-normal">{toastMessage}</p>
        </div>
      )}
    </div>
  );
};

export default DispatchView;
