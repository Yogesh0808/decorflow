import React, { useState } from "react";
import axios from "axios";
import MattressForm from "../orderForm/MattressForm";

const EditProductModal = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = useState(product.data);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Make PUT request to update the product
      await axios.put(`/api/products/${product.id}`, formData);
      onSave(formData);
      onClose();
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (updatedData) => {
    setFormData((prevData) => ({ ...prevData, ...updatedData }));
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-lg font-bold mb-4">Edit Product</h2>
        <MattressForm
          formData={formData}
          onChange={handleFormChange}
          onSubmit={handleSubmit}
          onCloseModal={onClose}
          loading={loading}
          selectedCustomer={{
            id: product.id,
            clientName: "Existing Client",
          }} // Pass appropriate client data
        />
      </div>
    </div>
  );
};

export default EditProductModal;
