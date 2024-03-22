import React from "react";

function SkeletonRow() {
    return (
        <>
            <div className="animate-pulse">
                <ul className="w-full mt-3 text-boxdark  rounded-xl">
                    {[...Array(8)].map((_, index) => (
                        <li
                            className="py-5 my-3 bg-blue-100 rounded-xl"
                            key={index}></li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default SkeletonRow;
