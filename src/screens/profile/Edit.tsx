import { View, StyleSheet, Image, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { linearGradient } from "../../const/styles";
import { DefaultProfileIcon, EditIcon } from "../../assets/icons/icons";
import { profileStyles } from "../../components/profile/UserInfo";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import PrimaryInput from "../../components/ui/PrimaryInput";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Edit() {
  const { font, background, ripple, light } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const { avatar_url, username } = user;

  return (
    <LinearGradient
      colors={linearGradient}
      start={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <SafeAreaView style={[styles.wrapper, { backgroundColor: background }]}>
        <View style={profileStyles.wrapper}>
          <View style={profileStyles.pictureWrapper}>
            {avatar_url ? (
              <Image
                style={profileStyles.picture}
                source={{ uri: avatar_url }}
              />
            ) : (
              <DefaultProfileIcon
                width={112}
                height={112}
                style={profileStyles.picture}
              />
            )}
            <Pressable
              style={[styles.button, { backgroundColor: light }]}
              android_ripple={{ color: ripple, radius: 24, borderless: true }}
            >
              <EditIcon fill={font} />
            </Pressable>
          </View>
          <PrimaryInput defaultValue={username} />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    paddingTop: 128,
  },
  wrapper: {
    flex: 1,
    borderTopRightRadius: 36,
    borderTopLeftRadius: 36,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  button: {
    position: "absolute",
    height: 48,
    width: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
});
