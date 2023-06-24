import { FlatList } from "react-native-gesture-handler";
import { ImageFile } from "../../types/notes";
import { Dispatch, SetStateAction, useRef } from "react";
import { ViewToken, Image } from "react-native";

type Props = {
  images: ImageFile[];
  resizeMode?: "contain" | "cover";
  itemWidth?: number | string;
  initialIndex?: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
};

export default function ImageCarousel({
  images,
  itemWidth = "100%",
  resizeMode = "cover",
  initialIndex,
  setActiveIndex,
}: Props) {
  const viewabilityConfig = {
    waitForInteraction: true,
    viewAreaCoveragePercentThreshold: 50,
  };
  const onViewableItemsChanged = (props: {
    viewableItems: ViewToken[];
    changed: ViewToken[];
  }) =>
    props.viewableItems[0] && setActiveIndex(props.viewableItems[0].index || 0);
  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged },
  ]);
  return (
    <FlatList
      data={images}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      scrollEnabled
      initialScrollIndex={initialIndex}
      viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      renderItem={({ item }) => (
        <Image
          style={{ width: itemWidth, resizeMode }}
          source={{ uri: item.uri }}
        />
      )}
    />
  );
}
