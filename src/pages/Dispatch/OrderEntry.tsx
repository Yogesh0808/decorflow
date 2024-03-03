import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../layout/DefaultLayout";
import DispatchForm from "./DispatchForm";

const OrderEntry = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Neworder" />

      {/* <!-- ====== Neworder Section Start ====== --> */}
      <h1 className="text-3xl font-extralight">Dispatch Section</h1>
      <DispatchForm />
    </DefaultLayout>
  );
};

export default OrderEntry;
