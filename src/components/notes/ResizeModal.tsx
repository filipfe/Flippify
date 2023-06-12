import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { ImageFile } from "../../types/notes";
import { FlatList } from "react-native-gesture-handler";
import NoteImageIndex from "./NoteImageIndex";
import useNoteImages from "../../hooks/useNoteImages";
import { shadowPrimary } from "../../styles/general";
import { Dispatch, SetStateAction } from "react";
import { XIcon } from "../../assets/icons/icons";

const { width, height } = Dimensions.get("screen");

type Props = {
  images: ImageFile[];
  initialIndex?: number;
  setResizeModalActive: Dispatch<SetStateAction<boolean>>;
};

export default function ResizeModal({
  images,
  initialIndex,
  setResizeModalActive,
}: Props) {
  const { activeIndex, setActiveIndex } = useNoteImages(initialIndex || 0);
  return (
    <Modal animationType="fade">
      <View style={styles.wrapper}>
        <FlatList
          data={images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <Image
                style={{ width, resizeMode: "contain" }}
                source={{ uri: item.uri }}
              />
            );
          }}
        />
        <View style={styles.menu}>
          <Pressable
            style={styles.button}
            onPress={() => setResizeModalActive(false)}
          ></Pressable>
          <NoteImageIndex images={images} activeIndex={activeIndex} />
          <Pressable
            style={styles.button}
            onPress={() => setResizeModalActive(false)}
          >
            <XIcon />
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    position: "relative",
  },
  menu: {
    position: "absolute",
    bottom: 36,
    paddingHorizontal: 48,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: "100%",
  },
  button: {
    height: 48,
    width: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    ...shadowPrimary,
  },
});
