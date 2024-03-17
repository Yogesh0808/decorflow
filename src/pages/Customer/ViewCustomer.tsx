import { useState } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../layout/DefaultLayout";
import ViewCustomerstable from "./ViewCustomerstable"; // Import the ViewCustomers component

const ViewCustomer = () => {
    const [filterValue, setFilterValue] = useState("");

    const handleSearch = (e: any) => {
        const { value } = e.target;
        setFilterValue(() => value);
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="ViewCustomer" />

            {/* <!-- ====== ViewCustomer Section Start ====== --> */}
            <h2 className="font-light text-xl">Customer Section</h2>
            {/* <!-- ====== Calendar Section End ====== --> */}

            {/* Render the ViewCustomers component */}
            <form className="max-w-lg mx-auto my-4">
                <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
                    Search
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20">
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>
                    <input
                        name="searchBar"
                        type="search"
                        id="default-search"
                        className="block w-full p-4 ps-10 text-sm text-gray-900 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search Customers or Email"
                        onChange={handleSearch}
                        required
                    />
                </div>
            </form>
            <ViewCustomerstable filterValue={filterValue} />
        </DefaultLayout>
    );
};

export default ViewCustomer;
