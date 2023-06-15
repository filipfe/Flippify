import { ScrollView, Text, View } from "react-native";
import { useContext, useState } from "react";
import axios from "axios";
import { API_URL } from "@env";
import { AuthContext } from "../../../context/AuthContext";
import { AddedNote, ImageFile } from "../../../types/notes";
import UserCredentials from "../../UserCredentials";
import { styles } from "../NoteDetails";
import { LinearGradient } from "expo-linear-gradient";
import { linearGradient } from "../../../const/styles";
import AddButton from "./components/AddButton";
import PrimaryInput from "../../PrimaryInput";
import PrimaryButton from "../../PrimaryButton";
import useNoteImages from "../../../hooks/useNoteImages";
import Loader from "../../Loader";
import NoteImageIndex from "../NoteImageIndex";
import { initialAddedNote } from "../../../const/notes";
import ImageHandler from "../ImageHandler";
import { NewNoteContext } from "../../../context/OpusContext";
import useOpus from "../../../hooks/useOpus";
import PrivacySwitch from "./components/PrivacySwitch";
import CategoryPicker from "./components/CategoryPicker";
import { ThemeContext } from "../../../context/ThemeContext";

export default function AddNote() {
  const { user } = useContext(AuthContext);
  const { secondary, background } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(false);
  const { images, setImages, activeIndex } = useNoteImages<ImageFile>();
  const opus = useOpus<AddedNote>(initialAddedNote);
  const { item, setItem, changeCategory, activeCategory } = opus;
  const newNote = item;
  const setNewNote = setItem;

  const handleSubmit = async () => {
    if (!activeCategory.id) return;
    setIsLoading(true);
    const form = new FormData();
    form.append("title", newNote.title);
    form.append("description", newNote.desc);
    form.append("is_public", String(newNote.is_public));
    form.append("category_id", activeCategory.id.toString());
    images.forEach((image) => {
      // @ts-ignore
      form.append("image", {
        uri: image.uri,
        name: image.name,
        type: image.type,
      });
    });

    axios
      .postForm(`${API_URL}/api/notes/add`, form)
      .catch((err) => console.log(err.response.data))
      .finally(() => setIsLoading(false));
  };

  const addNewImage = (image: ImageFile) => {
    setImages((prev) => [...prev, image]);
  };

  return (
    <NewNoteContext.Provider value={opus}>
      <ScrollView>
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
                style={{ ...styles.imageWrapper, backgroundColor: background }}
              >
                <ImageHandler images={images} />
                {images.length < 4 && <AddButton addNewImage={addNewImage} />}
                {images.length > 1 && (
                  <View style={{ position: "absolute", bottom: 8 }}>
                    <NoteImageIndex images={images} activeIndex={activeIndex} />
                  </View>
                )}
              </View>
            </View>
            <View style={{ paddingBottom: 32 }}>
              <Text style={{ ...styles.date, color: secondary }}>
                {new Date().toLocaleDateString("default")}
              </Text>
              <PrimaryInput
                label="Tytuł notatki"
                maxLength={48}
                onChangeText={(title) =>
                  setNewNote((prev) => ({ ...prev, title }))
                }
              />
              <View style={{ marginTop: 16, position: "relative" }}>
                <PrimaryInput
                  label="Opis notatki"
                  multiline={true}
                  numberOfLines={6}
                  maxLength={200}
                  style={{ minHeight: 160, textAlignVertical: "top" }}
                  onChangeText={(desc) =>
                    setNewNote((prev) => ({ ...prev, desc }))
                  }
                />
                <Text
                  style={{
                    fontSize: 10,
                    color: secondary,
                    fontFamily: "SemiBold",
                    position: "absolute",
                    right: 24,
                    bottom: 12,
                  }}
                >
                  {newNote.desc?.length || 0} / 200
                </Text>
              </View>
              <CategoryPicker
                active={activeCategory}
                onChange={changeCategory}
              />
              <PrivacySwitch />
              <View style={{ marginVertical: 32 }}>
                <UserCredentials user={user} isLiked={false} />
              </View>
              {isLoading ? (
                <Loader />
              ) : (
                <PrimaryButton
                  active={
                    !!(
                      images.length > 0 &&
                      newNote.desc &&
                      newNote.category.id &&
                      newNote.title
                    )
                  }
                  width={"100%"}
                  onPress={handleSubmit}
                  text="Dodaj notatkę"
                />
              )}
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
    </NewNoteContext.Provider>
  );
}
