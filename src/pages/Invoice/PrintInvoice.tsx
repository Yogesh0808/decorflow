import React, { useState, useEffect } from "react";
import axios from "axios";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../layout/DefaultLayout";
import Loader from "../../common/Loader/index";

axios.defaults.baseURL = "https://cors-h05i.onrender.com";

const PrintInvoice = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [generatingPDF, setGeneratingPDF] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedInvoice, setEditedInvoice] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

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

  const fetchInvoices = async (customerId) => {
    try {
      const response = await axios.get(
        `/api/invoice/${customerId}`,
        getHeaders()
      );
      setInvoices(response.data);
      console.log("Invoices:", response.data);
    } catch (error) {
      console.error("Error fetching invoices:", error.message);
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
    try {
      setLoading(true);
      const customerDetails = await fetchCustomerDetails(customerId);
      setSelectedCustomer(customerDetails);
      await fetchInvoices(customerId); // Fetch invoices for the selected customer
      setLoading(false);
    } catch (error) {
      console.error("Error selecting customer:", error.message);
      setLoading(false);
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
          background-color: #f8f8f8;
        }
    
        /* Header styles */
        .invoice-header {
          background-color: #880D1E;
          color: #fff;
          padding: 25px;
          border-radius: 6px 6px 0 0;
        }

        image {
          width: 200px;
          height: 200px;
        }
    
        .invoice-header h1 {
          margin: 0;
          text-transform: uppercase;
          font-size: 24px;
        }
    
        .invoice-header p {
          margin: 5px 0;
          font-family: "Nunito", sans-serif;
          font-weight: 300;
        }
    
        .customer-details {
          margin-top: 20px;
        }
    
        table {
          width: 90%;
          border-collapse: collapse;
          margin-top: 30px;
          margin: 20px auto;
          border-radius: 5px;
          background-color: #fff;
        }
    
        th, td {
          border: 1px solid #ccc;
          padding: 12px;
          text-align: left;
        }
    
        th {
          background-color: #b31942;
          color: #fff;
        }
    
        /* Terms and conditions styles */
        .terms-conditions {
          margin-top: 30px;
          background-color: #fff;
          padding: 20px;
          border-radius: 5px;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }
    
        .terms-conditions h2 {
          color: #b31942;
          margin-top: 0;
          font-size: 20px;
        }
    
        .terms-conditions ol {
          margin-left: 20px;
        }
    
        .terms-conditions ol li {
          margin-bottom: 10px;
        }
    
        .terms-conditions p {
          margin: 10px 0;
        }
.flex {
  display: flex;
}

.justify-between {
  justify-content: space-between;
}

.justify-end {
  justify-content: flex-end;
}

.mb-4 {
  margin-bottom: 1rem;
}

.w-25 {
  width: 25%;
}
      </style>
    </head>
    <body>
      <div class="invoice-header">
        <h1>Invoicing Preview</h1>
        <p>Thank you for choosing us!</p>
      </div>
      ${printContent.innerHTML}
      <div class="terms-conditions">
        <h2>Terms and Conditions:</h2>
        <ol>
          <li>50% advance payment to be made in favor of “YASH HOME DECORS”</li>
          <li>Delivery period 45 to 60 days on receipt of the payment.</li>
          <li>Our Responsibility Ceases as soon as the goods leave our hands.</li>
          <li>Order once placed cannot be taken back or exchanged.</li>
          <li>Service will be given if any damage occurred (not immediate).</li>
          <li>Finished Product should be collected at CHOOLAI showroom.</li>
          <li>In case of outstation work there will be extra charges levied.</li>
          <li>At the time of installation ladders & scaffolding should be provided by the clients.</li>
          <li>Material not mentioned in the quote will be extra.</li>
          <li>Final installation will be done after complete payment.</li>
          <li>TRANSPORATION AND INSTALLATION WILL BE EXTRA</li>
        </ol>
        <p><strong>GST TIN NO:</strong> 33CJWPM2113B1ZJ</p>
        <p><strong>Our Bank Details:</strong></p>
        <p>ACCOUNT NO: 357201010036581</p>
        <p>A/C NAME: Yash Home Decors</p>
        <p>UNION BANK OF INDIA (TRIPLICANE BRANCH)</p>
        <p>IFSC Code: UBIN053572</p>
      </div>
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

  const calculateSubtotal = () => {
    const subtotal = invoices.reduce(
      (total, invoice) => total + parseFloat(invoice.total),
      0
    );
    return subtotal.toFixed(2);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Printorder" />
      <div className="container mx-auto p-4">
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

        {loading ? (
          <div className="text-center mt-4">
            Loading...
            <Loader />
          </div>
        ) : selectedCustomer ? (
          <div>
            <div className="bg-white dark:bg-slate-950 p-4 shadow-lg rounded-xl print-content">
              <div className="flex justify-between mb-4">
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
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    #174, Pycrofts Road, Royapettah, Chennai - 600014
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Ph: +91-95000-05914
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    GSTIN/UIN: 33CJWPM2113B1ZJ
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Tamil Nadu, Code: 33
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Email: yashdecoratives@gmail.com
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-normal uppercase text-slate-600 dark:text-white">
                    Order Details
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Date: 19/02/2024
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Customer Details
                </h2>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl">
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
              <div className="max-w-screen mx-auto p-6 space-y-6 text-neutral-700 dark:text-neutral-100">
                <h1 className="text-3xl font-normal mb-4">Order Invoice</h1>

                <div className="overflow-y-auto overflow-x-auto rounded-xl">
                  <table className="w-full rounded-lg text-sm text-left text-gray-500 dark:text-gray-400 bg-gray-900 dark:bg-gray-800">
                    <thead className="rounded-lg text-sm text-blue-900 uppercase bg-blue-100 dark:bg-slate-900 dark:text-slate-300">
                      <tr className="bg-neutral-100 dark:bg-slate-800">
                        <th className="py-2 px-4 border-b border-neutral-300 dark:border-neutral-800">
                          S.No.
                        </th>
                        <th className="py-2 px-4 border-b border-neutral-300 dark:border-neutral-800">
                          Area
                        </th>
                        <th className="py-2 px-4 border-b border-neutral-300 dark:border-neutral-800">
                          Quantity
                        </th>
                        <th className="py-2 px-4 border-b border-neutral-300 dark:border-neutral-800">
                          Rate
                        </th>
                        <th className="py-2 px-4 border-b border-neutral-300 dark:border-neutral-800">
                          Amount
                        </th>
                        <th className="py-2 px-4 border-b border-neutral-300 dark:border-neutral-800">
                          GST %
                        </th>
                        <th className="py-2 px-4 border-b border-neutral-300 dark:border-neutral-800">
                          GST Amount
                        </th>
                        <th className="py-2 px-4 border-b border-neutral-300 dark:border-neutral-800">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.length > 0 ? (
                        invoices.map((invoice, index) => (
                          <tr key={invoice.id}>
                            <td className="py-2 px-4 border-b border-neutral-300 dark:border-neutral-800">
                              {index + 1}
                            </td>
                            <td className="py-2 px-4 border-b border-neutral-300 dark:border-neutral-800">
                              {invoice.area}
                            </td>
                            <td className="py-2 px-4 border-b border-neutral-300 dark:border-neutral-800">
                              {invoice.quantity}
                            </td>
                            <td className="py-2 px-4 border-b border-neutral-300 dark:border-neutral-800">
                              {invoice.rate}
                            </td>
                            <td className="py-2 px-4 border-b border-neutral-300 dark:border-neutral-800">
                              {invoice.amount}
                            </td>
                            <td className="py-2 px-4 border-b border-neutral-300 dark:border-neutral-800">
                              {invoice.gstPercentage}
                            </td>
                            <td className="py-2 px-4 border-b border-neutral-300 dark:border-neutral-800">
                              {invoice.gstAmount}
                            </td>
                            <td className="py-2 px-4 border-b border-neutral-300 dark:border-neutral-800">
                              {invoice.total}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="8"
                            className="py-2 px-4 border-b border-neutral-300 dark:border-neutral-800"
                          >
                            No invoices available.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Subtotal */}
                <div className="flex justify-end">
                  <p className="font-normal text-xl">
                    Subtotal - {calculateSubtotal()}
                  </p>
                </div>

                {/* Edit Invoice Modal */}
                {showEditModal && (
                  <EditInvoiceModal
                    invoice={editedInvoice}
                    saveEditedInvoice={saveEditedInvoice}
                    closeModal={closeModal}
                  />
                )}

                {/* Toast Notification */}
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
                    <p className="ml-2 text-slate-800 font-normal">
                      {toastMessage}
                    </p>
                  </div>
                )}
              </div>
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
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-900 text-xl mt-4">
            <img
              src="https://ik.imagekit.io/tealcdn2023/assets/No%20data-cuate.svg"
              className="w-100"
              alt="No data available"
            />
            <p>Oops! It seems there are no products available.</p>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default PrintInvoice;
