import React, { useState } from 'react';

interface WallpaperOrder {
  id: number;
  title: string;
  description: string;
  sizeOfWall: string;
  numberOfRollsSqftYard: string;
  catalogCodeNumber: string;
  wallpaperImage: string;
  remarks: string;
}

const WallpaperOrdersTable: React.FC = () => {
  const [orders, setOrders] = useState<WallpaperOrder[]>([]);

  return (
    <div>
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
                <th scope="col" className="px-3 py-4">
                  Description
                </th>
                <th scope="col" className="px-4 py-4">
                  Size of the Wall
                </th>
                <th scope="col" className="px-4 py-4">
                  Number of Rolls/Sqft or Yard
                </th>
                <th scope="col" className="px-4 py-4">
                  Catalog Code and Number
                </th>
                <th scope="col" className="px-4 py-4">
                  Wallpaper Image
                </th>
                <th scope="col" className="px-4 py-4">
                  Remarks
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={index}
                  className="bg-white border-b border-zinc-200 dark:bg-slate-800 dark:border-slate-700"
                >
                  <td className="py-2 text-gray-900 whitespace-nowrap text-center dark:text-white">
                    {order.id}
                  </td>
                  <td className="px-4 py-2">{order.title}</td>
                  <td className="px-4 py-2">{order.description}</td>
                  <td className="px-4 py-2">{order.sizeOfWall}</td>
                  <td className="px-4 py-2">{order.numberOfRollsSqftYard}</td>
                  <td className="px-4 py-2">{order.catalogCodeNumber}</td>
                  <td className="px-4 py-2">
                    <img
                      src={order.wallpaperImage}
                      alt={`Wallpaper ${order.id}`}
                      style={{ maxWidth: '100px' }}
                    />
                  </td>
                  <td className="px-4 py-2">{order.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WallpaperOrdersTable;
