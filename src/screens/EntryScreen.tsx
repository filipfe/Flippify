import Info from "../components/entry/Info";
import { ThemeContext } from "../context/ThemeContext";
import { useContext, useRef, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { ViewToken } from "react-native";
import Login from "../components/entry/Login";

export default function EntryScreen() {
  const listRef = useRef<FlatList>(null!);
  const { background } = useContext(ThemeContext);
  const [step, setStep] = useState(0);

  const viewabilityConfig = {
    waitForInteraction: true,
    viewAreaCoveragePercentThreshold: 50,
  };
  const onViewableItemsChanged = (props: {
    viewableItems: ViewToken[];
    changed: ViewToken[];
  }) => props.viewableItems[0] && setStep(props.viewableItems[0].index || 0);

  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged },
  ]);

  const changeStep = (num: number) => {
    setStep(num);
    listRef.current.scrollToIndex({ index: num, animated: true });
  };

  return (
    <FlatList
      horizontal
      pagingEnabled
      style={{ backgroundColor: background, height: "100%" }}
      data={[<Info setStep={changeStep} />, <Login />]}
      renderItem={({ item }) => item}
      keyExtractor={(_, index) => index.toString()}
      showsHorizontalScrollIndicator={false}
      ref={(ref) => ref && (listRef.current = ref)}
      viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
    />
  );
}
