import { View } from "react-native";
import useMultiStepForm from "../hooks/useMultiStepForm";
import Info from "../components/entry/Info";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTailwind } from "tailwind-rn/dist";
import Auth from "../components/entry/Auth";
import PrimaryButton from "../components/PrimaryButton";
import { LinearGradient } from "expo-linear-gradient";
import { linearGradient } from "../const/styles";

export default function EntryScreen() {
  const tw = useTailwind();
  const { step, setStep, form } = useMultiStepForm([<Info />, <Auth />]);
  return (
    <SafeAreaView style={tw("flex-1 items-center justify-between")}>
      <StepDisplayer step={step} />
      <View style={tw("px-8 w-full flex-1 justify-between my-8")}>
        {form}
        {step === 1 && (
          <PrimaryButton text="Zaczynajmy!" onPress={() => setStep(2)} />
        )}
      </View>
    </SafeAreaView>
  );
}

const StepDisplayer = ({ step }: { step: number }) => {
  const tw = useTailwind();
  return (
    <View
      style={tw(
        "bg-light mt-8 rounded-xl h-[0.4rem] overflow-hidden w-[40%] flex-row"
      )}
    >
      <View style={tw("w-[50%] relative h-full")}>
        {step === 1 && (
          <LinearGradient
            colors={linearGradient}
            style={tw("rounded-xl w-full h-full")}
          />
        )}
      </View>
      <View style={tw("w-[50%] relative h-full")}>
        {step === 2 && (
          <LinearGradient
            colors={linearGradient}
            style={tw("rounded-xl w-full h-full")}
          />
        )}
      </View>
    </View>
  );
};
