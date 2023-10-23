import { View, StyleSheet, Text } from "react-native";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";

type Props = { children: JSX.Element | JSX.Element[]; title: string };

const SettingsSection = ({ children, title }: Props) => {
  const { font } = useContext(ThemeContext);
  return (
    <View style={styles.wrapper}>
      <Text style={[styles.title, { color: font }]}>{title}</Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 12,
  },
  title: {
    marginBottom: 12,
    fontFamily: "SemiBold",
    fontSize: 22,
    lineHeight: 24,
  },
});

export default SettingsSection;
