import Info from "../components/entry/Info";
import Auth from "../components/entry/Auth";
import { ThemeContext } from "../context/ThemeContext";
import { useContext, useRef, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { View, ViewToken } from "react-native";
import StepDisplayer from "../components/entry/StepDisplayer";

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
    <View style={{ flex: 1, position: "relative" }}>
      <FlatList
        horizontal
        pagingEnabled
        style={{ backgroundColor: background }}
        data={[<Info setStep={changeStep} key="info" />, <Auth key="auth" />]}
        renderItem={({ item }) => item}
        keyExtractor={(item) => item.key!.toString()}
        showsHorizontalScrollIndicator={false}
        ref={(ref) => ref && (listRef.current = ref)}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      />
      <StepDisplayer step={step} />
    </View>
  );
}
