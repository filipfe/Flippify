import { BinIcon, CheckmarkIcon } from "../../../../assets/icons/icons";
import { ThemeContext } from "../../../../context/ThemeContext";
import useShadow from "../../../../hooks/useShadow";
import { ImageFile, ImageRefProps } from "../../../../types/notes";
import { View, Image, StyleSheet, Pressable } from "react-native";
import { useContext } from "react";
import AddButton from "./AddButton";
import { NewNoteContext } from "../../../../context/OpusContext";

export default function ImageRef({
  uri,
  chosen,
  setChosen,
}: ImageFile & ImageRefProps) {
  const { item, setItem } = useContext(NewNoteContext);
  const { primary, background } = useContext(ThemeContext);
  const shadow = useShadow(16);
  const isChosen = chosen === uri;
  return uri ? (
    <Pressable
      onPress={() => setChosen(uri)}
      style={[
        styles.wrapper,
        shadow,
        {
          backgroundColor: background,
          borderWidth: isChosen ? 2 : 0,
          borderColor: isChosen ? primary : undefined,
        },
      ]}
    >
      <Image style={styles.image} source={{ uri }} />
      {isChosen && (
        <Pressable
          onPress={() =>
            setItem((prev) => ({
              ...prev,
              images: prev.images.filter((item) => item.uri !== uri),
            }))
          }
          style={[styles.deleteButton, { backgroundColor: primary }]}
        >
          <CheckmarkIcon fill={"#FFF"} width={16} />
        </Pressable>
      )}
    </Pressable>
  ) : item.images.length < 4 ? (
    <View
      style={[
        styles.wrapper,
        styles.addWrapper,
        shadow,
        { backgroundColor: background },
      ]}
    >
      <AddButton
        size={40}
        addNewImage={(image) => {
          setItem((prev) => ({ ...prev, images: [...prev.images, image] }));
        }}
      />
    </View>
  ) : (
    <></>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 144,
    borderRadius: 16,
    overflow: "hidden",
  },
  addWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  deleteButton: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 36,
    height: 36,
    borderBottomLeftRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
});
