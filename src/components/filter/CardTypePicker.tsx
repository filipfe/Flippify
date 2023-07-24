import { ThemeContext } from "../../context/ThemeContext";
import { useContext, useState } from "react";
import useShadow from "../../hooks/useShadow";
import SelectDropdown from "react-native-select-dropdown";
import { typeOptions } from "../../const/flashcards";
import { View, Text } from "react-native";
import { globalStyles } from "../../styles/general";
import { styles } from "./CategoryPicker";
import { DropdownIcon } from "../../assets/icons/icons";
import { FlashCardType } from "../../types/flashcards";

type Props = {
  initialValue?: FlashCardType;
  onChange: (value: FlashCardType | undefined) => void;
};

export default function CardTypePicker({ initialValue, onChange }: Props) {
  const [type, setType] = useState<FlashCardType | undefined>(initialValue);
  const { secondary, background, font, light, primary } =
    useContext(ThemeContext);
  const shadow = useShadow(12);

  return (
    <View>
      <Text
        style={{
          ...globalStyles.paramText,
          marginBottom: 16,
          color: secondary,
        }}
      >
        Typ pytania
      </Text>

      <SelectDropdown
        data={typeOptions}
        defaultButtonText="Wybierz typ pytania"
        defaultValue={type}
        rowTextForSelection={(item) => item.label}
        buttonTextAfterSelection={(item) => item.label}
        buttonStyle={{
          ...styles.picker,
          backgroundColor: background,
          ...shadow,
        }}
        renderDropdownIcon={() => <DropdownIcon fill={font} />}
        buttonTextStyle={{ ...styles.pickerText, color: font }}
        rowStyle={{
          backgroundColor: background,
          borderBottomColor: light,
        }}
        rowTextStyle={{ ...styles.pickerRow, color: font }}
        selectedRowStyle={{ backgroundColor: primary }}
        onSelect={(item) => onChange(item.value)}
      />
    </View>
  );
}
