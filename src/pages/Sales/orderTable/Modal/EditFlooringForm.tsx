import React, { useState, useEffect } from "react";
import axios from "axios";

const EditFlooringOrderForm = ({
  selectedProduct,
  onSave,
  onCloseModal,
  products,
  editProduct,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    sizeOfFloor: "",
    numberOfSqft: "",
    catalogCodeAndNumber: "",
    remarks: "",
    image: null,
  });

  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        title: selectedProduct.data.title || "",
        description: selectedProduct.data.description || "",
        sizeOfFloor: selectedProduct.data.sizeOfFloor || "",
        numberOfSqft: selectedProduct.data.numberOfSqft || "",
        catalogCodeAndNumber: selectedProduct.data.catalogCodeAndNumber || "",
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

  const handleFileInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files && e.target.files[0];
        const name = e.target.name;
    if (file) {
      try {
        const compressedImage = await compressImage(file);
        const renamedFile = new File([compressedImage], "image.jpg", {
          type: "image/jpeg",
        });
        console.log("Sending image with filename:", renamedFile.name);
        setFormData((prevFormData) => ({
          ...prevFormData,
          image: renamedFile,
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
      formData.size = `${formData.height}H x ${formData.width}W`;
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

      // Update the product list in the state with the edited data
      const editedProduct = response.data; // Assuming the response contains the updated product data

      // Call the editProduct function from props with the updated products array
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
            Edit Flooring Order Form
          </h3>
          <hr></hr>
          <form className="p-4 md:p-5" onSubmit={handleSubmit}>
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
                  <option value="Vinyl Roll">Vinyl - Vinyl Roll</option>
                  <option value="Vinyl Plank">Vinyl - Vinyl Plank</option>
                  <option value="Wooden">Wooden</option>
                  <option value="Carpet - Roll Carpet">
                    Carpet - Roll Carpet
                  </option>
                  <option value="Carpet - Tile Carpet">
                    Carpet - Tile Carpet
                  </option>
                </select>
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="sizeOfFloor"
                  className="block mb-2 text-sm font-medium text-slate-900 dark:text-white"
                >
                  Size of the Floor
                </label>
                <input
                  type="text"
                  name="sizeOfFloor"
                  id="sizeOfFloor"
                  value={formData.sizeOfFloor}
                  onChange={handleInputChange}
                  required
                  className="bg-purple-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter size of the floor"
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="numberOfSqft"
                  className="block mb-2 text-sm font-medium text-slate-900 dark:text-white"
                >
                  Number of Sqft/meter
                </label>
                <input
                  type="text"
                  name="numberOfSqft"
                  id="numberOfSqft"
                  value={formData.numberOfSqft}
                  onChange={handleInputChange}
                  required
                  className="bg-purple-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter number of sqft/meter"
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="catalogCodeAndNumber"
                  className="block mb-2 text-sm font-medium text-slate-900 dark:text-white"
                >
                  Catalog Code and Number
                </label>
                <input
                  type="text"
                  id="catalogCodeAndNumber"
                  name="catalogCodeAndNumber"
                  value={formData.catalogCodeAndNumber}
                  onChange={handleInputChange}
                  required
                  className="bg-purple-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter catalog code and number"
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="image"
                  className="block mb-2 text-sm font-medium text-slate-900 dark:text-white"
                >
                  Flooring Image
                </label>
                <input
                  type="file"
                  name="image"
                  onChange={handleFileInputChange}
                  accept="image/*"
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="remarks"
                  className="block mb-2 text-sm font-medium text-slate-900 dark:text-white"
                >
                  Remarks
                </label>
                <textarea
                  id="remarks"
                  name="remarks"
                  rows={2}
                  value={formData.remarks}
                  onChange={handleInputChange}
                  className="bg-purple-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Add any additional remarks here"
                ></textarea>
              </div>
            </div>
            <button
              type="submit"
              className="btn bg-pink-800 px-2 p-1 text-white rounded-xl mx-1"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={onCloseModal}
              className="btn bg-purple-800 px-2 p-1 text-white rounded-xl mx-1"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditFlooringOrderForm;
