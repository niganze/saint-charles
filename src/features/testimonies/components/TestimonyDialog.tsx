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
import { Testimony } from "@prisma/client";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { testimonySchema, TestimonyFormData } from "../types";

interface TestimonyDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => Promise<void>;
  testimony?: Testimony;
}

export function TestimonyDialog({
  open,
  onClose,
  onSubmit,
  testimony,
}: TestimonyDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<TestimonyFormData>({
    resolver: zodResolver(testimonySchema),
    defaultValues: {
      name: "",
      content: "",
      title: "Student",
    },
  });

  // Reset form when testimony changes or dialog opens/closes
  useEffect(() => {
    if (open) {
      if (testimony) {
        reset({
          name: testimony.name,
          content: testimony.content,
          title: testimony?.title || "Student",
        });
      } else {
        reset({
          name: "",
          content: "",
          title: "Student",
        });
      }
    }
  }, [testimony, open, reset]);

  const imageFiles = watch("image");
  const previewUrl = imageFiles?.[0]
    ? URL.createObjectURL(imageFiles[0])
    : testimony?.image || "";

  // Cleanup preview URL when component unmounts or image changes
  useEffect(() => {
    return () => {
      if (previewUrl && !testimony?.image) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl, testimony?.image]);

  const onSubmitForm = async (data: TestimonyFormData) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("content", data.content);
      formData.append("title", data.title);

      if (data.image?.[0]) {
        formData.append("image", data.image[0]);
      }

      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error("Failed to submit testimony:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {testimony ? "Edit Testimony" : "Add New Testimony"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Input
                id="name"
                label="Name"
                {...register("name")}
                error={errors.name?.message}
              />
            </div>
            <div className="grid gap-2">
              <select
                id="title"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                {...register("title")}
              >
                <option value="Student">Student</option>
                <option value="Teacher">Teacher</option>
                <option value="Parent">Parent</option>
                <option value="Professional">Professional</option>
              </select>
              {errors.title?.message && (
                <p className="text-sm text-destructive">
                  {errors.title.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Textarea
                id="content"
                label="Content"
                {...register("content")}
                error={errors.content?.message}
              />
            </div>
            <div className="grid gap-2">
              <Input
                id="image"
                label="Image"
                type="file"
                accept="image/*"
                {...register("image")}
                error={errors.image?.message as string}
              />
              {previewUrl && (
                <div className="relative w-full h-40">
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              )}
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
              ) : testimony ? (
                "Save Changes"
              ) : (
                "Add Testimony"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
