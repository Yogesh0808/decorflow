import React from 'react';

const WallpaperOrdersTable = ({ orders }) => {
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
                Title
              </th>
              <th scope="col" className="px-4 py-4">
                Description
              </th>
              <th scope="col" className="px-4 py-4">
                Size of Wall
              </th>
              <th scope="col" className="px-4 py-4">
                No. of Rolls/Sqft/Yard
              </th>
              <th scope="col" className="px-4 py-4">
                Catalog Code Number
              </th>
              <th scope="col" className="px-4 py-4">
                Wallpaper Image
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
                <td className="py-2 text-gray-900 whitespace-nowrap text-center dark:text-white">
                  {order.title}
                </td>
                <td className="px-4 py-2">{order.description}</td>
                <td className="px-4 py-2">{order.sizeOfWall}</td>
                <td className="px-4 py-2">{order.numberOfRollsSqftYard}</td>
                <td className="px-4 py-2">{order.catalogCodeNumber}</td>
                <td className="px-4 py-2">{order.wallpaperImage}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => editClient(client)}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteClient(client.id)}
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

export default WallpaperOrdersTable;
