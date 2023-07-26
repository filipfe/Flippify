import { Image, StyleSheet, Text, View } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { DefaultProfileIcon } from "../../assets/icons/icons";
import { shadowPrimary } from "../../styles/general";
import { ThemeContext } from "../../context/ThemeContext";

export default function UserInfo() {
  const { font } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const { username, avatar_url } = user;
  return (
    <View style={profileStyles.wrapper}>
      <View style={profileStyles.pictureWrapper}>
        {avatar_url ? (
          <Image style={profileStyles.picture} source={{ uri: avatar_url }} />
        ) : (
          <DefaultProfileIcon
            width={112}
            height={112}
            style={profileStyles.picture}
          />
        )}
      </View>
      <Text style={{ ...profileStyles.username, color: font }}>{username}</Text>
    </View>
  );
}

export const profileStyles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    marginTop: -36,
  },
  pictureWrapper: {
    height: 104,
    width: 104,
    borderRadius: 112,
    borderColor: "#FFFFFF",
    borderWidth: 4,
    position: "relative",
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
    fontSize: 22,
  },
});
