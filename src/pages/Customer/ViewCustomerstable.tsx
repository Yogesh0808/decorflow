import React, { useState, useEffect } from "react";
import axios from "axios";
import edit from "../../images/icon/edit.svg";
import trash from "../../images/icon/trash.svg";
axios.defaults.baseURL = "https://cors-h05i.onrender.com";

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

function ViewCustomers({ filterValue }: any) {
    const [clients, setClients] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [showModal, setShowModal] = useState(false);
    const [editedClient, setEditedClient] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [formData, setFormData] = useState({
        cid: "",
        salutation: "",
        clientName: "None",
        clientType: "None",
        purpose: "None",
        address: "None",
        phone: "",
        emailAddress: "None",
        isCompanyOrder: false,
        companyName: "None",
        gstNumber: "None",
    });

    useEffect(() => {
        getClients();
    }, []);
    // ?it handles the search functionality
    useEffect(() => {
        const searchRegex = new RegExp(`^${filterValue}`, "i"); // 'i' flag for case-insensitive

        const filtered = clients.filter(
            (client: any) =>
                searchRegex.test(client.clientName) ||
                searchRegex.test(client.emailAddress)
        );

        // Update filteredData state
        setFilteredData(filtered);
    }, [filterValue]);

    const getClients = async () => {
        try {
            const response = await axios.get("/api/customer", getHeaders());
            setClients(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching clients:", error);
        }
    };

    const deleteClient = (clientId) => {
        if (window.confirm("Are you sure you want to delete this client?")) {
            axios
                .delete(`/api/customer/${clientId}`, getHeaders())
                .then(() => {
                    console.log("Client deleted");
                    setToastMessage("Client Deleted successfully.");
                    setShowToast(true);
                    // Move the getClients() call inside the .then() block
                    getClients();
                })
                .catch((error) => {
                    console.error("Error deleting client:", error);
                });
        }
    };

    const editClient = (client: any) => {
        setEditedClient(client);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const saveEditedClient = (editedData: any) => {
        axios
            .put(`/api/customer/${editedData.id}`, editedData, getHeaders())
            .then((response) => {
                console.log("Edited client data:", editedData);
                setClients((prevClients: any) =>
                    prevClients.map((client: any) => {
                        if (client.id === editedData.id) {
                            return editedData;
                        }
                        return client;
                    })
                );
                setShowModal(false);
                setToastMessage("Client Edited successfully.");
                setShowToast(true);
            })
            .catch((error) => {
                console.error("Error saving edited client:", error);
            });
    };

    useEffect(() => {
        let timer: any;
        if (showToast) {
            timer = setTimeout(() => {
                setShowToast(false);
                setToastMessage("");
            }, 3500);
        }
        return () => clearTimeout(timer);
    }, [showToast]);

    return (
        <div className="max-w-screen overflow-x-auto">
            <div className="max-w-screen mx-auto overflow-x-hidden p-4">
                {loading ? (
                    <SkeletonTable />
                ) : clients.length ? (
                    <div className="overflow-y-auto overflow-x-auto rounded-xl">
                        <table className="w-full rounded-lg text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-gray-900 dark:bg-gray-800">
                            <thead className="text-sm text-blue-900 uppercase rounded-lg bg-blue-100 dark:bg-slate-900 dark:text-slate-300">
                                <tr>
                                    <th scope="col" className="px-3 py-4">
                                        ID
                                    </th>
                                    <th scope="col" className="px-3 py-4">
                                        Salutation
                                    </th>
                                    <th scope="col" className="px-4 py-4">
                                        Name
                                    </th>
                                    <th scope="col" className="px-4 py-4">
                                        Type
                                    </th>
                                    <th scope="col" className="px-4 py-4">
                                        Purpose
                                    </th>
                                    <th scope="col" className="px-4 py-4">
                                        Address
                                    </th>
                                    <th scope="col" className="px-4 py-4">
                                        Phone
                                    </th>
                                    <th scope="col" className="px-4 py-4">
                                        Email Address
                                    </th>
                                    <th scope="col" className="px-4 py-4">
                                        Company Name
                                    </th>
                                    <th scope="col" className="px-4 py-4">
                                        GST Number
                                    </th>
                                    <th scope="col" className="px-4 py-4">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filterValue === ""
                                    ? clients.map((client: any) => (
                                        <tr
                                            key={client.id}
                                            className="bg-white border-b border-zinc-200 dark:bg-slate-800 dark:border-slate-700">
                                            <td className="py-2 text-gray-900 whitespace-nowrap text-center dark:text-white">
                                                {client.cid}
                                            </td>
                                            <td className="py-2 text-gray-900 whitespace-nowrap text-center dark:text-white">
                                                {client.salutation}
                                            </td>
                                            <td className="px-4 py-2">
                                                {client.clientName}
                                            </td>
                                            <td className="px-4 py-2">
                                                {client.clientType}
                                            </td>
                                            <td className="px-4 py-2">
                                                {client.purpose}
                                            </td>
                                            <td className="px-4 py-2">
                                                {client.address}
                                            </td>
                                            <td className="px-4 py-2">
                                                {client.phone}
                                            </td>
                                            <td className="px-4 py-2">
                                                {client.emailAddress === "" || null ? "None" : client.emailAddress}
                                            </td>
                                            <td className="px-4 py-2">
                                                {client.companyName === null || ""
                                                    ? "None"
                                                    : client.companyName}
                                            </td>
                                            <td className="px-4 py-2">
                                                {client.gstNumber === null || ""
                                                    ? "None"
                                                    : client.gstNumber}
                                            </td>
                                            <td className="px-4 py-2">
                                                <button
                                                    onClick={() =>
                                                        editClient(client)
                                                    }
                                                    width="18"
                                                    height="18"
                                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                                    <img
                                                        src={edit}
                                                        className="hover:scale-125 transition-transform duration-300 ease-in-out cursor-pointer"></img>
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        deleteClient(
                                                            client.id
                                                        )
                                                    }
                                                    className="font-medium text-red-600 dark:text-red-500 hover:underline ml-2">
                                                    <img
                                                        src={trash}
                                                        className="hover:scale-125 transition-transform duration-300 ease-in-out cursor-pointer"
                                                        alt="Trash Icon"
                                                    />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                    : filteredData.map((client: any) => (
                                        <tr
                                            key={client.id}
                                            className="bg-white border-b border-zinc-200 dark:bg-slate-800 dark:border-slate-700">
                                            <td className="py-2 text-gray-900 whitespace-nowrap text-center dark:text-white">
                                                {client.cid}
                                            </td>
                                            <td className="py-2 text-gray-900 whitespace-nowrap text-center dark:text-white">
                                                {client.salutation}
                                            </td>
                                            <td className="px-4 py-2">
                                                {client.clientName}
                                            </td>
                                            <td className="px-4 py-2">
                                                {client.clientType}
                                            </td>
                                            <td className="px-4 py-2">
                                                {client.purpose}
                                            </td>
                                            <td className="px-4 py-2">
                                                {client.address}
                                            </td>
                                            <td className="px-4 py-2">
                                                {client.phone}
                                            </td>
                                            <td className="px-4 py-2">
                                                {client.emailAddress === "" || null ? "None" : client.emailAddress}
                                            </td>
                                            <td className="px-4 py-2">
                                                {client.companyName === null || ""
                                                    ? "None"
                                                    : client.companyName}
                                            </td>
                                            <td className="px-4 py-2">
                                                {client.gstNumber === null || ""
                                                    ? "None"
                                                    : client.gstNumber}
                                            </td>
                                            <td className="px-4 py-2">
                                                <button
                                                    onClick={() =>
                                                        editClient(client)
                                                    }
                                                    width="18"
                                                    height="18"
                                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                                    <img
                                                        src={edit}
                                                        className="hover:scale-125 transition-transform duration-300 ease-in-out cursor-pointer"></img>
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        deleteClient(
                                                            client.id
                                                        )
                                                    }
                                                    className="font-medium text-red-600 dark:text-red-500 hover:underline ml-2">
                                                    <img
                                                        src={trash}
                                                        className="hover:scale-125 transition-transform duration-300 ease-in-out cursor-pointer"
                                                        alt="Trash Icon"
                                                    />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center mt-8">
                        <p className="text-xl text-center text-neutral-900 dark:text-gray-400 dark:text-slate-100">
                            <div className="flex flex-col items-center justify-center text-gray-900 text-xl mt-4">
                                <img
                                    src="https://ik.imagekit.io/tealcdn2023/assets/No%20data-cuate.svg"
                                    className="w-100"
                                    alt="No data available"
                                />
                                <p>
                                    Oops! It seems there are no products
                                    available.
                                </p>
                            </div>
                            <span className="text-emerald-600 font-normal">
                                Don't worry, you can add some now!
                            </span>
                        </p>
                        <div className="mt-10">
                            <a
                                className="mt-4 px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-600"
                                href="/Customer/New">
                                Add Customers
                            </a>
                        </div>
                    </div>
                )}
            </div>
            {showModal && (
                <div className="fixed mt-10 inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-9999">
                    <div className="bg-slate-200 w-full lg:max-w-md sm:max-w-64 rounded-xl p- dark:bg-slate-900">
                        <EditClientModal
                            client={editedClient}
                            saveEditedClient={saveEditedClient}
                            closeModal={closeModal}
                            formData={formData}
                            setFormData={setFormData}
                        />
                    </div>
                </div>
            )}
            {showToast && (
                <div
                    id="toast-success"
                    className="lg:top-32 lg:right-10 top-10  flex items-center w-full max-w-xs p-2 mb-4 text-gray-500 rounded-lg shadow
          fixed right-2 z-99999 translate-y-10 text-gray-500 bg-gradient-to-br from-green-100 via-green-200"
                    role="alert">
                    <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-700 bg-green-300 rounded-lg">
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            viewBox="0 0 20 20"
                            fill="currentColor">
                            <path
                                fillRule="evenodd"
                                d="M10 0a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM8 14a2 2 0 1 1 4 0H8zm1-6a1 1 0 0 1 2 0v4a1 1 0 1 1-2 0V8z"
                            />
                        </svg>
                    </div>
                    <p className="ml-2 text-slate-800 font-normal capitalize">
                        {toastMessage}
                    </p>
                </div>
            )}
        </div>
    );
}

function EditClientModal({
    client,
    saveEditedClient,
    closeModal,
    formData,
    setFormData,
}) {
    // State variables for edited client data
    const [editedSalutation, setEditedSalutation] = useState(
        client?.salutation || ""
    );
    const [editedClientName, setEditedClientName] = useState(
        client?.clientName || ""
    );
    const [editedClientType, setEditedClientType] = useState(
        client?.clientType || ""
    );
    const [editedPurpose, setEditedPurpose] = useState(client?.purpose || "");
    const [editedAddress, setEditedAddress] = useState(client?.address || "");
    const [editedPhone, setEditedPhone] = useState(client?.phone || "");
    const [editedEmailAddress, setEditedEmailAddress] = useState(
        client?.emailAddress || ""
    );
    const [editedCompanyName, setEditedCompanyName] = useState(client?.companyName || "");
    const [editedGstNumber, setEditedGstNumber] = useState(client?.gstNumber || "");
    const [editedIsCompanyOrder, setEditedIsCompanyOrder] = useState(client?.gstNumber || "");

    // Function to handle saving the edited client data
    const handleSave = () => {
        if (
            editedSalutation &&
            editedClientName &&
            editedClientType &&
            editedPurpose &&
            editedAddress &&
            editedPhone ||
            editedEmailAddress
        ) {
            // Collect edited data
            const editedData = {
                id: client.id,
                cid: client.cid,
                salutation: editedSalutation,
                clientName: editedClientName,
                clientType: editedClientType,
                purpose: editedPurpose,
                address: editedAddress,
                phone: editedPhone,
                emailAddress: editedEmailAddress,
                isCompanyOrder: editedIsCompanyOrder,
                companyName: editedCompanyName,
                gstNumber: editedGstNumber,
            };
            saveEditedClient(editedData);
        } else {
            alert("Please fill in all fields.");
        }
    };

    return (
        <div className="p-8 sm:px-4 bg-slate-200 dark:bg-slate-900 rounded-lg">
            <div className="overflow-auto sm:max-h-49 lg:max-h-125 ">
                <h2 className="text-3xl text-center my-1">Edit Client</h2>
                <div className="mb-2 sm:mb-4 dark:text-slate-50">
                    <label
                        htmlFor="salutation"
                        className="block text-sm font-medium text-slate-800 dark:text-slate-300">
                        Salutation
                    </label>
                    <select
                        id="clientType"
                        value={editedSalutation}
                        onChange={(e) => setEditedSalutation(e.target.value)}
                        className="mt-1 py-2 px-3 sm:px-4 focus:ring-red-600 focus:border-red-600 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:text-white dark:border-neutral-500 dark:bg-slate-700 dark:focus:ring-neutral-400">
                        <option value="Mr">Mr</option>
                        <option value="Mrs">Mrs</option>
                    </select>
                </div>
                <div className="mb-2 sm:mb-4">
                    <label
                        htmlFor="clientName"
                        className="block text-sm font-medium text-slate-800 dark:text-slate-50">
                        Client Name
                    </label>
                    <input
                        type="text"
                        id="clientName"
                        value={editedClientName}
                        onChange={(e) => setEditedClientName(e.target.value)}
                        className="mt-1 py-2 px-3 sm:px-4 focus:ring-red-600 focus:border-red-600 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:text-white dark:border-neutral-500 dark:bg-slate-700 dark:focus:ring-neutral-400"
                    />
                </div>
                <div className="mb-2 sm:mb-4">
                    <label
                        htmlFor="clientType"
                        className="block text-sm font-medium text-slate-800 dark:text-slate-50">
                        Client Type
                    </label>
                    <select
                        id="clientType"
                        value={editedClientType}
                        onChange={(e) => setEditedClientType(e.target.value)}
                        className="mt-1 py-2 px-3 sm:px-4 focus:ring-red-600 focus:border-red-600 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:text-white dark:border-neutral-500 dark:bg-slate-700 dark:focus:ring-neutral-400">
                        <option value="Architect">Architect</option>
                        <option value="Client">Client</option>
                        <option value="Interior Designer">
                            Interior Designer
                        </option>
                    </select>
                </div>
                <div className="mb-2 sm:mb-4">
                    <label
                        htmlFor="purpose"
                        className="block text-sm font-medium text-slate-800 dark:text-slate-100">
                        Purpose
                    </label>
                    <input
                        type="text"
                        id="purpose"
                        value={editedPurpose}
                        onChange={(e) => setEditedPurpose(e.target.value)}
                        className="mt-1 py-2 px-3 sm:px-4 focus:ring-red-600 focus:border-red-600 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:text-white dark:border-neutral-500 dark:bg-slate-700 dark:focus:ring-neutral-400"
                    />
                </div>

                <div className="mb-2 sm:mb-4">
                    <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-slate-800 dark:text-slate-50">
                        Phone
                    </label>
                    <input
                        type="number"
                        id="phone"
                        value={editedPhone}
                        onChange={(e) => setEditedPhone(e.target.value)}
                        className="mt-1 py-2 px-3 sm:px-4 focus:ring-red-600 dark:text-white dark:border-neutral-500 dark:bg-slate-700 dark:focus:ring-neutral-400 focus:border-red-600 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md "
                    />
                </div>
                <div className="mb-2 sm:mb-4">
                    <label
                        htmlFor="emailAddress"
                        className="block text-sm font-medium text-slate-800 dark:text-slate-50">
                        Email Address
                    </label>
                    <input
                        type="text"
                        id="emailAddress"
                        value={editedEmailAddress}
                        onChange={(e) => setEditedEmailAddress(e.target.value)}
                        className="mt-1 py-2 px-3 sm:px-4 focus:ring-red-600 focus:border-red-600 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:text-white  dark:border-neutral-500 dark:bg-slate-700 dark:focus:ring-neutral-400"
                    />
                </div>
                <div className="mb-2 sm:mb-4">
                    <label
                        htmlFor="address"
                        className="block text-sm font-medium text-slate-800 dark:text-slate-50">
                        Address
                    </label>
                    <textarea
                        rows={3}
                        id="address"
                        value={editedAddress}
                        onChange={(e) => setEditedAddress(e.target.value)}
                        className="mt-1 py-2 px-3 sm:px-4 dark:text-white dark:border-neutral-500 dark:bg-slate-700 dark:focus:ring-neutral-400 focus:ring-red-600 focus:border-red-600 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:text-white dark:border-neutral-500 dark:bg-slate-700 dark:focus:ring-neutral-400"
                    />
                </div>
                <div className="flex flex-col">
                    {editedIsCompanyOrder && (
                        <>
                            <label
                                htmlFor="company-name"
                                className="text-sm font-medium mb-2">
                                Company Name
                            </label>

                            <input
                                type="text"
                                name="companyName"
                                id="company-name"
                                className="rounded-md py-2 px-3 focus:border-red-500 dark:border-neutral-500 dark:bg-slate-700"
                                onChange={e => setEditedCompanyName(e.target.value)}
                                value={editedCompanyName}
                            />
                        </>
                    )}
                </div>

                <div className="flex flex-col my-4">
                    {editedIsCompanyOrder && (
                        <>
                            <label
                                htmlFor="gst-number"
                                className="text-sm font-medium mb-2">
                                GST Number
                            </label>
                            <input
                                type="text"
                                name="gstNumber"
                                id="gst-number"
                                className="rounded-md py-2 px-3 focus:border-red-500 dark:border-neutral-500 dark:bg-slate-700"
                                onChange={e => setEditedGstNumber(e.target.value)}
                                value={editedGstNumber}
                            />
                        </>
                    )}
                </div>
                <div className="flex items-center my-6">
                    <input
                        type="checkbox"
                        id="company-order"
                        name="isCompanyOrder"
                        className="rounded   p-2 text-slate-600 shadow-sm  dark:text-white  dark:bg-slate-700 "
                        onChange={e => setEditedIsCompanyOrder(e.target.checked)}
                        checked={editedIsCompanyOrder}
                    />
                    <label htmlFor="company-order" className="ml-2 text-sm">
                        GST Order
                    </label>
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={handleSave}
                        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                        Update
                    </button>
                    <button
                        onClick={closeModal}
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

// SkeletonTable component to render skeleton loading effect
const SkeletonTable = () => {
    return (
        <div className="animate-pulse">
            <table className="border-separate border-spacing-2 w-full rounded-lg text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-gray-900 dark:bg-gray-800">
                <thead className="text-sm text-blue-900 uppercase rounded-lg bg-blue-100 dark:bg-slate-900 dark:text-slate-300">
                    <tr>
                        <th
                            scope="col"
                            className="px-3 py-4 bg-gray-400 dark:bg-slate-800"></th>
                        <th
                            scope="col"
                            className="px-3 py-4 bg-gray-300 dark:bg-slate-800"></th>
                        <th
                            scope="col"
                            className="px-4 py-4 bg-gray-300 dark:bg-slate-800"></th>
                        <th
                            scope="col"
                            className="px-4 py-4 bg-gray-300 dark:bg-slate-800"></th>
                        <th
                            scope="col"
                            className="px-4 py-4 bg-gray-300 dark:bg-slate-800"></th>
                        <th
                            scope="col"
                            className="px-4 py-4 bg-gray-300 dark:bg-slate-800"></th>
                        <th
                            scope="col"
                            className="px-4 py-4 bg-gray-300 dark:bg-slate-800"></th>
                        <th
                            scope="col"
                            className="px-4 py-4 bg-gray-400 dark:bg-slate-800"></th>
                        <th
                            scope="col"
                            className="px-4 py-4 bg-gray-400 dark:bg-slate-800"></th>
                    </tr>
                </thead>
                <tbody>
                    {[...Array(10)].map((_, index) => (
                        <tr
                            key={index}
                            className=" text-sm text-blue-900 uppercase rounded-lg bg-blue-100 dark:bg-slate-900 dark:text-slate-300 my-2">
                            <td className="px-4 py-6 bg-gray-300 dark:bg-slate-800"></td>
                            <td className="px-4 py-6  bg-gray-300 dark:bg-slate-800"></td>
                            <td className="px-4 py-6 bg-gray-300 dark:bg-slate-800"></td>
                            <td className="px-4 py-6 bg-gray-300 dark:bg-slate-800"></td>
                            <td className="px-4 py-6 bg-gray-300 dark:bg-slate-800"></td>
                            <td className="px-4 py-6 bg-gray-300 dark:bg-slate-800"></td>
                            <td className="px-4 py-6 bg-gray-300 dark:bg-slate-800"></td>
                            <td className="px-4 py-6 bg-gray-300 dark:bg-slate-800"></td>
                            <td className="px-4 py-6 bg-gray-300 dark:bg-slate-800"></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewCustomers;
