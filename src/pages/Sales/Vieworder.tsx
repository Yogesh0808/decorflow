import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import ViewOrderTable from './ViewOrderTable';

const Vieworder = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Vieworder" />

      {/* <!-- ====== Vieworder Section Start ====== --> */}
      <h1>View Order Section</h1>
      <ViewOrderTable />
      {/* <!-- ====== Calendar Section End ====== --> */}
    </DefaultLayout>
  );
};

export default Vieworder;
