"use client";

import { Provider } from "react-redux";
import { persistor, store } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Toaster
        // position="top-right"
        richColors
        closeButton
        expand={false}
        visibleToasts={4}
        duration={4500}
        offset={16}
        toastOptions={{
          style: {
            background: "rgba(15, 23, 42, 0.95)",
            color: "#E5E7EB",
            border: "1px solid rgba(148, 163, 184, 0.15)",
            backdropFilter: "blur(10px)",
            borderRadius: "14px",
            padding: "12px 14px",
            fontSize: "14px",
          },
          className: "shadow-[0_8px_30px_rgb(0,0,0,0.35)] font-medium",
        }}
      />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    </>
  );
}
