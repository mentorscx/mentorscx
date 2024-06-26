import { create } from "zustand";

interface EditProfileStore {
  isActive: boolean;
  toggleActive: () => void;
}

export const useEditProfileStore = create<EditProfileStore>((set) => ({
  isActive: true,
  toggleActive: () => set((state) => ({ isActive: !state.isActive })),
}));
