import {
  Platform,
  Pressable,
  TouchableNativeFeedback,
  StyleProp,
  ViewStyle,
} from "react-native";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";

type Props = {
  children: JSX.Element;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
  borderless?: boolean;
};

export default function RippleButton({
  children,
  style,
  borderless = false,
  onPress,
}: Props) {
  const { ripple } = useContext(ThemeContext);
  return Platform.OS === "android" ? (
    <TouchableNativeFeedback
      style={style}
      background={TouchableNativeFeedback.Ripple(ripple, borderless)}
      onPress={onPress}
    >
      {children}
    </TouchableNativeFeedback>
  ) : (
    <Pressable onPress={onPress} style={style}>
      {children}
    </Pressable>
  );
}
