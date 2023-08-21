import Header from "../../components/header/Header";
import ProfileScreen from "../../screens/ProfileScreen";
import NotificationsScreen from "../../screens/profile/NotificationsScreen";
import SettingsScreen from "../../screens/profile/SettingsScreen";
import { ProfileStackParams } from "../../types/navigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const ProfileStackNav = createNativeStackNavigator<ProfileStackParams>();

export default function ProfileStack() {
  return (
    <ProfileStackNav.Navigator
      initialRouteName="ProfileScreen"
      screenOptions={{
        header: (props) => <Header {...props} />,
      }}
    >
      <ProfileStackNav.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: "Profil",
          headerShown: false,
        }}
      />
      <ProfileStackNav.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: "Ustawienia",
        }}
      />
      <ProfileStackNav.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{ title: "Powiadomienia" }}
      />
    </ProfileStackNav.Navigator>
  );
}
