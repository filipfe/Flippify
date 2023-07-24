import { View, StyleSheet } from "react-native";
import BoxLink from "../BoxLink";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootTabParams } from "../../types/navigation";
import { initialFilter } from "../../const/notes";
import { FlashCardsIcon, NotesIcon } from "../../assets/general";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";

export default function BoxLinkRow() {
  const { font } = useContext(ThemeContext);
  const { navigate } = useNavigation<NavigationProp<RootTabParams>>();
  return (
    <View style={styles.wrapper}>
      <View style={[styles.column, { marginRight: 8 }]}>
        <BoxLink
          navigate={() =>
            navigate("FlashCards", {
              screen: "OwnFlashCards",
              params: initialFilter,
            })
          }
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
      <View style={[styles.column, { marginHorizontal: 8 }]}>
        <BoxLink
          navigate={() =>
            navigate("Notes", {
              screen: "OwnNotes",
              params: initialFilter,
            })
          }
          count={12}
          title="Notatki"
          icon={
            <NotesIcon stroke={font} strokeWidth={1.3} width={22} height={22} />
          }
        />
      </View>
      <View style={[styles.column, { marginLeft: 8 }]}>
        <BoxLink
          navigate={() =>
            navigate("Notes", {
              screen: "OwnNotes",
              params: initialFilter,
            })
          }
          count={4}
          title="FiszkoListy"
          icon={
            <NotesIcon stroke={font} strokeWidth={1.3} width={22} height={22} />
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
