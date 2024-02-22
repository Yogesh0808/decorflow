import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SofaForm from './orderForm/SofaForm';
import BlindsForm from './orderForm/BlindsForm';
import CarpetForm from './orderForm/CarpetForm';
import CurtainsForm from './orderForm/CurtainsForm';
import FlooringForm from './orderForm/FlooringForm';
import WallpaperForm from './orderForm/WallpaperForm';

const CustomerTable = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState('');
  const [formData, setFormData] = useState({
    // Initialize form data here for each product
    Curtains: '',
    Sofas: '',
    Blinds: '',
    Carpets: '',
    Floorings: '',
  });
  const [customers, setCustomers] = useState([]);

  // Define the getHeaders function for Basic Authentication
  axios.defaults.baseURL = 'https://cors-h05i.onrender.com';
  const getHeaders = () => {
    const username = 'abinesh';
    const password = 'abi';
    const basicAuth = 'Basic ' + btoa(username + ':' + password);
    return {
      headers: {
        Authorization: basicAuth,
      },
    };
  };

  // Function to fetch customers from the API
  const fetchCustomers = async () => {
    try {
      const response = await axios.get('/api/clients/names', getHeaders());
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error.message);
    }
  };

  useEffect(() => {
    // Fetch customers when the component mounts
    fetchCustomers();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Your logic for form submission goes here
    setNotification('Form submitted successfully');
    setShowModal(false); // Close modal after submission
    // Reset form or do any other necessary actions
    setFormData({
      ...formData,
      [selectedProduct]: '',
    });
  };

  // Function to handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      ...formData,
      [selectedProduct]: '',
    });
  };

  const productImages = {
    Curtains:
      'https://static.vecteezy.com/system/resources/previews/012/723/093/original/curtain-icon-free-vector.jpg',
    Sofas: 'https://cdn-icons-png.flaticon.com/512/5781/5781883.png',
    Blinds: 'https://cdn-icons-png.flaticon.com/512/1606/1606190.png',
    Carpets:
      'https://cdn.iconscout.com/icon/premium/png-256-thumb/carpet-1469898-1243937.png?f=webp',
    Floorings: 'https://www.svgrepo.com/download/208462/parquet-floor.svg',
    Wallpaper: 'https://cdn-icons-png.flaticon.com/512/253/253002.png',
  };

  // Function to handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle card click
  const handleCategorySelect = (product) => {
    setSelectedProduct(product);
    setShowModal(true); // Show modal when a card is clicked
  };

  const renderProductForm = () => {
    switch (selectedProduct) {
      case 'Curtains':
        return (
          <CurtainsForm
            onCloseModal={handleCloseModal}
            onSubmit={handleSubmit}
          />
        );
      case 'Sofas':
        return (
          <SofaForm onCloseModal={handleCloseModal} onSubmit={handleSubmit} />
        );
      case 'Blinds':
        return (
          <BlindsForm onCloseModal={handleCloseModal} onSubmit={handleSubmit} />
        );

      case 'Carpets':
        return (
          <CarpetForm onCloseModal={handleCloseModal} onSubmit={handleSubmit} />
        );

      case 'Wallpaper':
        return (
          <WallpaperForm
            onCloseModal={handleCloseModal}
            onSubmit={handleSubmit}
          />
        );

      case 'Floorings':
        return (
          <FlooringForm
            onCloseModal={handleCloseModal}
            onSubmit={handleSubmit}
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
          value={selectedCustomer}
          onChange={(e) => setSelectedCustomer(e.target.value)}
          className="block w-full mt-4 p-3 border border-slate-400 shadow-lg rounded-xl focus:outline-none focus:border-red-600"
        >
          <option value="" className="rounded-lg p-4 m-10">
            Select Customer
          </option>
          {customers.map((customer, index) => (
            <option key={index} value={customer} className="rounded-lg p-2">
              {customer}
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
            New Order For {selectedCustomer}
          </p>

          <div className="flex justify-center items-center lg:h-96 sm:h-screen my-10 bg-gray-100">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {[
                'Curtains',
                'Sofas',
                'Blinds',
                'Carpets',
                'Floorings',
                'Wallpaper',
              ].map((product, index) => (
                <div
                  key={index}
                  onClick={() => handleCategorySelect(product)}
                  className="rounded-lg bg-blue-100 shadow-lg overflow-hidden"
                >
                  <img
                    src={productImages[product]}
                    alt={product}
                    className="w-full lg:h-32 sm:h-28 p-4"
                  />
                  <div className="p-4">
                    <p className="text-center text-blue-800 bg-blue-50 rounded-xl py-1 text-xl font-normal">
                      {product}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center z-50 shadow-xl rounded-lg">
              <div className="absolute shadow-xl rounded-xl">
                {/* Close button */}
                <button
                  className="absolute top-2 right-2"
                  onClick={handleCloseModal}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <div className="modal-content">
                  {/* Render the form for the selected product */}
                  {renderProductForm()}
                </div>
              </div>
            </div>
          )}

          {/* Notification */}
          {notification && (
            <div className="absolute bottom-0 right-2 text-xl text-lime-600 bg-slate-100 p-4 rounded-xl">
              {notification}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CustomerTable;
