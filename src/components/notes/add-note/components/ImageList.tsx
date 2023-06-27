import { LinearGradient } from "expo-linear-gradient";
import { View, StyleSheet, Dimensions, Text, Pressable } from "react-native";
import { linearGradient } from "../../../../const/styles";
import { ThemeContext } from "../../../../context/ThemeContext";
import { useContext, useState, useEffect } from "react";
import { NewNoteContext } from "../../../../context/OpusContext";
import { FlatList } from "react-native-gesture-handler";
import ImageRef from "./ImageRef";
import { initialImageFile } from "../../../../const/notes";
import PrimaryButton from "../../../PrimaryButton";
import { ImageListProps } from "../../../../types/notes";
import { SafeAreaView } from "react-native-safe-area-context";
import { headerStyles } from "../../../header/Header";
import { BackIcon } from "../../../../assets/icons/icons";
import SmallNoteRef from "../../SmallNoteRef";
import { AuthContext } from "../../../../context/AuthContext";
import SecondaryButton from "../../../SecondaryButton";

const { width } = Dimensions.get("screen");

export default function ImageList({ setImageListActive }: ImageListProps) {
  const [chosen, setChosen] = useState("");
  const { user } = useContext(AuthContext);
  const { background } = useContext(ThemeContext);
  const { item, setItem } = useContext(NewNoteContext);
  const { images } = item;

  const save = () => {
    setAsThumbnail();
    setImageListActive(false);
  };

  const setAsThumbnail = () => {
    const thumbnail = images.find((item) => item.uri === chosen);
    thumbnail &&
      setItem((prev) => ({
        ...prev,
        thumbnail: thumbnail.uri,
        images: [
          thumbnail,
          ...prev.images.filter((item) => item.uri !== chosen),
        ],
      }));
  };

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={linearGradient}
        start={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <SafeAreaView style={[headerStyles.wrapper, { marginBottom: 88 }]}>
          <View style={headerStyles.titleWrapper}>
            <Pressable
              style={headerStyles.back}
              onPress={() => setImageListActive(false)}
            >
              <BackIcon height={16} width={16} fill="#FFF" />
            </Pressable>
            <Text style={[headerStyles.title, { color: "#FFF" }]}>
              Podgląd notatki
            </Text>
          </View>
        </SafeAreaView>
        <View
          style={{
            flex: 1,
            backgroundColor: background,
            borderTopRightRadius: 36,
            borderTopLeftRadius: 36,
            paddingBottom: 24,
          }}
        >
          <View
            style={{ marginTop: -64, justifyContent: "space-between", flex: 1 }}
          >
            <View>
              <FlatList
                numColumns={2}
                data={[...images, initialImageFile]}
                contentContainerStyle={{
                  paddingHorizontal: 24,
                  paddingBottom: 48,
                }}
                ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
                renderItem={({ item, index }) => (
                  <View
                    style={{
                      width: width / 2 - 36,
                      marginLeft: index % 2 === 0 ? 0 : 12,
                      marginRight: index % 2 === 0 ? 12 : 0,
                    }}
                  >
                    <ImageRef {...item} chosen={chosen} setChosen={setChosen} />
                  </View>
                )}
                keyExtractor={(item) => item.uri}
              />
              <View style={{ alignSelf: "center" }}>
                <SmallNoteRef
                  {...item}
                  user={user}
                  thumbnail={chosen || ""}
                  images={item.images.map((item) => item.uri)}
                />
              </View>
            </View>
            <View style={{ paddingHorizontal: 24, flexDirection: "row" }}>
              <SecondaryButton
                style={{ flex: 1, marginRight: 8 }}
                paddingHorizontal={0}
                text="Usuń"
              />
              <PrimaryButton
                style={{ flex: 1, marginLeft: 8 }}
                paddingHorizontal={0}
                onPress={save}
                width={"100%"}
                text="Gotowe"
              />
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    height: "100%",
  },
});
