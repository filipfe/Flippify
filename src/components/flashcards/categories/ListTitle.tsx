import { Text } from "react-native";
import { ThemeContext } from "../../../context/ThemeContext";
import { useContext } from "react";

type Props = {
  children: string;
};

export default function ListTitle({ children }: Props) {
  const { font } = useContext(ThemeContext);
  return (
    <Text
      style={{
        paddingTop: 12,
        paddingBottom: 24,
        fontFamily: "SemiBold",
        fontSize: 22,
        color: font,
      }}
    >
      {children}
    </Text>
  );
}
