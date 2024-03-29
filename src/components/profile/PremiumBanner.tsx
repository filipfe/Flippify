import { LinearGradient } from "expo-linear-gradient";
import { linearGradient } from "../../const/styles";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { PremiumIcon } from "../../assets/icons/icons";

export default function PremiumBanner({ onPress }: { onPress: () => void }) {
  return (
    <Pressable style={{ width: "100%" }} onPress={onPress}>
      <LinearGradient
        style={styles.wrapper}
        start={{ x: 1, y: 0 }}
        colors={linearGradient}
      >
        <View style={{ ...styles.logoWrapper, backgroundColor: "#F2F8FD" }}>
          <PremiumIcon height={36} width={36} />
        </View>
        <View>
          <Text style={{ ...styles.price, color: "#F2F8FD" }}>
            19 zł / miesiąc
          </Text>
          <Text style={{ ...styles.premiumText, color: "#F2F8FD" }}>
            Wykup pakiet premium
          </Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 36,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 24,
  },
  logoWrapper: {
    width: 56,
    height: 56,
    marginRight: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  price: {
    fontSize: 14,
    fontFamily: "Medium",
    opacity: 0.8,
    lineHeight: 20,
  },
  premiumText: {
    fontFamily: "Bold",
    fontSize: 18,
  },
});
