import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FlooringFormProps {
    onSubmit: (formData: any) => void;
    onCloseModal: () => void;
    selectedCustomer: { id: string; clientName: string };
}

const FlooringForm: React.FC<FlooringFormProps> = ({
    onSubmit,
    onCloseModal,
    selectedCustomer,
}) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        sizeOfFloor: "",
        numberOfSqft: "",
        unit: "Mtr",
        totOfSq: "",
        catalogCodeAndNumber: "",
        image: null,
        remarks: "",
        id: "",
    });
    const [loading, setLoading] = useState(false);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
            totOfSq:
                String(prevFormData.numberOfSqft) +
                " " +
                String(prevFormData.unit),
        }));
        console.log(formData);
    };

  const handleFileInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      try {
        const compressedImage = await compressImage(file);

        // Renaming the file
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

    const compressImage = (file: File) => {
        return new Promise<File>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event: any) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d")!;
                    canvas.width = 700; // Adjust width as needed
                    canvas.height = 800; // Adjust height as needed
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    canvas.toBlob(
                        (blob) => {
                            if (!blob) {
                                reject(new Error("Failed to compress image."));
                                return;
                            }
                            const compressedFile = new File([blob], file.name, {
                                type: "image/jpeg", // Adjust mime type as needed
                            });
                            resolve(compressedFile);
                        },
                        "image/jpeg",
                        0.6
                    ); // Adjust quality as needed
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log("Floorings handleSubmit Called!");
        e.preventDefault();
        try {
            setLoading(true);

            const formDataToSend = new FormData();
            Object.keys(formData).forEach((key) => {
                formDataToSend.append(key, formData[key]);
            });
            formDataToSend.append("customerId", selectedCustomer.id);
            formDataToSend.append("category", "Flooring");
            console.log(formDataToSend);
            const response = await axios.post(
                `/api/products/${selectedCustomer.id}/Flooring`,
                formDataToSend,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: "Basic " + btoa("abinesh:abi"),
                    },
                }
            );

            console.log("Form submitted successfully:", response.data);
            onCloseModal();
            toast.success("Floorings Order has been submitted successfully!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("Floorings Order has been cancelled", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative bg-gradient-to-tr from-[#DEE4EA] to-[#F9FCFF] dark:from-[#003049] from-50% dark:to-[#669bbc] rounded-lg shadow dark:bg-slate-700 mt-20">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-slate-600">
                <h3 className="text-xl font-normal text-slate-800 dark:text-white">
                    Floorings Order Form
                </h3>
                <button
                    type="button"
                    onClick={onCloseModal}
                    className="text-slate-400 bg-transparent hover:bg-slate-200 hover:text-slate-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-slate-600 dark:hover:text-white"
                    data-modal-toggle="crud-modal">
                    <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14">
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
                                className="block mb-2 text-sm font-medium text-slate-900 dark:text-white">
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
                                className="block mb-2 text-sm font-medium text-slate-900 dark:text-white">
                                Description
                            </label>
                            <select
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                required
                                className="bg-purple-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <option value="">Select description</option>
                                <option value="Vinyl Roll">
                                    Vinyl - Vinyl Roll
                                </option>
                                <option value="Vinyl Plank">
                                    Vinyl - Vinyl Plank
                                </option>
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
                                className="block mb-2 text-sm font-medium text-slate-900 dark:text-white">
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
                        {/* /*change code* */}
                        <div className="col-span-2">
                            <label
                                htmlFor="numberOfSqft"
                                className="block mb-2  text-sm font-medium text-slate-900 dark:text-white">
                                Number of Sqft/meter
                            </label>
                            <div className="flex items-center" role="group">
                                <input
                                    type="text"
                                    name="numberOfSqft"
                                    id="numberOfSqft"
                                    value={formData.numberOfSqft}
                                    onChange={handleInputChange}
                                    required
                                    className=" w-5/6 bg-purple-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5  dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Enter number"
                                />
                                <select
                                    name="unit"
                                    id="unit"
                                    value={formData.unit}
                                    onChange={handleInputChange}
                                    className="h-max py-2 w-1/6 text-center bg-purple-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:bg-slate-600  dark:border-slate-500 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option value="SqFt">SqFt</option>
                                    <option value="Mts">Mts</option>
                                </select>
                            </div>
                        </div>

                        {/* <div className="col-span-2">
                            <label
                                htmlFor="numberOfSqft"
                                className="block mb-2 text-sm font-medium text-slate-900 dark:text-white">
                                final meters
                            </label>
                            <input
                                type="text"
                                name="numberOfSqft"
                                id="numberOfSqft"
                                value={formData.totOfSq}
                                required
                                className="bg-purple-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Enter number of sqft/meter"
                            />
                        </div> */}
                        <div className="col-span-2">
                            <label
                                htmlFor="catalogCodeAndNumber"
                                className="block mb-2 text-sm font-medium text-slate-900 dark:text-white">
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
                                className="block mb-2 text-sm font-medium text-slate-900 dark:text-white">
                                Flooring Image
                            </label>
                            <input
                                type="file"
                                name="image"
                                onChange={handleFileInputChange}
                                accept="image/*"
                                className="block p-2.5 w-full text-sm text-slate-900 bg-slate-50 rounded-lg border border-slate-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="col-span-2">
                            <label
                                htmlFor="remarks"
                                className="block mb-2 text-sm font-medium text-slate-900 dark:text-white">
                                Remarks
                            </label>
                            <textarea
                                id="remarks"
                                name="remarks"
                                rows={2}
                                value={formData.remarks}
                                onChange={handleInputChange}
                                className="bg-purple-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Add any additional remarks here"></textarea>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="text-white inline-flex w-full justify-center items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        disabled={loading}>
                        {loading ? (
                            <>
                                <svg
                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24">
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.373A8 8 0 0112 20v4c-6.627 0-12-5.373-12-12h4zm14-2A8 8 0 0120 12H24c0 6.627-5.373 12-12 12v-4z"></path>
                                </svg>
                                <p>Please Wait...</p>
                            </>
                        ) : (
                            <>
                                <svg
                                    className="me-1 -ms-1 w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fillRule="evenodd"
                                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                        clipRule="evenodd"></path>
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

export default FlooringForm;
