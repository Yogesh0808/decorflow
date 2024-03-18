import React, { useState, useEffect } from "react";
import axios from "axios";

const EditSofaOrderForm = ({
  onCloseModal,
  selectedProduct,
  onSave,
  editProduct,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    size: "",
    shapeModel: "",
    image: null,
    fabricNameCode: "",
    fimg: null,
    sofaLeg: "",
    limg: null,
    remarks: "",
  });

  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        title: selectedProduct.title || "",
        description: selectedProduct.description || "",
        size: selectedProduct.size || "",
        shapeModel: selectedProduct.shapeModel || "",
        fabricNameCode: selectedProduct.fabricNameCode || "",
        sofaLeg: selectedProduct.sofaLeg || "",
        remarks: selectedProduct.remarks || "",
      });
    }
  }, [selectedProduct]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files && e.target.files[0];
        const name = e.target.name;
    if (file) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [e.target.name]: file,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSubmit = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        dataToSubmit.append(key, value);
      });

      const response = await axios.put(
        `/api/products/${selectedProduct.id}`,
        dataToSubmit,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Basic " + btoa("abinesh:abi"),
          },
        }
      );

      const editedProduct = response.data; // Assuming the response contains the updated product data

      editProduct((prevProducts) =>
        prevProducts.map((product) =>
          product.id === editedProduct.id
            ? { ...product, data: editedProduct.data }
            : product
        )
      );

      onSave(formData);
      onCloseModal();
    } catch (error) {
      console.error("Error saving edited order:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 mt-10 bg-black bg-opacity-50">
      <div className="relative bg-purple-100 rounded-lg shadow dark:bg-slate-700 w-full max-w-sm p-4 overflow-auto max-h-[80vh]">
        <div className="absolute top-0 right-0 p-2">
          <button
            onClick={onCloseModal}
            className="text-slate-400 bg-transparent hover:bg-slate-200 hover:text-slate-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-slate-600 dark:hover:text-white"
            data-modal-toggle="crud-modal"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <div className="overflow-auto">
          <h3 className="text-xl font-normal text-slate-800 dark:text-white mb-4">
            Edit Sofa Order Form
          </h3>
          <hr></hr>
          <form className="p-4 md:p-5" onSubmit={handleSubmit}>
            <div className="grid gap-4 mb-4 grid-cols-2">
              {/* Title */}
              <div className="col-span-2">
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-slate-900 dark:text-white"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="bg-purple-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter title"
                />
              </div>
              {/* Description */}
              <div className="col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-slate-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={2}
                  value={formData.description}
                  onChange={handleInputChange}
                  className="block p-2.5 w-full text-sm text-slate-900 bg-purple-50 rounded-lg border border-slate-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write product description here"
                ></textarea>
              </div>
              {/* Size */}
              <div className="col-span-2">
                <label
                  htmlFor="size"
                  className="block mb-2 text-sm font-medium text-slate-900 dark:text-white"
                >
                  Size
                </label>
                <input
                  type="text"
                  id="size"
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  className="bg-purple-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter size"
                />
              </div>
              {/* Shape Model */}
              <div className="col-span-2">
                <label
                  htmlFor="shapeModel"
                  className="block mb-2 text-sm font-medium text-slate-900 dark:text-white"
                >
                  Shape Model
                </label>
                <input
                  type="text"
                  id="shapeModel"
                  name="shapeModel"
                  value={formData.shapeModel}
                  onChange={handleInputChange}
                  className="bg-purple-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter shape model"
                />
              </div>
              {/* Fabric Name Code */}
              <div className="col-span-2">
                <label
                  htmlFor="fabricNameCode"
                  className="block mb-2 text-sm font-medium text-slate-900 dark:text-white"
                >
                  Fabric Name Code
                </label>
                <input
                  type="text"
                  id="fabricNameCode"
                  name="fabricNameCode"
                  value={formData.fabricNameCode}
                  onChange={handleInputChange}
                  className="bg-purple-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter fabric name code"
                />
              </div>
              {/* File Inputs */}
              <div className="col-span-2">
                <label
                  htmlFor="image"
                  className="block mb-2 text-sm font-medium text-slate-900 dark:text-white"
                >
                  Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleFileInputChange}
                  accept="image/*"
                  className="sr-only"
                />
                <label
                  htmlFor="image"
                  className="cursor-pointer bg-purple-50 border border-slate-300 text-sm text-slate-900 rounded-lg block w-full p-2.5 text-center dark:bg-slate-600 dark:border-slate-500 dark:text-white dark:placeholder-slate-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  {formData.image ? formData.image.name : "Choose image"}
                </label>
              </div>
              {/* Remaining fields */}
              {/* Repeat similar pattern for other form fields */}
            </div>
            <button
              type="submit"
              className="w-full bg-primary-500 text-white py-2 px-4 rounded-lg hover:bg-primary-600 transition duration-300 ease-in-out"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditSofaOrderForm;
