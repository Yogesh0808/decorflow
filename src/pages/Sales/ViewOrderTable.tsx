import React, { useState, useEffect } from "react";
import axios from "axios";
import CurtainsOrdersTable from "./orderTable/CurtainsOrdersTable";
import SofaOrdersTable from "./orderTable/SofaOrdersTable";
import BlindOrdersTable from "./orderTable/BlindOrdersTable";
import FurnitureOrdersTable from "./orderTable/FurnitureOrdersTable";
import WallpaperOrdersTable from "./orderTable/WallpaperOrdersTable";
import FlooringsOrdersTable from "./orderTable/FlooringsOrdersTable";
import MattressOrdersTable from "./orderTable/MattressOrdersTable";
import Loader from "../../common/Loader/index";

axios.defaults.baseURL = "https://cors-h05i.onrender.com";

const ViewOrderComponent = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProductForEdit, setSelectedProductForEdit] = useState(null);

  useEffect(() => {
    fetchCustomers(); // Fetch customers when component mounts
  }, []);

  const editProduct = (productId, editedData) => {
    const index = products.findIndex((product) => product.id === productId);

    if (index !== -1) {
      setProducts((prevProducts) => {
        const updatedProducts = [...prevProducts];
        updatedProducts[index] = {
          ...updatedProducts[index],
          data: { ...updatedProducts[index].data, ...editedData },
        };
        return updatedProducts;
      });
    }
  };

  const updateProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/products/${selectedCustomer.id}`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (productId, editedData) => {
    try {
      // Make PUT request to update the product
      await axios.put(`/api/products/${productId}`, editedData);
      // Handle successful save
      closeEditModal(); // Close the modal after saving
      fetchProducts(selectedCustomer.id); // Refetch products to update the view
    } catch (error) {
      console.error("Error saving edited order:", error);
      // Handle error
    }
  };

  const handleDelete = async (productId) => {
    try {
      // Make DELETE request to delete the product
      await axios.delete(`/api/products/${productId}`);
      // Update UI by removing the deleted product from the products list
      deleteProduct(productId);
    } catch (error) {
      console.error("Error deleting product:", error);
      // Handle error, show error message or retry option
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("/api/customer/names", getHeaders());
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error.message);
    }
  };

  const fetchProducts = async (customerId) => {
    try {
      setLoading(true); // Set loading to true while fetching products
      const response = await axios.get(
        `/api/products/${customerId}`,
        getHeaders()
      );
      console.log("Products data:", response.data); // Log the products data
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    } finally {
      setLoading(false); // Set loading back to false after fetching completes
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

  const handleSelectCustomer = (customerId) => {
    const selectedCustomer = customers.find(
      (customer) => customer.id === customerId
    );
    setSelectedCustomer(selectedCustomer);
    fetchProducts(customerId);
  };

  const renderProductTables = () => {
    if (loading) {
      return (
        <div className="text-center mt-4">
          Loading...
          <Loader />
        </div>
      );
    }

    if (products.length === 0) {
      return (
        <div className="text-red-600 text-xl text-center mt-4">
          Oops! No product data available
        </div>
      );
    }

    const productTables = {};
    products.forEach((product) => {
      const category = product.category;
      if (!productTables[category]) {
        productTables[category] = [];
      }
      productTables[category].push(product);
    });

    const deleteProduct = async (productId) => {
      try {
        await axios.delete(`/api/products/${productId}`, getHeaders());
        setProducts(products.filter((product) => product.id !== productId));
        console.log("Product has been Deleted Sucessfully :))");
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    };

    return Object.entries(productTables).map(([category, products]) => {
      switch (category) {
        case "Curtains":
          return (
            <CurtainsOrdersTable
              key={category}
              products={products}
              deleteProduct={deleteProduct}
              editProduct={editProduct}
            />
          );
        case "Sofa":
          return (
            <SofaOrdersTable
              key={category}
              products={products}
              deleteProduct={deleteProduct}
              editProduct={editProduct}
            />
          );
        case "Blinds":
          return (
            <BlindOrdersTable
              key={category}
              products={products}
              deleteProduct={deleteProduct}
              editProduct={editProduct}
            />
          );
        case "Furniture":
          return (
            <FurnitureOrdersTable
              key={category}
              products={products}
              deleteProduct={deleteProduct}
              editProduct={editProduct}
            />
          );
        case "Wallpaper":
          return (
            <WallpaperOrdersTable
              key={category}
              products={products}
              deleteProduct={deleteProduct}
              editProduct={editProduct}
            />
          );
        case "Flooring":
          return (
            <FlooringsOrdersTable
              key={category}
              products={products}
              deleteProduct={deleteProduct}
              editProduct={editProduct}
            />
          );
        case "Mattress":
          return (
            <MattressOrdersTable
              key={category}
              products={products}
              deleteProduct={deleteProduct}
              editProduct={editProduct}
            />
          );
        default:
          return null;
      }
    });
  };

  return (
    <div>
      <select
        value={selectedCustomer ? selectedCustomer.id : ""}
        onChange={(e) => handleSelectCustomer(e.target.value)}
        className="block w-full mt-4 p-3 border border-slate-400 shadow-lg rounded-xl dark:bg-slate-950 focus:outline-none focus:border-strokedark"
      >
        <option value="">Select Customer</option>
        {customers.map((customer) => (
          <option key={customer.id} value={customer.id}>
            {customer.clientName} - {customer.cid}
          </option>
        ))}
      </select>

      {selectedCustomer && (
        <p className="text-center text-slate-700 dark:text-slate-50 text-2xl">
          View Order For {selectedCustomer.clientName} - {selectedCustomer.cid}
        </p>
      )}

      {renderProductTables()}
    </div>
  );
};

export default ViewOrderComponent;
