import { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import axios from "axios";

import Loader from "./common/Loader/index";
import PageTitle from "./components/PageTitle";
import Calendar from "./pages/Calendar";
import Chart from "./pages/Chart";
import ECommerce from "./pages/Dashboard/ECommerce";
import FormElements from "./pages/Form/FormElements";
import FormLayout from "./pages/Form/FormLayout";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Tables from "./pages/Tables";
import Alerts from "./pages/UiElements/Alerts";
import Buttons from "./pages/UiElements/Buttons";
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

axios.defaults.baseURL = "https://cors-h05i.onrender.com";

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

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
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar | YHD" />
              <Calendar />
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
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | YHD" />
              <Profile />
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements | YHD" />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout | YHD" />
              <FormLayout />
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
          path="/tables"
          element={
            <>
              <PageTitle title="Tables | YHD" />
              <Tables />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Settings />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Buttons />
            </>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Navigate to="/analytics/dashboard" />} />
        <Route
          index
          path="/analytics/dashboard"
          element={
            <>
              <PageTitle title="Dashboard | YHD" />
              <Dashboard />
            </>
          }
        />
        <Route
          path="/analytics/performance"
          element={
            <>
              <PageTitle title="Performance | YHD" />
              <Performance />
            </>
          }
        />
        <Route
          path="/client/new"
          element={
            <>
              <PageTitle title="New-Customer | YHD" />
              <AddCustomer />
            </>
          }
        />
        <Route
          path="/client/view"
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
      </Routes>
    </>
  );
}

export default App;
