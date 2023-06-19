import { StyleSheet, View } from "react-native";
import useMultiStepForm from "../hooks/useMultiStepForm";
import Info from "../components/entry/Info";
import Auth from "../components/entry/Auth";
import PrimaryButton from "../components/PrimaryButton";
import StepDisplayer from "../components/entry/StepDisplayer";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";

export default function EntryScreen() {
  const { background } = useContext(ThemeContext);
  const { step, setStep, form } = useMultiStepForm([<Info />, <Auth />]);
  return (
    <View style={{ ...styles.wrapper, backgroundColor: background }}>
      <StepDisplayer step={step} />
      <View style={styles.innerWrapper}>
        {form}
        {step === 1 && (
          <PrimaryButton text="Zaczynajmy!" onPress={() => setStep(2)} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  innerWrapper: {
    paddingHorizontal: 32,
    width: "100%",
    flex: 1,
    justifyContent: "space-between",
    marginVertical: 32,
  },
});
