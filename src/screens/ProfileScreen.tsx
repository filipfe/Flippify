import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable, ScrollView, StyleSheet, View, Modal } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { linearGradient } from "../const/styles";
import { ProfileStackParams } from "../types/navigation";
import UserInfo from "../components/profile/UserInfo";
import { NotificationsIcon, SettingsIcon } from "../assets/icons/icons";
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
import { SafeAreaView } from "react-native-safe-area-context";
import BoxLinkRow from "../components/profile/BoxLinkRow";
import EditButton from "../components/profile/EditButton";
import Edit from "./profile/Edit";

const ProfileStack = createNativeStackNavigator<ProfileStackParams>();

export default function ProfileScreen() {
  return (
    <ProfileStack.Navigator
      initialRouteName="ProfileScreen"
      screenOptions={{
        header: (props) => <Header {...props} />,
      }}
    >
      <ProfileStack.Screen
        name="ProfileScreen"
        component={Profile}
        options={{
          title: "Profil",
          headerShown: false,
        }}
      />
      <ProfileStack.Screen
        name="EditProfile"
        component={Edit}
        options={{
          title: "Edytuj profil",
          headerTransparent: true,
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
    useNavigation<NavigationProp<ProfileStackParams, "ProfileScreen">>();
  const { background, light, font } = useContext(ThemeContext);
  return (
    <ScrollView>
      <LinearGradient
        colors={linearGradient}
        start={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={styles.settingsWrapper}>
          <Pressable
            onPress={() => navigate("Settings")}
            style={[styles.settingsButton, { backgroundColor: light }]}
          >
            <NotificationsIcon stroke={font} width={20} height={20} />
          </Pressable>

          <Pressable
            onPress={() => navigate("Settings")}
            style={[styles.settingsButton, { backgroundColor: light }]}
          >
            <SettingsIcon fill={font} width={24} height={24} />
          </Pressable>
        </SafeAreaView>
        <View style={[styles.innerWrapper, { backgroundColor: background }]}>
          <UserInfo />
          <EditButton />
          <BoxLinkRow />
          {!is_premium && (
            <PremiumBanner onPress={() => setPremiumModalActive(true)} />
          )}
          <Stats />
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
    paddingVertical: 24,
    paddingHorizontal: 24,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  settingsButton: {
    height: 48,
    width: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  innerWrapper: {
    borderTopRightRadius: 36,
    borderTopLeftRadius: 36,
    paddingHorizontal: 24,
    paddingBottom: 24,
    position: "relative",
    flex: 1,
  },
});
