"use client";

import type { ReactNode } from "react";
import { useState } from "react";

import MobileHeader from "@/components/navbar/MobileHeader";
import Sidebar from "@/components/navbar/Sidebar";
import TodoModal from "@/components/todo/TodoModal";
import { useModalStore } from "@/store/modalStore";

export default function MainLayout({
  children,
}: {
  children: ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isModalOpen, closeModal } = useModalStore();

  return (
    <div className="h-screen flex bg-gray-50 dark:bg-gray-900">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <MobileHeader onOpen={() => setIsSidebarOpen(true)} />
        <main className="flex-1">
          {children}
        </main>
      </div>
      <TodoModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}