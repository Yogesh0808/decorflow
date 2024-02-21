import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import ViewCustomerstable from './ViewCustomerstable'; // Import the ViewCustomers component

const ViewCustomer = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="ViewCustomer" />

      {/* <!-- ====== ViewCustomer Section Start ====== --> */}
      <h2 className="font-light">New Order Section</h2>
      {/* <!-- ====== Calendar Section End ====== --> */}

      {/* Render the ViewCustomers component */}
      <ViewCustomerstable />
    </DefaultLayout>
  );
};

export default ViewCustomer;
