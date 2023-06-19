import { ScrollView, Text, View } from "react-native";
import { useContext, useState } from "react";
import axios from "axios";
import { API_URL } from "@env";
import { AuthContext } from "../../context/AuthContext";
import { AddedNote, ImageFile } from "../../types/notes";
import UserCredentials from "../UserCredentials";
import { styles } from "./NoteDetails";
import { LinearGradient } from "expo-linear-gradient";
import { linearGradient } from "../../const/styles";
import AddButton from "./add/AddButton";
import PrimaryInput from "../PrimaryInput";
import PrimaryButton from "../PrimaryButton";
import useNoteImages from "../../hooks/useNoteImages";
import Loader from "../Loader";
import NoteImageIndex from "./NoteImageIndex";
import { THEME } from "../../const/theme";
import { initialAddedNote } from "../../const/notes";
import ImageHandler from "./ImageHandler";
import PrivacySwitch from "./add/PrivacySwitch";

export default function AddNote() {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const { images, setImages, activeIndex } = useNoteImages<ImageFile>();
  const [newNote, setNewNote] = useState<AddedNote>(initialAddedNote);

  const handleSubmit = async () => {
    setIsLoading(true);
    const form = new FormData();
    form.append("title", newNote.title);
    form.append("description", newNote.desc);
    // @ts-ignore
    images.forEach((image, index) => {
      form.append(`image`, {
        uri: image.uri,
        name: image.name,
        type: image.type,
      });
    });
    form.append("category_id", "1");
    
    axios
      .postForm(`${API_URL}/api/notes/add`, form)
      .catch((err) => console.log(err.response.data))
      .finally(() => setIsLoading(false));
  };

  const addNewImage = (image: ImageFile) => {
    setImages((prev) => [...prev, image]);
  };

  return (
    <ScrollView>
      <LinearGradient
        colors={linearGradient}
        start={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#FFF",
            borderTopRightRadius: 36,
            borderTopLeftRadius: 36,
            paddingHorizontal: 24,
          }}
        >
          <View style={{ marginTop: -132, marginBottom: 32 }}>
            <View style={styles.imageWrapper}>
              <ImageHandler images={images} />
              {images.length < 4 && <AddButton addNewImage={addNewImage} />}
              {images.length > 1 && (
                <NoteImageIndex images={images} activeIndex={activeIndex} />
              )}
            </View>
          </View>
          <View style={{ paddingBottom: 32 }}>
            <Text style={styles.date}>
              {new Date().toLocaleDateString("default")}
            </Text>
            <PrimaryInput
              field="title"
              label="Tytuł notatki"
              maxLength={48}
              setState={setNewNote}
            />
            <View style={{ marginTop: 16, position: "relative" }}>
              <PrimaryInput
                field="desc"
                label="Opis notatki"
                multiline={true}
                numberOfLines={6}
                maxLength={200}
                style={{ minHeight: 160, textAlignVertical: "top" }}
                setState={setNewNote}
              />
              <Text
                style={{
                  fontSize: 10,
                  color: THEME.secondary,
                  fontFamily: "SemiBold",
                  position: "absolute",
                  right: 24,
                  bottom: 12,
                }}
              >
                {newNote.desc?.length || 0} / 200
              </Text>
            </View>
            <PrivacySwitch />
            <View style={{ marginVertical: 32 }}>
              <UserCredentials user={user} isLiked={false} />
            </View>
            {isLoading ? (
              <Loader />
            ) : (
              <PrimaryButton
                width={"100%"}
                onPress={handleSubmit}
                text="Dodaj notatkę"
              />
            )}
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );
}
