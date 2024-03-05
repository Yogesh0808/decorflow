import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SofaForm from "./orderForm/SofaForm";
import BlindsForm from "./orderForm/BlindsForm";
import CurtainsForm from "./orderForm/CurtainsForm";
import FlooringForm from "./orderForm/FlooringForm";
import WallpaperForm from "./orderForm/WallpaperForm";
import FurnitureForm from "./orderForm/FurnitureForm";
import MattressForm from "./orderForm/MattressForm";

axios.defaults.baseURL = "https://cors-h05i.onrender.com";

const CustomerTable = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    size: "",
    shapeModel: "L-Shaped",
    referenceImage: null,
    fabricNameCode: "",
    fabricImage: null,
  });
  const [customers, setCustomers] = useState([]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedCustomer) {
      console.error("Selected customer is undefined or null");
      return;
    }
    setNotification("Form submitted successfully");
    toast.success(`${selectedProduct} has been added successfully`);
    setShowModal(false);
    setFormData({
      ...formData,
      [selectedProduct]: "",
    });
  };

  const productImages = {
    Curtains: "https://ik.imagekit.io/tealcdn2023/assets/curtains.png",
    Sofas: "https://cdn-icons-png.flaticon.com/512/5781/5781883.png",
    Blinds: "https://ik.imagekit.io/tealcdn2023/assets/blinds.png",
    Carpets:
      "https://cdn.iconscout.com/icon/premium/png-256-thumb/carpet-1469898-1243937.png?f=webp",
    Floorings: "https://ik.imagekit.io/tealcdn2023/assets/flooring.png",
    Wallpaper: "https://ik.imagekit.io/tealcdn2023/assets/wallpaper.png",
    Furniture: "https://ik.imagekit.io/tealcdn2023/assets/Decor.png",
    Mattress: "https://ik.imagekit.io/tealcdn2023/assets/bed.png",
  };

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

  const handleCategorySelect = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      ...formData,
      [selectedProduct]: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (formData) => {
    try {
      const { clientName, cid } = selectedCustomer;
      const dataToSubmit = {
        ...formData,
        customerName: clientName,
        customerId: cid,
      };
      console.log("Submitted Data:", dataToSubmit);
      setShowModal(false);
      setFormData({
        ...formData,
        [selectedProduct]: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const renderProductForm = () => {
    switch (selectedProduct) {
      case "Curtains":
        return (
          <CurtainsForm
            formData={formData}
            onInputChange={(e) => handleInputChange(e)}
            onCloseModal={handleCloseModal}
            onSubmit={(formData) => handleFormSubmit(formData)}
            selectedCustomer={selectedCustomer}
          />
        );
      case "Sofas":
        return (
          <SofaForm
            formData={formData}
            onInputChange={(e) => handleInputChange(e)}
            onCloseModal={handleCloseModal}
            onSubmit={handleSubmit}
            selectedCustomer={selectedCustomer}
          />
        );
      case "Blinds":
        return (
          <BlindsForm
            onCloseModal={handleCloseModal}
            onSubmit={handleSubmit}
            selectedCustomer={selectedCustomer}
          />
        );
      case "Wallpaper":
        return (
          <WallpaperForm
            onCloseModal={handleCloseModal}
            onSubmit={handleFormSubmit}
            selectedCustomer={selectedCustomer}
          />
        );
      case "Floorings":
        return (
          <FlooringForm
            onSubmit={handleFormSubmit}
            onCloseModal={handleCloseModal}
            selectedCustomer={selectedCustomer}
          />
        );
      case "Furniture":
        return (
          <FurnitureForm
            onSubmit={handleFormSubmit}
            onCloseModal={handleCloseModal}
            selectedCustomer={selectedCustomer}
          />
        );
      case "Mattress":
        return (
          <MattressForm
            onSubmit={handleFormSubmit}
            onCloseModal={handleCloseModal}
            selectedCustomer={selectedCustomer}
          />
        );
      default:
        return null;
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
            New Order For {selectedCustomer && selectedCustomer.clientName} -{" "}
            {selectedCustomer && selectedCustomer.cid}
          </p>
          <div className="flex justify-center items-center lg:h-96 sm:h-screen my-10 bg-gray-100 dark:bg-gray-800">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {[
                "Curtains",
                "Sofas",
                "Blinds",
                "Floorings",
                "Wallpaper",
                "Furniture",
                "Mattress",
              ].map((product, index) => (
                <div
                  key={index}
                  onClick={() => handleCategorySelect(product)}
                  className="rounded-lg bg-gradient-to-bl from-blue-300 via-sky-300 to-indigo-300 dark:from-blue-600 dark:via-sky-600 dark:to-indigo-500 shadow-md overflow-hidden cursor-pointer hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
                >
                  <img
                    src={productImages[product]}
                    alt={product}
                    className="w-full lg:h-32 sm:h-28 p-4"
                  />
                  <div className="p-4">
                    <p className="text-center text-blue-800 bg-blue-50 dark:text-white dark:bg-blue-800 rounded-xl py-1 text-xl font-normal">
                      {product}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <ToastContainer
            position="top-right"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
              <div className="relative w-82 max-w-md mx-auto">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-lg overflow-hidden max-w-md w-full">
                    <div>{renderProductForm(selectedCustomer)}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
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

export default CustomerTable;
