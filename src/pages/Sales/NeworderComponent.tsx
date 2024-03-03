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

axios.defaults.baseURL = "http://localhost:8080/";

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

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedCustomer) {
      console.error("Selected customer is undefined or null");
      return;
    }
    // Your logic for form submission goes here
    setNotification("Form submitted successfully");
    toast.success(`${selectedProduct} has been added successfully`);
    setShowModal(false);
    setFormData({
      ...formData,
      [selectedProduct]: "",
    });
  };

  const productImages = {
    Curtains:
      "https://ik.imagekit.io/tealcdn2023/assets/curtains.png?updatedAt=1708796208451",
    Sofas: "https://cdn-icons-png.flaticon.com/512/5781/5781883.png",
    Blinds:
      "https://ik.imagekit.io/tealcdn2023/assets/blinds.png?updatedAt=1708795944875",
    Carpets:
      "https://cdn.iconscout.com/icon/premium/png-256-thumb/carpet-1469898-1243937.png?f=webp",
    Floorings:
      "https://ik.imagekit.io/tealcdn2023/assets/flooring.png?updatedAt=1708795833951",
    Wallpaper:
      "https://ik.imagekit.io/tealcdn2023/assets/wallpaper.png?updatedAt=1708795761824",
    Furniture:
      "https://ik.imagekit.io/tealcdn2023/assets/Decor.png?updatedAt=1708795608010",
  };

  // Fetch customers
  const fetchCustomers = async () => {
    try {
      const response = await axios.get("/api/customer/names", getHeaders());
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error.message);
    }
  };

  // Function to handle selection of product category
  const handleCategorySelect = (product) => {
    setSelectedProduct(product);
    setShowModal(true); // Show modal when a card is clicked
  };

  // Function to handle closing of modal
  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      ...formData,
      [selectedProduct]: "",
    });
  };

  // Function to handle input change in form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Fetch customers when the component mounts
  useEffect(() => {
    fetchCustomers();
  }, []);

  // Function to handle form submission
  const handleFormSubmit = async (formData) => {
    try {
      const { clientName, cid } = selectedCustomer; // Destructure clientName and id from selectedCustomer
      const dataToSubmit = {
        ...formData,
        customerName: clientName,
        customerId: cid,
      }; // Include customerName and customerId in the data
      console.log("Submitted Data:", dataToSubmit); // Logging the object directly
      setShowModal(false);
      setFormData({
        ...formData,
        [selectedProduct]: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Function to render the form for selected product
  const renderProductForm = () => {
    switch (selectedProduct) {
      case "Curtains":
        return (
          <CurtainsForm
            formData={formData}
            onInputChange={(e) => handleInputChange(e)}
            onCloseModal={handleCloseModal}
            onSubmit={(formData) => handleFormSubmit(formData)} // Pass customer name and ID to onSubmit
            selectedCustomer={selectedCustomer} // Pass selectedCustomer to CurtainsForm
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
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Show customer selection dropdown if no customer is selected */}
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
      {/* Show cards and modal if a customer is selected */}
      {selectedCustomer && (
        <>
          <button
            onClick={() => setSelectedCustomer(null)}
            className="top-4 right-4"
          >
            Back
          </button>
          {/* Cards */}
          {/* New Order For {client Name} */}
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
              ].map((product, index) => (
                <div
                  key={index}
                  onClick={() => handleCategorySelect(product)}
                  className="rounded-lg bg-gradient-to-br from-cyan-500 to-blue-400 dark:bg-blue-950 shadow-lg overflow-hidden"
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
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-lg overflow-hidden">
                    <div>{renderProductForm(selectedCustomer)}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      {/* Notification */}
      {notification && (
        <div className="absolute bottom-0 right-2 text-xl text-lime-600 bg-slate-100 p-4 rounded-xl">
          {notification}
        </div>
      )}
      {/* Toast Container */}
    </div>
  );
};

export default CustomerTable;
