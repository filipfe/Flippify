import { View, Text, StyleSheet } from "react-native";
import { globalStyles, shadowPrimary } from "../../../../styles/general";
import { NewNoteContext } from "../../../../context/OpusContext";
import { useContext } from "react";
import { Picker } from "@react-native-picker/picker";
import Loader from "../../../Loader";
import { ThemeContext } from "../../../../context/ThemeContext";

export default function TopicPicker() {
  const { font, background, secondary } = useContext(ThemeContext);
  const { topics, item, activeCategory, setItem, areTopicsLoading } =
    useContext(NewNoteContext);
  const isEnabled = !!activeCategory.id && !areTopicsLoading;
  return (
    <View style={{ marginTop: 32, ...(!isEnabled && styles.inActivePicker) }}>
      <Text
        style={{
          ...globalStyles.paramText,
          marginBottom: 16,
          color: secondary,
        }}
      >
        Temat notatki
      </Text>
      {areTopicsLoading ? (
        <Loader />
      ) : (
        <View style={{ ...styles.pickerWrapper, backgroundColor: background }}>
          <Picker
            enabled={isEnabled}
            style={styles.picker}
            selectedValue={item.category.id}
            itemStyle={{ ...styles.pickerItem, color: font }}
            dropdownIconColor={font}
            onValueChange={(topic) => setItem((prev) => ({ ...prev, topic }))}
          >
            {topics.map((topic) => (
              <Picker.Item
                fontFamily="Bold"
                color={font}
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
    fontFamily: "Bold",
  },
});
