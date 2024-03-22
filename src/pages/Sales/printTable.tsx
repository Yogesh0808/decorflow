import React, { useState, useEffect } from "react";
import axios from "axios";
import CurtainsOrdersTable from "./printTable/CurtainsOrdersTable";
import SofaOrdersTable from "./printTable/SofaOrdersTable";
import BlindOrdersTable from "./printTable/BlindOrdersTable";
import FurnitureOrdersTable from "./printTable/FurnitureOrdersTable";
import WallpaperOrdersTable from "./printTable/WallpaperOrdersTable";
import FlooringsOrdersTable from "./printTable/FlooringsOrdersTable";
import MattressOrdersTable from "./printTable/MattressOrdersTable";
import HeadboardOrdersTable from "./printTable/HeadboardOrdersTable";
import Logo from "../../images/logo/Logo.png";
import Loader from "../../common/Loader/index";

const PrintTable = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [generatingPDF, setGeneratingPDF] = useState(false);
  const [printType, setPrintType] = useState("all");

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

  const fetchCustomerDetails = async (customerId) => {
    try {
      const response = await axios.get(
        `/api/customer/${customerId}`,
        getHeaders()
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching customer details:", error.message);
      return null;
    }
  };

  const fetchProducts = async (customerId) => {
    try {
      setLoading(true); // Set loading to true while fetching products
      const response = await axios.get(
        `/api/products/${customerId}`,
        getHeaders()
      );
      console.log("Products data:", response.data); // Log the products data
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    } finally {
      setLoading(false); // Set loading back to false after fetching completes
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

  const handleSelectCustomer = async (customerId) => {
    const customerDetails = await fetchCustomerDetails(customerId);
    setSelectedCustomer(customerDetails);
    fetchProducts(customerId);
  };

  const renderProductTables = () => {
    if (loading) {
      return (
        <div className="text-center mt-4">
          Loading...
          <Loader />
        </div>
      );
    }

    if (products.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center text-slate-900 text-xl mt-4">
          <img
            src="https://ik.imagekit.io/tealcdn2023/assets/No%20data-cuate.svg"
            className="w-100"
            alt="No data available"
          />
          <p>Oh Oh! It seems there are no products available.</p>
          <p className="text-sm">No Worries Still you can Add Products</p>
        </div>
      );
    }

    const productTables = {};
    products.forEach((product) => {
      const category = product.category;
      if (!productTables[category]) {
        productTables[category] = [];
      }
      productTables[category].push(product);
    });

    return Object.entries(productTables).map(([category, products]) => {
      switch (category) {
        case "Curtains":
          return <CurtainsOrdersTable key={category} products={products} />;
        case "Sofa":
          return <SofaOrdersTable key={category} products={products} />;
        case "Blinds":
          return <BlindOrdersTable key={category} products={products} />;
        case "Furniture":
          return <FurnitureOrdersTable key={category} products={products} />;
        case "Wallpaper":
          return <WallpaperOrdersTable key={category} products={products} />;
        case "Flooring":
          return <FlooringsOrdersTable key={category} products={products} />;
        case "Mattress":
          return <MattressOrdersTable key={category} products={products} />;
        case "Headboard":
          return <HeadboardOrdersTable key={category} products={products} />;
        default:
          return null;
      }
    });
  };

  const handlePrintType = (type) => {
    setPrintType(type);
  };

  const handlePrintTypeChange = async (type) => {
    setPrintType(type);

    if (type === "all") {
      // Fetch customer details and products when switching to 'all' print type
      await handleSelectCustomer(selectedCustomer.id);
    } else {
      // Reset selectedCustomer to null when switching to 'tailor' print type
      setSelectedCustomer(null);
    }
  };

  const handlePrint = () => {
    const printContent = document.querySelector(".print-content");
    const newWindow = window.open("", "_blank");
    const htmlContent = `
      <html>
        <head>
          <title>Invoicing Preview</title>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap" rel="stylesheet">
          <style>
          .yhd {
            margin-left: 2%;
            margin-top: 1%;
          }
          .order-details {
            margin-right: 35px;
          }
          
            @media print {
              body, h1, p, table {
                margin: 10px;
                padding: 0;
                border-radius: 5px;
              }
              body {
                font-family: "Inter", sans-serif;
                font-weight: 400;
                color: #333;
              }
              .print-content {
                margin: 20px; /* Add margin to the print content */
              }
              table {
                width: 100%; /* Make tables fill the available width */
                table-layout: fixed; /* Fix the layout of the table */
              }
              th, td {
                border-bottom: 1px solid #ccc;
                padding: 8px;
                text-align: left;
                word-wrap: break-word; /* Allow long words to wrap */
              }
              
              @media print {
                table {
                  page-break-inside: avoid;
                }
              }
              .print-table {
                page-break-before: always;
              }
              td {
                color: #444 !important;
              }
            }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
          <script src="https://cdn.tailwindcss.com"></script>
        </body>
      </html>
    `;
    newWindow.document.write(htmlContent);
    newWindow.document.close();

    setTimeout(() => {
      try {
        newWindow.print();
        console.log("Printing initiated");
      } catch (error) {
        console.error("Error during printing:", error);
      }
      newWindow.close();
    }, 1000);
  };

  const handleGeneratePDF = async () => {
    try {
      setGeneratingPDF(true);
      const printContent = document.querySelector(".print-content");
      const htmlContent = `
        <html>
          <head>
            <title>Invoicing Preview</title>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap" rel="stylesheet">
            <style>
            body, h1, p, table {
              margin: 10px;
              padding: 0;
              border-radius: 5px;
            }
  
            /* Global styles */
            body {
              font-family: "Inter", sans-serif;
              font-optical-sizing: auto;
              font-weight: 400;
              line-height: 1;
              color: #333;
            }
  
  
            /* Header styles */
            .invoice-header {
                background-color: #f2f2f2;
                padding: 10px;
                border-bottom: 1px solid #ccc;
            }
  
            .invoice-header h1 {
                margin: 0;
                text-transform: uppercase;
            }
  
            .invoice-header p {
                margin: 5px 0;
                color: #666;
                font-family: "Nunito",sans-serif;
                font-weight: 300;
            }
  
            /* Customer details styles */
            .customer-details {
                margin-top: 10px;
            }
  
            /* Table styles */
            table {
                width: 75%;
                border-collapse: collapse;
                margin-top: 20px;
                border-radius:5px;
                margin: 0 20px;
            }
  
            th, td {
                border: 1px solid #ccc;
                padding: 8px;
                text-align: left;
            }
            
  
            th {
                background-color: #f2f2f2;
                font-weight: bold;
                padding: 10px auto;
            }
  
            /* Image styles */
            img {
                max-width: 160px;
                height: auto;
            }
            </style>
            </head>
            <body>
              ${printContent.innerHTML}
            </body>
        </html>
      `;
      const response = await fetch("http://3.106.227.95:3000/generate-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ htmlContent: htmlContent }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate PDF");
      }

      // Download the PDF file
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "invoice.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();

      setGeneratingPDF(false);
    } catch (error) {
      console.error("Error generating PDF:", error.message);
      setGeneratingPDF(false);
    }
  };

  return (
    <div
      className="container mx-auto p-4"
      onChange={(e) => handleSelectCustomer(e.target.value)}
    >
      <select
        value={selectedCustomer ? selectedCustomer.id : ""}
        onChange={(e) => handleSelectCustomer(e.target.value)}
        className="block w-full p-3 border border-slate-400 shadow-lg rounded-xl dark:bg-slate-950 focus:outline-none focus:border-strokedark mb-4"
      >
        <option value="">Select Customer</option>
        {customers.map((customer) => (
          <option key={customer.id} value={customer.id}>
            {customer.clientName} - {customer.cid}
          </option>
        ))}
      </select>

      <div className="flex items-center mb-4 text-black-2">
        <label className="mr-4">
          <input
            type="radio"
            name="printType"
            value="all"
            checked={printType === "all"}
            onChange={() => handlePrintTypeChange("all")}
            className="mr-2 form-radio h-4 w-4 text-slate-600 transition duration-150 ease-in-out"
          />
          <span className="text-sm">Customer</span>
        </label>
        <label>
          <input
            type="radio"
            name="printType"
            value="tailor"
            checked={printType === "tailor"}
            onChange={() => handlePrintTypeChange("tailor")}
            className="mr-2 form-radio h-4 w-4 text-slate-600 transition duration-150 ease-in-out"
          />
          <span className="text-sm">Tailor / Order Copy</span>
        </label>
      </div>

      <div>
        {selectedCustomer && (
          <div>
            <div className="bg-white dark:bg-slate-950 p-4 shadow-lg rounded-xl print-content">
              <div className="flex justify-between yhd">
                <div>
                  <img
                    src="https://ik.imagekit.io/tealcdn2023/assets/YHD.png"
                    width="100"
                    className="w-25"
                    alt="Logo"
                  />
                  <h1 className="text-3xl font-semibold uppercase text-slate-800 dark:text-white">
                    Yash Home Decors
                  </h1>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    #174, Pycrofts Road, Royapettah, Chennai - 600014
                  </p>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    Ph: +91-95000-05914
                  </p>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    GSTIN/UIN: 33CJWPM2113B1ZJ
                  </p>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    Tamil Nadu, Code: 33
                  </p>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    Email: yashdecoratives@gmail.com
                  </p>
                </div>

                <div className="flex-col text-end">
                  <div className="order-details">
                    <h2 className="text-xl font-normal uppercase text-slate-600 dark:text-white">
                      Order Details
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      Date: 19/02/2024
                    </p>
                  </div>

                  {printType === "all" && (
                    <div className="mt-4 order-details">
                      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                        Customer Details
                      </h2>
                      <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-xl text-slate-800">
                        <p>
                          <span className="font-semibold">Customer Name:</span>{" "}
                          {selectedCustomer.clientName}
                        </p>
                        <p>
                          <span className="font-semibold">Customer ID:</span>{" "}
                          {selectedCustomer.cid}
                        </p>
                        <p>
                          <span className="font-semibold">Address:</span>{" "}
                          {selectedCustomer.address}
                        </p>
                        <p>
                          <span className="font-semibold">Client Type:</span>{" "}
                          {selectedCustomer.clientType}
                        </p>
                        <p>
                          <span className="font-semibold">Purpose:</span>{" "}
                          {selectedCustomer.purpose}
                        </p>
                        <p>
                          <span className="font-semibold">Phone:</span>{" "}
                          {selectedCustomer.phone}
                        </p>
                        <p>
                          <span className="font-semibold">Email:</span>{" "}
                          {selectedCustomer.emailAddress}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {renderProductTables()}
            </div>

            <div className="flex justify-between mt-4">
              <button
                onClick={handlePrint}
                className="bg-blue-800 hover:bg-blue-900 text-white py-2 px-4 rounded-xl"
              >
                Print & Download
              </button>
              <button
                onClick={handleGeneratePDF}
                className="bg-green-700 hover:bg-green-900 text-white py-2 px-4 rounded-xl"
                disabled={generatingPDF}
              >
                {generatingPDF ? "Generating PDF..." : "Generate PDF"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrintTable;
