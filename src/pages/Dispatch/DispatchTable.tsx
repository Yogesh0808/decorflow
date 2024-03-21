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

  //For Zooming Images ra P*nda
  const [showImageModal, setShowImageModal] = useState(false);
  const [clickedImageUrl, setClickedImageUrl] = useState("");

  const handleImageClick = (imageUrl) => {
    setClickedImageUrl(imageUrl);
    setShowImageModal(true);
  };

  const closeImageModal = () => {
    setClickedImageUrl("");
    setShowImageModal(false);
  };

  //Image Mudinji ra p*nda

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

  const handleCustomerChange = async (e) => {
    setSelectedCustomer(e.target.value);
    await fetchFormData(e.target.value);
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

  const saveEditedData = async (editedData) => {
    console.log("Saving edited data:", editedData);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("customerId", editedData.customerId);
      Object.keys(editedData.data).forEach((key) => {
        formDataToSend.append(`${key}`, editedData.data[key]);
      });

      const response = await axios.put(
        `/api/dispatch/${editedData.id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Basic " + btoa("abinesh:abi"),
          },
        }
      );

      console.log("Data saved successfully:", response.data);
      setShowEditModal(false);
      setFormData((prevFormData) =>
        prevFormData.map((item) => {
          if (item.id === editedData.id) {
            console.log("Updating item:", item);
            console.log("Edited data:", editedData);
            const updatedItem = {
              ...item,
              data: { ...item.data, ...editedData.data },
            };
            console.log("Updated item:", updatedItem);
            return updatedItem;
          } else {
            console.log("Item not updated:", item);
            return item;
          }
        })
      );
      setToastMessage("Dispatch updated successfully.");
      setShowToast(true);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const deleteFormData = async (formDataId) => {
    if (window.confirm("Are you Sure you want to Delete this Entry?")) {
      try {
        await axios.delete(`/api/dispatch/${formDataId}`, getHeaders());
        const updatedFormData = formData.filter(
          (item) => item.id !== formDataId
        );
        setFormData(updatedFormData);
        if (updatedFormData.length === 0) {
          setSelectedCustomer("");
        }
        setToastMessage("Dispatch deleted successfully.");
        setShowToast(true);
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    }
  };

  const EntryItem = ({ title, value }) => (
    <div className="rounded">
      <span className="font-medium">{title}:</span> {value}
    </div>
  );

  let serialNo = 0;

  return (
    <div className="max-w-screen mx-auto p-6 space-y-6 text-neutral-800 dark:text-neutral-100">
      <h1 className="text-3xl font-normal mb-4">Dispatch View</h1>
      <div className="flex space-x-4 items-center">
        <div className="flex flex-col w-full py-2">
          <label htmlFor="customerName" className="text-sm font-medium">
            Select Customer
          </label>
          <select
            name="customerName"
            id="customerName"
            className="rounded-lg py-2 px-3 focus:border-red-500 dark:border-neutral-500 dark:bg-slate-700"
            onChange={handleCustomerChange}
            value={selectedCustomer}
            required
          >
            <option value="">Select Customer </option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.clientName} - {customer.cid}
              </option>
            ))}
          </select>
        </div>
      </div>

      {formData &&
        formData.map((item) => (
          <div
            key={item.id}
            className="mt-8 bg-indigo-100 text-indigo-700 dark:bg-slate-900 dark:text-slate-100 p-4 rounded-lg shadow-lg"
          >
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 md:px-8">
                <h2 className="text-2xl text-indigo-800 py-3">
                  Dispatch Entry #{++serialNo}
                </h2>
                <hr></hr>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4">
                  <EntryItem
                    title="Area of Room"
                    value={item.data ? item.data.areaOfRoom : ""}
                  />
                  <EntryItem
                    title="Catalog Name"
                    value={item.data ? item.data.catalogName : ""}
                  />

                  <EntryItem
                    title="Fabric Code Number"
                    value={item.data ? item.data.quantity : ""}
                  />
                  <EntryItem
                    title="Quantity Ordered"
                    value={item.data ? item.data.quantityOrdered : ""}
                  />
                  <EntryItem
                    title="Company Name"
                    value={item.data ? item.data.companyName : ""}
                  />
                  <EntryItem
                    title="Order Number"
                    value={item.data ? item.data.orderNum : ""}
                  />
                  <EntryItem
                    title="Doc Number"
                    value={item.data ? item.data.docNumber : ""}
                  />
                  <EntryItem
                    title="Transit Information"
                    value={item.data ? item.data.transitInformation : ""}
                  />
                </div>
              </div>
              {item.entryImages && item.entryImages.length > 0 && (
                <img
                  src={`data:image/jpeg;base64,${item.entryImages[0].imageData}`}
                  width="230"
                  alt="Reference Image"
                  className="md:ml-6 mt-4 md:mt-0 rounded-lg mr-2 cursor-pointer"
                  onClick={() =>
                    handleImageClick(
                      `data:image/jpeg;base64,${item.entryImages[0].imageData}`
                    )
                  }
                />
              )}
            </div>
            <div className="flex justify-between items-center mt-5">
              <button
                onClick={() => editFormData(item)}
                className="hover:bg-blue-800 hover:text-white flex text-blue-600 px-3 p-2 border rounded-xl items-center mx-2"
              >
                Edit <img src={edit} alt="Edit" />
              </button>
              <button
                onClick={() => deleteFormData(item.id)}
                className="hover:bg-red-700 hover:text-white flex text-red-600 p-2 border rounded-xl items-center mx-2"
              >
                Delete <img src={trash} alt="Delete" className="" />
              </button>
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
          className="absolute top-0 right-0 flex items-center w-xl max-w-xs p-2 px-4 mr-4 mb-4 text-slate-500 bg-emerald-100 rounded-lg shadow"
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
      {showImageModal && (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex justify-center items-center bg-black bg-opacity-75">
          <div className="relative max-w-full max-h-full overflow-auto">
            <img
              src={clickedImageUrl}
              alt="Zoomed Image"
              className="sm:max-w-sm sm:max-h-sm md:max-w-md md:max-h-md rounded"
            />
            <button
              className="absolute top-2 right-4 text-white text-3xl"
              onClick={closeImageModal}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DispatchView;
