import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface BlindsFormProps {
    onCloseModal: () => void;
    selectedCustomer: { id: string; clientName: string };
}

const BlindsForm: React.FC<BlindsFormProps> = ({
    onCloseModal,
    selectedCustomer,
}) => {
    const [formData, setFormData] = useState<any>({
        title: "",
        description: "",
        size: "",
        quantity: "",
        typeOfBlinds: "Roman Blinds",
        catalogueName: "",
        fabricCode: "",
        image: null,
        remarks: "",
    });
    const [loading, setLoading] = useState(false);

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
            const name = e.target.name;
            setFormData((prevFormData) => ({
                ...prevFormData,
                image: file,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);

            const formDataToSend = new FormData();
            Object.keys(formData).forEach((key) => {
                formDataToSend.append(key, formData[key]);
            });
            formDataToSend.append("customerId", selectedCustomer.id);
            formDataToSend.append("category", "Blinds");

            // Append the file data
            formDataToSend.append("image", formData.image);

            const response = await axios.post(
                `/api/products/${selectedCustomer.id}/Blinds`,
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
            toast.success("Blinds Order has been submitted successfully!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("Blinds Order has been cancelled", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
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
        <div className="relative  bg-gradient-to-tr from-[#DEE4EA] to-[#F9FCFF] dark:from-[#003049] from-50% dark:to-[#669bbc] rounded-lg shadow dark:bg-slate-700">
            <div className="flex items-center justify-between p-6 md:p-5 border-b rounded-t dark:border-gray-600 mt-20">
                <h3 className="text-lg font-normal text-slate-800 dark:text-white">
                    Blinds Order Form
                </h3>
                <button
                    type="button"
                    onClick={onCloseModal}
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
                <form
                    className="p-4 md:p-5"
                    onSubmit={handleSubmit}
                    encType="multipart/form-data">
                    <div className="grid gap-4 mb-4 grid-cols-1 md:grid-cols-2">
                        <div className="col-span-2">
                            <label
                                htmlFor="title"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
                        <div className="col-span-2 md:col-span-1">
                            <label
                                htmlFor="description"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows={4}
                                className="block p-2.5 w-full text-sm text-slate-900 bg-slate-50 rounded-lg border border-slate-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Write product description here"
                            />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <label
                                htmlFor="size"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Size
                            </label>
                            <input
                                type="text"
                                id="size"
                                name="size"
                                value={formData.size}
                                onChange={handleInputChange}
                                className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Enter size"
                            />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <label
                                htmlFor="quantity"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Quantity
                            </label>
                            <input
                                type="text"
                                id="quantity"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleInputChange}
                                className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Enter number of pieces"
                            />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <label
                                htmlFor="typeOfBlinds"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Type of Blinds
                            </label>
                            <select
                                id="typeOfBlinds"
                                name="typeOfBlinds"
                                value={formData.typeOfBlinds}
                                onChange={handleInputChange}
                                className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <option value="Roman Blinds">
                                    Roman Blinds
                                </option>
                                <option value="Roller Blinds">
                                    Roller Blinds
                                </option>
                                <option value="Zebra Blinds">
                                    Zebra Blinds
                                </option>
                                <option value="Wooden Blinds">
                                    Wooden Blinds
                                </option>
                                <option value="Aluminium Blinds">
                                    Aluminium Blinds
                                </option>
                                <option value="Skylight Blinds">
                                    Skylight Blinds
                                </option>
                                <option value="Vertical Blinds">
                                    Vertical Blinds
                                </option>
                                <option value="Honeycomb Blinds">
                                    Honeycomb Blinds
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className="grid gap-4 mb-4 grid-cols-1 md:grid-cols-2">
                        <div>
                            <label
                                htmlFor="catalogueName"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Catalogue Name
                            </label>
                            <input
                                type="text"
                                id="catalogueName"
                                name="catalogueName"
                                value={formData.catalogueName}
                                onChange={handleInputChange}
                                className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Enter Catalog name"
                            />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <label
                                htmlFor="fabricCode"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Fabric Code
                            </label>
                            <input
                                type="text"
                                id="fabricCode"
                                name="fabricCode"
                                value={formData.fabricCode}
                                onChange={handleInputChange}
                                className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Enter fabric code"
                            />
                        </div>
                        <div className="col-span-2">
                            <label
                                htmlFor="image"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Fabric Image
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
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Remarks
                            </label>
                            <textarea
                                id="remarks"
                                name="remarks"
                                value={formData.remarks}
                                onChange={handleInputChange}
                                rows={2}
                                className="block p-2.5 w-full text-sm text-slate-900 bg-slate-50 rounded-lg border border-slate-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Add any additional remarks here"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="text-white inline-flex justify-center w-full items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        disabled={loading}>
                        {loading ? (
                            <>
                                <div className="loader"></div>
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

export default BlindsForm;
