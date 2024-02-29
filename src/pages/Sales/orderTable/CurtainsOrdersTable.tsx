import React, { useState } from "react";

const CurtainsOrdersTable = ({ products, editClient, deleteClient }) => {
  // Remove the useState declaration as it's unnecessary

  if (!products || products.length === 0) {
    console.log("From Curtains:", products);
    return <div>No product data available</div>;
  }

  return (
    <div className="max-w-screen mx-auto overflow-x-hidden p-4">
      <h1 className="text-black p-2 text-2xl">Curtains Orders</h1>
      <div className="overflow-y-auto overflow-x-auto max-h-screen rounded-xl">
        <table className="w-full rounded-lg text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-gray-900 dark:bg-gray-800">
          <thead className="text-sm text-blue-900 uppercase rounded-lg bg-blue-100 dark:bg-slate-900 dark:text-slate-300">
            <tr>
              <th scope="col" className="px-3 py-4">
                Order ID
              </th>
              <th scope="col" className="px-3 py-4">
                Title
              </th>
              <th scope="col" className="px-4 py-4">
                Description
              </th>
              <th scope="col" className="px-4 py-4">
                Size
              </th>
              <th scope="col" className="px-4 py-4">
                Width of Fabric
              </th>
              <th scope="col" className="px-4 py-4">
                No. of Pieces
              </th>
              <th scope="col" className="px-4 py-4">
                No. of Panels
              </th>
              <th scope="col" className="px-4 py-4">
                Model of Stitching
              </th>
              <th scope="col" className="px-4 py-4">
                Fabric Name
              </th>
              <th scope="col" className="px-4 py-4">
                Fabric Code
              </th>
              <th scope="col" className="px-4 py-4">
                Fabric Image
              </th>
              <th scope="col" className="px-4 py-4">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="bg-white border-b border-zinc-200 dark:bg-slate-800 dark:border-slate-700"
              >
                <td className="py-2 text-gray-900 whitespace-nowrap text-center dark:text-white">
                  {product.id}
                </td>
                <td className="py-2 text-gray-900 whitespace-nowrap text-center dark:text-white">
                  {product.data.title}
                </td>
                <td className="px-4 py-2">{product.data.description}</td>
                <td className="px-4 py-2">{product.data.size}</td>
                <td className="px-4 py-2">{product.data.widthOfFabric}</td>
                <td className="px-4 py-2">{product.data.noOfPieces}</td>
                <td className="px-4 py-2">{product.data.noOfPanels}</td>
                <td className="px-4 py-2">{product.data.modelOfStitching}</td>
                <td className="px-4 py-2">{product.data.fabricName}</td>
                <td className="px-4 py-2">{product.data.fabricCode}</td>
                <td className="px-4 py-2">
                  {product.data.image ? (
                    <img
                      src={`data:image/jpeg;base64,${product.data.image}`}
                      width="100"
                    />
                  ) : (
                    "No Image Available"
                  )}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => editClient(product)}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteClient(product.id)}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CurtainsOrdersTable;
