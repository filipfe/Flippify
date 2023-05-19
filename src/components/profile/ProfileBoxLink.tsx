import { Pressable, View } from "react-native";
import { ProfileBoxLinkProps } from "../../types/profile";
import { Text } from "react-native";
import RangeSlider from "../RangeSlider";
import { useNavigation } from "@react-navigation/native";
import { ProfileNavigation } from "../../types/navigation";

export default function ProfileBoxLink({
  to,
  title,
  subtitle,
  icon,
  rangeValue,
}: ProfileBoxLinkProps) {
  const { navigate } = useNavigation<ProfileNavigation>();
  return (
    <Pressable
      onPress={() => navigate(to)}
      style={{
        backgroundColor: "#F2F8FD",
        shadowColor: "#3c85c2",
        shadowOpacity: 0.24,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 64,
        borderRadius: 32,
        paddingVertical: 24,
        paddingHorizontal: 36,
        marginBottom: 24,
        width: "100%",
      }}
    >
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 12,
            height: 52,
            width: 52,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 20, fontFamily: "Medium" }}>{icon}</Text>
        </View>
        <View
          style={{
            marginLeft: 16,
            justifyContent: "space-evenly",
            height: 52,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Medium",
              color: "#382E6D",
              opacity: 0.8,
            }}
          >
            {subtitle}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Bold",
              color: "#382E6D",
            }}
          >
            {title}
          </Text>
        </View>
      </View>
      <View style={{ marginTop: 24 }}>
        <RangeSlider value={rangeValue} />
      </View>
    </Pressable>
  );
}
