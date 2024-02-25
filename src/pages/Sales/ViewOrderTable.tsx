import React, { useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import WallpaperOrdersTable from './orderTable/WallpaperOrdersTable';
import BlindOrdersTable from './orderTable/BlindOrdersTable';
import FurnitureOrdersTable from './orderTable/FurnitureOrdersTable';
import FlooringsOrdersTable from './orderTable/FlooringsOrdersTable';
import SofaOrdersTable from './orderTable/SofaOrdersTable';
import CurtainsOrdersTable from './orderTable/CurtainsOrdersTable';

const ViewOrderTable = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [printing, setPrinting] = useState(false);

  // Dummy data for orders
  const ordersData = {
    wallpaper: {
      1: [
        {
          id: 1,
          title: 'Floral Wallpaper',
          description: 'Beautiful floral pattern wallpaper.',
          sizeOfWall: '10x12 feet',
          numberOfRollsSqftYard: 5,
          catalogCodeNumber: 'WP1001',
          wallpaperImage: 'floral-wallpaper.jpg',
        },
        {
          id: 2,
          title: 'Geometric Wallpaper',
          description: 'Modern geometric pattern wallpaper.',
          sizeOfWall: '8x10 feet',
          numberOfRollsSqftYard: 4,
          catalogCodeNumber: 'WP1002',
          wallpaperImage: 'geometric-wallpaper.jpg',
        },
      ],
      2: [
        {
          id: 456,
          title: 'Geometric Wallpaper',
          description: 'Modern geometric pattern wallpaper.',
          sizeOfWall: '8x10 feet',
          numberOfRollsSqftYard: 4,
          catalogCodeNumber: 'WP1002',
          wallpaperImage: 'geometric-wallpaper.jpg',
        },
      ],
      3: [
        {
          id: 456,
          title: 'Plain Wallpaper',
          description: 'Modern geometric pattern wallpaper.',
          sizeOfWall: '10x20 feet',
          numberOfRollsSqftYard: 4,
          catalogCodeNumber: 'WP1002',
          wallpaperImage: 'geometric-wallpaper.jpg',
        },
      ],
    },
    blinds: {
      1: [
        {
          id: 101,
          type: 'Venetian Blinds',
          color: 'White',
          width: '30 inches',
          height: '60 inches',
          quantity: 2,
        },
        {
          id: 102,
          type: 'Roller Blinds',
          color: 'Black',
          width: '36 inches',
          height: '72 inches',
          quantity: 3,
        },
      ],
      2: [
        {
          id: 201,
          type: 'Vertical Blinds',
          color: 'Gray',
          width: '40 inches',
          height: '80 inches',
          quantity: 1,
        },
      ],
      3: [], // No orders for customer 3
    },
    carpet: {
      1: [
        {
          id: 201,
          material: 'Nylon',
          color: 'Beige',
          size: '8x10 feet',
          quantity: 1,
        },
      ],
      2: [], // No orders for customer 2
      3: [
        {
          id: 301,
          material: 'Wool',
          color: 'Blue',
          size: '10x12 feet',
          quantity: 2,
        },
      ],
    },
    // Add similar structures for other products like floorings, sofa, curtains, etc.
  };

  const customers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '987-654-3210',
    },
    {
      id: 3,
      name: 'Alice Johnson',
      email: 'alice@example.com',
      phone: '456-789-0123',
    },
  ];

  const PrintTemplate = ({ customer, ordersData }) => {
    return (
      <div>
        <h2>Customer Details</h2>
        <p>Name: {customer.name}</p>
        <p>Email: {customer.email}</p>
        <p>Phone: {customer.phone}</p>

        <h2>Wallpaper Orders</h2>
        <WallpaperOrdersTable orders={ordersData.wallpaper[customer.id]} />

        {/* Add other order tables here */}
      </div>
    );
  };

  const customer = customers.find(
    (customer) => customer.id === selectedCustomer,
  );

  const handleCustomerSelect = (customerId) => {
    setSelectedCustomer(customerId);
  };

  const handlePrint = () => {
    const customer = customers.find(
      (customer) => customer.id === selectedCustomer,
    );
    // Update the ordersData object to match the expected structure
    const ordersData = {
      wallpaper: {
        [selectedCustomer]: [
          {
            id: 1,
            title: 'Floral Wallpaper',
            description: 'Beautiful floral pattern wallpaper.',
            sizeOfWall: '10x12 feet',
            numberOfRollsSqftYard: 5,
            catalogCodeNumber: 'WP1001',
            wallpaperImage: 'floral-wallpaper.jpg',
          },
          {
            id: 2,
            title: 'Geometric Wallpaper',
            description: 'Modern geometric pattern wallpaper.',
            sizeOfWall: '8x10 feet',
            numberOfRollsSqftYard: 4,
            catalogCodeNumber: 'WP1002',
            wallpaperImage: 'geometric-wallpaper.jpg',
          },
          // Add other orders for the selected customer if needed
        ],
      },
      blinds: { id: 101 }, // Add data for blinds if needed
      furniture: { id: 100 }, // Add data for furniture if needed
      // Add data for other types of orders if needed
    };

    const printContent = ReactDOMServer.renderToString(
      <PrintTemplate customer={customer} ordersData={ordersData} />,
    );

    const printWindow = window.open('', '_blank');
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Print</title>
        </head>
        <body>
          ${printContent}
          <script>
            window.onload = function() {
              window.print();
              window.close();
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div>
      <h1>Customer Orders</h1>
      <div className="max-w-screen mx-auto p-4">
        <div className="mb-4">
          <label
            htmlFor="customerSelect"
            className="block text-sm font-medium text-gray-700"
          >
            Select Customer:
          </label>
          <select
            id="customerSelect"
            name="customerSelect"
            className="mt-1 block w-full border-gray-300 p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-slate-700"
            onChange={(e) => handleCustomerSelect(parseInt(e.target.value))}
            value={selectedCustomer || ''}
          >
            <option value="">Select a customer</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>

        {printing && (
          <div className="flex justify-center items-center h-screen">
            <p className="text-xl">Printing...</p>
          </div>
        )}

        {selectedCustomer && !printing && (
          <div>
            <div className="bg-gray-200 dark:bg-gray-800 rounded-lg p-4 mb-4">
              <h2 className="text-lg font-semibold">Customer Details</h2>
              <div>
                <p>Name: {customer.name}</p>
                <p>Email: {customer.email}</p>
                <p>Phone: {customer.phone}</p>
              </div>
            </div>

            <div className="bg-gray-200 dark:bg-gray-800 rounded-lg p-4 mb-4">
              <h2 className="text-lg font-semibold">
                Wallpaper Orders for {customer.name}
              </h2>
              <WallpaperOrdersTable
                orders={ordersData.wallpaper[selectedCustomer]}
              />
            </div>

            <div className="bg-gray-200 dark:bg-gray-800 rounded-lg p-4 mb-4">
              <h2 className="text-lg font-semibold">
                Blind Orders for {customer.name}
              </h2>
              <BlindOrdersTable
                orders={ordersData.blinds[selectedCustomer] || []}
              />
            </div>

            <div className="bg-gray-200 dark:bg-gray-800 rounded-lg p-4 mb-4">
              <h2 className="text-lg font-semibold">
                Furniture Orders for {customer.name}
              </h2>
              <FurnitureOrdersTable
                orders={ordersData.carpet[selectedCustomer] || []}
              />
            </div>

            {/* Add other order tables here */}
          </div>
        )}

        {selectedCustomer && !printing && (
          <div className="flex justify-end">
            <button
              onClick={handlePrint}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Print
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewOrderTable;
