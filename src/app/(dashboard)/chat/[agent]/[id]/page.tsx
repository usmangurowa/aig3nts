import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AIG3ENT - Chat"
};

import { SettingsPanel } from "@/components/settings-panel";
import Chat from "@/components/chat";

export default function Page() {
  return (
    <>
      <Chat />
      <SettingsPanel />
    </>
  );
}
