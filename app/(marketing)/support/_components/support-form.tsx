"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { toast } from "sonner";

import { createSupport } from "@/lib/actions/support.action";

const SupportFormSchema = z.object({
  firstName: z.string().min(1, { message: "Please enter your first name" }),
  lastName: z.string().min(1, { message: "Please enter your last name" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(5, { message: "Please enter the subject in detail" }),
  message: z
    .string()
    .min(40, { message: "Please write message in detail(Atleast 40 letters)" }),
});

export default function SupportForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof SupportFormSchema>>({
    resolver: zodResolver(SupportFormSchema),
  });

  async function onSubmit(values: z.infer<typeof SupportFormSchema>) {
    try {
      await createSupport({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        subject: values.subject,
        message: values.message,
      });
      toast.success("Your ticket has been created successfully");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <>
      {/* Contact section */}
      <section>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">
            {/* Section header */}
            <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
              <h1 className="h1">Need help? </h1>
              <h1 className="h1"> Don’t hesitate to reach out!</h1>
            </div>

            {/* Contact form */}
            <form
              className="max-w-xl mx-auto"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                  <label
                    className="block text-gray-800 text-sm font-medium mb-1"
                    htmlFor="first-name"
                  >
                    First Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="first-name"
                    type="text"
                    className="form-input w-full text-gray-800"
                    placeholder="Enter your first name"
                    required
                    {...register("firstName")}
                  />
                  {errors?.firstName && (
                    <p className="text-red-400">{errors.firstName.message}</p>
                  )}
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block text-gray-800 text-sm font-medium mb-1"
                    htmlFor="last-name"
                  >
                    Last Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="last-name"
                    type="text"
                    className="form-input w-full text-gray-800"
                    placeholder="Enter your last name"
                    required
                    {...register("lastName")}
                  />
                  {errors?.lastName && (
                    <p className="text-red-400">{errors.lastName.message}</p>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label
                    className="block text-gray-800 text-sm font-medium mb-1"
                    htmlFor="email"
                  >
                    Email <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="form-input w-full text-gray-800"
                    placeholder="Enter your email address"
                    required
                    {...register("email")}
                  />
                  {errors?.email && (
                    <p className="text-red-400">{errors.email.message}</p>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label
                    className="block text-gray-800 text-sm font-medium mb-1"
                    htmlFor="subject"
                  >
                    Subject <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="subject"
                    type="text"
                    className="form-input w-full text-gray-800"
                    placeholder="How can we help you?"
                    required
                    {...register("subject")}
                  />
                  {errors?.subject && (
                    <p className="text-red-400">{errors.subject.message}</p>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label
                    className="block text-gray-800 text-sm font-medium mb-1"
                    htmlFor="message"
                  >
                    Message <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="form-textarea w-full text-gray-800"
                    placeholder="Write your message"
                    required
                    {...register("message", { required: true, min: 50 })}
                  ></textarea>
                  {errors?.message && (
                    <p className="text-red-400">{errors.message.message}</p>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mt-4">
                <div className="w-full px-3">
                  <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full">
                    Send
                  </button>
                </div>
              </div>
              <div className="text-sm text-gray-600 mt-4">
                By clicking send you consent to allow Mentors CX to store and
                process the personal information submitted above and agree to
                our{" "}
                <a className="underline" href="/docs/terms" target="_blank">
                  terms and conditions
                </a>{" "}
                as well as our{" "}
                <a className="underline" href="/docs/privacy" target="_blank">
                  Privacy Policy
                </a>
                .
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
