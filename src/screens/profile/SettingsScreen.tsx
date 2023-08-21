import { View } from "react-native";
import Layout from "../../components/ui/layout/Layout";
import SettingsSection from "../../components/settings/SettingsSection";
import ThemeSwitch from "../../components/settings/ThemeSwitch";
import AnimationSwitch from "../../components/settings/AnimationSwitch";

export default function SettingsScreen() {
  return (
    <Layout>
      <SettingsSection title="Wygląd i dostępność">
        <ThemeSwitch />
        <AnimationSwitch />
      </SettingsSection>
      <SettingsSection title="Powiadomienia">
        <View></View>
      </SettingsSection>
    </Layout>
  );
}
