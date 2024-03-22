import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SkeletonRow from "./SkeletonRow";
import QuoteForm from "./QuoteForm";
import left from "../../images/icon/left-arrow.svg";

const NewInvoice = ({ filterValue, setSearchBar, setFilterValue }) => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [notification, setNotification] = useState("");
  const [customers, setCustomers] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [formData, setFormData] = useState({
    area: "",
    quantity: "",
    rate: "",
    gstPercentage: "",
    amount: 0,
    gstAmount: 0,
    total: 0,
  });
  const [step, setStep] = useState(0); // Track the current step

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
    Headboard: "https://ik.imagekit.io/tealcdn2023/assets/Headboard.png",
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

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("/api/customer/names", getHeaders());
      setCustomers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching customers:", error.message);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    const searchRegex = new RegExp(`^${filterValue}`, "i");
    const filtered = customers.filter((client) =>
      searchRegex.test(client.clientName)
    );
    setFilteredData(filtered);
  }, [filterValue]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowQuoteForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    calculateAmountAndGst({ ...formData, [name]: value });
  };

  const calculateAmountAndGst = ({ quantity, rate, gstPercentage }) => {
    if (!quantity || !rate || !gstPercentage) {
      return;
    }

    const parsedQuantity = parseFloat(quantity);
    const parsedRate = parseFloat(rate);
    const parsedGstPercentage = parseFloat(gstPercentage);

    if (
      isNaN(parsedQuantity) ||
      isNaN(parsedRate) ||
      isNaN(parsedGstPercentage)
    ) {
      console.error("Invalid input values");
      return;
    }

    const calculatedAmount = parsedQuantity * parsedRate;
    const calculatedGstAmount = (calculatedAmount * parsedGstPercentage) / 100;
    const calculatedTotal = calculatedAmount + calculatedGstAmount;

    setFormData((prevFormData) => ({
      ...prevFormData,
      amount: isNaN(calculatedAmount) ? "0.00" : calculatedAmount.toFixed(2),
      gstAmount: isNaN(calculatedGstAmount)
        ? "0.00"
        : calculatedGstAmount.toFixed(2),
      total: isNaN(calculatedTotal) ? "0.00" : calculatedTotal.toFixed(2),
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
          total,
        } = formData;

        const url = `/api/invoice/${selectedCustomer.id}/${selectedCategory}?area=${area}&quantity=${quantity}&rate=${rate}&gstPercentage=${gstPercentage}&amount=${amount}&gstAmount=${gstAmount}&total=${total}`;
        const response = await axios.post(url, {}, getHeaders());

        console.log("Form submitted successfully:", response.data);
        toast.success("Quote has been submitted");
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
      amount: 0,
      gstAmount: 0,
      total: 0,
    });
    setShowQuoteForm(false);
    setStep(0);
  };

  const handleBackButtonClick = () => {
    if (showQuoteForm) {
      setShowQuoteForm(false);
    } else if (selectedCustomer) {
      setSelectedCustomer(null);
      setStep(0);
    } else {
      setSearchBar(true);
      setFilterValue("");
    }
  };

  return (
    <div>
      {!selectedCustomer && !showQuoteForm && (
        <>
          {loading ? (
            <SkeletonRow />
          ) : filterValue ? (
            <>
              <ul className="flex w-full justify-around mt-3 text-boxdark bg-blue-300 rounded-xl">
                <li className="p-3 font-bold w-1/6 text-center">Client ID</li>
                <li className="p-3 font-bold w-5/6 text-center flex justify-center items-center">
                  Client Name
                </li>
              </ul>
              {filteredData.map((customer, index) => (
                <ul
                  className="flex w-full justify-around bg-blue-100 text-graydark my-3 rounded-xl cursor-pointer"
                  key={index}
                  onClick={() => {
                    setSelectedCustomer(customer);
                    setStep(1);
                  }}
                >
                  <li className="p-3 w-1/6 text-center">{customer.cid}</li>
                  <li className="p-3 w-5/6 text-center">
                    {customer.clientName}
                  </li>
                </ul>
              ))}
            </>
          ) : (
            <>
              <ul className="flex w-full justify-around mt-3 text-boxdark bg-blue-300 rounded-xl">
                <li className="p-3 font-bold w-1/6 text-center">Client ID</li>
                <li className=" w-5/6 text-center p-3 font-bold flex justify-center items-center">
                  Client Name
                </li>
              </ul>
              {customers.map((customer, index) => (
                <ul
                  className="flex w-full justify-around bg-blue-100 text-graydark my-3 rounded-xl cursor-pointer"
                  key={index}
                  onClick={() => {
                    setSelectedCustomer(customer);
                    setStep(1);
                  }}
                >
                  <li className="p-3 w-1/6 text-center">{customer.cid}</li>
                  <li className=" w-5/6 text-center p-3 ">
                    {customer.clientName}
                  </li>
                </ul>
              ))}
            </>
          )}
        </>
      )}

      {(selectedCustomer || showQuoteForm) && (
        <>
          <button
            onClick={handleBackButtonClick}
            className="top-4 right-4 my-4 flex text-stone-950 bg-white p-2 rounded-full dark:text-whiten dark:bg-slate-900"
          >
            <img src={left} />
            Go Back
          </button>
          <h2 className="text-center text-slate-700 dark:text-slate-50 text-2xl">
            New Invoice For {selectedCustomer?.clientName} -{" "}
            {selectedCustomer?.cid}
          </h2>
        </>
      )}

      {selectedCustomer && !showQuoteForm && (
        <div className="flex justify-center items-center lg:h-96 sm:h-screen my-10 bg-gray-100 dark:bg-gray-800">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {[
              "Curtains",
              "Sofas",
              "Blinds",
              "Floorings",
              "Wallpaper",
              "Furniture",
              "Mattress",
              "Headboard",
            ].map((product, index) => (
              <div
                key={index}
                onClick={() => handleCategorySelect(product)}
                className="rounded-lg bg-gradient-to-bl from-blue-300 via-sky-300 to-indigo-300 dark:from-blue-600 dark:via-sky-600 dark:to-indigo-500 shadow-md overflow-hidden cursor-pointer hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
              >
                <img
                  src={productImages[product]}
                  alt={product}
                  className="w-full lg:h-32 sm:h-28 p-4 px-5"
                />
                <div className="p-3.5">
                  <p className="text-center text-blue-800 bg-blue-50 dark:text-white dark:bg-blue-800 rounded-xl p-1.5 text-xl font-normal">
                    {product}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showQuoteForm && (
        <QuoteForm
          selectedCustomer={selectedCustomer}
          selectedCategory={selectedCategory}
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      )}

      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {notification && (
        <div className="absolute bottom-0 right-2 text-xl text-lime-600 bg-slate-100 p-4 rounded-xl">
          {notification}
        </div>
      )}
    </div>
  );
};

export default NewInvoice;
