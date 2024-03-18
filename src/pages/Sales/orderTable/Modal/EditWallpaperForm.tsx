import React, { useState, useEffect } from "react";
import axios from "axios";

const EditWallpaperOrderForm = ({
  selectedProduct,
  onSave,
  onCloseModal,
  editProduct,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    sizeOfWall: "",
    noOfRolls: "",
    catalogCode: "",
    catalogNumber: "",
    image: null,
    remarks: "",
  });

  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        title: selectedProduct.data.title || "",
        description: selectedProduct.data.description || "",
        sizeOfWall: selectedProduct.data.sizeOfWall || "",
        noOfRolls: selectedProduct.data.noOfRolls || "",
        catalogCode: selectedProduct.data.catalogCode || "",
        remarks: selectedProduct.data.remarks || "",
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
      <div className="relative bg-slate-100 rounded-lg shadow dark:bg-slate-700 w-full max-w-md p-2 overflow-auto max-h-[80vh]">
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
          <h3 className="text-xl font-normal text-slate-800 dark:text-white mb-4 py-2">
            Edit Wallpaper Order Form
          </h3>
          <hr></hr>
          <form
            className="p-4 md:p-5"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <div className="grid gap-4 mb-4 grid-cols-1 md:grid-cols-2">
              <div className="col-span-2">
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter title"
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  rows={4}
                  onChange={handleInputChange}
                  className="block p-2.5 w-full text-sm text-slate-900 bg-slate-50 rounded-lg border border-slate-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write product description here"
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="sizeOfWall"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Size of Wall
                </label>
                <input
                  type="text"
                  value={formData.sizeOfWall}
                  id="sizeOfWall"
                  name="sizeOfWall"
                  onChange={handleInputChange}
                  className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter size of wall"
                />
              </div>
              <div>
                <label
                  htmlFor="noOfRolls"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Number of Rolls
                </label>
                <input
                  type="text"
                  value={formData.noOfRolls}
                  id="noOfRolls"
                  name="noOfRolls"
                  onChange={handleInputChange}
                  className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter number of rolls"
                />
              </div>
              <div>
                <label
                  htmlFor="catalogCode"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Catalog Code
                </label>
                <input
                  type="text"
                  value={formData.catalogCode}
                  id="catalogCode"
                  name="catalogCode"
                  onChange={handleInputChange}
                  className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter catalog code"
                />
              </div>
            </div>
            <hr className="my-4" />
            <div className="grid gap-4 mb-4 grid-cols-1 md:grid-cols-2">
              <div>
                <label
                  htmlFor="remarks"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Remarks
                </label>
                <textarea
                  id="remarks"
                  name="remarks"
                  rows={4}
                  className="block p-2.5 w-full text-sm text-slate-900 bg-slate-50 rounded-lg border border-slate-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Add any additional remarks here"
                  value={formData.remarks}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="image"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Wallpaper Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleFileInputChange}
                  className="block p-2.5 w-full text-sm text-slate-900 bg-slate-50 rounded-lg border border-slate-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>
            <button
              type="submit"
              className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="me-1 -ms-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Add new product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditWallpaperOrderForm;
