import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import axios from "axios";

import Loader from "./common/Loader/index";
import PageTitle from "./components/PageTitle";
import ECommerce from "./pages/Dashboard/ECommerce";
import Settings from "./pages/Settings";
import Neworder from "./pages/Sales/Neworder";
import Vieworder from "./pages/Sales/Vieworder";
import Printorder from "./pages/Sales/printorder";
import AddCustomer from "./pages/Customer/AddCustomer";
import ViewCustomer from "./pages/Customer/ViewCustomer";
import NotFound from "./pages/NotFound";
import ViewEntry from "./pages/Dispatch/ViewEntry";
import OrderEntry from "./pages/Dispatch/OrderEntry";
import NewInvoice from "./pages/Invoice/NewInvoice";
import ViewInvoice from "./pages/Invoice/ViewInvoice";
import PrintInvoice from "./pages/Invoice/PrintInvoice";
import ContactCard from "./pages/Customer/ContactCard";

axios.defaults.baseURL = "https://cors-abineshcodes-projects.vercel.app";

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    const startTime = new Date().toISOString();
    localStorage.setItem("startTime", startTime);
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const resolution = `${screenWidth}x${screenHeight}`;
    localStorage.setItem("screenResolution", resolution);

    const browserInfo = {
      name: navigator.appName,
      version: navigator.appVersion,
      platform: navigator.platform,
    };
    localStorage.setItem("browserInfo", JSON.stringify(browserInfo));

    const language = navigator.language;
    localStorage.setItem("language", language);

    const userAgent = navigator.userAgent;
    localStorage.setItem("deviceName", userAgent);

    axios
      .get("https://api.ipify.org/?format=json")
      .then((response) => {
        localStorage.setItem("userIP", response.data.ip);
      })
      .catch((error) => {
        console.error("Error fetching IP address:", error);
      });

    const closeTime = new Date().toISOString();
    const ip = localStorage.getItem("userIP");
    const userData = { ip, startTime, closeTime, page: pathname };
    const storedData = localStorage.getItem("storedData") || "[]";
    const newData = JSON.stringify([...JSON.parse(storedData), userData]);
    localStorage.setItem("storedData", newData);

    setTimeout(() => setLoading(false), 500);

    return () => {
      localStorage.setItem("closeTime", closeTime);
    };
  }, [pathname]);


  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="Dashboard | YHD" />
              <ECommerce />
            </>
          }
        />
        <Route
          path="/customer/new"
          element={
            <>
              <PageTitle title="New-Customer | YHD" />
              <AddCustomer />
            </>
          }
        />
        <Route
          path="/customer/view"
          element={
            <>
              <PageTitle title="View-Customer | YHD" />
              <ViewCustomer />
            </>
          }
        />
        <Route
          path="/order/new"
          element={
            <>
              <PageTitle title="New-Order | YHD" />
              <Neworder />
            </>
          }
        />
        <Route
          path="/order/view"
          element={
            <>
              <PageTitle title="View-Order | YHD" />
              <Vieworder />
            </>
          }
        />
        <Route
          path="/order/print"
          element={
            <>
              <PageTitle title="Printing Preview | YHD" />
              <Printorder />
            </>
          }
        />
        {/* Dispatching Routing Starts Here:)) */}
        <Route
          path="/dispatch/entry"
          element={
            <>
              <PageTitle title="OrderEntry | YHD" />
              <OrderEntry />
            </>
          }
        />
        <Route
          path="/dispatch/view"
          element={
            <>
              <PageTitle title="OrderEntry | YHD" />
              <ViewEntry />
            </>
          }
        />
        <Route
          path="/invoice/new"
          element={
            <>
              <PageTitle title="Quote | YHD" />
              <NewInvoice />
            </>
          }
        />
        <Route
          path="/invoice/view"
          element={
            <>
              <PageTitle title="Viewing Invoice | YHD" />
              <ViewInvoice />
            </>
          }
        />
        <Route
          path="/invoice/print"
          element={
            <>
              <PageTitle title="Printing Invoice | YHD" />
              <PrintInvoice />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <PageTitle title="Contacts | YHD" />
              <ContactCard />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | YHD" />
              <Settings />
            </>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
