import { LinearGradient } from "expo-linear-gradient";
import { linearGradient } from "../../const/styles";
import { StyleSheet, View } from "react-native";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";

const StepDisplayer = ({ step }: { step: number }) => {
  const { light } = useContext(ThemeContext);
  return (
    <View style={{ ...styles.wrapper, backgroundColor: light }}>
      <View style={styles.outerBar}>
        {step === 1 && (
          <LinearGradient colors={linearGradient} style={styles.innerBar} />
        )}
      </View>
      <View style={styles.outerBar}>
        {step === 2 && (
          <LinearGradient colors={linearGradient} style={styles.innerBar} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 32,
    borderRadius: 24,
    height: 6,
    overflow: "hidden",
    width: "40%",
    flexDirection: "row",
  },
  outerBar: {
    width: "50%",
    position: "relative",
    height: "100%",
  },
  innerBar: {
    borderRadius: 24,
    width: "100%",
    height: "100%",
  },
});

export default StepDisplayer;
