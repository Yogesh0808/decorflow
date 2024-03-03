import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CurtainsFormProps {
  onCloseModal: () => void;
  selectedCustomer: { id: string; clientName: string };
}

const CurtainsForm: React.FC<CurtainsFormProps> = ({
  onCloseModal,
  selectedCustomer,
}) => {
  const [formData, setFormData] = useState<any>({
    title: "",
    description: "",
    size: "",
    widthOfFabric: "",
    noOfPieces: "",
    noOfPanels: "",
    modelOfStitching: "",
    fabricName: "",
    fabricCode: "",
    fabricImage: null,
    tieOption: "",
    remarks: "",
  });
  const [loading, setLoading] = useState(false);

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
    setFormData((prevFormData) => ({
      ...prevFormData,
      fabricImage: file,
    }));
  }
};

const submitFormData = async (formData: any) => {
  try {
    setLoading(true);

    // Create FormData object
    const formDataToSend = new FormData();
    // Append other form data fields
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });
    // Append image file
    formDataToSend.append('fabricImage', formData.fabricImage);

    // Append customer information
    formDataToSend.append('customerName', selectedCustomer.clientName);
    formDataToSend.append('customerId', selectedCustomer.id);

    console.log("Curtains Form Data:", formDataToSend);

    const response = await axios.post(
      `/api/products/${selectedCustomer.id}/Curtains`,
      formDataToSend,
      {
        ...getHeaders(),
        headers: {
          ...getHeaders().headers,
          // No need to set Content-Type here, Axios will automatically set it to multipart/form-data
        },
      }
    );

    console.log("Form submitted successfully:", response.data);
    onCloseModal();
    toast.success("Curtains Order has been submitted successfully!");
  } catch (error) {
    console.error("Error submitting form:", error);
  } finally {
    setLoading(false);
  }
};


  const submitFormData = async (formData: any) => {
    try {
      setLoading(true);
      const dataToSubmit = {
        ...formData,
        customerName: selectedCustomer.clientName,
        customerId: selectedCustomer.id,
      };

      console.log("Curtains Form Data:", dataToSubmit);

      const response = await axios.post(
        `/api/products/${selectedCustomer.id}/Curtains`,
        dataToSubmit,
        {
          ...getHeaders(),
          headers: {
            "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
            ...getHeaders().headers,
          },
        }
      );

      console.log("Form submitted successfully:", response.data);
      onCloseModal();
      toast.success("Curtains Order has been submitted successfully!"); // Close modal after successful form submission
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitFormData(formData);
  };

  return (
    <div className="relative bg-white rounded-lg shadow dark:bg-slate-700">
      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 mt-20">
        <h3 className="text-lg font-normal text-slate-800 dark:text-white">
          Curtains Order Form
        </h3>
        <button
          type="button"
          onClick={onCloseModal}
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
        <form
          className="p-4 md:p-5"
          onSubmit={handleSubmit}
          encType="multipart/form-data" // Set the enctype to multipart/form-data
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
                name="title" // Add a unique name for each input field
                value={formData.title} // Set value prop dynamically
                onChange={handleInputChange} // Assign the onChange handler
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
                htmlFor="size"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Size
              </label>
              <input
                type="text"
                value={formData.size}
                id="size"
                name="size"
                onChange={(e) => handleInputChange(e)} // Add onChange event handler
                className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Enter size"
              />
            </div>
            <div>
              <label
                htmlFor="widthOfFabric"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Width of Fabric
              </label>
              <input
                type="text"
                id="widthOfFabric"
                name="widthOfFabric"
                value={formData.widthOfFabric}
                onChange={(e) => handleInputChange(e)}
                className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Enter width of fabric"
              />
            </div>
            <div>
              <label
                htmlFor="noOfPieces"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Number of Pieces
              </label>
              <input
                type="text"
                id="noOfPieces"
                name="noOfPieces"
                value={formData.noOfPieces}
                onChange={(e) => handleInputChange(e)}
                className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Enter number of pieces"
              />
            </div>
            <div>
              <label
                htmlFor="noOfPanels"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Number of Panels
              </label>
              <input
                type="number"
                id="noOfPanels"
                name="noOfPanels"
                value={formData.noOfPanels}
                onChange={(e) => handleInputChange(e)}
                className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Enter number of panels"
              />
            </div>
            <div>
              <label
                htmlFor="modelOfStitching"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Model of Stitching
              </label>
              <input
                type="text"
                id="modelOfStitching"
                name="modelOfStitching"
                value={formData.modelOfStitching}
                onChange={(e) => handleInputChange(e)}
                className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Enter model of stitching"
              />
            </div>
          </div>
          <hr className="my-4" />
          <div className="grid gap-4 mb-4 grid-cols-1 md:grid-cols-2">
            <div>
              <label
                htmlFor="fabricName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Fabric Name
              </label>
              <input
                type="text"
                id="fabricName"
                name="fabricName"
                value={formData.fabricName}
                onChange={(e) => handleInputChange(e)}
                className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Enter fabric name"
              />
            </div>
            <div>
              <label
                htmlFor="tieOption"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Tie Option
              </label>
              <select
                id="tieOption"
                name="tieOption"
                className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                onChange={(e) => handleInputChange(e)}
                value={formData.tieOption}
              >
                <option value="">Select Tie Option</option>
                <option value="Attached">Attached in curtain</option>
                <option value="Separate">Separate with tie back holder</option>
              </select>
            </div>
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
                onChange={(e) => handleInputChange(e)}
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="fabricCode"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Fabric Code
              </label>
              <input
                type="text"
                id="fabricCode"
                name="fabricCode"
                value={formData.fabricCode}
                className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Enter fabric code"
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div>
              <label
                htmlFor="fabricImage"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Fabric Image
              </label>
              <input
                type="file"
                id="fabricImage"
                name="fabricImage"
                accept="image/*"
                onChange={handleFileInputChange}
                className="block p-2.5 w-full text-sm text-slate-900 bg-slate-50 rounded-lg border border-slate-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>
          <button
            type="submit"
            className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.373A8 8 0 0112 20v4c-6.627 0-12-5.373-12-12h4zm14-2A8 8 0 0120 12H24c0 6.627-5.373 12-12 12v-4z"
                  ></path>
                </svg>
                <p>Please Wait...</p>
              </>
            ) : (
              <>
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
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CurtainsForm;
