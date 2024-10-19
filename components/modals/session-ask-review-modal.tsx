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

import useChatStore from "@/hooks/use-chat-client-store";

const formSchema = z.object({
  reason: z.string().min(10, {
    message: "Reason must be 10 characters atleast.",
  }),
});

export const SessionAskReviewModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  const activeChannel = useChatStore((state) => state.channel);

  const isModalOpen = isOpen && type === "askReview";
  const session = data?.session;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reason:
        "Hey! I hope you enjoy our session together. I would appreciate it if you can leave a review for me, as it helps me with my profile. Thank you so much in advance!",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { reason } = values;

      onClose();

      // Promise function that handles session update and message sending
      const rescheduleSessionPromise = async () => {
        try {
          // Send message if channel is active
          if (activeChannel) {
            await activeChannel.sendMessage({
              text: reason,
            });
          }

          // Return result for toast promise handling
          return true;
        } catch (error) {
          console.error("Error sending message:", error);
          throw new Error("Failed to send the message");
        }
      };

      toast.promise(rescheduleSessionPromise(), {
        loading: "sending the message...",
        success: (data) => {
          // Reset form and refresh router on success
          form.reset();
          router.refresh();

          return "Message sent";
        },
        error: "Failed to send the message. Try again!",
      });
    } catch (error) {
      console.error("Error in ask-review-modal" + error);
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
          <DialogTitle>Request review</DialogTitle>
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
                        placeholder="Enter the message"
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
                Ask for review
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
