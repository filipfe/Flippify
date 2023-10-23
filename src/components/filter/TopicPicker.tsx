import { View, Text } from "react-native";
import { globalStyles } from "../../styles/general";
import { useContext, useState, useEffect } from "react";
import Loader from "../ui/Loader";
import { ThemeContext } from "../../context/ThemeContext";
import { Category } from "../../types/general";
import { Topic } from "../../types/flashcards";
import SelectDropdown from "react-native-select-dropdown";
import { styles } from "./CategoryPicker";
import { DropdownIcon } from "../../assets/icons/icons";
import useShadow from "../../hooks/useShadow";
import { supabase } from "../../hooks/useAuth";

type Props = {
  category: Category;
  active: Topic;
  onChange: (topic: Topic) => void;
};

export default function TopicPicker({ active, category, onChange }: Props) {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [areLoading, setAreLoading] = useState(false);
  const { font, box, secondary, light, primary } = useContext(ThemeContext);
  const shadow = useShadow(12);
  const isDisabled = !category.id;

  useEffect(() => {
    if (isDisabled) return;
    setAreLoading(true);
    setTopics([]);
    async function fetchTopics() {
      const { data } = await supabase
        .from("topics")
        .select("*")
        .eq("category_id", category.id)
        .order("name");
      setTopics((data as Topic[]) || []);
      setAreLoading(false);
    }
    let isCancelled = false;
    !isCancelled && fetchTopics();
    return () => {
      isCancelled = true;
    };
  }, [category]);

  return (
    <View style={{ opacity: isDisabled ? 0.6 : 1 }}>
      <Text
        style={{
          ...globalStyles.paramText,
          marginBottom: 16,
          color: secondary,
        }}
      >
        Temat fiszki
      </Text>
      {areLoading ? (
        <Loader />
      ) : (
        <SelectDropdown
          data={topics}
          search
          disabled={isDisabled}
          defaultButtonText={active.name ? active.name : "Wybierz temat"}
          defaultValue={active}
          rowTextForSelection={(item) => item.name}
          buttonTextAfterSelection={(item) => item.name}
          dropdownStyle={{ backgroundColor: box }}
          buttonStyle={{
            ...styles.picker,
            backgroundColor: box,
          }}
          searchInputStyle={{ backgroundColor: box }}
          searchInputTxtColor={font}
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
