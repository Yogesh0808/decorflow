import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../layout/DefaultLayout";
import DispatchTable from "./DispatchTable";

const ViewEntry = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Neworder" />

      {/* <!-- ====== Neworder Section Start ====== --> */}
      <h1 className="text-3xl font-extralight">Dispatch Section</h1>
      <DispatchTable />
    </DefaultLayout>
  );
};

export default ViewEntry;
