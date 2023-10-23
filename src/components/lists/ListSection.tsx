import { Fragment, useContext, useEffect, useRef, useState } from "react";
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
  const timer = useRef<NodeJS.Timeout | null>(null);
  const flatListRef = useRef<FlatList | null>(null);

  const { font } = useContext(ThemeContext);

  useEffect(() => {
    function changeIndex() {
      setActiveIndex((prev) => (prev + 1 >= lists.length ? 0 : prev + 1));
      flatListRef.current &&
        flatListRef.current.scrollToIndex({
          index: activeIndex + 1 >= lists.length ? 0 : activeIndex + 1,
          animated: true,
        });
    }
    timer.current = setTimeout(changeIndex, 5000);
    return () => {
      timer.current && clearTimeout(timer.current);
    };
  }, [activeIndex]);

  return (
    <Fragment>
      <Text style={[styles.title, { color: font }]}>{title}</Text>
      <FlatList
        data={lists}
        contentContainerStyle={{ paddingVertical: 24 }}
        renderItem={({ item, index }) => (
          <FlashListRef
            {...item}
            isActive={index === activeIndex}
            isFirst={index === 0}
            isLast={index === lists.length - 1}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        pagingEnabled
        ref={(ref) => ref && (flatListRef.current = ref)}
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
