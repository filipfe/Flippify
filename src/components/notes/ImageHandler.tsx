import { Dimensions, Image, Pressable, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { ResizeIcon } from "../../assets/icons/icons";
import { ImageFile } from "../../types/notes";
import { THEME } from "../../const/theme";
import { useState } from "react";
import ResizeModal from "./ResizeModal";

const { width } = Dimensions.get("screen");

export default function ImageHandler({ images }: { images: ImageFile[] }) {
  const [resizeModalActive, setResizeModalActive] = useState(false);
  return (
    <>
      <FlatList
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={images}
        renderItem={({ item }) => (
          <Image
            style={{ width: width - 48, height: 320 }}
            source={{ uri: item.uri }}
          />
        )}
      />
      {images.length > 0 && (
        <Pressable
          onPress={() => setResizeModalActive((prev) => !prev)}
          style={styles.resize}
        >
          <ResizeIcon />
        </Pressable>
      )}
      {resizeModalActive && (
        <ResizeModal
          images={images}
          setResizeModalActive={setResizeModalActive}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  resize: {
    height: 48,
    width: 48,
    backgroundColor: THEME.light,
    position: "absolute",
    top: 16,
    right: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
