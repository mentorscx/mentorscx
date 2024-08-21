"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import { Textarea } from "../ui/textarea";
import { useModal } from "@/hooks/use-modal-store";
import { updateSession } from "@/lib/actions/session.action";

import useChatStore from "@/hooks/use-chat-client-store";

const formSchema = z.object({
  reason: z.string().min(10, {
    message: "Reason must be 10 characters atleast.",
  }),
});

export const DeclineSessionModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  const activeChannel = useChatStore((state) => state.channel);

  const isModalOpen = isOpen && type === "declineSession";
  const session = data?.session;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reason: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { reason } = values;
      const sessionId = session?.id;
      const sessionStatus = session?.status;

      onClose();

      // Promise function that handles session update and message sending
      const declineSessionPromise = async () => {
        try {
          // Update session details
          const result = await updateSession({
            id: sessionId,
            status: sessionStatus,
            declineReason: reason,
          });

          // Send message if channel is active
          if (activeChannel && activeChannel.id) {
            await activeChannel.sendMessage({
              text: reason,
            });
          }

          // Return result for toast promise handling
          if (result) {
            return true;
          } else {
            throw new Error("Decline failed");
          }
        } catch (error) {
          console.error("Error updating session:", error);
          throw new Error("Failed to update session");
        }
      };

      toast.promise(declineSessionPromise(), {
        loading: "Declining the session...",
        success: (data) => {
          // Reset form and refresh router on success
          form.reset();
          router.refresh();

          return "Declined the session";
        },
        error: "Failed to decline the session. Try again!",
      });
    } catch (error) {
      console.error("Error in session-decline-modal" + error);
    }
  };

  // const onSubmit = async (values: z.infer<typeof formSchema>) => {
  //   try {
  //     const sessionId = session?.id;
  //     const sessionStatus = session?.status;
  //     const { reason } = values;

  //     toast.loading("Declining the session...");
  //     onClose();

  //     const result = await updateSession({
  //       id: sessionId,
  //       status: sessionStatus,
  //       declineReason: reason,
  //     });
  //     await activeChannel?.sendMessage({ text: reason });

  //     form.reset();
  //     router.refresh();

  //     if (result) {
  //       toast.success("Declined the session");
  //     } else {
  //       toast.error("Failed to update");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Failed to update");
  //   }
  // };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  if (!isModalOpen) return null;

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Decline Session</DialogTitle>
          <DialogDescription>
            Please provide a reason for declining the session. This will be sent
            to the user.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid items-start gap-4">
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        disabled={isLoading}
                        placeholder="Enter Reason"
                        className="min-h-[120px]"
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
                Decline session
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
