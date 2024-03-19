import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface SofaFormProps {
    onCloseModal: () => void;
    selectedCustomer: { id: string; clientName: string };
}

const SofaForm: React.FC<SofaFormProps> = ({
    onCloseModal,
    selectedCustomer,
}) => {
    const [formData, setFormData] = useState<any>({
        title: "",
        description: "",
        size: "",
        depth: { value: "", unit: "inches" },
        floorToSeat: { value: "", unit: "inches" },
        seatToBackHeight: { value: "", unit: "inches" },
        shapeModel: "L-Shaped",
        image: null,
        fabricName: "",
        fabricCode: "",
        fimg: null,
        sofaLeg: "",
        limg: null,
        timeOfDelivery: "",
        remarks: "",
        pillowSize: "",
        pillowFabric: "",
        timeOfDeliveryValue: "",
        timeOfDeliveryUnit: "days",
    });

    const [loading, setLoading] = useState(false);
    const [includePillows, setIncludePillows] = useState(false);
    const [selectedImage, setSelectedImage] = useState<any>({
        image: null,
        fimg: null,
        limg: null,
    });
    const [fileNames, setFileNames] = useState<any>({
        image: "",
        fimg: "",
        limg: "",
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

    const handleTimeOfDeliveryChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleNumberInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: { ...prevFormData[name], value: value },
        }));
    };

    const handleUnitChange = (
        e: React.ChangeEvent<HTMLSelectElement>,
        name: string
    ) => {
        const { value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: { ...prevFormData[name], unit: value },
        }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIncludePillows(e.target.checked); // Update state based on checkbox value
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        const name = e.target.name;

        if (file) {
            setSelectedImage((prevState) => ({
                ...prevState,
                [name]: URL.createObjectURL(file),
            }));
            setFileNames((prevFileNames) => ({
                ...prevFileNames,
                [name]: file.name,
            }));
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: file,
            }));
        }
    };

    const submitFormData = async (formData: any) => {
        try {
            setLoading(true);
            formData.timeOfDelivery = `${formData.timeOfDeliveryValue} ${formData.timeOfDeliveryUnit}`;
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
                `/api/products/${selectedCustomer.id}/Sofa`,
                dataToSubmit,
                getHeaders()
            );

            console.log("Form submitted successfully:", response.data);
            onCloseModal();
            toast.success("Sofa Order has been submitted successfully!", {
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
            toast.error("Sofa Order has been cancelled", {
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Sofa Data:", formData);
        await submitFormData(formData);
    };

    return (
        <div className="relative bg-sky-100 rounded-lg shadow dark:bg-slate-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                    Sofa Order Form
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
                        {/* Title */}
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
                                className="bg-sky-50 border border-slate-400 text-slate-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Enter title"
                            />
                        </div>
                        {/* Description */}
                        <div className="col-span-2">
                            <label
                                htmlFor="description"
                                className="block mb-2 text-sm font-medium text-slate-900 dark:text-white">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows={3}
                                value={formData.description}
                                onChange={handleInputChange}
                                className="block p-2.5 w-full text-sm text-slate-900 bg-slate-50 rounded-lg border border-slate-400 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Write product description here"></textarea>
                        </div>
                        <div className="col-span-2 text-black dark:text-white">
                            <p>Dimensions</p>
                            <hr></hr>
                        </div>
                        <div className="col-span-1">
                            <label
                                htmlFor="size"
                                className="block mb-2 text-sm font-medium text-slate-900 dark:text-white">
                                Size
                            </label>
                            <input
                                type="text"
                                id="size"
                                name="size"
                                value={formData.size}
                                onChange={handleInputChange}
                                className="bg-sky-50 border border-slate-400 text-slate-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Enter size (inches)"
                            />
                        </div>
                        {/* Depth */}
                        <div className="col-span-1">
                            <label
                                htmlFor="depth"
                                className="block mb-2 text-sm font-medium text-slate-900 dark:text-white">
                                Depth
                            </label>
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    id="depth"
                                    name="depth"
                                    value={formData.depth.value}
                                    onChange={handleNumberInputChange}
                                    className="bg-sky-50 border border-slate-400 text-slate-900 text-sm rounded-l-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Enter depth"
                                />
                                <select
                                    value={formData.depth.unit}
                                    onChange={(e) =>
                                        handleUnitChange(e, "depth")
                                    }
                                    className="bg-sky-50 border border-slate-400 text-slate-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option value="inches">inches</option>
                                    <option value="feet">feet</option>
                                    <option value="cm">cm</option>
                                    <option value="mm">mm</option>
                                </select>
                            </div>
                        </div>
                        {/* Floor to Seat */}
                        <div className="col-span-1">
                            <label
                                htmlFor="floorToSeat"
                                className="block mb-2 text-sm font-medium text-slate-900 dark:text-white">
                                Floor to Seat
                            </label>
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    id="floorToSeat"
                                    name="floorToSeat"
                                    value={formData.floorToSeat.value}
                                    onChange={handleNumberInputChange}
                                    className="bg-sky-50 border border-slate-400 text-slate-900 text-sm rounded-l-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Enter floor to seat height"
                                />
                                <select
                                    value={formData.floorToSeat.unit}
                                    onChange={(e) =>
                                        handleUnitChange(e, "floorToSeat")
                                    }
                                    className="bg-sky-50 border border-slate-400 text-slate-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option value="inches">inches</option>
                                    <option value="feet">feet</option>
                                    <option value="cm">cm</option>
                                    <option value="mm">mm</option>
                                </select>
                            </div>
                        </div>
                        {/* Seat to Back */}
                        <div className="col-span-1">
                            <label
                                htmlFor="seatToBackHeight"
                                className="block mb-2 text-sm font-medium text-slate-900 dark:text-white">
                                Seat to Back
                            </label>
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    id="seatToBackHeight"
                                    name="seatToBackHeight"
                                    value={formData.seatToBackHeight.value}
                                    onChange={handleNumberInputChange}
                                    className="bg-sky-50 border border-slate-400 text-slate-900 text-sm rounded-l-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Enter seat to back height"
                                />
                                <select
                                    value={formData.seatToBackHeight.unit}
                                    onChange={(e) =>
                                        handleUnitChange(e, "seatToBackHeight")
                                    }
                                    className="bg-sky-50 border border-slate-400 text-slate-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option value="inches">inches</option>
                                    <option value="feet">feet</option>
                                    <option value="cm">cm</option>
                                    <option value="mm">mm</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-span-2">
                            <label
                                htmlFor="shapeModel"
                                className="block mb-2 text-sm font-medium text-slate-900 dark:text-white">
                                Shape and Model
                            </label>
                            <select
                                id="shapeModel"
                                name="shapeModel"
                                value={formData.shapeModel}
                                onChange={handleInputChange}
                                className="bg-sky-50 border border-slate-400 text-slate-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <option value="Squared">Squared</option>
                                <option value="Normal">Normal</option>
                                <option value="L-Shaped">L-Shaped</option>
                                <option value="Poufs">Poufs</option>
                                <option value="Ottoman">Ottoman</option>
                                <option value="Cot and Bed Side">
                                    Cot and Bed Side
                                </option>
                                <option value="Deewan cum Sofa">
                                    Deewan cum Sofa
                                </option>
                                <option value="Sofa cum Sofa">
                                    Sofa cum Bed
                                </option>
                                <option value="Corner Sofa">Corner Sofa</option>
                                <option value="Seatout Cushion">
                                    Seatout Cushion
                                </option>
                            </select>
                        </div>
                        <div className="col-span-2">
                            <label
                                htmlFor="image"
                                className="block mb-2 text-sm font-medium text-slate-900 dark:text-white">
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
                        <div className="col-span-2 md:col-span-1">
                            <label
                                htmlFor="fabricName"
                                className="block mb-2 text-sm font-medium text-slate-900 dark:text-white">
                                Fabric Name
                            </label>
                            <input
                                type="text"
                                id="fabricName"
                                name="fabricName"
                                value={formData.fabricName}
                                onChange={handleInputChange}
                                className="bg-sky-50 border border-slate-400 text-slate-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Enter fabric name and code"
                            />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <label
                                htmlFor="fabricCode"
                                className="block mb-2 text-sm font-medium text-slate-900 dark:text-white">
                                Fabric Code
                            </label>
                            <input
                                type="text"
                                id="fabricCode"
                                name="fabricCode"
                                value={formData.fabricCode}
                                onChange={handleInputChange}
                                className="bg-sky-50 border border-slate-400 text-slate-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Enter fabric name and code"
                            />
                        </div>
                        <div className="col-span-2">
                            <label
                                htmlFor="fimg"
                                className="block mb-2 text-sm font-medium text-slate-900 dark:text-white">
                                Fabric Image
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
                        <div className="col-span-2 relative">
                            <label
                                htmlFor="limg"
                                className="block mb-2 text-sm font-medium text-slate-900 dark:text-white">
                                Sofa Leg Image
                            </label>
                            <input
                                type="file"
                                id="limg"
                                name="limg"
                                accept="image/*"
                                onChange={handleFileInputChange}
                                className="hidden"
                            />
                            <div className="relative">
                                <input
                                    type="text"
                                    readOnly
                                    value={fileNames.limg}
                                    className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-16 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Choose file"
                                />
                                <label
                                    htmlFor="limg"
                                    className="absolute top-0 right-0 bg-blue-500 hover:bg-blue-600 focus:bg-blue-600 text-white px-4 py-2.5 rounded-lg cursor-pointer text-sm">
                                    Choose File
                                </label>
                            </div>
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
                                htmlFor="timeOfDelivery"
                                className="block mb-2 text-sm font-medium text-slate-900 dark:text-white">
                                Time of Delivery
                            </label>
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    id="timeOfDelivery"
                                    name="timeOfDeliveryValue"
                                    value={formData.timeOfDeliveryValue}
                                    onChange={handleTimeOfDeliveryChange}
                                    className="bg-sky-50 border border-slate-400 text-slate-900 text-sm rounded-l-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Enter time of delivery"
                                />
                                <select
                                    value={formData.timeOfDeliveryUnit}
                                    name="timeOfDeliveryUnit"
                                    onChange={handleTimeOfDeliveryChange}
                                    className="bg-sky-50 border border-slate-400 text-slate-900 text-sm rounded-r-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option value="days">days</option>
                                    <option value="weeks">weeks</option>
                                    <option value="months">months</option>
                                </select>
                            </div>
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
                                rows={3}
                                value={formData.remarks}
                                onChange={handleInputChange}
                                className="block p-2.5 w-full text-sm text-slate-900 bg-slate-50 rounded-lg border border-slate-400 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Add any additional remarks here"></textarea>
                        </div>
                        <div className="col-span-2">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="includePillows"
                                    name="includePillows"
                                    checked={includePillows}
                                    onChange={handleCheckboxChange}
                                    className="text-primary-600 border-gray-300 focus:ring-primary-500 h-4 w-4 mr-2"
                                />
                                <label
                                    htmlFor="includePillows"
                                    className="block text-sm font-medium text-slate-900 dark:text-white">
                                    Include Pillows
                                </label>
                            </div>
                        </div>
                        {includePillows && (
                            <div className="col-span-2">
                                <label
                                    htmlFor="pillowSize"
                                    className="block mb-2 text-sm font-medium text-slate-900 dark:text-white">
                                    Pillow Size
                                </label>
                                <input
                                    type="text"
                                    id="pillowSize"
                                    name="pillowSize"
                                    value={formData.pillowSize}
                                    onChange={handleInputChange}
                                    className="bg-sky-50 border border-slate-400 text-slate-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Enter pillow size"
                                />
                            </div>
                        )}
                        {includePillows && (
                            <div className="col-span-2">
                                <label
                                    htmlFor="pillowFabric"
                                    className="block mb-2 text-sm font-medium text-slate-900 dark:text-white">
                                    Pillow Fabric
                                </label>
                                <input
                                    type="text"
                                    id="pillowFabric"
                                    name="pillowFabric"
                                    value={formData.pillowFabric}
                                    onChange={handleInputChange}
                                    className="bg-sky-50 border border-slate-400 text-slate-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-600 dark:border-slate-500 dark:placeholder-slate-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Enter pillow fabric"
                                />
                            </div>
                        )}
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SofaForm;
