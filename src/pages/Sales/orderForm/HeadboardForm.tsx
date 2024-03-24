import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface HeadboardProps {
    onCloseModal: () => void;
    selectedCustomer: { id: string; clientName: string };
}

const Headboard: React.FC<HeadboardProps> = ({
    onCloseModal,
    selectedCustomer,
}) => {
    const [formData, setFormData] = useState<any>({
        title: "",
        description: "",
        size: "",
        fabricName: "",
        fabricCode: "",
        remarks: "",
        image: null,
        fimg: null,
        limg: null,
        width: "",
        height: "",
        unit1: "in",
        unit2: "in",
    });

    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState<any>({
        image: null,
        fimg: null,
        limg: null,
    });

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
        const name = e.target.name;
        if (file) {
            const name = e.target.name;
            const fileType = file.type;
            let newName = "";
            if (fileType === "image/jpeg") {
                newName = `${name}.jpeg`;
            } else if (fileType === "image/jpg") {
                newName = `${name}.jpg`;
            } else {
                newName = file.name;
            }
            const renamedFile = new File([file], newName, { type: file.type });
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: renamedFile,
            }));
            setSelectedImage((prevState) => ({
                ...prevState,
                [name]: URL.createObjectURL(file),
            }));
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

    const submitFormData = async (formData: any) => {
        try {
            setLoading(true);
            formData.size = `${formData.height}H x ${formData.width}W`;
            const dataToSubmit = new FormData();
            if (formData.image) {
                dataToSubmit.append("image", formData.image, "image1.jpg");
            }
            if (formData.fimg) {
                dataToSubmit.append("fimg", formData.fimg, "image2.jpg");
            }
            if (formData.limg) {
                dataToSubmit.append("limg", formData.limg, "image3.jpg");
            }
            Object.entries(formData).forEach(([key, value]) => {
                if (key !== "image" && key !== "fimg" && key !== "limg") {
                    dataToSubmit.append(key, value);
                }
            });
            dataToSubmit.append("customerName", selectedCustomer.clientName);
            dataToSubmit.append("customerId", selectedCustomer.id);

            const response = await axios.post(
                `/api/products/${selectedCustomer.id}/Headboard`,
                dataToSubmit,
                getHeaders()
            );

            console.log("Form submitted successfully:", response.data);
            onCloseModal();
            toast.success("Headboard Order has been submitted successfully!");
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Headboard Data:", formData);
        await submitFormData(formData);
    };

    return (
        <div className="relative  bg-gradient-to-tr from-[#DEE4EA] to-[#F9FCFF] dark:from-[#003049] from-50% dark:to-[#669bbc] rounded-lg shadow dark:bg-slate-700 mt-20">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                    Headboard Order Form
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
                <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                    <div className="grid gap-4 mb-4 grid-cols-2">
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
                        <div className="col-span-2">
                            <label
                                htmlFor="description"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows={4}
                                value={formData.description}
                                onChange={handleInputChange}
                                className="block p-2.5 w-full text-sm text-slate-900 bg-slate-50 rounded-lg border border-slate-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Write product description here"></textarea>
                        </div>
                        <div className="col-span-2 space-y-2">
                            <label
                                htmlFor="sizeOfHeadboard"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Size of Headboard
                            </label>
                            <div className="inputGrp w-full flex">
                                <input
                                    className=" bg-sky-50 border border-slate-400 text-slate-900 text-sm rounded-l-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    type="number"
                                    onWheel={(e) => e.target.blur()}
                                    onKeyDown={(event) => {
                                        if (
                                            event.keyCode === 38 ||
                                            event.keyCode === 40
                                        ) {
                                            event.preventDefault();
                                        }
                                    }}
                                    id="height"
                                    name="height"
                                    onChange={(e) => {
                                        handleInputChange(e);
                                    }}
                                    value={formData.height}
                                    placeholder="Height"
                                />
                                <select
                                    className="bg-sky-50 border border-slate-400 text-slate-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 m-0"
                                    id="unit1"
                                    name="unit1"
                                    onChange={(e) => {
                                        handleInputChange(e);
                                        // Set the value of the other dropdown to match the selected value
                                        setFormData({
                                            ...formData,
                                            unit2: e.target.value,
                                            unit1: e.target.value,
                                        });
                                    }}
                                    value={formData.unit1}>
                                    <option value="mm">mm</option>
                                    <option value="in">Inch</option>
                                    <option value="cm">cm</option>
                                    <option value="yd">yd</option>
                                    <option value="ft">ft</option>
                                    <option value="m">m</option>
                                </select>
                            </div>
                            <div className="inputGrp w-full flex items-center">
                                <input
                                    className=" bg-sky-50 border border-slate-400 text-slate-900 text-sm rounded-l-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    type="number"
                                    onWheel={(e) => e.target.blur()}
                                    onKeyDown={(event) => {
                                        if (
                                            event.keyCode === 38 ||
                                            event.keyCode === 40
                                        ) {
                                            event.preventDefault();
                                        }
                                    }}
                                    id="width"
                                    name="width"
                                    onChange={(e) => {
                                        handleInputChange(e);
                                    }}
                                    value={formData.width}
                                    placeholder="width"
                                />
                                <select
                                    className="bg-sky-50 border border-slate-400 text-slate-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 m-0"
                                    id="unit2"
                                    name="unit2"
                                    onChange={(e) => {
                                        handleInputChange(e);
                                        // Set the value of the other dropdown to match the selected value
                                        setFormData({
                                            ...formData,
                                            unit1: e.target.value,
                                            unit2: e.target.value,
                                        });
                                    }}
                                    value={formData.unit2}>
                                    <option value="mm">mm</option>
                                    <option value="in">Inch</option>
                                    <option value="cm">cm</option>
                                    <option value="yd">yd</option>
                                    <option value="ft">ft</option>
                                    <option value="m">m</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-span-2">
                            <label
                                htmlFor="headboardFabricCode"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Fabric Name
                            </label>
                            <input
                                type="text"
                                id="fabricName"
                                name="fabricName"
                                value={formData.fabricName}
                                onChange={handleInputChange}
                                className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Enter fabric code"
                            />
                        </div>
                        <div className="col-span-2">
                            <label
                                htmlFor="headboardFabricCode"
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
                            {selectedImage.image && (
                                <div className="mt-2">
                                    <img
                                        src={selectedImage.image}
                                        alt="Selected"
                                        className="w-full rounded-lg border border-gray-300"
                                    />
                                </div>
                            )}
                        </div>
                        <div className="col-span-2">
                            <label
                                htmlFor="fimg"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                References Image
                            </label>
                            <input
                                type="file"
                                id="fimg"
                                name="fimg"
                                accept="image/*"
                                onChange={handleFileInputChange}
                                className="block p-2.5 w-full text-sm text-slate-900 bg-slate-50 rounded-lg border border-slate-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                            {selectedImage.fimg && (
                                <div className="mt-2">
                                    <img
                                        src={selectedImage.fimg}
                                        alt="Selected"
                                        className="w-full rounded-lg border border-gray-300"
                                    />
                                </div>
                            )}
                        </div>
                        <div className="col-span-2">
                            <label
                                htmlFor="limg"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Sight Image
                            </label>
                            <input
                                type="file"
                                id="limg"
                                name="limg"
                                accept="image/*"
                                onChange={handleFileInputChange}
                                className="block p-2.5 w-full text-sm text-slate-900 bg-slate-50 rounded-lg border border-slate-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                            {selectedImage.limg && (
                                <div className="mt-2">
                                    <img
                                        src={selectedImage.limg}
                                        alt="Selected"
                                        className="w-full rounded-lg border border-gray-300"
                                    />
                                </div>
                            )}
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
                                rows={4}
                                value={formData.remarks}
                                onChange={handleInputChange}
                                className="block p-2.5 w-full text-sm text-slate-900 bg-slate-50 rounded-lg border border-slate-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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

export default Headboard;
