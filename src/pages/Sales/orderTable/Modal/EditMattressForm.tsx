import React, { useState, useEffect } from "react";
import axios from "axios";

const EditMattressForm = ({
  onSave,
  onCloseModal,
  selectedProduct,
  editProduct,
}) => {
  const [formData, setFormData] = useState({
    title: selectedProduct.data.title,
    description: selectedProduct.data.description,
    size: selectedProduct.data.size,
    thickness: selectedProduct.data.thickness,
    pillows: selectedProduct.data.pillows,
    complimentaryPillows: selectedProduct.data.complimentaryPillows,
    pillowRemarks: selectedProduct.data.pillowRemarks,
    bedProtectorSize: selectedProduct.data.bedProtectorSize,
    bedProtectorColor: selectedProduct.data.bedProtectorColor,
    image: null,
    deliveryTime: selectedProduct.data.deliveryTime,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileInputChange = async (e) => {
    const file = e.target.files && e.target.files[0];
        const name = e.target.name;
    if (file) {
      try {
        const compressedImage = await compressImage(file);
        setFormData((prevFormData) => ({
          ...prevFormData,
          image: compressedImage,
        }));
      } catch (error) {
        console.error("Error compressing image:", error);
      }
    }
  };

  const compressImage = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = 700;
          canvas.height = 800;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error("Failed to compress image."));
                return;
              }
              const compressedFile = new File([blob], file.name, {
                type: "image/jpeg",
              });
              resolve(compressedFile);
            },
            "image/jpeg",
            0.6
          );
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      // Make the PUT request to update the product
      const response = await axios.put(
        `/api/products/${selectedProduct.id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Basic " + btoa("abinesh:abi"),
          },
        }
      );
      const editedProduct = response.data;
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
            Edit Mattress Order Form
          </h3>
          <hr></hr>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 mb-4 grid-cols-2">
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
                  required
                  className="bg-purple-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter title"
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-slate-900 dark:text-white"
                >
                  Description
                </label>
                <select
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  className="bg-purple-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option value="">Select description</option>
                  <option value="Foam">Foam</option>
                  <option value="Spring">Spring</option>
                  <option value="Memory Foam">Memory Foam</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
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
                  required
                  className="bg-purple-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter size"
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="thickness"
                  className="block mb-2 text-sm font-medium text-slate-900 dark:text-white"
                >
                  Thickness
                </label>
                <input
                  type="text"
                  id="thickness"
                  name="thickness"
                  value={formData.thickness}
                  onChange={handleInputChange}
                  required
                  className="bg-purple-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter thickness"
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="pillows"
                  className="block mb-2 text-sm font-medium text-slate-900 dark:text-white"
                >
                  Pillows
                </label>
                <input
                  type="text"
                  id="pillows"
                  name="pillows"
                  value={formData.pillows}
                  onChange={handleInputChange}
                  required
                  className="bg-purple-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter pillows"
                />
              </div>
              <div className="col-span-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="complimentaryPillows"
                    name="complimentaryPillows"
                    checked={formData.complimentaryPillows}
                    onChange={handleInputChange}
                    className="rounded text-primary-600 focus:ring-primary-500 h-4 w-4 dark:text-primary-400 dark:focus:ring-primary-400 dark:checked:bg-primary-500 dark:checked:border-transparent dark:checked:focus:ring-offset-slate-900"
                  />
                  <label
                    htmlFor="complimentaryPillows"
                    className="ml-2 block text-sm font-medium text-slate-900 dark:text-white"
                  >
                    Complimentary Pillows
                  </label>
                </div>
              </div>
              {!formData.complimentaryPillows && (
                <div className="col-span-2">
                  <label
                    htmlFor="pillowRemarks"
                    className="block mb-2 text-sm font-medium text-slate-900 dark:text-white"
                  >
                    Pillow Remarks
                  </label>
                  <textarea
                    id="pillowRemarks"
                    name="pillowRemarks"
                    rows={2}
                    value={formData.pillowRemarks}
                    onChange={handleInputChange}
                    className="bg-purple-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Add any additional remarks for pillows"
                  ></textarea>
                </div>
              )}
              <div className="col-span-2">
                <label
                  htmlFor="bedProtectorSize"
                  className="block mb-2 text-sm font-medium text-slate-900 dark:text-white"
                >
                  Bed Protector Size
                </label>
                <input
                  type="text"
                  id="bedProtectorSize"
                  name="bedProtectorSize"
                  value={formData.bedProtectorSize}
                  onChange={handleInputChange}
                  required
                  className="bg-purple-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter bed protector size"
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="bedProtectorColor"
                  className="block mb-2 text-sm font-medium text-slate-900 dark:text-white"
                >
                  Bed Protector Color
                </label>
                <input
                  type="text"
                  id="bedProtectorColor"
                  name="bedProtectorColor"
                  value={formData.bedProtectorColor}
                  onChange={handleInputChange}
                  required
                  className="bg-purple-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter bed protector color"
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="image"
                  className="block mb-2 text-sm font-medium text-slate-900 dark:text-white"
                >
                  Specification Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleFileInputChange}
                  accept="image/*"
                  required
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="deliveryTime"
                  className="block mb-2 text-sm font-medium text-slate-900 dark:text-white"
                >
                  Time of Delivery
                </label>
                <input
                  type="text"
                  id="deliveryTime"
                  name="deliveryTime"
                  value={formData.deliveryTime}
                  onChange={handleInputChange}
                  required
                  className="bg-purple-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter time of delivery"
                />
              </div>
            </div>
            <button
              type="submit"
              className="px-2 p-1 bg-zinc-900 text-whiter rounded-lg"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default EditMattressForm;
