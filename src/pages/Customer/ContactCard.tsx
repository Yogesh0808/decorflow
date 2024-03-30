import { useState, useEffect } from "react";
import axios from "axios";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../layout/DefaultLayout";

const ContactCard = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get("/api/customer", getHeaders());
        setContacts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, []);

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

  // Function to handle calling the contact number
  const handleCall = (phoneNumber) => {
    console.log("Calling", phoneNumber);
    window.open(`tel:${phoneNumber}`);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Contacts" />
      <div>
        <h1 className="text-4xl text-black-2 text-center font-thin mb-4">
          Contact List
        </h1>
        {contacts.map((contact, index) => (
          <div
            key={contact.id}
            className="bg-gradient-to-r from-blue-300 to-pink-200 shadow-xl p-4 mb-4 rounded-lg text-black dark:text-white"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold">{contact.clientName}</p>
                <p className="text-gray-600">{contact.phone}</p>
              </div>
              <button
                onClick={() => handleCall(contact.phone)}
                className="ml-4 px-5 py-2 bg-pink-500 text-pink-100 rounded-full hover:bg-pink-600 focus:outline-none"
              >
                Call
              </button>
            </div>
          </div>
        ))}
      </div>
    </DefaultLayout>
  );
};

export default ContactCard;
