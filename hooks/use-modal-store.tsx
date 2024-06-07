import { Role } from "@prisma/client";
import { create } from "zustand";

enum ChannelType {
  TEXT,
  AUDIO,
  VIDEO,
}

export type ModalType =
  | "addIndustry"
  | "addExpertise"
  | "addExperience"
  | "editProfile"
  | "deleteIndustry"
  | "editIndustry"
  | "addTool"
  | "editExpertise"
  | "deleteExpertise"
  | "editExperience"
  | "deleteExperience"
  | "editTool"
  | "deleteTool"
  | "editBio"
  | "editSocials"
  | "editProfession"
  | "cancelSession"
  | "declineSession"
  | "rescheduleSession"
  | "socialShare";

interface Industry {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

interface Tool {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

interface Expertise {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

interface SocialShare {
  url: string;
}

interface ProfessionalDetails {
  companyName: string;
  role: string;
  companySize: string;
  linkedinUrl: string;
}

interface User {
  bio?: string | null;
  id: string;
  portfolioWebsite?: string;
  linkedinProfile?: string;
  twitterProfile?: string;
  facebookProfile?: string;
  tiktokProfile?: string;
  position?: string | null;
  organization?: string | null;
}

interface Experience {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

interface Session {
  id: string;
  status: string;
  declinedBy: Role;
}

interface ModalData {
  industry?: Industry;
  expertise?: Expertise;
  channelType?: ChannelType;
  UserDetails?: ProfessionalDetails;
  tool?: Tool;
  user?: User;
  experience?: Experience;
  session?: Session;
  socialShare?: SocialShare;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: "editSocials",
  data: {},
  userId: " ",
  isOpen: false,
  onOpen: (type, data = {}, userId = " ") => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
