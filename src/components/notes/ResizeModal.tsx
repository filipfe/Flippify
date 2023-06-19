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
import { Dispatch, SetStateAction, useContext } from "react";
import { XIcon } from "../../assets/icons/icons";
import { ThemeContext } from "../../context/ThemeContext";

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
  const { background, light, font } = useContext(ThemeContext);
  const { activeIndex, setActiveIndex } = useNoteImages(initialIndex || 0);
  return (
    <Modal
      animationType="fade"
      onRequestClose={() => setResizeModalActive(false)}
    >
      <View style={{ ...styles.wrapper, backgroundColor: background }}>
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
            style={{ ...styles.button, backgroundColor: light }}
            onPress={() => setResizeModalActive(false)}
          ></Pressable>
          <NoteImageIndex images={images} activeIndex={activeIndex} />
          <Pressable
            style={{ ...styles.button, backgroundColor: light }}
            onPress={() => setResizeModalActive(false)}
          >
            <XIcon fill={font} />
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
  },
});
