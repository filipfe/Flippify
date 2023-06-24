import { Dimensions, Modal, Pressable, StyleSheet, View } from "react-native";
import { ImageFile } from "../../types/notes";
import NoteImageIndex from "./NoteImageIndex";
import useNoteImages from "../../hooks/useNoteImages";
import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import { XIcon } from "../../assets/icons/icons";
import { ThemeContext } from "../../context/ThemeContext";
import ImageCarousel from "./ImageCarousel";

const { width } = Dimensions.get("screen");

type Props = {
  images: ImageFile[];
  initialIndex?: number;
  resizeModalActive: boolean;
  setResizeModalActive: Dispatch<SetStateAction<boolean>>;
};

export default function ResizeModal({
  images,
  initialIndex,
  resizeModalActive,
  setResizeModalActive,
}: Props) {
  const { background, light, font } = useContext(ThemeContext);
  const { activeIndex, setActiveIndex } = useNoteImages(initialIndex);

  useEffect(() => {
    setActiveIndex(initialIndex || 0);
  }, [initialIndex]);

  return (
    <Modal
      animationType="fade"
      statusBarTranslucent
      visible={resizeModalActive}
      onRequestClose={() => setResizeModalActive(false)}
    >
      <View style={{ ...styles.wrapper, backgroundColor: background }}>
        <ImageCarousel
          images={images}
          resizeMode="contain"
          itemWidth={width}
          initialIndex={initialIndex}
          setActiveIndex={setActiveIndex}
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
    alignItems: "flex-start",
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
