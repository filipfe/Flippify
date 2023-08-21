import { View, StyleSheet, Pressable, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { linearGradient } from "../../const/styles";
import GradientText from "./GradientText";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { Option as OptionType } from "../../types/general";

type SwitchProps<T> = {
  options: OptionType<T>[];
  onChange: (value: T) => void;
  activeValue: T;
};

export default function Switch<T>({
  options,
  onChange,
  activeValue,
}: SwitchProps<T>) {
  const { light } = useContext(ThemeContext);
  return (
    <View style={{ ...styles.wrapper, backgroundColor: light }}>
      {options.map((opt) => (
        <Option
          {...opt}
          onChange={onChange}
          isActive={activeValue === opt.value}
          key={opt.label}
        />
      ))}
    </View>
  );
}

type OptionRefProps<T> = {
  isActive: boolean;
  onChange: (value: T) => void;
};

function Option<T>({
  label,
  value,
  onChange,
  isActive,
}: OptionType<T> & OptionRefProps<T>) {
  return (
    <Pressable style={{ flex: 1 }} onPress={() => onChange(value)}>
      {isActive ? (
        <LinearGradient
          style={styles.option}
          colors={linearGradient}
          start={{ y: 0, x: 0 }}
        >
          <Text style={{ ...styles.optionText, color: "#FFF" }}>{label}</Text>
        </LinearGradient>
      ) : (
        <View style={styles.option}>
          <GradientText style={styles.optionText}>{label}</GradientText>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 255,
  },
  option: {
    borderRadius: 255,
    justifyContent: "center",
    paddingVertical: 16,
  },
  inActiveOption: {},
  optionText: {
    fontFamily: "Bold",
    textAlign: "center",
    fontSize: 12,
    lineHeight: 12,
  },
});
