import { create } from "zustand";
import type { Channel, DefaultGenerics } from "stream-chat";

type ChatStore = {
  channel: Channel<DefaultGenerics> | null;
  setChannel: (channel: Channel<DefaultGenerics> | null) => void;
  clearChannel: () => void;
};

const useChatStore = create<ChatStore>((set) => ({
  channel: null,
  setChannel: (channel) => set({ channel }),
  clearChannel: () => set({ channel: null }),
}));

export default useChatStore;
