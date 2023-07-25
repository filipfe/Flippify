import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Note } from "../../types/notes";
import { useState, useEffect, useContext, useRef } from "react";
import Loader from "../Loader";
import { LinearGradient } from "expo-linear-gradient";
import { linearGradient } from "../../const/styles";
import { initialNote } from "../../const/notes";
import { shadowPrimary } from "../../styles/general";
import UserCredentials from "../UserCredentials";
import ImageHandler from "./ImageHandler";
import useNoteImages from "../../hooks/useNoteImages";
import NoteImageIndex from "./NoteImageIndex";
import { ThemeContext } from "../../context/ThemeContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NoteStackParams } from "../../types/navigation";
import { supabase } from "../../hooks/useAuth";
import { AuthContext } from "../../context/AuthContext";

export default function NoteDetails({
  route,
}: NativeStackScreenProps<NoteStackParams, "Note">) {
  const scrollRef = useRef<ScrollView>(null!);
  const { font, secondary, background } = useContext(ThemeContext);
  const auth = useContext(AuthContext);
  const { id } = route.params;
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState<Note>(initialNote);
  const [isLiked, setIsLiked] = useState(false);
  const { title, created_at, user, description } = details;
  const { activeIndex, images, setImages, setActiveIndex } =
    useNoteImages<string>();

  async function like() {
    setIsLiked((prev) => !prev);
    await supabase.from("likes").insert({ user_id: auth.user.id, note_id: id });
  }

  async function disLike() {
    setIsLiked((prev) => !prev);
    await supabase
      .from("likes")
      .delete()
      .eq("note_id", id)
      .eq("user_id", auth.user.id);
  }

  useEffect(() => {
    scrollRef.current && scrollRef.current.scrollTo({ y: 0 });
    async function fetchDetails() {
      try {
        setLoading(true);
        const { data } = await supabase
          .from("notes")
          .select("*, user:profiles(*)")
          .eq("id", id);
        if (!data) return;
        const noteDetails: Note = data[0];
        setDetails(noteDetails);
        setImages(noteDetails.images);
        setIsLiked(noteDetails.is_liked);
      } finally {
        setLoading(false);
      }
    }
    fetchDetails();
  }, [id]);

  return (
    <View style={{ flex: 1, backgroundColor: background }}>
      <ScrollView
        ref={(ref) => ref && (scrollRef.current = ref)}
        contentContainerStyle={{ flex: 1 }}
      >
        <LinearGradient
          colors={linearGradient}
          start={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: background,
              borderTopRightRadius: 36,
              borderTopLeftRadius: 36,
              paddingHorizontal: 24,
            }}
          >
            <View style={{ marginTop: -132, marginBottom: 32 }}>
              <View
                style={{
                  ...styles.imageWrapper,
                  backgroundColor: background,
                }}
              >
                <ImageHandler
                  initialIndex={activeIndex}
                  setActiveIndex={setActiveIndex}
                  images={images.map((image) => ({
                    uri: image,
                    name: image,
                    type: "",
                  }))}
                />
                {images.length > 1 && (
                  <View style={{ bottom: 16, position: "absolute" }}>
                    <NoteImageIndex images={images} activeIndex={activeIndex} />
                  </View>
                )}
              </View>
            </View>
            {loading ? (
              <Loader />
            ) : (
              <View
                style={{
                  paddingBottom: 32,
                  justifyContent: "space-between",
                  flex: 1,
                  height: "100%",
                }}
              >
                <View>
                  <Text style={{ ...styles.date, color: secondary }}>
                    {new Date(created_at).toLocaleDateString("default")}
                  </Text>
                  <Text style={{ ...styles.noteTitle, color: font }}>
                    {title}
                  </Text>
                  <Text style={{ ...styles.noteDesc, color: secondary }}>
                    {description || "Brak opisu dla tej notatki"}
                  </Text>
                </View>
                <View style={{ marginTop: 32 }}>
                  <UserCredentials
                    user={user}
                    isLiked={isLiked}
                    handleLike={isLiked ? disLike : like}
                  />
                </View>
              </View>
            )}
          </View>
        </LinearGradient>
      </ScrollView>
    </View>
  );
}

export const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: "flex-end",
    paddingTop: 232,
    height: "100%",
  },
  loaderWrapper: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  imageWrapper: {
    width: "100%",
    height: 320,
    borderRadius: 24,
    position: "relative",
    overflow: "hidden",
    alignItems: "center",
    ...shadowPrimary,
  },
  noteDescWrapper: {
    flex: 1,
  },
  date: {
    fontFamily: "ExtraBold",
    marginBottom: 4,
  },
  noteTitle: {
    fontFamily: "ExtraBold",
    fontSize: 24,
    marginBottom: 8,
  },
  noteDesc: {
    fontSize: 14,
    lineHeight: 24,
    fontFamily: "Medium",
    marginTop: 8,
  },
});
