"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

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
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";
import { useModal } from "@/hooks/use-modal-store";
import { updateSession } from "@/lib/actions/session.action";
import useChatStore from "@/hooks/use-chat-client-store";
import { delay } from "@/lib/utils";

const formSchema = z.object({
  reason: z.string().min(10, {
    message: "Reason must be 10 characters atleast.",
  }),
});

export const CancelSessionModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  const activeChannel = useChatStore((state) => state.channel);

  const isModalOpen = isOpen && type === "cancelSession";
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
            throw new Error("Cancel session failed");
          }
        } catch (error) {
          console.error("Error cancelling session:", error);
          throw new Error("Failed to cancel the session");
        }
      };

      toast.promise(rescheduleSessionPromise(), {
        loading: "Cancelling the session...",
        success: (data) => {
          // Reset form and refresh router on success
          form.reset();
          router.refresh();

          return "Cancelled the session";
        },
        error: "Failed to cancel the session. Try again!",
      });
    } catch (error) {
      console.error("Error in session-cancel-modal" + error);
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  if (!isModalOpen) return null;

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[525px] rounded-lg">
        <DialogHeader>
          <DialogTitle>Cancel Session</DialogTitle>
          <DialogDescription>
            Please provide a reason for cancelling the session. This will be
            sent to the mentee.
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
                    {/* <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Bio
                    </FormLabel> */}
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
                Cancel session
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
