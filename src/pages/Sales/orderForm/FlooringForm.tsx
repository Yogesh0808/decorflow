import React, { useState } from 'react';

const FlooringForm = ({ onSubmit, onCloseModal }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    sizeOfFloor: '',
    numberOfSqft: '',
    catalogCodeAndNumber: '',
    flooringImage: null,
    remarks: '',
  });

  // Define state for modal visibility
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const [flooringType, setFlooringType] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      flooringImage: file,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the onSubmit callback function passed from the parent component
    onSubmit(formData);
  };

  return (
    <div className="relative bg-purple-100 rounded-lg shadow dark:bg-slate-700">
      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-slate-600">
        <h3 className="text-xl font-normal text-slate-800 dark:text-white">
          Floorings Order Form
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
                htmlFor="flooringImage"
                className="block mb-2 text-sm font-medium text-slate-900 dark:text-white"
              >
                Flooring Image
              </label>
              <input
                type="file"
                name="flooringImage"
                onChange={handleFileChange}
                accept="image/*"
                required
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

export default FlooringForm;
