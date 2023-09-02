import { StyleSheet, Text, View } from "react-native";
import Layout from "../../components/ui/layout/Layout";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../types/navigation";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import PrimaryButton from "../../components/ui/PrimaryButton";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { MathIcon } from "../../assets/icons/icons";
import GradientText from "../../components/ui/GradientText";
import { FlashCardsIcon } from "../../assets/general";
import UserCredentials from "../../components/ui/layout/UserCredentials";

export default function ListDetailsScreen({
  route,
}: NativeStackScreenProps<RootStackParams, "ListDetailsScreen">) {
  const { font, secondary } = useContext(ThemeContext);
  const { name, description, category, cards_count, user, likes_count } =
    route.params;
  const { navigate } =
    useNavigation<NavigationProp<RootStackParams, "RootTab">>();
  return (
    <Layout paddingVertical={24}>
      <View style={styles.wrapper}>
        <View
          style={{
            alignItems: "center",
            flex: 1,
            justifyContent: "center",
            paddingBottom: 128,
          }}
        >
          {category && (
            <View style={[styles.row, { marginBottom: 16 }]}>
              <MathIcon strokeWidth={2.4} height={18} width={18} />
              <GradientText style={styles.category}>
                {category.name}
              </GradientText>
            </View>
          )}
          <Text style={[styles.title, { color: font }]}>{name}</Text>
          <Text style={[styles.desc, { color: secondary }]}>{description}</Text>
          <View style={[styles.row, { marginVertical: 36 }]}>
            <FlashCardsIcon
              strokeWidth={1.6}
              stroke={font}
              height={20}
              width={20}
            />
            <Text
              style={[
                styles.points,
                { color: font, marginLeft: 8, fontSize: 18, lineHeight: 22 },
              ]}
            >
              {cards_count}
            </Text>
          </View>
          <Text style={[styles.points, { color: font, marginBottom: 36 }]}>
            0 / {cards_count * 20} punktów
          </Text>
          <View
            style={{
              alignSelf: "stretch",
              alignItems: "center",
            }}
          >
            <PrimaryButton
              width={"70%"}
              onPress={() => navigate("CardsGenerator", { list: route.params })}
              text="Rozpocznij"
              fontSize={12}
            />
          </View>
        </View>
        <View style={{ alignSelf: "stretch" }}>
          <UserCredentials user={user} likesCount={likes_count} />
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
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  category: {
    fontFamily: "SemiBold",
    marginLeft: 8,
  },
});
