import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../layout/DefaultLayout";
import QuoteForm from "./QuoteForm";

const NewInvoice = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Neworder" />
      <h1 className="text-3xl font-extralight">Invoicing Section</h1>
      <QuoteForm />
    </DefaultLayout>
  );
};

export default NewInvoice;
