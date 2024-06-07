"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useUser } from "@clerk/clerk-react";
import { Loader2Icon } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import Select from "react-select";
import { useEffect } from "react";
import { Textarea } from "../ui/textarea";

import { FileUpload } from "@/components/shared/file-upload";
import { updateExperience } from "@/lib/actions/experience.action";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "company name is required.",
  }),
  description: z.string().min(1, {
    message: "Description is required.",
  }),
  imageUrl: z.string().min(1, {
    message: "Upload Logo",
  }),
});

export const EditExperienceModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const { isLoaded, user } = useUser();
  const router = useRouter();
  const params = useParams();

  const isModalOpen = isOpen && type === "editExperience";
  const experience = data?.experience;
  console.log(experience);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: experience?.name || "",
      description: experience?.description || "",
      imageUrl: experience?.imageUrl || "",
    },
  });

  useEffect(() => {
    if (experience) {
      const name = {
        label: experience.name,
        value: experience.name,
      };

      form.setValue("description", experience?.description);
      form.setValue("imageUrl", experience?.imageUrl);
      form.setValue("name", experience?.name);
    }
  }, [experience, form]);

  const isLoading = form.formState.isSubmitting;

  if (!isModalOpen) return null;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const id = experience?.id;
      if (id) {
        updateExperience({
          id,
          ...values,
        });
      }
      onClose();
      form.reset();
      router.refresh();
      toast.success("Updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update");
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader className="w-full flex justify-center">
          <DialogTitle>Experience</DialogTitle>
          <DialogDescription>Edit your experience</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-center text-center">
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                        Add Logo
                      </FormLabel>
                      <FormControl>
                        <FileUpload
                          endpoint="serverImage"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Experience
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Enter company name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isLoading}
                        className="h-[120px]"
                        placeholder="Enter description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className=" w-full pt-4 flex items-center justify-center">
              <Button
                disabled={isLoading}
                type="submit"
                className="min-w-[200px] w-full mx-auto"
              >
                Update Experience
                {isLoading && (
                  <Loader2Icon className="animate-spin w-4 h-4 ml-1" />
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
