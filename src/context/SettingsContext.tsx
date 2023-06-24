import { Settings } from "../types/settings";
import { createContext } from "react";

export type SettingsContextType = {
  settings: Settings;
  changeSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
};

export const SettingsContext = createContext<SettingsContextType>(null!);
