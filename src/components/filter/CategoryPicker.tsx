import { View, Text, StyleSheet } from "react-native";
import { globalStyles } from "../../styles/general";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { Category } from "../../types/general";
import Loader from "../ui/Loader";
import SelectDropdown from "react-native-select-dropdown";
import useShadow from "../../hooks/useShadow";
import { DropdownIcon } from "../../assets/icons/icons";
import { supabase } from "../../hooks/useAuth";

type Props = {
  label?: string;
  active: Category;
  onChange: (category: Category) => void;
};

export default function CategoryPicker({ label, active, onChange }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [areLoading, setAreLoading] = useState(true);
  const { secondary, box, font, light, primary } = useContext(ThemeContext);
  const shadow = useShadow(12);

  useEffect(() => {
    async function fetchCategories() {
      const { data } = await supabase
        .from("categories")
        .select("*")
        .order("name");
      setCategories((data as Category[]) || []);
      setAreLoading(false);
    }
    fetchCategories();
  }, []);

  return (
    <View>
      <Text
        style={{
          ...globalStyles.paramText,
          marginBottom: 16,
          color: secondary,
        }}
      >
        {label || "Kategoria notatki"}
      </Text>
      {areLoading ? (
        <Loader />
      ) : (
        <SelectDropdown
          data={categories}
          disabled={!(categories.length > 0)}
          defaultButtonText={active.name ? active.name : "Wybierz kategorię"}
          defaultValue={active}
          rowTextForSelection={(item) => item.name}
          buttonTextAfterSelection={(item) => item.name}
          buttonStyle={{
            ...styles.picker,
            backgroundColor: box,
          }}
          renderDropdownIcon={() => <DropdownIcon fill={font} />}
          buttonTextStyle={{ ...styles.pickerText, color: font }}
          rowStyle={{
            backgroundColor: box,
            borderBottomColor: light,
          }}
          rowTextStyle={{ ...styles.pickerRow, color: font }}
          selectedRowStyle={{ backgroundColor: primary }}
          onSelect={(item) => onChange(item)}
        />
      )}
    </View>
  );
}

export const styles = StyleSheet.create({
  picker: {
    width: "100%",
    borderRadius: 12,
    paddingHorizontal: 24,
  },
  pickerItem: {
    fontFamily: "Bold",
  },
  pickerText: {
    fontFamily: "Bold",
    fontSize: 14,
    textAlign: "left",
  },
  pickerRow: { textAlign: "center", fontFamily: "SemiBold", fontSize: 16 },
  pickerRowWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
