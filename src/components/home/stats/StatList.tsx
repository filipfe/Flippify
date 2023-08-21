import { FlatList } from "react-native-gesture-handler";
import { useState, useEffect, useRef } from "react";
import { Stat } from "../../../types/home";
import StatRef from "./StatRef";
import { View } from "react-native";

export default function StatList({ stats }: { stats: Stat[] }) {
  const listRef = useRef<FlatList>(null!);
  const timer = useRef<any>(null!);
  const [activeStatIndex, setActiveStatIndex] = useState(0);

  useEffect(() => {
    if (stats.length === 0) return;
    activeStatIndex === 0
      ? listRef.current.scrollToOffset({ offset: 0, animated: true })
      : listRef.current.scrollToIndex({
          index: activeStatIndex,
          animated: true,
        });
    timer.current = setTimeout(
      () =>
        setActiveStatIndex((prev) => (prev + 1 >= stats.length ? 0 : prev + 1)),
      4000
    );
    return () => {
      clearInterval(timer.current);
    };
  }, [activeStatIndex, stats]);

  return (
    <FlatList
      horizontal
      data={stats}
      contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 16 }}
      showsHorizontalScrollIndicator={false}
      scrollEnabled={false}
      ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
      ref={(ref) => ref && (listRef.current = ref)}
      renderItem={({ item, index }) => (
        <StatRef
          {...item}
          changeIndex={() => setActiveStatIndex(index)}
          isActive={index === activeStatIndex}
          key={item.name}
        />
      )}
      keyExtractor={(item) => item.name}
    />
  );
}
