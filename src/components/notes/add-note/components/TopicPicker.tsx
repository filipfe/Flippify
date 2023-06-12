import { View, Text, StyleSheet } from "react-native";
import { globalStyles, shadowPrimary } from "../../../../styles/general";
import { NewNoteContext } from "../../../../context/OpusContext";
import { useContext } from "react";
import { Picker } from "@react-native-picker/picker";
import { THEME } from "../../../../const/theme";
import Loader from "../../../Loader";

export default function TopicPicker() {
  const { topics, item, activeCategory, setItem, areTopicsLoading } =
    useContext(NewNoteContext);
  const isEnabled = !!activeCategory.id && !areTopicsLoading;
  return (
    <View style={{ marginTop: 32, ...(!isEnabled && styles.inActivePicker) }}>
      <Text style={{ ...globalStyles.paramText, marginBottom: 16 }}>
        Temat notatki
      </Text>
      {areTopicsLoading ? (
        <Loader />
      ) : (
        <View style={styles.pickerWrapper}>
          <Picker
            enabled={isEnabled}
            style={styles.picker}
            selectedValue={item.category.id}
            itemStyle={styles.pickerItem}
            onValueChange={(topic) => setItem((prev) => ({ ...prev, topic }))}
          >
            {topics.map((topic) => (
              <Picker.Item
                fontFamily="Bold"
                color={THEME.font}
                label={topic}
                value={topic}
                key={topic}
              />
            ))}
          </Picker>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  pickerWrapper: {
    backgroundColor: "#FFF",
    borderRadius: 255,
    paddingLeft: 16,
    flexDirection: "row",
    alignItems: "center",
    ...shadowPrimary,
  },
  inActivePicker: {
    opacity: 0.6,
  },
  picker: {
    height: 0,
    width: "100%",
  },
  pickerItem: {
    color: THEME.font,
    fontFamily: "Bold",
  },
});
