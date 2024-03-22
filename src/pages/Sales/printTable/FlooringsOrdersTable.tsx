import React from "react";

const FlooringOrdersTable = ({ products, editProduct, deleteProduct }) => {
  let serialNumber = 0;
  if (!products || products.length === 0) {
    console.log("From Flooring:", products);
    return <div>No product data available</div>;
  }

  return (
    <div className="max-w-screen mx-auto overflow-x-hidden p-4">
      <h1 className="text-black p-2 text-2xl dark:text-whiter">
        Flooring Orders
      </h1>
      <div className="overflow-y-auto overflow-x-auto max-h-screen rounded-xl">
        <table className="w-full rounded-lg text-sm text-left rtl:text-right text-slate-500 dark:text-slate-400 bg-gray-900 dark:bg-gray-800">
          <thead className="text-sm text-blue-900 uppercase rounded-lg bg-blue-100 dark:bg-slate-900 dark:text-slate-300">
            <tr>
              <th scope="col" className="px-3 py-4">
                Order ID
              </th>
              <th scope="col" className="px-3 py-4">
                Description
              </th>
              <th scope="col" className="px-4 py-4">
                Size of Floor
              </th>
              <th scope="col" className="px-4 py-4">
                Number of Sqft
              </th>
              <th scope="col" className="px-4 py-4">
                Catalog Code and Number
              </th>
              <th scope="col" className="px-4 py-4">
                Flooring Image
              </th>
              <th scope="col" className="px-4 py-4">
                Remarks
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="bg-white border-b border-zinc-200 dark:bg-slate-800 dark:border-slate-700"
              >
                <td className="py-2 text-slate-900 whitespace-nowrap text-center dark:text-white">
                  {++serialNumber}
                </td>
                <td className="px-3 py-2">{product.data.description}</td>
                <td className="px-4 py-2">{product.data.sizeOfFloor}</td>
                <td className="px-4 py-2">{product.data.numberOfSqft}</td>
                <td className="px-4 py-2">
                  {product.data.catalogCodeAndNumber}
                </td>
                <td className="px-4 py-2">
                  {product.images.length > 0 ? (
                    <img
                      src={`data:image/jpeg;base64,${product.images[0].imageData}`}
                      width="100"
                    />
                  ) : (
                    "No Image Available"
                  )}
                </td>
                <td className="px-4 py-2">{product.data.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FlooringOrdersTable;
