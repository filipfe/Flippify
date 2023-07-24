import { FlatList } from "react-native-gesture-handler";
import { useState, useEffect, useRef } from "react";
import { Stat } from "../../../types/home";
import StatRef from "./StatRef";
import { View } from "react-native";

export default function StatList() {
  const listRef = useRef<FlatList>(null!);
  const timer = useRef<any>(null!);
  const [stats, setStats] = useState<Stat[]>([]);
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

  useEffect(() => {
    setStats([
      {
        name: "efficiency",
        title: "Efektywność",
        value: 20,
        sufix: "%",
      },
      {
        name: "speed",
        title: "Szybkość",
        value: 4,
        sufix: " fiszki / min",
      },
      {
        name: "quality",
        title: "Efektywność",
        value: 20,
        sufix: "%",
      },
    ]);
  }, []);

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
          isActive={index === activeStatIndex}
          key={item.name}
        />
      )}
      keyExtractor={(item) => item.name}
    />
  );
}
