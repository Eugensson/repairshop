"use client";

import {
  flexRender,
  CellContext,
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
} from "@tanstack/react-table";
import Link from "next/link";
import { MoreHorizontal, TableOfContents } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { SelectCustomerSchemaType } from "@/zod-schemas/customer";
import { cn } from "@/lib/utils";

type Props = {
  data: SelectCustomerSchemaType[];
};

export default function CustomerTable({ data }: Props) {
  const columnHeadersArray: Array<keyof SelectCustomerSchemaType> = [
    "firstName",
    "lastName",
    "email",
    "phone",
    "city",
    "zip",
  ];

  const columnHelper = createColumnHelper<SelectCustomerSchemaType>();

  const ActionsCell = ({
    row,
  }: CellContext<SelectCustomerSchemaType, unknown>) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link
              href={`/tickets/form?customerId=${row.original.id}`}
              className="w-full"
              prefetch={false}
            >
              New Ticket
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={`/customers/form?customerId=${row.original.id}`}
              className="w-full"
              prefetch={false}
            >
              Edit Customer
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  ActionsCell.displayName = "ActionsCell";

  const columns = [
    columnHelper.display({
      id: "actions",
      header: () => <TableOfContents />,
      cell: ActionsCell,
    }),
    ...columnHeadersArray.map((columnName) => {
      return columnHelper.accessor(columnName, {
        id: columnName,
        header: columnName[0].toUpperCase() + columnName.slice(1),
      });
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="mt-6 rounded-lg overflow-hidden border border-border">
      <Table className="border">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className={cn(
                    "bg-secondary",
                    header.id === "actions" ? "w-12" : ""
                  )}
                >
                  <div
                    className={cn(
                      header.id === "actions"
                        ? "flex items-center justify-center"
                        : ""
                    )}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              className="cursor-pointer hover:bg-body/25 dark:hover:bg-ring/40"
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="border">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
