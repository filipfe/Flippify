import { View } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";

type Props = {
  children: JSX.Element | JSX.Element[];
  paddingHorizontal?: number;
  paddingVertical?: number;
};

export default function Layout({ children, paddingHorizontal = 24 }: Props) {
  const { background } = useContext(ThemeContext);
  return (
    <View
      style={{
        backgroundColor: background,
        flex: 1,
        paddingVertical: 16,
        paddingHorizontal,
      }}
    >
      {children}
    </View>
  );
}
