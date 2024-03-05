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

  useEffect(() => {
    fetchCustomers(); // Fetch customers when component mounts
  }, []);

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
            />
          );
        case "Sofa":
          return (
            <SofaOrdersTable
              key={category}
              products={products}
              deleteProduct={deleteProduct}
            />
          );
        case "Blinds":
          return (
            <BlindOrdersTable
              key={category}
              products={products}
              deleteProduct={deleteProduct}
            />
          );
        case "Furniture":
          return (
            <FurnitureOrdersTable
              key={category}
              products={products}
              deleteProduct={deleteProduct}
            />
          );
        case "Wallpaper":
          return (
            <WallpaperOrdersTable
              key={category}
              products={products}
              deleteProduct={deleteProduct}
            />
          );
        case "Flooring":
          return (
            <FlooringsOrdersTable
              key={category}
              products={products}
              deleteProduct={deleteProduct}
            />
          );
        case "Mattress":
          return (
            <MattressOrdersTable
              key={category}
              products={products}
              deleteProduct={deleteProduct}
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
