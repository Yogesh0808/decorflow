import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../layout/DefaultLayout";
import PrintTable from "./printTable";

const printorder = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Printorder" />

      {/* <!-- ====== Vieworder Section Start ====== --> */}
      <h1 className="text-2xl text-neutral-800 dark:text-slate-100">
        Printing Order Section
      </h1>
      <p></p>
      <PrintTable />
    </DefaultLayout>
  );
};

export default printorder;
