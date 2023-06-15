import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import OwnFlashCards from "../components/profile/OwnFlashCards";
import FlashLists from "../components/profile/FlashLists";
import { LinearGradient } from "expo-linear-gradient";
import { linearGradient } from "../const/styles";
import { ProfileStackParams } from "../types/navigation";
import UserInfo from "../components/profile/UserInfo";
import { LogoIcon, NotificationsIcon } from "../assets/icons/icons";
import PremiumBanner from "../components/profile/PremiumBanner";
import LogoutButton from "../components/profile/LogoutButton";
import Stats from "../components/profile/Stats";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import Header from "../components/Header";

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
        name="OwnFlashCards"
        component={OwnFlashCards}
        options={{
          title: "Dodane fiszki",
        }}
      />
      <ProfileStack.Screen
        name="FlashLists"
        component={FlashLists}
        options={{
          title: "FiszkoListy",
          headerShown: false,
        }}
      />
    </ProfileStack.Navigator>
  );
}

const Profile = () => {
  const { background, light, font } = useContext(ThemeContext);
  return (
    <ScrollView>
      <LinearGradient
        colors={linearGradient}
        start={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
      >
        <View style={styles.settingsWrapper}>
          <LogoIcon />
          <Pressable
            style={{
              height: 48,
              width: 48,
              borderRadius: 12,
              backgroundColor: light,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <NotificationsIcon stroke={font} width={20} height={20} />
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
          <PremiumBanner />
          <LogoutButton />
        </View>
      </LinearGradient>
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
