"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useUser } from "@clerk/clerk-react";

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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/vertical-tab";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import Select from "react-select";
import { useEffect } from "react";
import { Textarea } from "../ui/textarea";

import { industryData } from "@/constants/data";
import { FileUpload } from "@/components/shared/file-upload";
import { addIndustry } from "@/lib/actions/industry.action";
import {
  BriefcaseIcon,
  ClockIcon,
  CreditCardIcon,
  Globe2Icon,
  Scroll,
} from "lucide-react";
import { ModalEditProfileForm } from "../forms/modal-edit-profile-form";
import { PersonIcon } from "@radix-ui/react-icons";
import { UserProfessionalInfoForm } from "../forms/user-professional-form";
import { toast } from "sonner";

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
  imageUrl: z.string().min(1, {
    message: "Upload Logo",
  }),
});

export const EditProfileModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const { isLoaded, user } = useUser();
  const router = useRouter();
  const params = useParams();

  const isModalOpen = isOpen && type === "editProfile";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: {
        label: "",
        value: "",
      },
      description: "",
      imageUrl: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      addIndustry({
        ...values,
        userId: user?.id as string,
        name: values.name.value,
      });
      form.reset();
      router.refresh();
      onClose();
      toast.success("Added successfully");
    } catch (error) {
      console.log(error);
      toast.error("Error. Please try again");
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  if (!isModalOpen) return null;

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden max-w-2xl h-2/3">
        {/* <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Howra
          </DialogTitle>
        </DialogHeader> */}
        <DialogDescription className="w-full h-full">
          <Tabs defaultValue="general" className="flex ">
            <TabsList className="flex-none w-1/3">
              <div className="text-muted-foreground font-semibold uppercase !text-xs py-2 px-1.5">
                Account Settings
              </div>
              <TabsTrigger value="profile" className="flex items-center">
                <PersonIcon className="w-5 h-5 mr-2" /> Profile
              </TabsTrigger>

              <TabsTrigger value="general" className="flex items-center">
                <Globe2Icon className="w-5 h-5 mr-2" /> General
              </TabsTrigger>

              <TabsTrigger value="professional" className="flex items-center">
                <BriefcaseIcon className="w-5 h-5 mr-2" /> Professional
              </TabsTrigger>

              <div className="text-muted-foreground font-semibold uppercase !text-xs py-2 px-1.5">
                Meeting Settings
              </div>
              <TabsTrigger value="time" className="flex items-center">
                <ClockIcon className="w-5 h-5 mr-2" />
                Meetings
              </TabsTrigger>
              <TabsTrigger value="paymet" className="w-full">
                <CreditCardIcon className="w-5 h-5 mr-2" /> Payment
              </TabsTrigger>
            </TabsList>
            <TabsContent value="profile" className="w-2/3  border-none">
              <h4 className="h4 mx-3 text-black">Profile</h4>
              <hr className="border-gray-200 p-[1px] my-2" />
              <ModalEditProfileForm />
            </TabsContent>
            <TabsContent value="password">
              Change your password here.
            </TabsContent>
            <TabsContent value="professional" className="w-2/3  border-none">
              <h4 className="h4 mx-3 text-black">Professional</h4>
              <hr className="border-gray-200 p-[1px] my-2" />
              <UserProfessionalInfoForm user="{}" />
            </TabsContent>
          </Tabs>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
