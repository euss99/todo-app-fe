import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ModalStore {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>()(
  devtools(
    (set) => ({
      isModalOpen: false,
      openModal: () => set({ isModalOpen: true }),
      closeModal: () => set({ isModalOpen: false })
    }),
    {
      name: "modal-store"
    }
  )
);