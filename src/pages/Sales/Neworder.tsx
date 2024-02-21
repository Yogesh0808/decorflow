import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import NeworderComponent from './NeworderComponent';

const Neworder = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Neworder" />

      {/* <!-- ====== Neworder Section Start ====== --> */}
      <h1 className="text-3xl font-extralight">New Order Section</h1>
      <NeworderComponent />
    </DefaultLayout>
  );
};

export default Neworder;
