import { BackButton } from "@/components/BackButton";
import CustomerForm from "@/app/(rs)/customers/form/CustomerForm";

import { getCustomer } from "@/lib/queries/getCustomer";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { customerId } = await searchParams;

  if (!customerId) return { title: "New Customer" };

  return { title: `Edit Customer #${customerId}` };
}

export default async function CustomerFormPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  try {
    const { customerId } = await searchParams;

    if (customerId) {
      const customer = await getCustomer(parseInt(customerId));

      if (!customer) {
        return (
          <>
            <h2 className="text-2xl mb-2">
              Customer ID #{customerId} not found
            </h2>
            <BackButton title="Go Back" variant="default" />
          </>
        );
      }

      return <CustomerForm customer={customer} />;
    } else {
      return <CustomerForm />;
    }
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
      throw e;
    }
  }
}
