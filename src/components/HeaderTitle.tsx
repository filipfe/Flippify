import { Text } from "react-native";
import { THEME } from "../const/theme";

export default function HeaderTitle({ children }: { children: string }) {
  return (
    <Text
      style={{
        fontSize: 20,
        color: THEME.font,
        fontFamily: "SemiBold",
        marginLeft: 8,
        lineHeight: 20,
      }}
    >
      {children}
    </Text>
  );
}
