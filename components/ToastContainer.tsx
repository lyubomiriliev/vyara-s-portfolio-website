"use client";

import React, { ReactNode } from "react";
import * as Toast from "@radix-ui/react-toast";

interface ToastNotificationProps {
  title: string;
  description: string;
  open: boolean;
  setOpen: (state: boolean) => void;
}

const ToastNotification = ({
  title,
  description,
  open,
  setOpen,
}: ToastNotificationProps) => {
  return (
    <Toast.Provider swipeDirection="right">
      <Toast.Root
        className="bg-black text-white p-4 rounded-md shadow-lg"
        open={open}
        onOpenChange={setOpen}
        duration={1500}
      >
        <Toast.Title className="font-bold text-xl">{title}</Toast.Title>
        <Toast.Description className="mt-1 text-sm">
          {description}
        </Toast.Description>
        <Toast.Action
          altText="Close"
          className="absolute right-2 top-2 text-white cursor-pointer"
        >
          ✕
        </Toast.Action>
      </Toast.Root>
      <Toast.Viewport className="fixed top-4 right-4 w-[300px]" />
    </Toast.Provider>
  );
};

export default ToastNotification;
