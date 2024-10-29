"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Loader2Icon } from "lucide-react";

import React, { useState } from "react";
import Rating from "@/components/ui/RatingWrapper";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { addReview } from "@/lib/actions/review.action";
import { SessionStatus } from "@prisma/client";

const formSchema = z.object({
  feedback: z.string().min(40, {
    message: "Feedback is required (min 40 characters).",
  }),
  rating: z.number().min(1, {
    message: "Please select the rating.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

type AddReviewModalProps = {
  isDialogOpen: boolean;
  onClose: () => void;
  sessionId: string;
};

export const AddReviewModal = (props: AddReviewModalProps) => {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const { isDialogOpen, onClose } = props;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: {
      feedback: "",
      rating: 0,
    },
  });

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      const { review } = await addReview({
        ...values,
        sessionId: props.sessionId,
      });

      if (review) {
        toast.success("Review added successfully!");
        router.refresh();
      } else {
        throw new Error("Failed to update session status.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error((error as Error).message || "Failed to submit review.");
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isDialogOpen) return null;

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[525px] rounded-lg">
        <DialogHeader className="w-full flex justify-center">
          <DialogTitle>Review</DialogTitle>
          <DialogDescription>Please add your review</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 mt-4">
          <div className="flex gap-2 items-start flex-col w-full">
            <Label htmlFor="rating" className="w-full text-left">
              Please select your rating based on the call
            </Label>
            <Controller
              control={control}
              name="rating"
              rules={{ required: "Please select the rating." }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Rating
                  value={value}
                  onChange={onChange}
                  count={5}
                  edit={true}
                  className="text-start"
                  aria-labelledby="rating_label"
                />
              )}
            />
            {errors.rating && (
              <div className="text-red-500 text-sm text-left">
                {errors.rating.message}
              </div>
            )}
          </div>

          <div className="flex gap-2 items-start flex-col w-full">
            <Label htmlFor="name" className="w-full text-left">
              Please add your feedback
            </Label>
            <Textarea
              id="name"
              {...register("feedback")}
              className="w-full h-32"
            />

            <div className="text-sm text-left text-muted-foreground">
              characters (40 minimum)
            </div>

            {errors.feedback && (
              <div className="text-red-500 text-sm text-left">
                {errors.feedback.message}
              </div>
            )}
          </div>

          <DialogFooter className="w-full pt-4 flex items-center justify-center">
            <Button
              disabled={isSubmitting || loading}
              type="submit"
              className="min-w-[200px] w-full mx-auto"
            >
              Submit Review
              {(isSubmitting || loading) && (
                <Loader2Icon className="animate-spin w-4 h-4 ml-1" />
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddReviewModal;
