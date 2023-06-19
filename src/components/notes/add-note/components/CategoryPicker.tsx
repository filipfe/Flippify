import { View, Text, StyleSheet } from "react-native";
import { globalStyles, shadowPrimary } from "../../../../styles/general";
import { NewNoteContext } from "../../../../context/OpusContext";
import { useContext, useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { ThemeContext } from "../../../../context/ThemeContext";
import { Category } from "../../../../types/general";
import axios from "axios";
import Loader from "../../../Loader";
import { API_URL } from "@env";

type Props = {
  active: Category;
  onChange: (category: Category) => void;
};

export default function CategoryPicker({ active, onChange }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [areLoading, setAreLoading] = useState(true);
  const { secondary, background, font } = useContext(ThemeContext);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/categories`)
      .then((res) => res.data)
      .then((data) => setCategories(data))
      .finally(() => setAreLoading(false));
  }, []);

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
      {areLoading ? (
        <Loader />
      ) : (
        <View style={{ ...styles.pickerWrapper, backgroundColor: background }}>
          <Picker
            placeholder="Wybierz kategorię"
            style={styles.picker}
            selectedValue={active.id}
            itemStyle={{ ...styles.pickerItem, color: font }}
            dropdownIconColor={font}
            onValueChange={(id) =>
              id !== -1 && onChange(categories.find((item) => item.id === id)!)
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
  picker: {
    height: 0,
    width: "100%",
  },
  pickerItem: {
    fontFamily: "Bold",
  },
});
