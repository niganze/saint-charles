import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RichTextEditor } from "@/components/ui/rich-text-input";
import { Blog } from "@prisma/client";
import Image from "next/image";
import { Loader } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { blogSchema, BlogFormData } from "../types";
import { Switch } from "@/components/ui/switch";

interface BlogDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => Promise<void>;
  blog?: Blog & { image: string | null };
}

export function BlogDialog({ open, onClose, onSubmit, blog }: BlogDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
    control,
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      content: "",
      published: false,
    },
  });

  // Reset form when blog changes or dialog opens/closes
  useEffect(() => {
    if (open) {
      if (blog) {
        reset({
          title: blog.title,
          content: blog.content,
          published: blog.published,
        });
      } else {
        reset({
          title: "",
          content: "",
          published: false,
        });
      }
    }
  }, [blog, open, reset]);

  const imageFiles = watch("image");
  const previewUrl = imageFiles?.[0]
    ? URL.createObjectURL(imageFiles[0])
    : blog?.image || "";

  // Cleanup preview URL when component unmounts or image changes
  useEffect(() => {
    return () => {
      if (previewUrl && !blog?.image) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl, blog?.image]);

  const onSubmitForm = async (data: BlogFormData) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);
      formData.append("published", String(data.published));

      if (data.image?.[0]) {
        formData.append("image", data.image[0]);
      }

      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error("Failed to submit blog:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{blog ? "Edit Blog" : "Add New Blog"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Input
                id="title"
                label="Title"
                {...register("title")}
                error={errors.title?.message}
              />
            </div>
            <div className="grid gap-2">
              <Controller
                name="content"
                control={control}
                render={({ field }) => (
                  <RichTextEditor
                    content={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            <div className="grid gap-2">
              <Input
                id="image"
                label="Feature Image"
                type="file"
                accept="image/*"
                {...register("image")}
                error={errors.image?.message as string}
              />
              {previewUrl && (
                <div className="relative w-full h-48">
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="published"
                checked={watch("published")}
                onCheckedChange={(checked: boolean) =>
                  setValue("published", checked)
                }
              />
              <label htmlFor="published" className="text-sm">
                Publish this blog
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader className="animate-spin h-4 w-4" />
              ) : blog ? (
                "Save Changes"
              ) : (
                "Add Blog"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
