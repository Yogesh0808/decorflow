import React from 'react'

function ViewOrder(prop: any) {
    return (
        <ul
            className="flex w-full justify-around bg-blue-100 text-graydark my-3 rounded-xl"
            key={prop.index}
            onClick={() => {
                prop.setSelectedCustomer(prop.customer);
                prop.handleSelectCustomer(prop.customer.id);
            }}>
            <li className="p-3 w-1/6 text-center">
                {prop.customer.cid}
            </li>
            <li className="p-3 w-5/6 text-center">
                {prop.customer.clientName}
            </li>
        </ul>
    )
}

export default ViewOrder