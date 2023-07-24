import { View, Text } from "react-native";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";

type Props = {
  title: string;
  children: JSX.Element | JSX.Element[];
  padding?: boolean;
};

export default function HomeSection({
  title,
  padding = true,
  children,
}: Props) {
  const { font } = useContext(ThemeContext);
  return (
    <View style={{ paddingVertical: 16, paddingHorizontal: padding ? 16 : 0 }}>
      <Text
        style={{
          fontFamily: "ExtraBold",
          fontSize: 22,
          lineHeight: 24,
          marginBottom: 24,
          paddingHorizontal: padding ? 0 : 24,
          color: font,
        }}
      >
        {title}
      </Text>
      {children}
    </View>
  );
}
