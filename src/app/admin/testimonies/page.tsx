"use client";

import { useState } from "react";
import { Testimony } from "@prisma/client";
import { TestimonyDialog } from "@/features/testimonies/components/TestimonyDialog";
import { DeleteConfirmDialog } from "@/features/testimonies/components/DeleteConfirmDialog";
import {
  getTestimonies,
  createTestimony,
  updateTestimony,
  deleteTestimony,
  TestimonyFormData,
} from "@/features/testimonies/testimonies.api";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { Loader } from "lucide-react";

export default function TestimoniesPage() {
  const [selectedTestimony, setSelectedTestimony] = useState<Testimony | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [testimonyToDelete, setTestimonyToDelete] = useState<number | null>(
    null
  );
  const queryClient = useQueryClient();

  const { data: testimonies, isLoading } = useQuery({
    queryKey: ["testimonies"],
    queryFn: getTestimonies,
  });

  const createMutation = useMutation({
    mutationFn: createTestimony,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonies"] });
      toast.success("Testimony created successfully");
    },
    onError: () => {
      toast.error("Failed to create testimony");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: FormData }) =>
      updateTestimony(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonies"] });
      toast.success("Testimony updated successfully");
    },
    onError: () => {
      toast.error("Failed to update testimony");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTestimony,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonies"] });
      toast.success("Testimony deleted successfully");
      setIsDeleteDialogOpen(false);
      setTestimonyToDelete(null);
    },
    onError: () => {
      toast.error("Failed to delete testimony");
    },
  });

  const handleCreate = () => {
    setSelectedTestimony(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (testimony: Testimony) => {
    setSelectedTestimony(testimony);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setTestimonyToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (testimonyToDelete) {
      await deleteMutation.mutateAsync(testimonyToDelete);
    }
  };

  const handleSubmit = async (data: FormData) => {
    if (selectedTestimony) {
      await updateMutation.mutateAsync({
        id: selectedTestimony.id,
        data,
      });
    } else {
      await createMutation.mutateAsync(data);
    }
    setIsDialogOpen(false);
  };

  if (isLoading) {
    return (
      <div className="container py-10 flex justify-center items-center">
        <Loader className="animate-spin h-4 w-4" />
      </div>
    );
  }

  return (
    <div className="container py-10 bg-white rounded-lg shadow p-6 md:px-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Testimonies</h1>
        <Button onClick={handleCreate}>Add</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Content</TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {testimonies?.map((testimony) => (
            <TableRow key={testimony.id}>
              <TableCell>
                {testimony.image ? (
                  <div className="relative w-16 h-16">
                    <Image
                      src={testimony.image}
                      alt={testimony.name}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-gray-200 rounded-full" />
                )}
              </TableCell>
              <TableCell>{testimony.name}</TableCell>
              <TableCell className="max-w-md">
                <div className="line-clamp-2">{testimony.content}</div>
              </TableCell>
              <TableCell>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(testimony)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    color="destructive"
                    onClick={() => handleDelete(testimony.id)}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TestimonyDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleSubmit}
        testimony={selectedTestimony || undefined}
      />

      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setTestimonyToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        isDeleting={deleteMutation.isPending}
      />
    </div>
  );
}
