import { View, Text } from "react-native";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";

type Props = {
  title: string;
  children: JSX.Element | JSX.Element[];
};

export default function HomeSection({ title, children }: Props) {
  const { font } = useContext(ThemeContext);
  return (
    <View>
      <Text
        style={{
          fontFamily: "ExtraBold",
          fontSize: 22,
          lineHeight: 24,
          marginBottom: 24,
          color: font,
        }}
      >
        {title}
      </Text>
      {children}
    </View>
  );
}
