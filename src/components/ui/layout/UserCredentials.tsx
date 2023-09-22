import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import { shadowPrimary } from "../../../styles/general";
import { User } from "../../../types/auth";
import {
  DefaultProfileIcon,
  GradientLikeIcon,
  LikeIcon,
} from "../../../assets/icons/icons";
import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import GradientText from "../GradientText";

type Props = {
  user: User;
  isLiked?: boolean;
  handleLike?: () => void;
  likesCount?: number;
};

export default function UserCredentials({
  user,
  isLiked,
  likesCount,
  handleLike,
}: Props) {
  const { avatar_url, username } = user;
  const { primary, secondary, font, light } = useContext(ThemeContext);
  return (
    <View style={styles.bottomWrapper}>
      <View style={styles.userWrapper}>
        <View style={styles.userPicture}>
          {avatar_url ? (
            <Image
              style={{ width: 52, height: 52 }}
              source={{ uri: avatar_url }}
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
      {typeof likesCount === "number" && (
        <View style={styles.likesWrapper}>
          <GradientLikeIcon height={16} width={16} />
          <GradientText style={styles.likesCount}>{likesCount}</GradientText>
        </View>
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
  likesWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  likesCount: {
    fontFamily: "SemiBold",
    marginLeft: 8,
    fontSize: 16,
    lineHeight: 20,
  },
});
