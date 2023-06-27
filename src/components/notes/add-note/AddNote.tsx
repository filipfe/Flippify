import { ScrollView, Text, View, Modal } from "react-native";
import { useContext, useState, useEffect, useRef } from "react";
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
import { initialAddedNote, initialFilter } from "../../../const/notes";
import ImageHandler from "../ImageHandler";
import useOpus from "../../../hooks/useOpus";
import PrivacySwitch from "./components/PrivacySwitch";
import CategoryPicker from "../../filter/CategoryPicker";
import { ThemeContext } from "../../../context/ThemeContext";
import Success from "../../Success";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { NoteStackParams, RootTabParams } from "../../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NewNoteContext } from "../../../context/OpusContext";
import { initialCategory } from "../../../const/flashcards";
import ImageList from "./components/ImageList";

export default function AddNote({
  route,
}: NativeStackScreenProps<RootTabParams, "AddNote">) {
  const scrollRef = useRef<ScrollView>(null!);
  const { navigate } = useNavigation<NavigationProp<NoteStackParams>>();
  const { user } = useContext(AuthContext);
  const { secondary, background } = useContext(ThemeContext);
  const [hasBeenAdded, setHasBeenAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageListActive, setImageListActive] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const opus = useOpus<AddedNote>(route.params || initialAddedNote);
  const { tokens } = useContext(AuthContext);
  const { access } = tokens;
  const { item, setItem, changeCategory, activeCategory } = opus;

  const setImages = () => {};

  const handleSubmit = async () => {
    if (!activeCategory.id) return;
    setIsLoading(true);
    const form = new FormData();
    form.append("title", item.title);
    form.append("description", item.description);
    form.append("is_public", String(item.is_public));
    form.append("category_id", activeCategory.id.toString());
    // @ts-ignore
    form.append("thumbnail", images[0]);
    item.images.forEach((image) => {
      // @ts-ignore
      form.append("images", image);
    });

    item.id
      ? axios
          .patchForm(`${API_URL}/api/notes/${item.id}`, form)
          .then(() => setHasBeenAdded(true))
          .catch((err) => console.log(err.response.data))
          .finally(() => setIsLoading(false))
      : axios
          .postForm(`${API_URL}/api/notes/add`, form, {
            headers: { Authorization: `Bearer ${access}` },
          })
          .then(() => setHasBeenAdded(true))
          .catch((err) => console.log(err.response.data))
          .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    scrollRef.current && scrollRef.current.scrollTo({ y: 0 });
    if (route.params) {
      setItem(route.params);
      changeCategory(route.params.category);
    } else {
      setItem(initialAddedNote);
      changeCategory(initialCategory);
    }
  }, [route.params]);

  const onModalReject = () => navigate("OwnNotes", initialFilter);

  const onModalSubmit = () => {
    setItem(initialAddedNote);
    setIsLoading(false);
    setHasBeenAdded(false);
  };

  const addImage = (image: ImageFile) => {
    setItem((prev) => ({ ...prev, images: [...prev.images, image] }));
    setImageListActive(true);
  };

  return (
    <NewNoteContext.Provider value={opus}>
      <ScrollView ref={(ref) => ref && (scrollRef.current = ref)}>
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
                <ImageHandler
                  images={item.images}
                  setActiveIndex={setActiveImageIndex}
                />
                {item.images.length < 4 && <AddButton addNewImage={addImage} />}
                {item.images.length > 1 && (
                  <View style={{ position: "absolute", bottom: 8 }}>
                    <NoteImageIndex
                      images={item.images}
                      activeIndex={activeImageIndex}
                    />
                  </View>
                )}
              </View>
            </View>
            <View style={{ paddingBottom: 32 }}>
              <Text style={{ ...styles.date, color: secondary }}>
                {item.created_at
                  ? new Date(item.created_at).toLocaleDateString("default")
                  : new Date().toLocaleDateString()}
              </Text>
              <PrimaryInput
                label="Tytuł notatki"
                maxLength={48}
                value={item.title}
                onChangeText={(title) =>
                  setItem((prev) => ({ ...prev, title }))
                }
              />
              <View style={{ marginTop: 16, position: "relative" }}>
                <PrimaryInput
                  label="Opis notatki"
                  multiline={true}
                  numberOfLines={6}
                  maxLength={200}
                  value={item.description}
                  style={{ minHeight: 160, textAlignVertical: "top" }}
                  onChangeText={(desc) =>
                    setItem((prev) => ({ ...prev, description: desc }))
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
                  {item.description?.length || 0} / 200
                </Text>
              </View>
              <View style={{ marginTop: 32 }}>
                <CategoryPicker
                  active={activeCategory}
                  onChange={changeCategory}
                />
              </View>
              <PrivacySwitch />
              <View style={{ marginVertical: 32 }}>
                <UserCredentials user={user} isLiked={false} />
              </View>
              {isLoading ? (
                <Loader />
              ) : (
                <PrimaryButton
                  active={
                    !!(item.images.length > 0 && item.category.id && item.title)
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
      <Modal
        animationType="fade"
        statusBarTranslucent
        visible={hasBeenAdded}
        onRequestClose={onModalSubmit}
      >
        <Success
          text={
            item.is_public
              ? "Notatka wysłana do weryfikacji"
              : route.params?.id
              ? "Notatka pomyślnie zmodyfikowana"
              : "Notatka została pomyślnie dodana"
          }
          rejectButtonText="Przeglądaj"
          submitButtonText="Dodaj następną"
          onReject={onModalReject}
          onSubmit={onModalSubmit}
        />
      </Modal>
      <Modal
        animationType="fade"
        statusBarTranslucent
        visible={imageListActive}
        onRequestClose={() => setImageListActive(false)}
      >
        <ImageList setImageListActive={setImageListActive} />
      </Modal>
    </NewNoteContext.Provider>
  );
}
