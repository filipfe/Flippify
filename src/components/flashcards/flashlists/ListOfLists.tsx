import { useState, useEffect, useContext } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Loader from "../../Loader";
import {
  NavigationProp,
  useNavigation,
  useNavigationState,
} from "@react-navigation/native";
import PrimaryButton from "../../PrimaryButton";
import { LinearGradient } from "expo-linear-gradient";
import { linearGradient } from "../../../const/styles";
import { shadowPrimary } from "../../../styles/general";
import GradientText from "../../GradientText";
import { FlashList } from "../../../types/flashcards";
import NoContent from "./NoContent";
import { ThemeContext } from "../../../context/ThemeContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlashListStackParams } from "../../../types/navigation";

export default function ListOfLists({
  navigation,
}: NativeStackScreenProps<FlashListStackParams>) {
  const { background } = useContext(ThemeContext);
  const { navigate } = navigation;
  const [loading, setLoading] = useState(true);
  const [removed, setRemoved] = useState<number[]>([]);
  const [flashLists, setFlashLists] = useState<FlashList[]>([]);
  const location = useNavigationState((state) => state);

  useEffect(() => {
    setLoading(true);
    // axios
    //   .get(`${API_URL}/api/profile/flashlists`)
    //   .then((res) => res.data)
    //   .then((data) => setFlashLists(data.items))
    //   .finally(() => setLoading(false));
  }, [location, removed]);

  if (loading) return <Loader />;

  if (flashLists.length < 1)
    return (
      <NoContent
        text="Nie znaleziono FiszkoList"
        buttonText="Dodaj FiszkoListę"
        onPress={() => navigate("AddFlashList")}
      />
    );

  return (
    <View style={{ flex: 1, backgroundColor: background }}>
      <ScrollView>
        <View style={styles.wrapper}>
          <View style={{ marginBottom: 8 }}>
            <PrimaryButton
              onPress={() => navigate("AddFlashList")}
              text="Dodaj nową"
            />
          </View>
          {flashLists.length > 0 &&
            flashLists.map((list) => (
              <FlashListRef setRemoved={setRemoved} {...list} key={list.name} />
            ))}
        </View>
      </ScrollView>
    </View>
  );
}

const FlashListRef = (props: FlashList & { setRemoved: any }) => {
  const { font, secondary, light, background } = useContext(ThemeContext);
  const { navigate } = useNavigation<NavigationProp<FlashListStackParams>>();
  const { setRemoved, ...rest } = props;
  const { name, created_at, count } = rest;

  // const handleRemove = async () => {
  //   const resp = await axios.delete(
  //     `${API_URL}/api/flashlists/delete/${props.id}`
  //   );
  //   if (resp.status === 204)
  //     setRemoved((prev: number[]) => [...prev, props.id]);
  // };

  return (
    <View style={{ ...styles.refWrapper, backgroundColor: background }}>
      <View style={styles.topWrapper}>
        <Text style={{ ...styles.title, color: font }}>{name}</Text>
        <Text style={{ ...styles.points, color: secondary }}>
          {count} fiszki
        </Text>
      </View>
      <View style={{ ...styles.topWrapper, marginTop: 8 }}>
        <Text style={{ ...styles.points, color: secondary }}>
          {new Date(created_at).toLocaleDateString("default")}
        </Text>
        <View style={styles.buttonsWrapper}>
          <Pressable
            onPress={() => navigate("FlashList", rest)}
            style={{ ...styles.modifyButton, backgroundColor: light }}
          >
            <GradientText style={styles.buttonText}>Modyfikuj</GradientText>
          </Pressable>
          <Pressable onPress={() => navigate("FlashList", rest)}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              style={styles.button}
              colors={linearGradient}
            >
              <Text style={styles.buttonText}>Wybierz</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  refWrapper: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: "#FFF",
    marginTop: 16,
    ...shadowPrimary,
  },
  title: {
    fontFamily: "SemiBold",
    fontSize: 18,
  },
  topWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  points: {
    fontFamily: "SemiBold",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 24,
    marginLeft: 8,
  },
  buttonText: {
    fontFamily: "ExtraBold",
    color: "#FFFFFF",
    fontSize: 12,
  },
  buttonsWrapper: {
    flexDirection: "row",
  },
  modifyButton: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
});
