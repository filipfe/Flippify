import { StyleSheet, Text, View } from "react-native";
import Layout from "../../components/ui/layout/Layout";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../types/navigation";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import PrimaryButton from "../../components/ui/PrimaryButton";
import { NavigationProp, useNavigation } from "@react-navigation/native";

export default function ListDetailsScreen({
  route,
}: NativeStackScreenProps<RootStackParams, "ListDetailsScreen">) {
  const { font, secondary } = useContext(ThemeContext);
  const { name, description } = route.params;
  const { navigate } =
    useNavigation<NavigationProp<RootStackParams, "RootTab">>();
  return (
    <Layout paddingVertical={48}>
      <View style={styles.wrapper}>
        <View>
          <Text style={[styles.title, { color: font }]}>{name}</Text>
          <Text style={[styles.desc, { color: secondary }]}>{description}</Text>
          <Text style={[styles.points, { marginTop: 36, color: font }]}>
            60 fiszek
          </Text>
        </View>
        <View style={{ width: "70%" }}>
          <Text style={[styles.points, { color: font, marginBottom: 36 }]}>
            0 / 278 punktów
          </Text>
          <PrimaryButton
            width={"100%"}
            onPress={() => navigate("CardsGenerator", { list: route.params })}
            text="Rozpocznij"
          />
        </View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    fontFamily: "SemiBold",
    textAlign: "center",
    maxWidth: "90%",
    marginBottom: 24,
  },
  desc: {
    fontFamily: "Medium",
    textAlign: "center",
    maxWidth: "90%",
    lineHeight: 24,
  },
  points: {
    fontFamily: "SemiBold",
    textAlign: "center",
    fontSize: 16,
  },
});
