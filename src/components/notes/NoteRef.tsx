import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { Image, Pressable, Text, StyleSheet, View } from "react-native";
import { Note, NoteRefNavigationProp } from "../../types/notes";
import { LikeIcon } from "../../assets/icons/icons";
import { ThemeContext } from "../../context/ThemeContext";

const NoteRef = (props: Note) => {
  const { secondary, background, font } = useContext(ThemeContext);
  const { navigate } = useNavigation<NoteRefNavigationProp>();
  const { title, image, like_count } = props;
  return (
    <Pressable
      style={styles.wrapper}
      onPress={() => navigate("Note", { ...props })}
    >
      <Image
        style={styles.image}
        source={{
          uri: image,
        }}
      />
      <View style={{ ...styles.textWrapper, backgroundColor: background }}>
        <Text style={{ ...styles.title, color: font }}>{title}</Text>
        <View style={styles.likesWrapper}>
          <Text style={{ ...styles.likesCount, color: secondary }}>
            {like_count || 0}
          </Text>
          <LikeIcon strokeWidth={2} height={16} width={16} stroke={secondary} />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    elevation: 16,
    shadowColor: "#3C85C2",
    backgroundColor: "#FFFFFF",
    marginBottom: 24,
  },
  image: {
    height: 164,
  },
  textWrapper: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "SemiBold",
    fontSize: 18,
    lineHeight: 18,
  },
  likesWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  likesCount: {
    fontFamily: "SemiBold",
    fontSize: 14,
    lineHeight: 14,
    marginRight: 4,
  },
});

export default NoteRef;
