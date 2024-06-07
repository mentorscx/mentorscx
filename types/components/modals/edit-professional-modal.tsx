"use client";

import { useEffect } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";

import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogDescription,
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

import { updateUser } from "@/lib/actions/user.action";
import { useModal } from "@/hooks/use-modal-store";

const formSchema = z.object({
  position: z.string().min(1, {
    message: "Current role is required.",
  }),
  organization: z.string().min(1, {
    message: "Company name is required.",
  }),
});

export const EditProfessionModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "editProfession";
  const user = data?.user;
  console.log(user);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      position: user?.position || "",
      organization: user?.organization || "",
    },
  });

  useEffect(() => {
    if (user?.organization !== undefined && user?.organization !== null) {
      form.setValue("organization", user?.organization);
    }
    if (user?.position) {
      form.setValue("position", user?.position);
    }
  }, [user?.organization, form, user?.position]);

  const isLoading = form.formState.isSubmitting;

  if (!isModalOpen) return null;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const id = user?.id;

      if (id) {
        const user = await updateUser({
          id,
          ...values,
        });
      }
      onClose();
      form.reset();
      router.refresh();
      if (user !== null) {
        toast.success("Updated successfully");
      } else {
        toast.error("Failed to update");
      }
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
          <DialogTitle>Professional Information</DialogTitle>
          <DialogDescription>
            Edit your current role and company
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-semibold">
                      Current Role
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Enter current role"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="organization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-semibold">
                      company name
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
            </div>
            <div className="w-full h-24"></div>
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
