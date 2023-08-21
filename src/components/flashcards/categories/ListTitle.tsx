import { Text } from "react-native";
import { ThemeContext } from "../../../context/ThemeContext";
import { useContext } from "react";

type Props = {
  paddingHorizontal?: number;
  children: string;
};

export default function ListTitle({ children, paddingHorizontal }: Props) {
  const { font } = useContext(ThemeContext);
  return (
    <Text
      style={{
        paddingTop: 12,
        paddingBottom: 24,
        fontFamily: "SemiBold",
        fontSize: 22,
        color: font,
        paddingHorizontal: paddingHorizontal || 0,
      }}
    >
      {children}
    </Text>
  );
}
