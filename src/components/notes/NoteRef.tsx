import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { Image, Text, StyleSheet, View } from "react-native";
import { Note } from "../../types/notes";
import { LikeIcon, PremiumIcon } from "../../assets/icons/icons";
import { ThemeContext } from "../../context/ThemeContext";
import { NoteRefNavigationProp } from "../../types/navigation";
import RippleButton from "../RippleButton";

const NoteRef = (props: Note) => {
  const { secondary, background, font } = useContext(ThemeContext);
  const { navigate } = useNavigation<NoteRefNavigationProp>();
  const { title, thumbnail, like_count, category, user } = props;
  return (
    <View style={{ backgroundColor: background, flex: 1 }}>
      <RippleButton borderless onPress={() => navigate("Note", { ...props })}>
        <View>
          <Image
            style={styles.image}
            source={{
              uri: thumbnail,
            }}
          />
          <View style={styles.infoWrapper}>
            <View style={styles.textWrapper}>
              <Text style={[styles.category, { color: secondary }]}>
                {category.name}
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
              <Text style={{ ...styles.title, color: font }}>{title}</Text>
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
};

const styles = StyleSheet.create({
  image: {
    height: 164,
  },
  textWrapper: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  category: {
    fontSize: 12,
    fontFamily: "SemiBold",
  },
  infoWrapper: {
    paddingVertical: 8,
    paddingHorizontal: 12,
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

export default NoteRef;
