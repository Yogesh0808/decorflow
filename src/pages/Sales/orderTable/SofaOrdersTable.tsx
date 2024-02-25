import React from 'react';

const SofaOrdersTable = ({ orders }) => {
  return (
    <div className="max-w-screen mx-auto overflow-x-hidden p-4">
      <div className="overflow-y-auto overflow-x-auto max-h-screen rounded-xl">
        <table className="w-full rounded-lg text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-gray-900 dark:bg-gray-800">
          <thead className="text-sm text-blue-900 uppercase rounded-lg bg-blue-100 dark:bg-slate-900 dark:text-slate-300">
            <tr>
              <th scope="col" className="px-3 py-4">
                Order ID
              </th>
              <th scope="col" className="px-3 py-4">
                Description
              </th>
              <th scope="col" className="px-4 py-4">
                Size of Sofa
              </th>
              <th scope="col" className="px-4 py-4">
                Shape and Model of Sofa
              </th>
              <th scope="col" className="px-4 py-4">
                Reference Image
              </th>
              <th scope="col" className="px-4 py-4">
                Fabric Name & Code
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
            {orders.map((order) => (
              <tr
                key={order.id}
                className="bg-white border-b border-zinc-200 dark:bg-slate-800 dark:border-slate-700"
              >
                <td className="py-2 text-gray-900 whitespace-nowrap text-center dark:text-white">
                  {order.id}
                </td>
                <td className="px-4 py-2">{order.description}</td>
                <td className="px-4 py-2">{order.size}</td>
                <td className="px-4 py-2">{order.shapeModel}</td>
                <td className="px-4 py-2">
                  <img
                    src={order.referenceImage}
                    alt={`Sofa ${order.id}`}
                    style={{ maxWidth: '100px' }}
                  />
                </td>
                <td className="px-4 py-2">{order.fabricNameCode}</td>
                <td className="px-4 py-2">
                  <img
                    src={order.fabricImage}
                    alt={`Fabric ${order.id}`}
                    style={{ maxWidth: '100px' }}
                  />
                </td>
                <td className="px-4 py-2">
                  {/* Add action buttons here if needed */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SofaOrdersTable;
