import Layout from "@/components/overflow";
import PaymentPage from "@/components/PaymentPage";

export default function Page({ params }) {
  return (
    <Layout>
      <PaymentPage id={params.username} /> 
    </Layout>
  );
}
