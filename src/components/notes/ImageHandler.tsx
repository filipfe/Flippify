import { Dimensions, Image, Pressable, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { ResizeIcon } from "../../assets/icons/icons";
import { ImageFile } from "../../types/notes";
import { THEME } from "../../const/theme";

const { width } = Dimensions.get("screen");

export default function ImageHandler({ images }: { images: ImageFile[] }) {
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
      <Pressable style={styles.resize}>
        <ResizeIcon />
      </Pressable>
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
