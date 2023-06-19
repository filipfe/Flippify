import { View } from "react-native";
import Layout from "../../components/Layout";
import SettingsSection from "../../components/settings/SettingsSection";
import ThemeSwitch from "../../components/settings/ThemeSwitch";

export default function SettingsScreen() {
  return (
    <Layout>
      <SettingsSection title="Wygląd i dostępność">
        <ThemeSwitch />
      </SettingsSection>
      <SettingsSection title="Powiadomienia">
        <View></View>
      </SettingsSection>
    </Layout>
  );
}
