"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { DateRange } from "react-day-picker";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Select } from "@/components/ui/select";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey: string;
  dateField?: string;
  courseFilter?: boolean;
  shiftFilter?: boolean;
  filterFunction?: (filters: { [key: string]: string }) => Promise<void>;
  dateFilter?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  dateField,
  courseFilter,
  shiftFilter,
  filterFunction,
  dateFilter,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedShift, setSelectedShift] = useState<string>("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
  });

  // ✅ Effect to update column filters when values change
  useEffect(() => {
    let filters: { [key: string]: string } = {};
    if (selectedCourse) {
      filters.course = selectedCourse;
    }
    if (selectedShift) {
      filters.shift = selectedShift;
    }
    if (dateRange) {
      filters.startDate = dateRange.from?.toISOString() ?? "";
      filters.endDate = dateRange.to?.toISOString() ?? "";
    }
    filterFunction?.(filters);
  }, [selectedCourse, selectedShift, dateRange]);

  return (
    <div>
      <div className="flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-4">
          <Input
            placeholder="Search..."
            value={
              (table.getColumn(searchKey)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn(searchKey)?.setFilterValue(event.target.value)
            }
            className="max-w-xs"
          />
          {dateField && (
            <DateRangePicker
              value={dateRange}
              onChange={setDateRange}
              placeholder="Filter by date"
              className="max-w-sm"
            />
          )}
        </div>
        <div className="flex items-center gap-4">
          {courseFilter && (
            <Select
              value={selectedCourse}
              onValueChange={setSelectedCourse}
              placeholder="Filter by course"
              options={[
                { label: "All Courses", value: "" },
                { label: "A1", value: "A1" },
                { label: "A2", value: "A2" },
                { label: "B1", value: "B1" },
                { label: "B2", value: "B2" },
                { label: "C1", value: "C1" },
                { label: "C2", value: "C2" },
              ]}
              className="w-40"
            />
          )}
          {shiftFilter && (
            <Select
              value={selectedShift}
              onValueChange={setSelectedShift}
              placeholder="Filter by shift"
              options={[
                { label: "All Shifts", value: "" },
                { label: "Morning", value: "Morning Session" },
                { label: "Early Afternoon", value: "Early Afternoon" },
                { label: "Late Afternoon", value: "Late Afternoon" },
                { label: "Evening", value: "Evening Session" },
                { label: "Weekend - Saturday", value: "Weekend - Saturday" },
                { label: "Weekend - Sunday", value: "Weekend - Sunday" },
              ]}
              className="w-48"
            />
          )}
        </div>
      </div>

      <div className="">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="py-3 px-6 text-left text-sm font-medium text-gray-500"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="border-b hover:bg-gray-50">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-4 px-6 text-sm">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-sm text-gray-500"
                >
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
