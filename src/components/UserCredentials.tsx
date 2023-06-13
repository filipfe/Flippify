import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import { shadowPrimary } from "../styles/general";
import { User } from "../types/auth";
import { DefaultProfileIcon, LikeIcon } from "../assets/icons/icons";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

type Props = {
  user: User;
  isLiked?: boolean;
  handleLike?: () => void;
};

export default function UserCredentials({ user, isLiked, handleLike }: Props) {
  const { profile_picture, username } = user;
  const { primary, secondary, font, light } = useContext(ThemeContext);
  return (
    <View style={styles.bottomWrapper}>
      <View style={styles.userWrapper}>
        <View style={styles.userPicture}>
          {profile_picture ? (
            <Image
              style={{ width: 52, height: 52 }}
              source={{ uri: profile_picture }}
            />
          ) : (
            <DefaultProfileIcon width={52} height={52} />
          )}
        </View>
        <View style={{ marginLeft: 16 }}>
          <Text style={{ ...styles.addedBy, color: secondary }}>
            Dodane przez
          </Text>
          <Text style={{ ...styles.username, color: font }}>{username}</Text>
        </View>
      </View>
      {handleLike && (
        <Pressable
          onPress={handleLike}
          style={{ ...styles.likeButton, backgroundColor: light }}
        >
          <LikeIcon
            stroke={isLiked ? primary : font}
            strokeWidth={2}
            fill={isLiked ? primary : "none"}
          />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  bottomWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userWrapper: {
    alignItems: "center",
    flexDirection: "row",
  },
  userPicture: {
    height: 52,
    width: 52,
    borderRadius: 52,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    ...shadowPrimary,
  },
  likeButton: {
    height: 56,
    width: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  addedBy: {
    fontFamily: "SemiBold",
    fontSize: 12,
    lineHeight: 20,
  },
  username: {
    fontFamily: "Bold",
    lineHeight: 24,
  },
});
