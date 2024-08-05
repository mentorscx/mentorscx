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
import { delay } from "@/lib/utils";

const formSchema = z.object({
  reason: z.string().min(10, {
    message: "Reason must be 10 characters atleast.",
  }),
});

export const RescheduleSessionModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const activeChannel = useChatStore((state) => state.channel);
  const router = useRouter();

  const isModalOpen = isOpen && type === "rescheduleSession";
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
      const declinedBy = session?.declinedBy;

      onClose();

      // Promise function that handles session update and message sending
      const rescheduleSessionPromise = async () => {
        try {
          // Update session details
          const result = await updateSession({
            id: sessionId,
            status: sessionStatus,
            declineReason: reason,
            declinedBy,
          });

          // Send message if channel is active
          if (activeChannel) {
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

      toast.promise(rescheduleSessionPromise(), {
        loading: "Rescheduling the session...",
        success: (data) => {
          // Reset form and refresh router on success
          form.reset();
          router.refresh();

          return "Rescheduled the session";
        },
        error: "Failed to reschedule the session. Try again!",
      });
    } catch (error) {
      console.error("Error in session-reschedule-modal" + error);
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  if (!isModalOpen) return null;

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Reschedule Session</DialogTitle>
          <DialogDescription>
            Please provide a reason for rescheduling the session. This will be
            sent to the user.
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
                Reschedule session
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
