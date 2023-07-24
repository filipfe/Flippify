import { SettingsContext } from "../context/SettingsContext";
import useSettings from "../hooks/useSettings";

type Props = { children: JSX.Element | JSX.Element[] };

export default function SettingsProvider({ children }: Props) {
  const settings = useSettings();
  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
}
