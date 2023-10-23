import { ScrollView, Modal, Text, View, StyleSheet } from "react-native";
import { ProfileStackParams, RootTabParams } from "../types/navigation";
import { useContext, useState, useCallback } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";
import PremiumPurchase from "./profile/PremiumPurchase";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import Layout from "../components/ui/layout/Layout";
import Loader from "../components/ui/Loader";
import { supabase } from "../hooks/useAuth";
import PremiumBanner from "../components/profile/PremiumBanner";

async function fetchProfile() {
  const { data } = await supabase.from("profiles").select("*").single();
  return data;
}

export default function ProfileScreen({
  navigation,
}: NativeStackScreenProps<ProfileStackParams, "ProfileScreen">) {
  const { user } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(user);
  const [isLoading, setIsLoading] = useState(true);
  const [premiumModalActive, setPremiumModalActive] = useState(false);
  const { is_premium } = user;
  const { background, light, font } = useContext(ThemeContext);
  const { navigate } =
    useNavigation<NavigationProp<RootTabParams, "Profile">>();

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      setIsLoading(true);
      async function fetchInitial() {
        const data = await fetchProfile();
        isActive && setProfileData((prev) => ({ ...prev, ...data }));
        setIsLoading(false);
      }
      fetchInitial();
      return () => {
        isActive = false;
      };
    }, [])
  );

  return (
    <Layout>
      <ScrollView>
        <View style={styles.wrapper}>
          <Text style={[styles.username, { color: font }]}>
            {profileData.username}
          </Text>
          {/* {isLoading ? (
            <Loader />
          ) : (
            <View style={styles.wrapper}>
              {!is_premium && (
                <PremiumBanner onPress={() => setPremiumModalActive(true)} />
              )}
            </View>
          )} */}
        </View>
        <Modal
          animationType="fade"
          visible={premiumModalActive}
          statusBarTranslucent
          onRequestClose={() => setPremiumModalActive(false)}
        >
          <PremiumPurchase onClose={() => setPremiumModalActive(false)} />
        </Modal>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  username: {
    fontFamily: "SemiBold",
    fontSize: 16,
    textAlign: "center",
  },
  wrapper: { gap: 16, alignItems: "center", width: "100%" },
});
