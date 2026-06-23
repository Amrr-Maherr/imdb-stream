"use client";

import { useState } from "react";
import { SettingsLayout, type SectionId } from "./components/settings-layout";
import { AccountSettings } from "./components/account-settings";
import { PreferencesSettings } from "./components/preferences-settings";
import { PlaybackSettings } from "./components/playback-settings";
import { NotificationsSettings } from "./components/notifications-settings";
import { PrivacySettings } from "./components/privacy-settings";
import { AppSettings } from "./components/app-settings";

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<SectionId>("account");

  return (
    <div className="app-container pt-16 py-8 sm:py-20">
      <SettingsLayout
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      >
        {activeSection === "account" && <AccountSettings />}
        {activeSection === "preferences" && <PreferencesSettings />}
        {activeSection === "playback" && <PlaybackSettings />}
        {activeSection === "notifications" && <NotificationsSettings />}
        {activeSection === "privacy" && <PrivacySettings />}
        {activeSection === "app" && <AppSettings />}
      </SettingsLayout>
    </div>
  );
}
