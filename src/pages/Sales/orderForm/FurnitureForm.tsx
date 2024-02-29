import React, { useState } from "react";
import axios from "axios";

interface FurnitureFormProps {
  onCloseModal: () => void;
  selectedCustomer: { id: string; clientName: string; cid: string };
}

const FurnitureForm: React.FC<FurnitureFormProps> = ({
  onCloseModal,
  selectedCustomer,
}) => {
  const [formData, setFormData] = useState<any>({
    title: "",
    description: "",
    size: "",
    qty: "",
    referenceCode: "",
    referenceImage: null,
    remarks: "",
  });

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result?.toString().split(",")[1];
        setFormData({
          ...formData,
          image: base64String,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const dataToSubmit = {
        ...formData,
        customerName: selectedCustomer.clientName,
        customerId: selectedCustomer.id,
      };

      const response = await axios.post(
        `/api/products/${selectedCustomer.id}/Furniture`,
        dataToSubmit,
        getHeaders()
      );

      console.log("Form submitted successfully:", response.data);
      onCloseModal();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="relative bg-purple-100 rounded-lg shadow dark:bg-slate-700 sm:mt-2 lg:mt-20 lg:ml-10">
      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-slate-600">
        <h3 className="text-lg font-normal text-slate-800 dark:text-white">
          Furniture Order Form
        </h3>
        <button
          type="button"
          onClick={onCloseModal}
          className="text-slate-400 bg-transparent hover:bg-slate-200 hover:text-slate-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-slate-600 dark:hover:text-white"
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
      <div className="overflow-auto max-h-[30rem]">
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
                className="bg-purple-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Enter title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>
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
                className="block p-2.5 w-full text-sm text-slate-900 bg-purple-50 rounded-lg border border-slate-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write product description here"
                value={formData.description}
                onChange={handleInputChange}
              ></textarea>
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
                className="bg-purple-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Enter size"
              />
            </div>
            <div className="col-span-2">
              <label
                htmlFor="qty"
                className="block mb-2 text-sm font-medium text-slate-900 dark:text-white"
              >
                Quantity
              </label>
              <input
                type="text"
                id="qty"
                name="qty"
                className="bg-purple-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Enter quantity"
                value={formData.qty}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-span-2">
              <label
                htmlFor="referenceCode"
                className="block mb-2 text-sm font-medium text-slate-900 dark:text-white"
              >
                Reference Code
              </label>
              <input
                type="text"
                id="referenceCode"
                name="referenceCode"
                value={formData.referenceCode}
                className="bg-purple-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Enter reference code"
                onChange={handleInputChange}
              />
            </div>
            <div className="col-span-2">
              <label
                htmlFor="referenceImage"
                className="block mb-2 text-sm font-medium text-slate-900 dark:text-white"
              >
                Reference Image
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
            <div className="col-span-2">
              <label
                htmlFor="remarks"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Remarks
              </label>
              <textarea
                id="remarks"
                name="remarks"
                rows={2}
                className="block p-2.5 w-full text-sm text-slate-900 bg-purple-50 rounded-lg border border-slate-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Add any additional remarks here"
                onChange={handleInputChange}
                value={formData.remarks}
              ></textarea>
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
  );
};

export default FurnitureForm;
