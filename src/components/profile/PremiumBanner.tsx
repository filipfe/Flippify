import { LinearGradient } from "expo-linear-gradient";
import { linearGradient } from "../../const/styles";
import { StyleSheet, Text, View } from "react-native";
import { THEME } from "../../const/theme";

export default function PremiumBanner() {
  return (
    <LinearGradient
      style={styles.wrapper}
      start={{ x: 1, y: 0 }}
      colors={linearGradient}
    >
      <View style={styles.logoWrapper}>
        <Text style={{ fontSize: 24 }}>👑</Text>
      </View>
      <View>
        <Text style={styles.price}>59 zł / miesiąc</Text>
        <Text style={styles.premiumText}>Kup pakiet premium</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 24,
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  logoWrapper: {
    width: 56,
    height: 56,
    backgroundColor: THEME.light,
    marginRight: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  price: {
    fontSize: 14,
    fontFamily: "Medium",
    color: THEME.light,
    opacity: 0.8,
    lineHeight: 20,
  },
  premiumText: {
    fontFamily: "Bold",
    fontSize: 18,
    color: THEME.light,
  },
});
