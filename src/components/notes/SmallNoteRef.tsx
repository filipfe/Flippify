import { Image, StyleSheet, Text, View } from "react-native";
import { Note } from "../../types/notes";
import { useNavigation } from "@react-navigation/native";
import { LikeIcon, PremiumIcon } from "../../assets/icons/icons";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { NoteRefNavigationProp } from "../../types/navigation";
import RippleButton from "../RippleButton";

export default function SmallNoteRef(props: Note) {
  const { font, secondary, background, light } = useContext(ThemeContext);
  const { title, thumbnail, like_count, category, user } = props;
  const { navigate } = useNavigation<NoteRefNavigationProp>();
  return (
    <View style={{ ...styles.wrapper, backgroundColor: background }}>
      <RippleButton borderless onPress={() => navigate("Note", { ...props })}>
        <View>
          <View style={[styles.image, { backgroundColor: light }]}>
            {thumbnail && (
              <Image
                style={styles.image}
                source={{
                  uri: thumbnail,
                }}
              />
            )}
          </View>
          <View style={styles.infoWrapper}>
            <View style={styles.textWrapper}>
              <Text style={[styles.category, { color: secondary }]}>
                {category.name || "---"}
              </Text>
              <View style={styles.likesWrapper}>
                <Text style={{ ...styles.likesCount, color: secondary }}>
                  {like_count || 0}
                </Text>
                <View style={{ marginTop: 2 }}>
                  <LikeIcon
                    strokeWidth={2}
                    height={11}
                    width={11}
                    stroke={secondary}
                  />
                </View>
              </View>
            </View>
            <View style={[styles.textWrapper, { marginTop: 6 }]}>
              <Text style={{ ...styles.title, color: font }}>
                {title || "-----"}
              </Text>
            </View>
            <View
              style={[styles.userWrapper, { marginTop: 4, flexWrap: "wrap" }]}
            >
              <Text style={[styles.category, { color: secondary }]}>
                Dodane przez
              </Text>
              <View style={[styles.userWrapper, { marginLeft: 8 }]}>
                {user.is_premium && (
                  <PremiumIcon
                    height={12}
                    width={16}
                    style={{ marginTop: 2, marginRight: 4 }}
                  />
                )}
                <Text style={[styles.category, { color: font }]}>
                  {user.username}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </RippleButton>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: 196,
    borderRadius: 16,
  },
  image: {
    height: 124,
    borderRadius: 8,
    overflow: "hidden",
    resizeMode: "cover",
  },
  textWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  category: {
    fontSize: 12,
    fontFamily: "SemiBold",
  },
  infoWrapper: {
    paddingVertical: 8,
  },
  title: {
    fontFamily: "SemiBold",
    fontSize: 14,
    lineHeight: 18,
    maxWidth: "95%",
  },
  likesWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  likesCount: {
    fontFamily: "SemiBold",
    fontSize: 12,
    marginRight: 4,
  },
  userWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
});
