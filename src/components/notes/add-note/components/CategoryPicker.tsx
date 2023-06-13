import { View, Text, StyleSheet } from "react-native";
import { globalStyles, shadowPrimary } from "../../../../styles/general";
import { NewNoteContext } from "../../../../context/OpusContext";
import { useContext } from "react";
import { Picker } from "@react-native-picker/picker";
import { ThemeContext } from "../../../../context/ThemeContext";

export default function CategoryPicker() {
  const { secondary, background, font } = useContext(ThemeContext);
  const { categories, changeCategory, activeCategory } =
    useContext(NewNoteContext);
  return (
    <View style={{ marginTop: 32 }}>
      <Text
        style={{
          ...globalStyles.paramText,
          marginBottom: 16,
          color: secondary,
        }}
      >
        Kategoria notatki
      </Text>
      <View style={{ ...styles.pickerWrapper, backgroundColor: background }}>
        <Picker
          placeholder="Wybierz kategorię"
          style={styles.picker}
          selectedValue={activeCategory.id}
          itemStyle={{ ...styles.pickerItem, color: font }}
          dropdownIconColor={font}
          onValueChange={(id) =>
            id !== -1 &&
            changeCategory(categories.find((item) => item.id === id)!)
          }
        >
          {categories.map((category) => (
            <Picker.Item
              fontFamily="Bold"
              color={font}
              label={category.name}
              value={category.id}
              key={category.id}
            />
          ))}
        </Picker>
      </View>
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
  picker: {
    height: 0,
    width: "100%",
  },
  pickerItem: {
    fontFamily: "Bold",
  },
});
