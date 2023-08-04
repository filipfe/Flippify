import { useContext } from "react";
import { DefaultProfileIcon, EditIcon } from "../../assets/icons/icons";
import { Notification } from "../../types/general";
import { StyleSheet, View, Image, Text, Pressable } from "react-native";
import { ThemeContext } from "../../context/ThemeContext";
import { FlashCardsIcon } from "../../assets/general";
import { LinearGradient } from "expo-linear-gradient";
import { linearGradient } from "../../const/styles";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootTabParams } from "../../types/navigation";
import { supabase } from "../../hooks/useAuth";

export default function NotificationRef({
  id,
  type,
  source,
  was_seen,
  initiator,
  note,
}: Notification) {
  const { navigate } =
    useNavigation<NavigationProp<RootTabParams, "Profile">>();
  const { light, font, secondary } = useContext(ThemeContext);

  async function handleView() {
    const { error } = await supabase
      .from("notifications")
      .update({ was_seen: true })
      .eq("id", id);
    console.log(error);
    if (source === "notes" && note)
      navigate("Notes", {
        screen: "Note",
        params: { id: note.id, title: note.title },
      });
  }

  return (
    <Pressable
      onPress={handleView}
      style={[styles.wrapper, { opacity: was_seen ? 0.6 : 1 }]}
    >
      {type === "like" ? (
        <View style={styles.userPicture}>
          {initiator.avatar_url ? (
            <Image
              style={{ width: 52, height: 52 }}
              source={{ uri: initiator.avatar_url }}
            />
          ) : (
            <DefaultProfileIcon width={52} height={52} />
          )}
        </View>
      ) : (
        <View style={[styles.noteIcon, { backgroundColor: light }]}>
          {source === "notes" ? (
            <EditIcon fill={font} />
          ) : (
            <FlashCardsIcon fill={font} />
          )}
        </View>
      )}
      {type === "like" ? (
        <Text style={[styles.description, { color: secondary }]}>
          Użytkownik{" "}
          <Text style={{ color: font, fontFamily: "Bold" }}>
            {initiator.username}
          </Text>{" "}
          polubił twoją notatkę pt.{" "}
          <Text style={{ color: font, fontFamily: "Bold" }}>
            “{note?.title}”
          </Text>
        </Text>
      ) : (
        <Text style={[styles.description, { color: secondary }]}>
          Twoja notatka{" "}
          <Text style={{ color: font, fontFamily: "Bold" }}>
            “{note?.title}”
          </Text>{" "}
          została wyróżniona jako popularna. Gratulacje!{" "}
        </Text>
      )}
      {!was_seen && (
        <LinearGradient
          colors={linearGradient}
          start={{ x: 0, y: 0 }}
          style={styles.dot}
        />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
  },
  userPicture: {
    height: 52,
    width: 52,
    borderRadius: 52,
    borderWidth: 3,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  noteIcon: {
    height: 52,
    width: 52,
    borderRadius: 52,
    justifyContent: "center",
    alignItems: "center",
  },
  description: {
    fontFamily: "SemiBold",
    fontSize: 12,
    paddingHorizontal: 16,
    maxWidth: "100%",
    flex: 1,
    lineHeight: 20,
  },
  dot: {
    marginTop: 8,
    borderRadius: 10,
    width: 10,
    height: 10,
  },
});
