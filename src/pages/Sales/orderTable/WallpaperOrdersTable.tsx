
import React, { useState } from "react";
import axios from "axios";
import edit from "../../../images/icon/edit.svg";
import trash from "../../../images/icon/trash.svg";
import EditWallpaperOrderForm from "./Modal/EditWallpaperForm";

const WallpaperOrdersTable = ({ products, deleteProduct, editProduct }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedProductForEdit, setSelectedProductForEdit] = useState(null);

    const openEditModal = (product) => {
        setSelectedProductForEdit(product);
        setIsEditModalOpen(true);
    };

    let serialNumber = 0;

    const closeEditModal = () => {
        setSelectedProductForEdit(null);
        setIsEditModalOpen(false);
    };

    const saveEditedOrder = async (productId, editedData) => {
        try {
            // Logic for saving edited order
            const updatedProduct = {
                ...selectedProductForEdit,
                data: editedData,
            };
            editProduct(productId, updatedProduct.data); // Update the product data in the parent state
        } catch (error) {
            console.error("Error saving edited order:", error);
        } finally {
            closeEditModal();
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

    const handleDelete = async (productId) => {
        try {
            // Make DELETE request to delete the product
            await axios.delete(`/api/products/${productId}`, getHeaders());
            deleteProduct(productId);
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    if (!products || products.length === 0) {
        return <div>No product data available</div>;
    }

    return (
        <div className="max-w-screen mx-auto overflow-x-hidden p-4">
            <h1 className="text-black p-2 text-2xl dark:text-whiter">
                Wallpaper
            </h1>
            <div className="overflow-y-auto overflow-x-auto max-h-screen rounded-xl">
                <table className="w-full rounded-lg text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-gray-900 dark:bg-gray-800">
                    <thead className="text-sm text-blue-900 uppercase rounded-lg bg-blue-100 dark:bg-slate-900 dark:text-slate-300">
                        <tr>
                            <th scope="col" className="px-3 py-4">
                                Order ID
                            </th>
                            <th scope="col" className="px-3 py-4">
                                Title
                            </th>
                            <th scope="col" className="px-3 py-4">
                                Description
                            </th>
                            <th scope="col" className="px-4 py-4">
                                Size of Wall
                            </th>
                            <th scope="col" className="px-3 py-4">
                                No of Rolls/ Sqft/yrd
                            </th>
                            <th scope="col" className="px-4 py-4">
                                No of Sqft
                            </th>
                            <th scope="col" className="px-4 py-4">
                                Width of Wallpaper
                            </th>
                            <th scope="col" className="px-4 py-4">
                                Catalog Name
                            </th>
                            <th scope="col" className="px-4 py-4">
                                Catalog Code
                            </th>
                            <th scope="col" className="px-4 py-4">
                                Wallpaper Image
                            </th>
                            <th scope="col" className="px-4 py-4">
                                Remarks
                            </th>
                            <th scope="col" className="px-4 py-4">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr
                                key={product.id}
                                className="bg-white border-b border-zinc-200 dark:bg-slate-800 dark:border-slate-700">
                                <td className="py-2 text-gray-900 whitespace-nowrap text-center dark:text-white">
                                    {++serialNumber}
                                </td>
                                <td className="px-3 py-2">
                                    {product.data.title}
                                </td>
                                <td className="px-3 py-2">
                                    {product.data.description}
                                </td>
                                <td className="px-4 py-2">
                                    {product.data.size}
                                </td>
                                <td className="px-4 py-2">
                                    {product.data.noOfRolls}
                                </td>
                                <td className="px-4 py-2">
                                    {`${product.data.numberOfSqft} ${product.data.unit}`}
                                </td>
                                <td className="px-4 py-2">
                                    {product.data.widthOfWallpaper}
                                </td>
                                <td className="px-4 py-2">
                                    {product.data.catalogCode}
                                </td>
                                <td className="px-4 py-2">
                                    {product.data.catalogNumber}
                                </td>
                                <td className="px-4 py-2">
                                    {product.images.length > 0 ? (
                                        <img
                                            src={`data:image/jpeg;base64,${product.images[0].imageData}`}
                                            width="100"
                                        />
                                    ) : (
                                        "No Image Available"
                                    )}
                                </td>
                                <td className="px-4 py-2">
                                    {product.data.remarks}
                                </td>
                                <td className="px-4 py-2">
                                    <button
                                        onClick={() => openEditModal(product)}
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                        <img
                                            src={edit}
                                            className="hover:scale-125 transition-transform duration-300 ease-in-out cursor-pointer"
                                        />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="font-medium text-red-600 dark:text-red-500 hover:underline">
                                        <img
                                            src={trash}
                                            className="hover:scale-125 transition-transform duration-300 ease-in-out cursor-pointer ml-2"
                                            alt="Trash Icon"
                                        />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isEditModalOpen && (
                <EditWallpaperOrderForm
                    onSave={(editedData) =>
                        saveEditedOrder(selectedProductForEdit.id, editedData)
                    }
                    onCloseModal={closeEditModal}
                    selectedProduct={selectedProductForEdit}
                    editProduct={editProduct}
                />
            )}
        </div>
    );
};

export default WallpaperOrdersTable;
