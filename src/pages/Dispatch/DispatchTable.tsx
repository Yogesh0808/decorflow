import React, { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/";

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

function DispatchTable() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading state

  useEffect(() => {
    getClients();
  }, []);

  const getClients = () => {
    axios
      .get("/api/customer", getHeaders())
      .then((response) => {
        setClients(response.data);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error("Error fetching clients:", error);
      });
  };

  return (
    <div className="max-w-screen overflow-x-auto">
      <div className="max-w-screen mx-auto overflow-x-hidden p-4">
        {loading ? ( // Show skeleton loading when data is loading
          <SkeletonTable />
        ) : clients.length ? ( // Show table if data exists
          <div className="overflow-y-auto overflow-x-auto max-h-screen rounded-xl">
            <table className="w-full rounded-lg text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-gray-900 dark:bg-gray-800">
              <thead className="text-sm text-blue-900 uppercase rounded-lg bg-blue-100 dark:bg-slate-900 dark:text-slate-300">
                <tr>
                  <th scope="col" className="px-3 py-4">
                    Customer Name
                  </th>
                  <th scope="col" className="px-3 py-4">
                    Area of Room
                  </th>
                  <th scope="col" className="px-4 py-4">
                    Catalog Name
                  </th>
                  <th scope="col" className="px-4 py-4">
                    Quantity
                  </th>
                  <th scope="col" className="px-4 py-4">
                    Quantity Ordered
                  </th>
                  <th scope="col" className="px-4 py-4">
                    Company Name
                  </th>
                  <th scope="col" className="px-4 py-4">
                    Document Number
                  </th>
                  <th scope="col" className="px-4 py-4">
                    Transit Information
                  </th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr
                    key={client.id}
                    className="bg-white border-b border-zinc-200 dark:bg-slate-800 dark:border-slate-700"
                  >
                    <td className="px-3 py-2">{client.customerName}</td>
                    <td className="px-3 py-2">{client.areaOfRoom}</td>
                    <td className="px-4 py-2">{client.catalogName}</td>
                    <td className="px-4 py-2">{client.quantity}</td>
                    <td className="px-4 py-2">{client.quantityOrdered}</td>
                    <td className="px-4 py-2">{client.companyName}</td>
                    <td className="px-4 py-2">{client.docNumber}</td>
                    <td className="px-4 py-2">{client.transitInformation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          // Show message if no data exists
          <div className="text-center mt-8">
            <p className="text-2xl text-center text-neutral-900 dark:text-gray-400 dark:text-slate-100">
              <span className="py-10 my-100">Oops! Data Not Found.</span>
              <img
                src="https://ik.imagekit.io/tealcdn2023/assets/undraw_landscape_photographer_blv1.svg?updatedAt=1709287801082"
                className="flex justify-center h-100 mx-auto"
                alt="Illustration"
              />
              <span className="text-lime-500">Go Ahead and Add Some</span>
            </p>
            <div className="mt-10">
              <a
                className="mt-4 px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-600"
                href="/Customer/New"
              >
                Add
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// SkeletonTable component to render skeleton loading effect
const SkeletonTable = () => {
  return (
    <div className="animate-pulse">
      <table className="w-full rounded-lg text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-gray-900 dark:bg-gray-800">
        <thead className="text-sm text-blue-900 uppercase rounded-lg bg-blue-100 dark:bg-slate-900 dark:text-slate-300">
          <tr>
            <th
              scope="col"
              className="px-3 py-4 bg-gray-400 dark:bg-slate-800"
            ></th>
            <th
              scope="col"
              className="px-3 py-4 bg-gray-300 dark:bg-slate-800"
            ></th>
            <th
              scope="col"
              className="px-4 py-4 bg-gray-300 dark:bg-slate-800"
            ></th>
            <th
              scope="col"
              className="px-4 py-4 bg-gray-300 dark:bg-slate-800"
            ></th>
            <th
              scope="col"
              className="px-4 py-4 bg-gray-300 dark:bg-slate-800"
            ></th>
            <th
              scope="col"
              className="px-4 py-4 bg-gray-300 dark:bg-slate-800"
            ></th>
            <th
              scope="col"
              className="px-4 py-4 bg-gray-300 dark:bg-slate-800"
            ></th>
            <th
              scope="col"
              className="px-4 py-4 bg-gray-400 dark:bg-slate-800"
            ></th>
          </tr>
        </thead>
        <tbody>
          {[...Array(5)].map((_, index) => (
            <tr key={index}>
              <td className="py-2 bg-gray-300 dark:bg-slate-800"></td>
              <td className="py-2 bg-gray-300 dark:bg-slate-800"></td>
              <td className="px-4 py-2 bg-gray-300 dark:bg-slate-800"></td>
              <td className="px-4 py-2 bg-gray-300 dark:bg-slate-800"></td>
              <td className="px-4 py-2 bg-gray-300 dark:bg-slate-800"></td>
              <td className="px-4 py-2 bg-gray-300 dark:bg-slate-800"></td>
              <td className="px-4 py-2 bg-gray-300 dark:bg-slate-800"></td>
              <td className="px-4 py-2 bg-gray-300 dark:bg-slate-800"></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DispatchTable;
