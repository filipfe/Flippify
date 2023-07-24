import { useState, useEffect } from "react";
import { Settings } from "../types/settings";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SettingsContextType } from "../context/SettingsContext";
import { initialSettings } from "../const/settings";

export default function useSettings(): SettingsContextType {
  const [settings, setSettings] = useState<Settings>(initialSettings);

  useEffect(() => {
    (async () => {
      const storageSettings = await AsyncStorage.getItem("settings");
      storageSettings && setSettings(JSON.parse(storageSettings));
    })();
  }, []);

  const changeSetting = async <K extends keyof Settings>(
    key: K,
    value: Settings[K]
  ) => {
    await AsyncStorage.setItem(
      "settings",
      JSON.stringify({ ...settings, [key]: value })
    );
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return {
    settings,
    changeSetting,
  };
}
