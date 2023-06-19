import { Text } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function HeaderTitle({ children }: { children: string }) {
  const { font } = useContext(ThemeContext);
  return (
    <Text
      style={{
        fontSize: 20,
        color: font,
        fontFamily: "SemiBold",
        marginLeft: 8,
        lineHeight: 20,
      }}
    >
      {children}
    </Text>
  );
}
