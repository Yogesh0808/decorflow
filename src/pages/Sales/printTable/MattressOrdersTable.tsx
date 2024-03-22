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
  let serialNo = 0;
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
        <table className="w-full rounded-lg text-sm text-left rtl:text-right text-slate-500 dark:text-slate-400 bg-gray-900 dark:bg-gray-800">
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
                Size
              </th>
              <th scope="col" className="px-4 py-4">
                Thickness
              </th>
              <th scope="col" className="px-4 py-4">
                Specification Image
              </th>
              <th scope="col" className="px-4 py-4">
                Pillows
              </th>
              <th scope="col" className="px-4 py-4">
                Complimentary Pillows
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
                Delivery Time
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
                  {++serialNo}
                </td>
                <td className="px-3 py-2">{product.data.title}</td>
                <td className="px-3 py-2">{product.data.description}</td>
                <td className="px-4 py-2">{product.data.size}</td>
                <td className="px-4 py-2">{product.data.thickness}</td>
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
                <td className="px-4 py-2">{product.data.pillows}</td>
                <td className="px-4 py-2">
                  {product.data.pillowsComplimentary ? "Yes" : "No"}
                </td>
                <td className="px-4 py-2">{product.data.pillowRemarks}</td>
                <td className="px-4 py-2">{product.data.bedProtectorSize}</td>
                <td className="px-4 py-2">{product.data.bedProtectorColor}</td>
                <td className="px-4 py-2">{product.data.deliveryTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MattressOrdersTable;
