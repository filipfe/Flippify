import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import OwnFlashCards from "../components/profile/OwnFlashCards";
import axios from "axios";
import { API_URL } from "@env";
import FlashLists from "../components/profile/FlashLists";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Greeting from "../components/profile/Greeting";
import { LinearGradient } from "expo-linear-gradient";
import { linearGradient } from "../const/styles";
import { ProfileStackParams } from "../types/navigation";
import ProfileBoxLink from "../components/profile/ProfileBoxLink";

const ProfileStack = createNativeStackNavigator<ProfileStackParams>();

export default function ProfileScreen() {
  return (
    <ProfileStack.Navigator
      initialRouteName="ProfileStack"
      screenOptions={{
        headerTitleStyle: { fontFamily: "Bold" },
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
  const { tokens, logout } = useContext(AuthContext);
  const { refresh } = tokens;

  const handleLogout = async () => {
    const response = await axios.post(`${API_URL}/api/logout`, refresh);
    if (response.status === 200) logout();
  };

  return (
    <LinearGradient
      colors={linearGradient}
      start={{ x: 0, y: 0 }}
      style={{ flex: 1 }}
    >
      <Greeting />
      <View
        style={{
          flex: 1,
          backgroundColor: "#FFF",
          borderTopRightRadius: 36,
          borderTopLeftRadius: 36,
          paddingHorizontal: 32,
        }}
      >
        <View style={{ marginTop: -64 }}>
          <ProfileBoxLink
            to={"OwnFlashCards"}
            title="Dodane fiszki"
            subtitle="12"
            icon="📖"
          />
          <ProfileBoxLink
            to={"FlashLists"}
            title="Moje fiszkolisty"
            subtitle="4"
            icon="📃"
            rangeValue={89}
          />
        </View>
      </View>
    </LinearGradient>
  );
};
