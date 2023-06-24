import { View, Text, StyleSheet } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";
import { DropdownIcon } from "../../assets/icons/icons";
import { themeOptions } from "../../const/settings";

export default function ThemeSwitch() {
  const {
    primary,
    font,
    background,
    secondary,
    light,
    userPreferredTheme,
    setUserPreferredTheme,
  } = useContext(ThemeContext);
  return (
    <View style={styles.wrapper}>
      <Text style={[styles.title, { color: font }]}>Motyw</Text>
      <SelectDropdown
        data={themeOptions}
        defaultValue={themeOptions.find(
          (item) => item.value === userPreferredTheme
        )}
        rowTextForSelection={(item) => item.label}
        buttonTextAfterSelection={(item) => item.label}
        onSelect={(item) => setUserPreferredTheme(item.value)}
        renderDropdownIcon={() => (
          <DropdownIcon fill={secondary} width={12} height={12} />
        )}
        buttonStyle={{ backgroundColor: background }}
        selectedRowStyle={{ backgroundColor: primary }}
        rowStyle={{ backgroundColor: light, borderBottomColor: secondary }}
        rowTextStyle={{ color: font, fontFamily: "SemiBold", fontSize: 14 }}
        buttonTextStyle={{
          color: secondary,
          textAlign: "right",
          fontFamily: "SemiBold",
          fontSize: 14,
          lineHeight: 16,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    lineHeight: 18,
    fontFamily: "SemiBold",
  },
});
