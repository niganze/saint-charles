"use client";

import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { DeleteConfirmDialog } from "@/components/ui/delete-confirm-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/modal";
import { toast } from "react-hot-toast";

interface Registration {
  id: number;
  name: string;
  email: string;
  phone: string;
  preferredCourse: string;
  preferredSchedule: string;
  additionalInfo?: string;
  createdAt: string;
}

async function getRegistrations(
  startDate?: Date,
  endDate?: Date,
  search?: string,
  shift?: string,
  course?: string
): Promise<Registration[]> {
  const params = new URLSearchParams();
  if (shift) {
    params.append("shift", shift);
  }
  if (course) {
    params.append("course", course);
  }
  if (startDate && endDate) {
    params.append("startDate", startDate.toISOString());
    params.append("endDate", endDate.toISOString());
  }
  if (search) {
    params.append("search", search);
  }

  const response = await fetch(`/api/register?${params.toString()}`);
  if (!response.ok) {
    throw new Error("Failed to fetch registrations");
  }
  return response.json();
}

async function deleteRegistration(id: number) {
  const response = await fetch(`/api/register/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete registration");
  }
}

export default function RegistrationsPage() {
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [viewRegistration, setViewRegistration] = useState<Registration | null>(
    null
  );
  const queryClient = useQueryClient();
  const [registrations, setRegistrations] = useState<Registration[]>([]);

  const { data: response = [] } = useQuery({
    queryKey: ["registrations"],
    queryFn: () => getRegistrations(),
  });

  const mutation = useMutation({
    mutationFn: (id: number) =>
      fetch(`/api/register/${id}`, {
        method: "DELETE",
      }),
    onSuccess: () => {
      setRegistrations(response);
    },
    onError: () => {
      toast.error("Failed to fetch registrations");
    },
  });

  const filterFunction = async (filters: { [key: string]: string }) => {
    const response = await getRegistrations(
      filters.startDate ? new Date(filters.startDate) : undefined,
      filters.endDate ? new Date(filters.endDate) : undefined,
      filters.search,
      filters.shift,
      filters.course
    );
    setRegistrations(response);
  };

  useEffect(() => {
    setRegistrations(response);
  }, [response]);

  const deleteMutation = useMutation({
    mutationFn: deleteRegistration,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["registrations"] });
      toast.success("Registration deleted successfully");
      setDeleteId(null);
    },
    onError: () => {
      toast.error("Failed to delete registration");
    },
  });

  const handleDelete = (id: number) => {
    setDeleteId(id);
  };

  const handleConfirmDelete = async () => {
    if (deleteId) {
      deleteMutation.mutate(deleteId);
    }
  };

  const handleViewRegistration = (registration: Registration) => {
    setViewRegistration(registration);
  };

  const columns: ColumnDef<Registration>[] = [
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) =>
        format(new Date(row.original.createdAt), "MMM d, yyyy"),
    },
    {
      accessorKey: "name",
      header: "Name",
    },

    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      accessorKey: "preferredCourse",
      header: "Course",
    },
    {
      accessorKey: "preferredSchedule",
      header: "Schedule",
    },

    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex justify-end space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleViewRegistration(row.original)}
          >
            View
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDelete(row.original.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="py-10 bg-white rounded-lg shadow p-6 md:px-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Registrations</h1>
      </div>

      {/* Table */}
      <div className="">
        <DataTable
          courseFilter={true}
          shiftFilter={true}
          dateFilter={true}
          columns={columns}
          data={registrations}
          searchKey="name"
          filterFunction={filterFunction}
        />
      </div>

      {/* Delete Dialog */}
      <DeleteConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleConfirmDelete}
        isDeleting={deleteMutation.isPending}
        title="Delete Registration"
        description="Are you sure you want to delete this registration? This action cannot be undone."
      />

      {/* View Registration Modal */}
      <Dialog
        open={!!viewRegistration}
        onOpenChange={() => setViewRegistration(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Registration Details</DialogTitle>
            <DialogDescription>
              <div className="space-y-2 mt-8">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col">
                    <p className="text-gray-500">Name</p>
                    <p className="text-md">{viewRegistration?.name}</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-gray-500">Email</p>
                    <p>{viewRegistration?.email}</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-gray-500">Phone</p>
                    <p>{viewRegistration?.phone}</p>
                  </div>

                  <div className="flex flex-col">
                    <p className="text-gray-500">Preferred Course</p>
                    <p>{viewRegistration?.preferredCourse}</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-gray-500">Preferred Schedule</p>
                    <p>{viewRegistration?.preferredSchedule}</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-gray-500">Additional Info</p>
                    <p>{viewRegistration?.additionalInfo || "-"}</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-gray-500">Date</p>
                    <p>
                      {viewRegistration?.createdAt
                        ? new Date(
                            viewRegistration?.createdAt
                          ).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setViewRegistration(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
