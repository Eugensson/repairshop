"use client";

import { toast } from "sonner";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { LoaderCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { InputWithLabel } from "@/components/inputs/InputWithLabel";
import { SelectWithLabel } from "@/components/inputs/SelectWithLabel";
import { TextAreaWithLabel } from "@/components/inputs/TextAreaWithLabel";
import { CheckboxWithLabel } from "@/components/inputs/CheckboxWithLabel";
import { DisplayServerActionResponse } from "@/components/DisplayServerActionResponse";

import {
  insertCustomerSchema,
  type InsertCustomerSchemaType,
  type SelectCustomerSchemaType,
} from "@/zod-schemas/customer";

import { StatesArray } from "@/constants/StatesArray";

import { saveCustomerAction } from "@/app/actions/saveCustomerAction";

type Props = {
  customer?: SelectCustomerSchemaType;
  isManager?: boolean | undefined;
};

export default function CustomerForm({ customer, isManager = false }: Props) {
  const searchParams = useSearchParams();

  const hasCustomerId = searchParams.get("customerId");

  const emptyValues: InsertCustomerSchemaType = {
    id: 0,
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: "",
    notes: "",
    active: true,
  };

  const defaultValues: InsertCustomerSchemaType = hasCustomerId
    ? {
        id: customer?.id ?? 0,
        firstName: customer?.firstName ?? "",
        lastName: customer?.lastName ?? "",
        address1: customer?.address1 ?? "",
        address2: customer?.address2 ?? "",
        city: customer?.city ?? "",
        state: customer?.state ?? "",
        zip: customer?.zip ?? "",
        phone: customer?.phone ?? "",
        email: customer?.email ?? "",
        notes: customer?.notes ?? "",
        active: customer?.active ?? true,
      }
    : emptyValues;

  const form = useForm<InsertCustomerSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(insertCustomerSchema),
    defaultValues,
  });

  useEffect(() => {
    form.reset(hasCustomerId ? defaultValues : emptyValues);
  }, [searchParams.get("customerId")]); // eslint-disable-line react-hooks/exhaustive-deps

  const {
    execute: executeSave,
    result: saveResult,
    isExecuting: isSaving,
    reset: resetSaveAction,
  } = useAction(saveCustomerAction, {
    onSuccess({ data }) {
      if (data?.message) {
        toast(`Success. ${data?.message}`);
      }
    },
    onError() {
      toast(`Error. Save failed.`);
    },
  });

  async function submitForm(data: InsertCustomerSchemaType) {
    executeSave(data);
  }

  return (
    <div className="flex flex-col gap-1 sm:px-8">
      <DisplayServerActionResponse result={saveResult} />
      <div>
        <h2 className="text-2xl font-bold">
          {customer?.id ? "Edit" : "New"} Customer{" "}
          {customer?.id ? `#${customer.id}` : "Form"}
        </h2>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitForm)}
          className="flex flex-col md:flex-row gap-4 md:gap-8"
        >
          <div className="w-full max-w-xs flex flex-col gap-4">
            <InputWithLabel<InsertCustomerSchemaType>
              fieldTitle="First Name"
              nameInSchema="firstName"
            />

            <InputWithLabel<InsertCustomerSchemaType>
              fieldTitle="Last Name"
              nameInSchema="lastName"
            />

            <InputWithLabel<InsertCustomerSchemaType>
              fieldTitle="Address 1"
              nameInSchema="address1"
            />

            <InputWithLabel<InsertCustomerSchemaType>
              fieldTitle="Address 2"
              nameInSchema="address2"
            />

            <InputWithLabel<InsertCustomerSchemaType>
              fieldTitle="City"
              nameInSchema="city"
            />

            <SelectWithLabel<InsertCustomerSchemaType>
              fieldTitle="State"
              nameInSchema="state"
              data={StatesArray}
            />
          </div>

          <div className="w-full max-w-xs flex flex-col gap-4">
            <InputWithLabel<InsertCustomerSchemaType>
              fieldTitle="Zip Code"
              nameInSchema="zip"
            />

            <InputWithLabel<InsertCustomerSchemaType>
              fieldTitle="Email"
              nameInSchema="email"
            />

            <InputWithLabel<InsertCustomerSchemaType>
              fieldTitle="Phone"
              nameInSchema="phone"
            />

            <TextAreaWithLabel<InsertCustomerSchemaType>
              fieldTitle="Notes"
              nameInSchema="notes"
              className="h-40"
            />

            {isManager && customer?.id ? (
              <CheckboxWithLabel<InsertCustomerSchemaType>
                fieldTitle="Active"
                nameInSchema="active"
                message="Yes"
              />
            ) : null}

            <div className="flex gap-2">
              <Button
                type="submit"
                className="w-3/4"
                variant="default"
                title="Save"
                aria-label="Save"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <LoaderCircle className="animate-spin" />
                    Saving
                  </>
                ) : (
                  <>Save</>
                )}
              </Button>
              <Button
                type="button"
                variant="destructive"
                title="Reset"
                aria-label="Reset"
                onClick={() => {
                  form.reset(defaultValues);
                  resetSaveAction();
                }}
              >
                Reset
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
