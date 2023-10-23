import { View, Text, StyleSheet } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";
import { DropdownIcon } from "../../assets/icons/icons";
import { animationOptions } from "../../const/settings";
import { SettingsContext } from "../../context/SettingsContext";

export default function AnimationSwitch() {
  const { primary, font, background, secondary, light } =
    useContext(ThemeContext);
  const { settings, changeSetting } = useContext(SettingsContext);
  return (
    <View style={styles.wrapper}>
      <Text style={[styles.title, { color: font }]}>Animacje</Text>
      <SelectDropdown
        data={animationOptions}
        defaultValue={
          animationOptions.find((item) => item.value === settings.animations) ||
          animationOptions[0]
        }
        rowTextForSelection={(item) => item.label}
        buttonTextAfterSelection={(item) => item.label}
        onSelect={(item) => changeSetting("animations", item.value)}
        renderDropdownIcon={() => (
          <DropdownIcon fill={secondary} width={12} height={12} />
        )}
        buttonStyle={{ backgroundColor: background }}
        selectedRowStyle={{ backgroundColor: primary }}
        rowStyle={{ backgroundColor: light, borderBottomColor: secondary }}
        rowTextStyle={{ color: font, fontFamily: "Medium", fontSize: 14 }}
        buttonTextStyle={{
          color: secondary,
          textAlign: "right",
          fontFamily: "Medium",
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
