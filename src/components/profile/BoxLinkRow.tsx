import { View, StyleSheet } from "react-native";
import BoxLink from "../ui/BoxLink";
import { FlashCardsIcon } from "../../assets/general";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";

type Props = {
  navigate: () => void;
};

export default function BoxLinkRow({ navigate }: Props) {
  const { font } = useContext(ThemeContext);
  return (
    <View style={styles.wrapper}>
      <View style={[styles.column, { marginRight: 8 }]}>
        <BoxLink
          navigate={navigate}
          count={24}
          title="Fiszki"
          icon={
            <FlashCardsIcon
              stroke={font}
              strokeWidth={1.4}
              height={20}
              width={20}
            />
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 36,
    flexDirection: "row",
    alignItems: "center",
  },
  column: {
    flex: 1,
  },
});
