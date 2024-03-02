import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastTestComponent = () => {
  const handleButtonClick = () => {
    toast.success("This is a test toast notification!");
  };

  return (
    <div>
      <h1>Toast Test Component</h1>
      <button onClick={handleButtonClick}>Show Toast</button>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default ToastTestComponent;
