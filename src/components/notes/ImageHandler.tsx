import { Dimensions, View, StyleSheet } from "react-native";
import { ResizeIcon } from "../../assets/icons/icons";
import { ImageHandlerProps } from "../../types/notes";
import { useContext, useState } from "react";
import ResizeModal from "./ResizeModal";
import { ThemeContext } from "../../context/ThemeContext";
import ImageCarousel from "./ImageCarousel";
import RippleButton from "../RippleButton";

const { width } = Dimensions.get("screen");

export default function ImageHandler({
  initialIndex,
  setActiveIndex,
  images,
}: ImageHandlerProps) {
  const { light, font } = useContext(ThemeContext);
  const [resizeModalActive, setResizeModalActive] = useState(false);
  return (
    <>
      <ImageCarousel
        images={images}
        itemWidth={width - 48}
        setActiveIndex={setActiveIndex}
      />
      {images.length > 0 && (
        <View style={[styles.resize, { backgroundColor: light }]}>
          <RippleButton
            borderless
            onPress={() => setResizeModalActive((prev) => !prev)}
          >
            <ResizeIcon fill={font} />
          </RippleButton>
        </View>
      )}
      <ResizeModal
        images={images}
        initialIndex={initialIndex || 0}
        resizeModalActive={resizeModalActive}
        setResizeModalActive={setResizeModalActive}
      />
    </>
  );
}

const styles = StyleSheet.create({
  resize: {
    height: 48,
    width: 48,
    position: "absolute",
    top: 16,
    right: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
