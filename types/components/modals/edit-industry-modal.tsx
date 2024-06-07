"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useUser } from "@clerk/clerk-react";

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
import { Loader2Icon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import Select from "react-select";
import { useEffect } from "react";
import { Textarea } from "../ui/textarea";

import { industryData } from "@/constants/data";
import { FileUpload } from "@/components/shared/file-upload";
import { updateIndustry } from "@/lib/actions/industry.action";

const formSchema = z.object({
  name: z
    .object({
      label: z.string(),
      value: z.string(),
    })
    .refine((data) => data.value, {
      message: "Industry is required.",
    }),
  description: z.string().min(1, {
    message: "Description is required.",
  }),
});

export const EditIndustryModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const { isLoaded, user } = useUser();
  const router = useRouter();
  const params = useParams();

  const isModalOpen = isOpen && type === "editIndustry";
  const industry = data?.industry;
  console.log(industry);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: {
        label: industry?.name || "",
        value: industry?.name || "",
      },
      description: industry?.description || "",
    },
  });

  useEffect(() => {
    if (industry) {
      const name = {
        label: industry.name,
        value: industry.name,
      };

      form.setValue("description", industry?.description);
      form.setValue("name", name);
    }
  }, [industry, form]);

  const isLoading = form.formState.isSubmitting;

  if (!isModalOpen) return null;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const id = industry?.id;
      if (id) {
        updateIndustry({
          id,
          ...values,
          name: values.name.value,
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
          <DialogTitle>Industry</DialogTitle>
          <DialogDescription>Edit your industry</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Industry
                    </FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        isMulti={false}
                        options={industryData}
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
                        className="min-h-[120px]"
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
                Update Industry
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
