"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DateRange } from "react-day-picker";
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

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}

async function getContacts(
  startDate?: Date,
  endDate?: Date,
  search?: string
): Promise<Contact[]> {
  const params = new URLSearchParams();
  if (startDate && endDate) {
    params.append("startDate", startDate.toISOString());
    params.append("endDate", endDate.toISOString());
  }
  if (search) {
    params.append("search", search);
  }

  const response = await fetch(`/api/contact?${params.toString()}`);
  if (!response.ok) {
    throw new Error("Failed to fetch contacts");
  }
  return response.json();
}

async function deleteContact(id: number) {
  const response = await fetch(`/api/contact/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete contact");
  }
}

export default function ContactsPage() {
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [viewContact, setViewContact] = useState<Contact | null>(null);
  const queryClient = useQueryClient();

  const { data: contacts = [] } = useQuery({
    queryKey: ["contacts"],
    queryFn: () => getContacts(),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      toast.success("Contact deleted successfully");
      setDeleteId(null);
    },
    onError: () => {
      toast.error("Failed to delete contact");
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

  const handleViewContact = (contact: Contact) => {
    setViewContact(contact);
  };

  const columns: ColumnDef<Contact>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "message",
      header: "Message",
      cell: ({ row }) => {
        return (
          <p className="text-md truncate max-w-72">{row.original.message}</p>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex justify-end space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleViewContact(row.original)}
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
        <h1 className="text-2xl font-bold">Contacts</h1>
      </div>

      {/* Table */}
      <div className="">
        <DataTable columns={columns} data={contacts} searchKey="name" />
      </div>

      {/* Delete Dialog */}
      <DeleteConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleConfirmDelete}
        isDeleting={deleteMutation.isPending}
        title="Delete Contact"
        description="Are you sure you want to delete this contact? This action cannot be undone."
      />

      {/* View Contact Modal */}
      <Dialog open={!!viewContact} onOpenChange={() => setViewContact(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contact Details</DialogTitle>
            <DialogDescription>
              <div className="space-y-2 mt-8">
                <div className="flex flex-col">
                  <p className="text-gray-500">Name</p>
                  <p className="text-md">{viewContact?.name}</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-gray-500">Email</p>
                  <p className="text-md">{viewContact?.email}</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-gray-500">Phone</p>
                  <p className="text-md">{viewContact?.phone}</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-gray-500">Message</p>
                  <p className="text-md">{viewContact?.message}</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-gray-500">Date</p>
                  <p className="text-md">
                    {viewContact?.createdAt
                      ? new Date(viewContact.createdAt).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setViewContact(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
