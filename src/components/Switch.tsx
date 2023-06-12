import { View, StyleSheet, Pressable, Text } from "react-native";
import { THEME } from "../const/theme";
import { LinearGradient } from "expo-linear-gradient";
import { linearGradient } from "../const/styles";
import GradientText from "./GradientText";

type OptionProps = {
  label: string;
  value: string;
};

type SwitchProps = {
  options: OptionProps[];
  onChange: (value: string) => void;
  activeValue: string;
};

export default function Switch({
  options,
  onChange,
  activeValue,
}: SwitchProps) {
  return (
    <View style={styles.wrapper}>
      {options.map((opt) => (
        <Option
          {...opt}
          onChange={onChange}
          isActive={activeValue === opt.value}
          key={opt.value}
        />
      ))}
    </View>
  );
}

type OptionRefProps = {
  isActive: boolean;
  onChange: (value: string) => void;
};

const Option = ({
  label,
  value,
  onChange,
  isActive,
}: OptionProps & OptionRefProps) => {
  return (
    <Pressable style={{ flex: 1 }} onPress={() => onChange(value)}>
      {isActive ? (
        <LinearGradient
          style={styles.option}
          colors={linearGradient}
          start={{ y: 0, x: 0 }}
        >
          <Text style={{ ...styles.optionText, color: THEME.light }}>
            {label}
          </Text>
        </LinearGradient>
      ) : (
        <View style={styles.option}>
          <GradientText style={styles.optionText}>{label}</GradientText>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 255,
    backgroundColor: THEME.light,
  },
  option: {
    borderRadius: 255,
    justifyContent: "center",
    paddingVertical: 16,
  },
  activeOption: {
    backgroundColor: THEME.primary,
  },
  inActiveOption: {},
  optionText: {
    fontFamily: "Bold",
    textAlign: "center",
    fontSize: 12,
    lineHeight: 12,
  },
});
