import { Image, StyleSheet, Text, View } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { DefaultProfileIcon } from "../../assets/icons/icons";
import { shadowPrimary } from "../../styles/general";
import { ThemeContext } from "../../context/ThemeContext";

export default function UserInfo() {
  const { font } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const { username, profile_picture } = user;
  return (
    <View style={styles.wrapper}>
      <View style={styles.pictureWrapper}>
        {profile_picture ? (
          <Image style={styles.picture} source={{ uri: profile_picture }} />
        ) : (
          <DefaultProfileIcon width={96} height={96} style={styles.picture} />
        )}
      </View>
      <Text style={{ ...styles.username, color: font }}>{username}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: -48,
  },
  pictureWrapper: {
    height: 96,
    width: 96,
    borderRadius: 96,
    borderColor: "#FFFFFF",
    borderWidth: 4,
    overflow: "hidden",
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    ...shadowPrimary,
  },
  picture: {
    width: 96,
    height: 96,
  },
  username: {
    fontFamily: "Bold",
    fontSize: 24,
  },
});
