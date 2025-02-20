"use client";

import { useState } from "react";
import { Blog } from "@prisma/client";
import { BlogDialog } from "@/features/blogs/components/BlogDialog";
import { DeleteConfirmDialog } from "@/components/ui/delete-confirm-dialog";
import {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  publishBlog,
  unpublishBlog,
} from "@/features/blogs/blogs.api";
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
import { format } from "date-fns";

export default function BlogsPage() {
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const { data: blogs, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });

  const createMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      toast.success("Blog created successfully");
    },
    onError: () => {
      toast.error("Failed to create blog");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: FormData }) =>
      updateBlog(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      toast.success("Blog updated successfully");
    },
    onError: () => {
      toast.error("Failed to update blog");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      toast.success("Blog deleted successfully");
      setIsDeleteDialogOpen(false);
      setBlogToDelete(null);
    },
    onError: () => {
      toast.error("Failed to delete blog");
    },
  });

  const publishMutation = useMutation({
    mutationFn: publishBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      toast.success("Blog published successfully");
    },
    onError: () => {
      toast.error("Failed to publish blog");
    },
  });

  const unpublishMutation = useMutation({
    mutationFn: unpublishBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      toast.success("Blog unpublished successfully");
    },
    onError: () => {
      toast.error("Failed to unpublish blog");
    },
  });

  const handleCreate = () => {
    setSelectedBlog(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (blog: Blog) => {
    setSelectedBlog(blog);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setBlogToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (blogToDelete) {
      await deleteMutation.mutateAsync(blogToDelete);
    }
  };

  const handleSubmit = async (data: FormData) => {
    if (selectedBlog) {
      await updateMutation.mutateAsync({
        id: selectedBlog.id,
        data,
      });
    } else {
      await createMutation.mutateAsync(data);
    }
    setIsDialogOpen(false);
  };

  const handlePublishToggle = async (blog: Blog) => {
    if (blog.published) {
      await unpublishMutation.mutateAsync(blog.id);
    } else {
      await publishMutation.mutateAsync(blog.id);
    }
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
        <h1 className="text-2xl font-bold">Blogs</h1>
        <Button onClick={handleCreate}>Add</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blogs?.map((blog) => (
            <TableRow key={blog.id}>
              <TableCell>
                {blog.image ? (
                  <div className="relative w-16 h-16">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-gray-200 rounded-md" />
                )}
              </TableCell>
              <TableCell>{blog.title}</TableCell>
              <TableCell>
                <Button
                  variant={blog.published ? "destructiveOutline" : "outline"}
                  size="sm"
                  onClick={() => handlePublishToggle(blog)}
                >
                  {blog.published ? "Published" : "Draft"}
                </Button>
              </TableCell>
              <TableCell>
                {blog.publishedAt
                  ? format(new Date(blog.publishedAt), "MMM d, yyyy")
                  : "Not published"}
              </TableCell>
              <TableCell>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(blog)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    color="destructive"
                    onClick={() => handleDelete(blog.id)}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <BlogDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleSubmit}
        blog={selectedBlog || undefined}
      />

      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setBlogToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        isDeleting={deleteMutation.isPending}
        title="Delete Blog"
        description="Are you sure you want to delete this blog? This action cannot be undone."
      />
    </div>
  );
}
