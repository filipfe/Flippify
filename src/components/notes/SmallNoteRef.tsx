import { Image, StyleSheet, Text, View } from "react-native";
import { Note } from "../../types/notes";
import { useNavigation } from "@react-navigation/native";
import { LikeIcon } from "../../assets/icons/icons";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { NoteRefNavigationProp } from "../../types/navigation";
import RippleButton from "../RippleButton";

export default function SmallNoteRef(props: Note) {
  const { font, secondary, background } = useContext(ThemeContext);
  const { title, thumbnail, like_count, category, user } = props;
  const { navigate } = useNavigation<NoteRefNavigationProp>();
  return (
    <View style={{ ...styles.wrapper, backgroundColor: background }}>
      <RippleButton onPress={() => navigate("Note", { ...props })}>
        <View>
          <View style={styles.image}>
            <Image
              style={styles.image}
              source={{
                uri: thumbnail,
              }}
            />
          </View>

          <View style={styles.infoWrapper}>
            <View style={styles.textWrapper}>
              <Text style={[styles.category, { color: secondary }]}>
                {user.username}
              </Text>
              <Text style={[styles.category, { color: secondary }]}>
                {category.name}
              </Text>
            </View>
            <View style={[styles.textWrapper, { marginTop: 8 }]}>
              <Text style={{ ...styles.title, color: font }}>{title}</Text>
              <View style={styles.likesWrapper}>
                <Text style={{ ...styles.likesCount, color: secondary }}>
                  {like_count || 0}
                </Text>
                <LikeIcon
                  strokeWidth={2}
                  height={12}
                  width={12}
                  stroke={secondary}
                />
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
  },
  image: {
    height: 124,
    borderRadius: 8,
    overflow: "hidden",
    resizeMode: "cover",
  },
  textWrapper: {
    flexDirection: "row",
    alignItems: "flex-start",
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
    lineHeight: 14,
    marginRight: 4,
  },
});
