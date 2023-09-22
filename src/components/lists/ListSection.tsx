import { Fragment, useContext, useRef, useState } from "react";
import { Text, StyleSheet, ViewToken, ViewabilityConfig } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { FlashList } from "../../types/flashcards";
import { ThemeContext } from "../../context/ThemeContext";
import FlashListRef from "./FlashListRef";

type Props = {
  title: string;
  lists: FlashList[];
};

export default function ListSection({ title, lists }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const viewabilityConfig: ViewabilityConfig = {
    waitForInteraction: true,
    itemVisiblePercentThreshold: 50,
  };
  const onViewableItemsChanged = (props: {
    viewableItems: ViewToken[];
    changed: ViewToken[];
  }) =>
    props.viewableItems[0] && setActiveIndex(props.viewableItems[0].index || 0);
  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged },
  ]);

  const { font } = useContext(ThemeContext);

  return (
    <Fragment>
      <Text style={[styles.title, { color: font }]}>{title}</Text>
      <FlatList
        data={lists}
        contentContainerStyle={{ paddingVertical: 24, paddingHorizontal: 16 }}
        renderItem={({ item, index }) => (
          <FlashListRef {...item} isActive={index === activeIndex} />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        pagingEnabled
        keyExtractor={({ id }, index) => `${id}${index}`}
      />
    </Fragment>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 24,
    fontFamily: "SemiBold",
    fontSize: 22,
    paddingHorizontal: 24,
  },
});
