import { create } from "zustand";

type ConversationStore = {
  users: string[];
  activeUsers: (users: string[]) => void;
  clearUsers: () => void;
};

const useConversationStore = create<ConversationStore>((set) => ({
  users: [],
  activeUsers: (users) => set(() => ({ users })),
  clearUsers: () => set(() => ({ users: [] })),
}));

export default useConversationStore;
