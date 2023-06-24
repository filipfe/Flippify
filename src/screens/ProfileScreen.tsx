import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable, ScrollView, StyleSheet, View, Modal } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { linearGradient } from "../const/styles";
import { ProfileStackParams } from "../types/navigation";
import UserInfo from "../components/profile/UserInfo";
import { LogoIcon, PremiumIcon, SettingsIcon } from "../assets/icons/icons";
import PremiumBanner from "../components/profile/PremiumBanner";
import LogoutButton from "../components/profile/LogoutButton";
import Stats from "../components/profile/Stats";
import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import Header from "../components/header/Header";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import SettingsScreen from "./profile/SettingsScreen";
import { AuthContext } from "../context/AuthContext";
import PremiumPurchase from "./profile/PremiumPurchase";

const ProfileStack = createNativeStackNavigator<ProfileStackParams>();

export default function ProfileScreen() {
  return (
    <ProfileStack.Navigator
      initialRouteName="ProfileStack"
      screenOptions={{
        header: (props) => <Header {...props} />,
      }}
    >
      <ProfileStack.Screen
        name="ProfileStack"
        component={Profile}
        options={{
          title: "Profil",
          headerShown: false,
        }}
      />
      <ProfileStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: "Ustawienia",
        }}
      />
    </ProfileStack.Navigator>
  );
}

const Profile = () => {
  const [premiumModalActive, setPremiumModalActive] = useState(false);
  const { user } = useContext(AuthContext);
  const { is_premium } = user;
  const { navigate } =
    useNavigation<NavigationProp<ProfileStackParams, "ProfileStack">>();
  const { background, light, font } = useContext(ThemeContext);
  return (
    <ScrollView>
      <LinearGradient
        colors={linearGradient}
        start={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
      >
        <View style={styles.settingsWrapper}>
          {is_premium ? <PremiumIcon width={64} /> : <LogoIcon width={64} />}
          <Pressable
            onPress={() => navigate("Settings")}
            style={{
              height: 48,
              width: 48,
              borderRadius: 12,
              backgroundColor: light,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SettingsIcon fill={font} width={24} height={24} />
          </Pressable>
        </View>
        <View
          style={{
            backgroundColor: background,
            borderTopRightRadius: 36,
            borderTopLeftRadius: 36,
            paddingHorizontal: 24,
            paddingBottom: 24,
            flex: 1,
          }}
        >
          <UserInfo />
          <Stats />
          {!is_premium && (
            <PremiumBanner onPress={() => setPremiumModalActive(true)} />
          )}
          <LogoutButton />
        </View>
      </LinearGradient>
      <Modal
        animationType="fade"
        visible={premiumModalActive}
        statusBarTranslucent
        onRequestClose={() => setPremiumModalActive(false)}
      >
        <PremiumPurchase onClose={() => setPremiumModalActive(false)} />
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  settingsWrapper: {
    paddingTop: 64,
    paddingBottom: 48,
    paddingHorizontal: 24,
    justifyContent: "space-between",
    flexDirection: "row",
  },
});
