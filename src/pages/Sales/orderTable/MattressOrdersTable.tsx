import axios from "axios";

const MattressOrdersTable = ({ products, editProduct, deleteProduct }) => {
  axios.defaults.baseURL = "https://cors-h05i.onrender.com";
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

  const handleDelete = async (productId) => {
    try {
      // Make DELETE request to delete the product
      await axios.delete(`/api/products/${productId}`, getHeaders());
      deleteProduct(productId);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  if (!products || products.length === 0) {
    return <div>No product data available</div>;
  }

  return (
    <div className="max-w-screen mx-auto overflow-x-hidden p-4">
      <h1 className="text-black p-2 text-2xl dark:text-slate-50">
        Mattress Orders
      </h1>
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
                Size
              </th>
              <th scope="col" className="px-4 py-4">
                Thickness
              </th>
              <th scope="col" className="px-4 py-4">
                Pillows
              </th>
              <th scope="col" className="px-4 py-4">
                Pillows Complimentary
              </th>
              <th scope="col" className="px-4 py-4">
                Pillow Remarks
              </th>
              <th scope="col" className="px-4 py-4">
                Bed Protector Size
              </th>
              <th scope="col" className="px-4 py-4">
                Bed Protector Color
              </th>
              <th scope="col" className="px-4 py-4">
                Time of Delivery
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
                <td className="px-3 py-2">{product.data.description}</td>
                <td className="px-4 py-2">{product.data.size}</td>
                <td className="px-4 py-2">{product.data.thickness}</td>
                <td className="px-4 py-2">{product.data.pillows}</td>
                <td className="px-4 py-2">
                  {product.data.pillowsComplimentary ? "Yes" : "No"}
                </td>
                <td className="px-4 py-2">{product.data.pillowRemarks}</td>
                <td className="px-4 py-2">{product.data.bedProtectorSize}</td>
                <td className="px-4 py-2">{product.data.bedProtectorColor}</td>
                <td className="px-4 py-2">{product.data.deliveryTime}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => editProduct(product)}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
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

export default MattressOrdersTable;